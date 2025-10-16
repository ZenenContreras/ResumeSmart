import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { PLAN_FEATURES, PLAN_NAMES, PLAN_DESCRIPTIONS, PlanType } from '@/lib/constants/plans';

// GET - Obtener plan actual y features disponibles
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.log('[API /user/plan] No userId found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[API /user/plan] Fetching plan for user:', userId);

    // Check if Supabase client is configured
    if (!supabaseAdmin) {
      console.error('[API /user/plan] Supabase client not configured');
      return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
    }

    // Obtener plan del usuario
    let { data: user, error } = await supabaseAdmin
      .from('users')
      .select('plan, purchased_at, credits_remaining, credits_total, expires_at')
      .eq('id', userId)
      .single();

    console.log('[API /user/plan] Query result:', { user, error });

    // Si el usuario no existe, crearlo con plan free
    if (error && error.code === 'PGRST116') {
      console.log('[API /user/plan] User not found by ID, checking email:', userId);

      // Get user email from Clerk
      const clerk = await clerkClient();
      const clerkUser = await clerk.users.getUser(userId);
      const userEmail = clerkUser.emailAddresses[0]?.emailAddress;

      if (!userEmail) {
        console.error('[API /user/plan] No email found for user:', userId);
        return NextResponse.json({ error: 'User email not found' }, { status: 400 });
      }

      console.log('[API /user/plan] Email from Clerk:', userEmail);

      // First, check if user exists by email
      const { data: existingUserByEmail, error: emailCheckError } = await supabaseAdmin
        .from('users')
        .select('id, plan, purchased_at, credits_remaining, credits_total, expires_at')
        .eq('email', userEmail)
        .single();

      if (existingUserByEmail && !emailCheckError) {
        // User exists with this email but different ID
        console.log('[API /user/plan] Found existing user with email, returning their data');
        console.log('[API /user/plan] Existing ID:', existingUserByEmail.id, 'New ID:', userId);

        // Return the existing user data - don't update the ID to avoid breaking foreign keys
        user = existingUserByEmail;
      } else {
        // Email doesn't exist, create new user
        console.log('[API /user/plan] Creating new user with email:', userEmail);

        const { data: newUser, error: createError } = await supabaseAdmin
          .from('users')
          .insert({
            id: userId,
            email: userEmail,
            plan: 'free',
            credits_remaining: 1,
            credits_total: 1,
          })
          .select('plan, purchased_at, credits_remaining, credits_total, expires_at')
          .single();

        if (createError) {
          console.error('[API /user/plan] Error creating user:', createError);
          return NextResponse.json({ error: 'Failed to create user', details: createError.message }, { status: 500 });
        }

        console.log('[API /user/plan] User created successfully');
        user = newUser;
      }
    } else if (error) {
      console.error('Error fetching user plan:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const planType = user.plan as PlanType;
    const features = PLAN_FEATURES[planType];
    const planName = PLAN_NAMES[planType];
    const planDescription = PLAN_DESCRIPTIONS[planType];

    // Calculate days remaining for ULTIMATE plan
    let daysRemaining = null;
    let expired = false;
    if (user.expires_at) {
      const now = new Date();
      const expiresAt = new Date(user.expires_at);
      daysRemaining = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      expired = now >= expiresAt;
    }

    return NextResponse.json({
      plan: planType,
      planName,
      planDescription,
      features,
      purchasedAt: user.purchased_at,
      creditsRemaining: user.credits_remaining,
      creditsTotal: user.credits_total,
      expiresAt: user.expires_at,
      daysRemaining,
      expired,
    });
  } catch (error) {
    console.error('Error in GET /api/user/plan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
