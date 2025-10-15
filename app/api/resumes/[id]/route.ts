import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';

// GET - Obtener un resume específico
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Obtener resume
    const { data: resume, error } = await supabaseAdmin
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Verificar ownership
    if (resume.user_id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden - You do not own this resume' },
        { status: 403 }
      );
    }

    return NextResponse.json(resume);
  } catch (error: any) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un resume
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // Verificar ownership primero
    const { data: existingResume, error: fetchError } = await supabaseAdmin
      .from('resumes')
      .select('user_id, type, job_description')
      .eq('id', id)
      .single();

    if (fetchError || !existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    if (existingResume.user_id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden - You do not own this resume' },
        { status: 403 }
      );
    }

    // Preparar datos para actualizar
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (body.title) updateData.title = body.title;
    if (body.content) updateData.content = body.content;
    if (body.template_id) updateData.template_id = body.template_id;
    if (body.font_size !== undefined) updateData.font_size = body.font_size;
    if (body.sections) updateData.sections = body.sections;

    // Si es un resume targeted y hay nuevo content, recalcular ATS score
    if (existingResume.type === 'targeted' && body.content && existingResume.job_description) {
      console.log('Recalculating ATS score for updated resume...');

      try {
        const atsScoreResponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ats/score`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              resumeContent: JSON.stringify(body.content),
              jobDescription: existingResume.job_description,
            }),
          }
        );

        if (atsScoreResponse.ok) {
          const atsScoreData = await atsScoreResponse.json();
          updateData.ats_score = atsScoreData.score;
          updateData.keywords_matched = atsScoreData.keywordsMatched;
          updateData.keywords_total = atsScoreData.keywordsTotal;
        }
      } catch (atsError) {
        console.error('Failed to recalculate ATS score:', atsError);
        // Continue with update even if ATS scoring fails
      }
    }

    // Actualizar resume
    const { data: updatedResume, error: updateError } = await supabaseAdmin
      .from('resumes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating resume:', updateError);
      return NextResponse.json(
        { error: 'Failed to update resume', details: updateError.message },
        { status: 500 }
      );
    }

    // Opcional: Crear versión en resume_versions
    if (body.content && body.createVersion) {
      try {
        // Contar versiones existentes
        const { count } = await supabaseAdmin
          .from('resume_versions')
          .select('*', { count: 'exact', head: true })
          .eq('resume_id', id);

        await supabaseAdmin.from('resume_versions').insert({
          resume_id: id,
          version_number: (count || 0) + 1,
          content: body.content,
          ats_score: updateData.ats_score || null,
          created_at: new Date().toISOString(),
        });
      } catch (versionError) {
        console.error('Failed to create version:', versionError);
        // Continue even if version creation fails
      }
    }

    console.log(`Resume ${id} updated successfully`);

    return NextResponse.json({
      success: true,
      resume: updatedResume,
    });
  } catch (error: any) {
    console.error('Error updating resume:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un resume
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Verificar ownership
    const { data: existingResume, error: fetchError } = await supabaseAdmin
      .from('resumes')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    if (existingResume.user_id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden - You do not own this resume' },
        { status: 403 }
      );
    }

    // Eliminar resume (CASCADE eliminará versiones y cover letters relacionadas)
    const { error: deleteError } = await supabaseAdmin
      .from('resumes')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting resume:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete resume', details: deleteError.message },
        { status: 500 }
      );
    }

    console.log(`Resume ${id} deleted successfully`);

    return NextResponse.json({
      success: true,
      message: 'Resume deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
