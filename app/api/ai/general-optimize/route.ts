import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Schema de validación
const optimizeSchema = z.object({
  resumeContent: z.any(),
  autoApply: z.boolean().optional().default(false),
});

// POST - Optimizar resume general para mejor versatilidad
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validar input
    const body = await req.json();
    const validation = optimizeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { resumeContent, autoApply } = validation.data;

    console.log(`🔧 Optimizing general resume for user ${userId}`);

    // Llamar OpenAI para analizar y sugerir optimizaciones
    const systemPrompt = `You are an expert resume coach specializing in creating versatile, professional resumes that work across multiple industries and roles.

Analyze the provided resume and provide specific optimization suggestions focusing on:

1. SKILLS CATEGORIZATION
   - Are skills well-organized and categorized?
   - Are there transferable skills that should be highlighted?
   - Missing skill categories?

2. BULLET POINT TRANSFERABILITY
   - Are achievements framed in a way that translates across industries?
   - Do bullets focus on transferable skills and universal outcomes?
   - Are metrics used effectively?

3. SUMMARY VERSATILITY
   - Is the summary broad enough for multiple roles?
   - Does it highlight adaptability and key strengths?
   - Is it compelling without being too specific?

4. OVERALL STRUCTURE
   - Is the format ATS-friendly?
   - Are sections properly organized?
   - Is there good balance between detail and conciseness?

Return your analysis as JSON with this structure:
{
  "overallScore": 85,
  "strengths": ["Strength 1", "Strength 2"],
  "improvements": [
    {
      "category": "skills" | "bullets" | "summary" | "structure",
      "issue": "Description of the issue",
      "suggestion": "Specific suggestion to fix it",
      "priority": "high" | "medium" | "low"
    }
  ],
  "optimizedVersion": {
    // Full optimized resume structure (only if autoApply is true)
  }
}`;

    const userPrompt = `Analyze this general resume and provide optimization suggestions:

${JSON.stringify(resumeContent, null, 2)}

${autoApply ? 'Also provide a fully optimized version with all improvements applied.' : 'Provide suggestions only, do not create a new version.'}`;

    const startTime = Date.now();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: autoApply ? 2500 : 1000,
    });

    const analysisData = JSON.parse(
      completion.choices[0].message.content || '{}'
    );

    const duration = Date.now() - startTime;
    console.log(`✅ Resume analysis completed in ${duration}ms`);
    console.log(`Overall score: ${analysisData.overallScore}/100`);

    return NextResponse.json({
      success: true,
      analysis: {
        overallScore: analysisData.overallScore || 0,
        strengths: analysisData.strengths || [],
        improvements: analysisData.improvements || [],
      },
      ...(autoApply && analysisData.optimizedVersion && {
        optimizedContent: analysisData.optimizedVersion,
      }),
      generationTime: duration,
    });
  } catch (error: any) {
    console.error('Error optimizing resume:', error);
    return NextResponse.json(
      {
        error: 'Failed to optimize resume',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
