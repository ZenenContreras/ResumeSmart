# 📡 ResumeSmart API Structure

**Last Updated:** January 15, 2025
**Version:** 2.0 (Reorganized)

---

## 🎯 Overview

Clean, feature-based API organization following REST best practices.

**Base URL:** `https://yourdomain.com/api` or `http://localhost:3000/api`

---

## 📁 Folder Structure

```
app/api/
├── auth/              # Authentication & user sync
│   └── webhook/       # Clerk → Supabase sync
│
├── user/              # User management
│   ├── credits/       # GET/PUT user credits
│   ├── plan/          # GET user plan info
│   └── check-expiration/  # Check if plan expired
│
├── resume/            # Resume CRUD + Generation
│   ├── generate/      # Create targeted resume (with job)
│   ├── generate-general/  # Create general resume (no job)
│   ├── [id]/          # GET/PUT/DELETE specific resume
│   ├── list/          # GET all user resumes
│   └── export/        # Export resume to PDF
│
├── ai/                # AI-powered features
│   ├── improve/       # Improve bullet points (3 versions)
│   ├── optimize/      # Optimize general resume
│   └── score/         # Calculate ATS score
│
└── stripe/            # Payment processing
    ├── checkout/      # Create checkout session
    └── webhook/       # Handle Stripe webhooks
```

---

## 📚 API Reference

### **🔐 Authentication** (`/api/auth`)

#### `POST /api/auth/webhook`
Sync Clerk users to Supabase database.

**Headers:**
- `svix-id` - Webhook ID
- `svix-timestamp` - Timestamp
- `svix-signature` - Signature

**Events:**
- `user.created` → Create user in Supabase
- `user.updated` → Update user in Supabase
- `user.deleted` → Delete user in Supabase

**Response:** `200 OK`

---

### **👤 User Management** (`/api/user`)

#### `GET /api/user/credits`
Get user's credit balance.

**Auth:** Required (Clerk)

**Response:**
```json
{
  "creditsRemaining": 5,
  "creditsTotal": 10,
  "plan": "pro"
}
```

---

#### `PUT /api/user/credits`
Add or deduct credits.

**Auth:** Required (Clerk)

**Body:**
```json
{
  "action": "decrement" | "add",
  "amount": 1
}
```

**Response:**
```json
{
  "success": true,
  "action": "decrement",
  "amount": 1,
  "creditsRemaining": 9,
  "creditsTotal": 10,
  "plan": "pro"
}
```

---

#### `GET /api/user/plan`
Get current plan and features.

**Auth:** Required (Clerk)

**Response:**
```json
{
  "plan": "pro",
  "planName": "Pro",
  "planDescription": "10 resumes + cover letters + LinkedIn optimizer",
  "features": {
    "maxResumes": 10,
    "coverLetters": true,
    "linkedInOptimizer": true,
    "humanReview": false
  },
  "purchasedAt": "2025-01-15T10:00:00Z",
  "creditsRemaining": 8,
  "creditsTotal": 10,
  "expiresAt": null,
  "daysRemaining": null,
  "expired": false
}
```

---

#### `GET /api/user/check-expiration`
Check if Ultimate plan has expired.

**Auth:** Required (Clerk)

**Response:**
```json
{
  "expired": false,
  "daysRemaining": 45,
  "expiresAt": "2025-03-01T00:00:00Z"
}
```

---

### **📄 Resume Operations** (`/api/resume`)

#### `POST /api/resume/generate`
Generate a targeted resume for a specific job.

**Auth:** Required (Clerk)
**Credits:** -1 credit (unless Ultimate)

**Body (FormData):**
- `jobDescription` (string, min 100 chars) - Job posting
- `experience` (string, min 50 chars) - Your experience
- `template` (string, optional) - Template ID (default: 'modern')
- `personalInfo` (JSON string, optional) - Contact info

**Response:**
```json
{
  "success": true,
  "resumeId": "550e8400-e29b-41d4-a716-446655440000",
  "content": { ... },
  "atsScore": 85,
  "keywordsMatched": 12,
  "keywordsTotal": 15,
  "suggestions": ["Add Python to skills", "Quantify achievements"],
  "missingKeywords": ["Python", "AWS", "Docker"],
  "creditsRemaining": 9,
  "generationTime": 25000
}
```

---

#### `POST /api/resume/generate-general`
Generate a versatile general resume.

**Auth:** Required (Clerk)
**Credits:** -1 credit (unless Ultimate)

