import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

// Health check endpoint - no auth required
export async function GET() {
  const status = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {
      supabase: 'unknown',
      clerk: 'unknown',
      openai: 'unknown',
    },
    errors: [] as string[],
  };

  // Check Supabase
  try {
    if (!supabaseAdmin) {
      throw new Error('Supabase client not configured');
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id')
      .limit(1);

    if (error) {
      throw new Error(`Supabase query failed: ${error.message}`);
    }

    status.services.supabase = 'healthy';
  } catch (error: any) {
    status.services.supabase = 'unhealthy';
    status.errors.push(`Supabase: ${error.message}`);
    status.status = 'degraded';
  }

  // Check Clerk
  try {
    if (!process.env.CLERK_SECRET_KEY) {
      throw new Error('CLERK_SECRET_KEY not configured');
    }
    status.services.clerk = 'configured';
  } catch (error: any) {
    status.services.clerk = 'missing';
    status.errors.push(`Clerk: ${error.message}`);
    status.status = 'degraded';
  }

  // Check OpenAI
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    status.services.openai = 'configured';
  } catch (error: any) {
    status.services.openai = 'missing';
    status.errors.push(`OpenAI: ${error.message}`);
    status.status = 'degraded';
  }

  const statusCode = status.status === 'healthy' ? 200 : 500;

  return NextResponse.json(status, { status: statusCode });
}
