import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

/**
 * Check if user's ULTIMATE plan has expired and downgrade if necessary
 * This endpoint should be called:
 * 1. On every page load (middleware)
 * 2. Before any credit-consuming action
 * 3. By a daily cron job
 */
export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user plan info
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, plan, expires_at, credits_remaining')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Only check expiration for ULTIMATE plan
    if (user.plan !== 'ultimate') {
      return NextResponse.json({
        expired: false,
        plan: user.plan,
        message: 'Plan does not expire',
      });
    }

    // Check if plan has expired
    const now = new Date();
    const expiresAt = user.expires_at ? new Date(user.expires_at) : null;

    if (!expiresAt) {
      console.error(`ULTIMATE user ${userId} has no expires_at date`);
      return NextResponse.json({
        expired: false,
        plan: user.plan,
        message: 'No expiration date set',
      });
    }

    // If not expired yet, return remaining days
    if (now < expiresAt) {
      const daysRemaining = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return NextResponse.json({
        expired: false,
        plan: user.plan,
        expiresAt: expiresAt.toISOString(),
        daysRemaining,
        message: `${daysRemaining} days remaining`,
      });
    }

    // Plan has expired - downgrade to FREE
    console.log(`⏰ ULTIMATE plan expired for user ${userId}. Downgrading to FREE.`);

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        plan: 'free',
        credits_remaining: 1, // FREE plan gets 1 credit/month
        credits_total: 1,
        expires_at: null,
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error downgrading expired user:', updateError);
      return NextResponse.json(
        { error: 'Failed to downgrade plan' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      expired: true,
      previousPlan: 'ultimate',
      newPlan: 'free',
      expiredAt: expiresAt.toISOString(),
      message: 'Your ULTIMATE plan has expired. You have been downgraded to FREE plan.',
    });

  } catch (error: any) {
    console.error('Error checking plan expiration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to just check status without taking action
 */
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('plan, expires_at')
      .eq('id', userId)
      .single();

    if (!user || user.plan !== 'ultimate' || !user.expires_at) {
      return NextResponse.json({
        hasExpiration: false,
        plan: user?.plan || 'unknown',
      });
    }

    const now = new Date();
    const expiresAt = new Date(user.expires_at);
    const daysRemaining = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return NextResponse.json({
      hasExpiration: true,
      plan: user.plan,
      expiresAt: expiresAt.toISOString(),
      daysRemaining: Math.max(0, daysRemaining),
      expired: now >= expiresAt,
    });

  } catch (error: any) {
    console.error('Error getting expiration status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