**Body (FormData):**
- `experience` (string, min 50 chars) - Your experience
- `profile` (JSON string, optional) - { title, industries[], experienceLevel, objective }
- `template` (string, optional) - Template ID
- `personalInfo` (JSON string, optional) - Contact info

**Response:**
```json
{
  "success": true,
  "resumeId": "550e8400-e29b-41d4-a716-446655440001",
  "content": { ... },
  "atsScore": 82,
  "creditsRemaining": 9,
  "generationTime": 22000
}
```

---

#### `GET /api/resume/[id]`
Get a specific resume.

**Auth:** Required (Clerk)
**Ownership:** Verified

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "user_id": "user_abc123",
  "title": "Software Engineer Resume",
  "type": "targeted",
  "job_description": "...",
  "ats_score": 85,
  "keywords_matched": 12,
  "keywords_total": 15,
  "template_id": "modern",
  "content": {
    "personalInfo": { ... },
    "summary": "...",
    "experience": [],
    "education": [],
    "skills": {}
  },
  "created_at": "2025-01-15T10:00:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

---

#### `PUT /api/resume/[id]`
Update a resume.

**Auth:** Required (Clerk)
**Ownership:** Verified

**Body:**
```json
{
  "title": "Updated Resume Title",
  "content": { ... },
  "template_id": "harvard-ats",
  "font_size": 12,
  "sections": ["summary", "experience", "education", "skills"],
  "createVersion": true
}
```

**Response:**
```json
{
  "success": true,
  "resume": { ... }
}
```

**Notes:**
- If `type='targeted'` and content updated, ATS score is recalculated
- If `createVersion=true`, saves to `resume_versions` table

---

#### `DELETE /api/resume/[id]`
Delete a resume.

**Auth:** Required (Clerk)
**Ownership:** Verified

**Response:**
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

**Notes:**
- Cascade deletes resume_versions and cover_letters
- Does NOT refund credits

---

#### `GET /api/resume/list`
List all user resumes.

**Auth:** Required (Clerk)

**Query Params:**
- `type` (optional) - Filter by 'targeted' or 'general'
- `limit` (optional, default: 50) - Max results
- `offset` (optional, default: 0) - Pagination offset

**Response:**
```json
{
  "resumes": [
    {
      "id": "...",
      "title": "Software Engineer Resume",
      "type": "targeted",
      "job_description": "...",
      "ats_score": 85,
      "template_id": "modern",
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:30:00Z"
    }
  ],
  "total": 12,
  "limit": 50,
  "offset": 0
}
```

**Notes:**
- Does NOT return full `content` (too large)
- Sorted by `updated_at DESC`

---

#### `GET /api/resume/export`
Export resume to PDF.

**Auth:** Required (Clerk)

**Query Params:**
- `resumeId` (required) - Resume UUID

**Response:** PDF file (application/pdf)

**Example:**
```
GET /api/resume/export?resumeId=550e8400-e29b-41d4-a716-446655440000
```

---

### **🤖 AI Features** (`/api/ai`)

#### `POST /api/ai/improve`
Improve a single bullet point (3 versions).

**Auth:** Required (Clerk)

**Body:**
```json
{
  "bulletPoint": "Managed team",
  "context": {
    "jobTitle": "Engineering Manager",
    "company": "Tech Corp",
    "targetRole": "Senior Engineering Manager"
  }
}
```

**Response:**
```json
{
  "success": true,
  "versions": [
    {
      "type": "impactful",
      "text": "Led cross-functional team of 8 engineers, delivering 15+ features that increased user engagement by 40%"
    },
    {
      "type": "balanced",
      "text": "Managed engineering team of 8, coordinating sprints and ensuring on-time delivery of quarterly roadmap"
    },
    {
      "type": "keyword-optimized",
      "text": "Led Agile team of 8 engineers using Scrum methodology, managing sprint planning and stakeholder communication"
    }
  ],
  "generationTime": 3000
}
```

---

#### `POST /api/ai/optimize`
Analyze and optimize a general resume.

**Auth:** Required (Clerk)

**Body:**
```json
{
  "resumeContent": { ... },
  "autoApply": false
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "overallScore": 78,
    "strengths": [
      "Good use of action verbs",
      "Quantified achievements"
    ],
    "improvements": [
      {
        "category": "skills",
        "issue": "Skills not well categorized",
        "suggestion": "Group skills into Technical, Leadership, and Soft Skills",
        "priority": "high"
      }
    ]
  },
  "optimizedContent": { ... },  // Only if autoApply=true
  "generationTime": 5000
}
```

