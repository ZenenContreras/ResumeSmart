import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { PLAN_FEATURES, PLAN_NAMES, PLAN_DESCRIPTIONS, PlanType } from '@/lib/constants/plans';

// GET - Obtener plan actual y features disponibles
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Obtener plan del usuario
    let { data: user, error } = await supabaseAdmin
      .from('users')
      .select('plan, purchased_at, credits_remaining, credits_total, expires_at')
      .eq('id', userId)
      .single();

    // Si el usuario no existe, crearlo con plan free
    if (error && error.code === 'PGRST116') {
      console.log('User not found, creating with free plan:', userId);
      const { data: newUser, error: createError } = await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          plan: 'free',
          credits_remaining: 1,
          credits_total: 1,
        })
        .select('plan, purchased_at, credits_remaining, credits_total, expires_at')
        .single();

      if (createError) {
        console.error('Error creating user:', createError);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }

      user = newUser;
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
