import { auth } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { renderToStream } from '@react-pdf/renderer';
import ModernTemplate from '@/components/pdf-templates/ModernTemplate';
import HarvardATSTemplate from '@/components/pdf-templates/HarvardATSTemplate';
import PurpleExecutiveTemplate from '@/components/pdf-templates/PurpleExecutiveTemplate';
import BlueCorporateTemplate from '@/components/pdf-templates/BlueCorporateTemplate';
import React from 'react';

// POST - Generate PDF preview without saving (for live preview)
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, template } = await req.json();

    if (!data) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      );
    }

    // Select template component
    let TemplateComponent;
    switch (template) {
      case 'purple-executive':
        TemplateComponent = PurpleExecutiveTemplate;
        break;
      case 'blue-corporate':
        TemplateComponent = BlueCorporateTemplate;
        break;
      case 'harvard-ats':
        TemplateComponent = HarvardATSTemplate;
        break;
      case 'modern':
      default:
        TemplateComponent = ModernTemplate;
        break;
    }

    // Generate PDF
    const document = React.createElement(TemplateComponent, {
      data: data,
    });

    const stream = await renderToStream(document);

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    const pdfBuffer = Buffer.concat(chunks);

    // Return PDF for preview (no credit deduction)
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error generating PDF preview:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate PDF preview',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// GET - Generar y descargar PDF del resume
export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const resumeId = searchParams.get('resumeId');
    const templateId = searchParams.get('template') || 'modern';

    if (!resumeId) {
      return NextResponse.json(
        { error: 'Resume ID is required' },
        { status: 400 }
      );
    }

    console.log(`📄 Generating PDF for resume ${resumeId}`);

    // 1. Obtener resume de la base de datos
    const { data: resume, error } = await supabaseAdmin
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single();

    if (error || !resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    // 2. Verificar ownership
    if (resume.user_id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden - You do not own this resume' },
        { status: 403 }
      );
    }

    console.log(`✅ Resume found: "${resume.title}"`);

    // 3. Seleccionar template (PDF download is FREE - no credit deduction)
    let TemplateComponent;
    switch (templateId) {
      case 'harvard-ats':
        TemplateComponent = HarvardATSTemplate;
        break;
      case 'purple-executive':
        TemplateComponent = PurpleExecutiveTemplate;
        break;
      case 'blue-corporate':
        TemplateComponent = BlueCorporateTemplate;
        break;
      case 'modern':
      default:
        TemplateComponent = ModernTemplate;
        break;
    }

    // 4. Generar PDF
    console.log(`🎨 Rendering PDF with ${templateId} template...`);
    const startTime = Date.now();

    try {
      const document = React.createElement(TemplateComponent, {
        data: resume.content,
      });

      const stream = await renderToStream(document);

      // Convertir stream a buffer
      const chunks: Buffer[] = [];
      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
      }
      const pdfBuffer = Buffer.concat(chunks);

      const generationTime = Date.now() - startTime;
      console.log(`✅ PDF generated in ${generationTime}ms`);

      // 5. Preparar nombre de archivo
      const personalInfo = resume.content?.personalInfo;
      const name = personalInfo?.name || 'Resume';
      const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${sanitizedName}_Resume.pdf`;

      // 6. Retornar PDF
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': pdfBuffer.length.toString(),
          'Cache-Control': 'private, max-age=300', // Cache por 5 minutos
        },
      });
    } catch (renderError: any) {
      console.error('❌ Error rendering PDF:', renderError);
      return NextResponse.json(
        {
          error: 'Failed to render PDF',
          details: renderError.message,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ Error generating PDF:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
