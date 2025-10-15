import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user credits
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('plan, credits_remaining')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Don't deduct for Ultimate users
    if (user.plan === 'ultimate') {
      return NextResponse.json({ success: true, message: 'Ultimate user - no deduction' });
    }

    // Deduct 1 credit
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ credits_remaining: Math.max(0, user.credits_remaining - 1) })
      .eq('id', userId);

    if (updateError) {
      console.error('Error deducting credit:', updateError);
      return NextResponse.json({ error: 'Failed to deduct credit' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      creditsRemaining: Math.max(0, user.credits_remaining - 1),
    });
  } catch (error: any) {
    console.error('Error deducting credit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
