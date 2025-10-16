# 📊 ResumeSmart - Database & API Audit Report

**Date:** January 15, 2025
**Status:** ✅ Overall Good - Minor Issues Found
**Reviewed by:** AI Code Auditor

---

## 🎯 Executive Summary

Your database schema and API are **well-structured** with proper foreign keys, indexes, and security policies. However, there are **4 issues** that need attention:

### Critical Issues (Must Fix)
1. ⚠️ **Duplicate migration files** - Two `004_` migrations exist
2. ⚠️ **Inconsistent `template_id` defaults** - Different defaults in schema vs migration

### Warnings (Should Fix)
3. ⚠️ **Missing authentication in ATS endpoint** - Already has auth but could be made optional for internal calls
4. ⚠️ **No rate limiting implemented** - Mentioned in CLAUDE.md but not implemented

---

## 📋 Database Schema Review

### ✅ **STRENGTHS**

#### 1. **Proper Foreign Keys with CASCADE**
```sql
-- resumes.user_id → users.id (ON DELETE CASCADE) ✅
-- resumes.parent_resume_id → resumes.id ✅
-- resume_versions.resume_id → resumes.id (ON DELETE CASCADE) ✅
-- cover_letters.user_id → users.id (ON DELETE CASCADE) ✅
-- cover_letters.resume_id → resumes.id ✅
```
**Impact:** Data integrity is maintained. When a user is deleted, all their data is automatically cleaned up.

#### 2. **Optimized Indexes**
```sql
✅ idx_resumes_user_id - Fast user resume queries
✅ idx_resumes_updated_at - Efficient sorting by date
✅ idx_resumes_type - Filter by targeted/general
✅ idx_resumes_user_template - Composite index for user+template
✅ idx_users_expires_at - Efficient expiration checks
```
**Impact:** Queries will be fast even with thousands of users/resumes.

#### 3. **Row Level Security (RLS) Enabled**
```sql
✅ Users can only SELECT/UPDATE their own data
✅ Resumes have INSERT/UPDATE/DELETE policies
✅ Resume versions inherit parent resume permissions
✅ Cover letters have full CRUD policies
```
**Impact:** Security is enforced at database level, not just application level.

#### 4. **Comprehensive Resume Data Model**
```sql
✅ content (JSONB) - Flexible structure
✅ certifications, languages, projects, publications, volunteer, awards (JSONB)
✅ sections (JSONB) - Customizable section ordering
✅ editor_state (JSONB) - Save editor UI state
```
**Impact:** Supports complex resumes without schema changes.

---

### ⚠️ **ISSUES FOUND**

#### **Issue #1: Duplicate Migration Files (CRITICAL)**

**Problem:**
```
/database/migrations/004_add_comprehensive_sections.sql
/database/migrations/004_add_plan_expiration.sql
```
Two files have the same number `004_`.

**Impact:** Migration tools may run them in wrong order or skip one.

**Fix:**
```bash
# Rename one of them:
mv database/migrations/004_add_comprehensive_sections.sql \
   database/migrations/005_add_comprehensive_sections.sql
```

---

#### **Issue #2: Inconsistent `template_id` Default**

**Problem:**
- **schema.sql:** `template_id TEXT DEFAULT 'modern'`
- **migration 005:** `template_id VARCHAR(50) DEFAULT 'harvard-ats'`

**Impact:** New resumes might get different default templates depending on when the user signed up.

**Fix - Option A (Recommended):**
```sql
-- Standardize on 'modern' as default
ALTER TABLE resumes
ALTER COLUMN template_id SET DEFAULT 'modern';
```

**Fix - Option B:**
```sql
-- Or update schema.sql to match migration
-- In schema.sql line 43:
template_id TEXT NULL DEFAULT 'harvard-ats'::TEXT,
```

---

#### **Issue #3: Missing Rate Limiting**

**Problem:** CLAUDE.md states "Rate limit all endpoints (10 req/min per user)" but this is not implemented.

**Impact:** Users could spam AI endpoints, causing high OpenAI costs.

