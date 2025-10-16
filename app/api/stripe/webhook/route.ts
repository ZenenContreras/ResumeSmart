import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe/client';
import { supabaseAdmin } from '@/lib/supabase/client';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  console.log('✅ Stripe webhook received:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan as 'pro' | 'ultimate';
        const credits = parseInt(session.metadata?.credits || '0');
        const durationDays = session.metadata?.durationDays
          ? parseInt(session.metadata.durationDays)
          : null;

        if (!userId || !plan) {
          console.error('[Stripe Webhook] Missing metadata in session:', session.metadata);
          return NextResponse.json({ received: true });
        }

        console.log(`[Stripe Webhook] 💳 Processing payment for user ${userId}, plan: ${plan}`);
        console.log(`[Stripe Webhook] Session ID: ${session.id}`);
        console.log(`[Stripe Webhook] Customer ID: ${session.customer}`);
        console.log(`[Stripe Webhook] Amount paid: $${(session.amount_total || 0) / 100}`);

        // Get current user data to check for upgrades
        const { data: currentUser, error: fetchError } = await supabaseAdmin
          .from('users')
          .select('plan, credits_remaining, email, name')
          .eq('id', userId)
          .single();

        if (fetchError) {
          console.error('[Stripe Webhook] Error fetching user:', fetchError);
          throw fetchError;
        }

        console.log(`[Stripe Webhook] Current user plan: ${currentUser?.plan}`);

        // Determine credits to add based on upgrade path
        let creditsToAdd = credits;
        const currentPlan = currentUser?.plan || 'free';

        // Free → Pro: Add 10 credits
        // Pro → Ultimate: Add 999 credits (unlimited for 90 days)
        // Free → Ultimate: Add 999 credits
        if (currentPlan === 'free' && plan === 'pro') {
          creditsToAdd = 10;
        } else if (currentPlan === 'pro' && plan === 'ultimate') {
          creditsToAdd = 999;
        } else if (currentPlan === 'free' && plan === 'ultimate') {
          creditsToAdd = 999;
        }

        // Calculate purchased_at and expires_at for tracking
        const purchasedAt = new Date();
        const expiresAt = plan === 'ultimate'
          ? new Date(purchasedAt.getTime() + (90 * 24 * 60 * 60 * 1000)) // 90 days
          : null; // PRO never expires

        // Get customer details from Stripe if available
        let customerName = currentUser?.name;
        if (session.customer && typeof session.customer === 'string') {
          try {
            const customer = await stripe.customers.retrieve(session.customer);
            if (customer && !customer.deleted) {
              // Use Stripe customer name if available and current name is not set
              if (customer.name && !customerName) {
                customerName = customer.name;
              }
            }
          } catch (err) {
            console.error('[Stripe Webhook] Error retrieving customer:', err);
          }
        }

        // Prepare update object
        const updateData: any = {
          plan,
          credits_remaining: creditsToAdd,
          credits_total: creditsToAdd,
          purchased_at: purchasedAt.toISOString(),
          expires_at: expiresAt?.toISOString() || null,
          stripe_customer_id: session.customer as string,
        };

        // Add name if we have it
        if (customerName) {
          updateData.name = customerName;
        }

        console.log('[Stripe Webhook] Updating user with data:', updateData);

        // Update user in database
        const { error } = await supabaseAdmin
          .from('users')
          .update(updateData)
          .eq('id', userId);

        if (error) {
          console.error('[Stripe Webhook] Error updating user:', error);
          throw error;
        }

        console.log(`[Stripe Webhook] ✅ User ${userId} upgraded from ${currentPlan} to ${plan} with ${creditsToAdd} credits`);
        console.log(`[Stripe Webhook] ✅ Stripe Customer ID: ${session.customer}`);
        console.log(`[Stripe Webhook] ✅ Purchased at: ${purchasedAt.toISOString()}`);
        if (expiresAt) {
          console.log(`[Stripe Webhook] ✅ Expires at: ${expiresAt.toISOString()}`);
        }
        break;
      }

      // Note: We don't use subscriptions - only one-time payments
      // PRO: One-time $19 for 10 CVs (never expires)
      // ULTIMATE: One-time $49 for unlimited CVs for 90 days (expires)
      // The expiration is handled by a cron job or on user access

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
