import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(req: Request) {
  console.log('[Clerk Webhook] 🔔 Webhook request received');
  console.log('[Clerk Webhook] Timestamp:', new Date().toISOString());

  // Get the Webhook secret from environment
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('[Clerk Webhook] ❌ CLERK_WEBHOOK_SECRET not configured!');
    return new Response('Error: Webhook secret not configured', {
      status: 500,
    });
  }

  console.log('[Clerk Webhook] ✅ Webhook secret found');

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  console.log('[Clerk Webhook] Headers:', {
    svix_id: svix_id ? '✅' : '❌',
    svix_timestamp: svix_timestamp ? '✅' : '❌',
    svix_signature: svix_signature ? '✅' : '❌',
  });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('[Clerk Webhook] ❌ Missing svix headers');
    return new Response('Error: Missing svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook signature
  try {
    console.log('[Clerk Webhook] 🔐 Verifying signature...');
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
    console.log('[Clerk Webhook] ✅ Signature verified successfully');
  } catch (err: any) {
    console.error('[Clerk Webhook] ❌ Signature verification failed:', err.message);
    return new Response('Error: Verification failed', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  console.log(`[Clerk Webhook] 📨 Event type: ${eventType}`);

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;
    const name = `${first_name || ''} ${last_name || ''}`.trim() || null;

    console.log('[Webhook] Creating user:', { id, email, name });

    try {
      // First check if user already exists by email
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        console.log(`[Webhook] User with email ${email} already exists with ID: ${existingUser.id}`);
        return new Response('User already exists', { status: 200 });
      }

      // Create user in Supabase with free plan and 1 credit
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert({
          id: id,
          email: email,
          name: name,
          plan: 'free',
          credits_remaining: 1,
          credits_total: 1,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        // If user already exists, ignore the error
        if (error.code === '23505') {
          console.log(`[Webhook] User ${id} already exists in database (duplicate key)`);
          return new Response('User already exists', { status: 200 });
        }
        throw error;
      }

      console.log('[Webhook] User created in Supabase:', data);
      return new Response('User created successfully', { status: 200 });
    } catch (error) {
      console.error('[Webhook] Error creating user in Supabase:', error);
      return new Response('Error creating user', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data;

    const email = email_addresses[0]?.email_address;
    const name = `${first_name || ''} ${last_name || ''}`.trim() || null;

    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .update({
          email: email,
          name: name,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      console.log('User updated in Supabase:', data);
      return new Response('User updated successfully', { status: 200 });
    } catch (error) {
      console.error('Error updating user in Supabase:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    console.log('[Webhook] 🗑️  Deleting user:', id);

    try {
      // Primero verificar si el usuario existe
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id, email')
        .eq('id', id)
        .single();

      if (!existingUser) {
        console.log('[Webhook] ⚠️  User not found in Supabase, skipping delete');
        return new Response('User not found (already deleted)', { status: 200 });
      }

      console.log('[Webhook] Found user to delete:', existingUser.email);

      // Eliminar usuario (CASCADE eliminará resumes, cover_letters, etc.)
      const { error } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('[Webhook] ❌ Error deleting user:', error);
        throw error;
      }

      console.log('[Webhook] ✅ User deleted from Supabase:', id);
      console.log('[Webhook] ✅ All related data deleted (CASCADE)');
      return new Response('User deleted successfully', { status: 200 });
    } catch (error: any) {
      console.error('[Webhook] ❌ Error deleting user from Supabase:', error);
      return new Response('Error deleting user: ' + error.message, { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
}