**Fix:** Add rate limiting middleware using `@upstash/ratelimit`:

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});
```

**Apply to API routes:**
```typescript
// app/api/resumes/generate/route.ts
import { ratelimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const { userId } = await auth();

  // Rate limit check
  const { success } = await ratelimit.limit(userId);
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in 1 minute.' },
      { status: 429 }
    );
  }

  // ... rest of code
}
```

---

## 🔌 API Routes Audit

### ✅ **Well-Implemented Routes**

| Route | Method | Auth | Ownership Check | Error Handling |
|-------|--------|------|-----------------|----------------|
| `/api/auth/webhook` | POST | Webhook Signature | N/A | ✅ Excellent |
| `/api/resumes/generate` | POST | ✅ Clerk | ✅ Auto-create user | ✅ Good |
| `/api/resumes/generate-general` | POST | ✅ Clerk | ✅ Auto-create user | ✅ Good |
| `/api/resumes/[id]` | GET/PUT/DELETE | ✅ Clerk | ✅ Verified | ✅ Good |
| `/api/resumes/list` | GET | ✅ Clerk | ✅ By user_id filter | ✅ Good |
| `/api/user/credits` | GET/PUT | ✅ Clerk | ✅ By userId | ✅ Good |
| `/api/user/plan` | GET | ✅ Clerk | ✅ Auto-create user | ✅ Excellent |
| `/api/stripe/webhook` | POST | Stripe Signature | N/A | ✅ Good |
| `/api/ats/score` | POST | ✅ Clerk | N/A (stateless) | ✅ Good |

---

### ⚠️ **API Improvements Needed**

#### **1. ATS Score Endpoint - Consider Making Auth Optional**

**Current:**
```typescript
// /api/ats/score requires authentication
const { userId } = await auth();
if (!userId) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**Issue:** The endpoint is called internally by `/api/resumes/[id]` PUT, which already authenticated. This creates redundant auth checks.

**Recommendation:**
```typescript
// Option 1: Allow internal calls without auth (check for internal header)
const { userId } = await auth();
const isInternalCall = req.headers.get('x-internal-call') === process.env.INTERNAL_API_SECRET;

if (!userId && !isInternalCall) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**Or just keep it as-is** (it's not a real problem, just a micro-optimization).

---

#### **2. Missing `user/deduct-credit` Endpoint Usage**

**Found:** `/api/user/deduct-credit/route.ts` exists but is **never used**.

**Current behavior:** Credits are decremented directly in `generate` and `generate-general` routes:

```typescript
// app/api/resumes/generate/route.ts:285
await supabaseAdmin
  .from('users')
  .update({ credits_remaining: user.credits_remaining - 1 })
  .eq('id', userId);
```

**Recommendation:**
- **Option A:** Delete `/api/user/deduct-credit` if not needed
- **Option B:** Use it for consistency:

```typescript
// Centralize credit deduction
await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/deduct-credit`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId, amount: 1 })
});
```

---

## 🔐 Security Review

### ✅ **Excellent Security Practices**

1. **Authentication**: All routes use `auth()` from Clerk ✅
2. **Ownership Verification**: Every GET/PUT/DELETE checks `user_id` ✅
3. **Webhook Signature Verification**: Both Clerk and Stripe webhooks verified ✅
4. **SQL Injection Prevention**: Using Supabase client (parameterized queries) ✅
5. **RLS Policies**: Double security layer at DB level ✅
6. **Input Validation**: Using Zod schemas ✅

### ⚠️ **Missing Security Features**

1. **No Rate Limiting** (see Issue #3 above)
2. **No Request Size Limits** - Could add to prevent large payloads:

```typescript
// middleware.ts
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Limit request body size
    },
  },
};
```

3. **No CORS Configuration** - Consider adding if you have a separate frontend:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only allow your domain
  response.headers.set('Access-Control-Allow-Origin', 'https://yourdomain.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  return response;
}
```

---

## 📈 Performance Review

### ✅ **Good Practices**

1. **Indexes on hot paths**: `user_id`, `updated_at`, `template_id` ✅
2. **Lazy loading**: Resume list doesn't fetch full `content` ✅
3. **Pagination**: List endpoint supports `limit` and `offset` ✅
4. **Composite indexes**: `idx_resumes_user_template` for multi-column queries ✅
5. **JSONB for flexible data**: No schema changes needed for new features ✅

### ⚠️ **Potential Optimizations**

1. **OpenAI Timeout**: Currently no explicit timeout. Add:

```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  // ... other params
  timeout: 60000, // 60 seconds max
});
```

2. **Cache User Credits**: Mentioned in CLAUDE.md (1 min cache) but not implemented:

```typescript
// lib/cache.ts
import { LRUCache } from 'lru-cache';

