import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Schema de validación
const improveSchema = z.object({
  bullet: z.string().min(10, 'Bullet point too short'),
  context: z.object({
    jobTitle: z.string().optional(),
    company: z.string().optional(),
    targetRole: z.string().optional(),
  }).optional(),
});

// POST - Mejorar un bullet point individual con IA
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validar input
    const body = await req.json();
    const validation = improveSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { bullet, context } = validation.data;

    console.log(`✨ Improving bullet point for user ${userId}`);
    console.log(`Original: "${bullet}"`);

    // Llamar OpenAI para generar 3 versiones mejoradas
    const systemPrompt = `You are an expert resume writer and career coach. Your task is to improve resume bullet points to make them more impactful, quantified, and professional.

When improving a bullet point, follow these principles:
- Use strong action verbs (Led, Developed, Increased, Achieved, Implemented, etc.)
- Quantify achievements with specific metrics (percentages, numbers, timeframes)
- Show impact and results, not just responsibilities
- Keep each bullet point concise (1-2 lines maximum)
- Use professional language
- Make it ATS-friendly with relevant keywords

Provide 3 different versions:
1. QUANTIFIED VERSION: Focus heavily on numbers and metrics
2. BALANCED VERSION: Balance between impact, context, and metrics
3. KEYWORD-OPTIMIZED VERSION: Include industry keywords while maintaining readability

Return as JSON with this structure:
{
  "versions": [
    {
      "type": "quantified",
      "bullet": "Improved version with metrics...",
      "reasoning": "Why this version works"
    },
    {
      "type": "balanced",
      "bullet": "Balanced improved version...",
      "reasoning": "Why this version works"
    },
    {
      "type": "keyword",
      "bullet": "Keyword-optimized version...",
      "reasoning": "Why this version works"
    }
  ]
}`;

    let userPrompt = `Improve this resume bullet point:

"${bullet}"`;

    if (context) {
      if (context.jobTitle) {
        userPrompt += `\n\nJob Title: ${context.jobTitle}`;
      }
      if (context.company) {
        userPrompt += `\nCompany: ${context.company}`;
      }
      if (context.targetRole) {
        userPrompt += `\nTarget Role: ${context.targetRole}`;
      }
    }

    userPrompt += `\n\nGenerate 3 improved versions as specified in the system instructions.`;

    const startTime = Date.now();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8, // Más creatividad
      max_tokens: 500,
    });

    const responseData = JSON.parse(
      completion.choices[0].message.content || '{"versions":[]}'
    );

    const duration = Date.now() - startTime;
    console.log(`✅ Generated 3 improved versions in ${duration}ms`);

    return NextResponse.json({
      success: true,
      original: bullet,
      versions: responseData.versions || [],
      generationTime: duration,
    });
  } catch (error: any) {
    console.error('Error improving bullet point:', error);
    return NextResponse.json(
      {
        error: 'Failed to improve bullet point',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
