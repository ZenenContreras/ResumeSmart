import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

// GET - Listar todos los resumes del usuario
export async function GET(req: Request) {
  try {
    console.log('[API /resume/list] Request received');

    const { userId } = await auth();

    if (!userId) {
      console.log('[API /resume/list] No userId - Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[API /resume/list] User authenticated:', userId);

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // 'targeted' | 'general' | null (all)
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    console.log('[API /resume/list] Query params:', { type, limit, offset });

    // Verificar que Supabase esté configurado
    if (!supabaseAdmin) {
      console.error('[API /resume/list] Supabase client not configured');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    // Query builder
    let query = supabaseAdmin
      .from('resumes')
      .select('id, title, type, job_description, ats_score, template_id, created_at, updated_at', { count: 'exact' })
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filtrar por tipo si se especifica
    if (type && (type === 'targeted' || type === 'general')) {
      query = query.eq('type', type);
    }

    console.log('[API /resume/list] Executing Supabase query...');
    const { data: resumes, error, count } = await query;

    if (error) {
      console.error('[API /resume/list] Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch resumes', details: error.message, code: error.code },
        { status: 500 }
      );
    }

    console.log('[API /resume/list] Success - Found', count, 'resumes');

    return NextResponse.json({
      resumes: resumes || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('[API /resume/list] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
