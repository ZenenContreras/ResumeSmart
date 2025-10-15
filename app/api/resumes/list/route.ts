import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

// GET - Listar todos los resumes del usuario
export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // 'targeted' | 'general' | null (all)
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

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

    const { data: resumes, error, count } = await query;

    if (error) {
      console.error('Error fetching resumes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch resumes', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      resumes: resumes || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Error in GET /api/resumes/list:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
