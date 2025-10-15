import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, type, content, template_id, font_size, sections } = body;

    // Validate required fields
    if (!title || !type || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create resume in database
    const { data: resume, error } = await supabaseAdmin
      .from('resumes')
      .insert({
        user_id: userId,
        title,
        type,
        content,
        template_id: template_id || 'harvard-ats',
        font_size: font_size || 11,
        sections: sections || [],
        ats_score: 0,
        keywords_matched: 0,
        keywords_total: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating resume:', error);
      return NextResponse.json(
        { error: 'Failed to create resume' },
        { status: 500 }
      );
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error in create resume endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