---

#### `POST /api/ai/score`
Calculate ATS compatibility score.

**Auth:** Required (Clerk)

**Body:**
```json
{
  "resumeContent": "...",
  "jobDescription": "..."
}
```

**Response:**
```json
{
  "score": 85,
  "keywordsMatched": 12,
  "keywordsTotal": 15,
  "matchedKeywords": ["Python", "React", "AWS"],
  "breakdown": {
    "keywordScore": 48,
    "formatScore": 25,
    "structureScore": 12
  },
  "formatIssues": [],
  "suggestions": [
    "Add keyword: 'Docker' to relevant sections",
    "Add keyword: 'Kubernetes' to relevant sections"
  ],
  "missingKeywords": ["Docker", "Kubernetes", "CI/CD"]
}
```

**Scoring:**
- **Keyword Match (60%):** Keywords found / total keywords
- **Format (25%):** No tables, standard sections, proper length
- **Structure (15%):** Contact info, experience, skills present

---

### **💳 Payments** (`/api/stripe`)

#### `POST /api/stripe/checkout`
Create Stripe checkout session.

**Auth:** Required (Clerk)

**Body:**
```json
{
  "plan": "pro" | "ultimate"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/pay/cs_test_abc123..."
}
```

**Redirect user to `url` to complete payment.**

---

#### `POST /api/stripe/webhook`
Handle Stripe webhooks.

**Headers:**
- `stripe-signature` - Webhook signature

**Events:**
- `checkout.session.completed` → Update user plan and credits

**Response:** `200 OK`

---

## 🔒 Security

### Authentication
All routes require Clerk authentication via `auth()` helper, except:
- `POST /api/auth/webhook` (Clerk signature verification)
- `POST /api/stripe/webhook` (Stripe signature verification)

### Ownership Verification
Resume operations (`GET/PUT/DELETE /api/resume/[id]`) verify `user_id` matches authenticated user.

### Rate Limiting
⚠️ **TODO:** Implement rate limiting (10 req/min per user)

---

## 🚨 Error Handling

### Standard Error Response
```json
{
  "error": "Error message",
  "details": "Additional details (optional)",
  "code": "ERROR_CODE (optional)"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (insufficient credits or ownership)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📊 Usage Examples

### Create Targeted Resume
```javascript
const formData = new FormData();
formData.append('jobDescription', 'Software Engineer position...');
formData.append('experience', 'Senior Developer at TechCo...');
formData.append('template', 'modern');

const response = await fetch('/api/resume/generate', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
console.log('ATS Score:', data.atsScore);
```

### Get User Credits
```javascript
const response = await fetch('/api/user/credits');
const data = await response.json();
console.log('Credits:', data.creditsRemaining);
```

### Export PDF
```javascript
const response = await fetch(`/api/resume/export?resumeId=${resumeId}`);
const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'resume.pdf';
a.click();
```

---

## 🗑️ Removed Routes (v2.0)

The following routes were removed during reorganization:

- ❌ `/api/resumes/*` → Moved to `/api/resume/*`
- ❌ `/api/resumes/create` → Duplicated by `generate` endpoints
- ❌ `/api/resumes/generate-stream` → Experimental, not used
- ❌ `/api/user/deduct-credit` → Credits managed in `generate` endpoints
- ❌ `/api/pdf/export` → Moved to `/api/resume/export`
- ❌ `/api/pdf/test` → Testing only
- ❌ `/api/ats/score` → Moved to `/api/ai/score`
- ❌ `/api/ai/general-optimize` → Renamed to `/api/ai/optimize`
- ❌ `/api/debug/test-webhook` → Testing only

---

## 📝 Migration Guide (v1 → v2)

If you have existing code using old routes:

| Old Route | New Route |
|-----------|-----------|
| `/api/resumes/generate` | `/api/resume/generate` |
| `/api/resumes/generate-general` | `/api/resume/generate-general` |
| `/api/resumes/[id]` | `/api/resume/[id]` |
| `/api/resumes/list` | `/api/resume/list` |
| `/api/pdf/export` | `/api/resume/export` |
| `/api/ats/score` | `/api/ai/score` |
| `/api/ai/general-optimize` | `/api/ai/optimize` |

---

**Last Updated:** January 15, 2025
**Maintained by:** ResumeSmart Team