const creditsCache = new LRUCache({
  max: 1000,
  ttl: 60000, // 1 minute
});

export async function getCachedCredits(userId: string) {
  const cached = creditsCache.get(userId);
  if (cached) return cached;

  const credits = await fetchCreditsFromDB(userId);
  creditsCache.set(userId, credits);
  return credits;
}
```

---

## 🐛 Bug Risks

### **Medium Risk: User Creation Race Condition**

**Scenario:**
1. User signs up with Clerk
2. Webhook hasn't fired yet
3. User immediately tries to create resume
4. API creates user in `/generate` endpoint
5. Webhook fires and tries to create user again → Duplicate key error

**Current mitigation:** Code handles `23505` error ✅

**Better fix:** Use `INSERT ... ON CONFLICT DO NOTHING`:

```typescript
const { data: newUser, error: createError } = await supabaseAdmin
  .from('users')
  .upsert({
    id: userId,
    email: clerkUser?.email,
    name: clerkUser?.name,
    plan: 'free',
    credits_remaining: 1,
    credits_total: 1,
  }, {
    onConflict: 'id',
    ignoreDuplicates: true
  })
  .select('credits_remaining, plan')
  .single();
```

---

## 📝 Recommendations Summary

### **Priority 1 - Must Fix Now**
- [ ] Rename duplicate `004_` migration file to `005_`
- [ ] Standardize `template_id` default value (choose 'modern' or 'harvard-ats')
- [ ] Configure Clerk webhook in production dashboard

### **Priority 2 - Fix This Week**
- [ ] Implement rate limiting with Upstash Redis
- [ ] Add OpenAI request timeout (60s)
- [ ] Add request body size limits
- [ ] Use `UPSERT` instead of `INSERT` + error handling for user creation

### **Priority 3 - Nice to Have**
- [ ] Implement user credits caching (1 min TTL)
- [ ] Delete unused `/api/user/deduct-credit` endpoint (or use it)
- [ ] Add CORS configuration for security
- [ ] Add monitoring/logging (Sentry, LogRocket)

---

## ✅ What's Working Great

1. **Database Design**: Excellent normalization, indexes, and RLS policies
2. **Foreign Keys**: Proper CASCADE deletes prevent orphaned data
3. **API Structure**: RESTful, consistent error handling, good separation of concerns
4. **Authentication**: Clerk integration is solid
5. **User Auto-Creation**: Fallback mechanism works well
6. **Stripe Integration**: Webhook handling is robust
7. **ATS Scoring**: Well-structured with keyword extraction and scoring breakdown
8. **Version Control**: resume_versions table supports undo/redo functionality

---

## 🎯 Overall Grade: **B+ (85/100)**

**Breakdown:**
- Database Design: A (95/100) ⭐
- API Routes: B+ (87/100) ⭐
- Security: B (82/100) - Missing rate limiting
- Performance: B+ (85/100) - Good indexes, could add caching
- Error Handling: A- (90/100) ⭐
- Code Quality: A- (88/100) ⭐

**Biggest Wins:**
✅ Proper foreign keys and indexes
✅ RLS policies for security
✅ User auto-creation fallback
✅ Clean API structure

**Biggest Gaps:**
⚠️ No rate limiting (critical for AI costs)
⚠️ Migration numbering conflict
⚠️ No caching layer

---

## 📚 Next Steps

1. **Fix the 2 critical issues** (migration rename + template_id default)
2. **Add rate limiting** to protect from abuse
3. **Test the Clerk webhook** in production
4. **Monitor OpenAI costs** closely after launch
5. **Add Sentry** for error tracking

---

**Report Generated:** 2025-01-15
**Tools Used:** Manual code review, schema analysis, API route audit
