import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getUserFromClerk } from '@/lib/clerk-helpers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Schema de validación
const generateResumeSchema = z.object({
  jobDescription: z.string().min(100, 'Job description must be at least 100 characters'),
  experience: z.union([
    z.string().min(50, 'Experience must be at least 50 characters'),
    z.any(), // Para File (PDF/DOCX)
  ]),
  template: z.string().default('modern').optional(),
  personalInfo: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
  }).optional(),
});

// POST - Generar resume optimizado para job específico
export async function POST(req: Request) {
  console.log('🚀 Starting targeted resume generation...');

  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Parsear y validar input
    const formData = await req.formData();
    const jobDescription = formData.get('jobDescription') as string;
    const experienceInput = formData.get('experience');
    const template = (formData.get('template') as string) || 'modern';
    const personalInfoStr = formData.get('personalInfo') as string;

    let personalInfo;
    try {
      personalInfo = personalInfoStr ? JSON.parse(personalInfoStr) : undefined;
    } catch {
      personalInfo = undefined;
    }

    // Validar campos básicos
    if (!jobDescription || jobDescription.length < 100) {
      return NextResponse.json(
        { error: 'Job description must be at least 100 characters' },
        { status: 400 }
      );
    }

    // 2. Verificar créditos (crear usuario si no existe)
    console.log('💳 Checking user credits...');
    let user;

    const { data: existingUser, error: userError } = await supabaseAdmin
      .from('users')
      .select('credits_remaining, plan')
      .eq('id', userId)
      .single();

    if (userError && userError.code === 'PGRST116') {
      // Usuario no existe, crearlo
      console.log('👤 User not found, creating new user...');

      // Obtener datos del usuario de Clerk
      const clerkUser = await getUserFromClerk(userId);

      const { data: newUser, error: createError } = await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          email: clerkUser?.email || personalInfo?.email || 'unknown@email.com',
          name: clerkUser?.name || personalInfo?.name || 'User',
          plan: 'free',
          credits_remaining: 1,
          credits_total: 1,
          created_at: new Date().toISOString(),
        })
        .select('credits_remaining, plan')
        .single();

      if (createError) {
        console.error('Error creating user:', createError);
        return NextResponse.json(
          { error: 'Failed to create user account' },
          { status: 500 }
        );
      }
      user = newUser;
      console.log('✅ New user created with 1 credit');
    } else if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    } else {
      user = existingUser;
    }

    if (user.credits_remaining < 1) {
      return NextResponse.json(
        {
          error: 'Insufficient credits',
          creditsRemaining: user.credits_remaining,
          upgradeUrl: '/upgrade',
        },
        { status: 403 }
      );
    }

    // 3. Parsear experiencia (solo texto por ahora)
    console.log('📄 Parsing experience input...');
    let experienceText = '';

    if (typeof experienceInput === 'string') {
      experienceText = experienceInput;
    } else {
      // TODO: Agregar soporte para PDF/DOCX files en el futuro
      return NextResponse.json(
        { error: 'Please enter your experience as text. File upload support coming soon!' },
        { status: 400 }
      );
    }

    if (experienceText.length < 50) {
      return NextResponse.json(
        { error: 'Experience must be at least 50 characters' },
        { status: 400 }
      );
    }

    console.log(`✅ Experience parsed: ${experienceText.length} characters`);

    // 4. Generar CV optimizado con OpenAI
    console.log('🤖 Calling OpenAI to generate optimized resume...');
    const startTime = Date.now();

    const systemPrompt = `You are an expert resume writer and career coach with deep knowledge of ATS (Applicant Tracking Systems) and hiring best practices. Your task is to create a highly optimized, ATS-friendly resume tailored to a specific job description.

Key principles:
- Use keywords and phrases from the job description naturally throughout the resume
- Quantify achievements with metrics wherever possible
- Use strong action verbs (Led, Developed, Increased, etc.)
- Structure content to be ATS-friendly (no tables, no columns, simple formatting)
- Highlight relevant skills and experiences that match the job requirements
- Keep language professional and concise
- Focus on achievements and impact, not just responsibilities

Return the resume as a structured JSON object with the following format:
{
  "personalInfo": { "name": "...", "email": "...", "phone": "...", "location": "...", "linkedin": "...", "website": "..." },
  "summary": "A compelling 3-4 sentence summary highlighting key qualifications",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, State",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "responsibilities": [
        "Achievement-focused bullet point with metrics",
        "Another quantified achievement"
      ]
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University Name",
      "location": "City, State",
      "graduationDate": "MM/YYYY",
      "gpa": "X.XX" (optional)
    }
  ],
  "skills": {
    "technical": ["Skill 1", "Skill 2"],
    "languages": ["Language 1", "Language 2"],
    "tools": ["Tool 1", "Tool 2"]
  },
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "MM/YYYY"
    }
  ] (optional)
}`;

    const userPrompt = `Create an optimized resume for this job posting. Use the candidate's experience and tailor it specifically to match the job requirements.

JOB DESCRIPTION:
${jobDescription}

CANDIDATE EXPERIENCE:
${experienceText}

${personalInfo ? `PERSONAL INFO:\n${JSON.stringify(personalInfo, null, 2)}` : ''}

Generate a complete, ATS-optimized resume that highlights the most relevant experience and skills for this specific job. Make sure to incorporate keywords from the job description naturally throughout the resume.`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 2500,
      });

      const resumeContent = JSON.parse(
        completion.choices[0].message.content || '{}'
      );

      const generationTime = Date.now() - startTime;
      console.log(`✅ Resume generated in ${generationTime}ms`);

      // 5. Calcular ATS score
      console.log('📊 Calculating ATS score...');
      const atsScoreResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/ats/score`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeContent: JSON.stringify(resumeContent),
            jobDescription,
          }),
        }
      );

      const atsScoreData = await atsScoreResponse.json();
      const atsScore = atsScoreData.score || 0;
      const keywordsMatched = atsScoreData.keywordsMatched || 0;
      const keywordsTotal = atsScoreData.keywordsTotal || 0;

      console.log(`✅ ATS Score: ${atsScore}/100`);

      // 6. Guardar en base de datos
      console.log('💾 Saving resume to database...');
      const resumeTitle = `${resumeContent.personalInfo?.name || 'My Resume'} - ${new Date().toLocaleDateString()}`;

      const { data: savedResume, error: saveError } = await supabaseAdmin
        .from('resumes')
        .insert({
          user_id: userId,
          title: resumeTitle,
          type: 'targeted',
          job_description: jobDescription,
          ats_score: atsScore,
          keywords_matched: keywordsMatched,
          keywords_total: keywordsTotal,
          template_id: template,
          content: resumeContent,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (saveError) {
        console.error('❌ Error saving resume:', saveError);
        throw new Error(`Failed to save resume: ${saveError.message}`);
      }

      console.log(`✅ Resume saved with ID: ${savedResume.id}`);

      // 7. Decrementar créditos directamente en la DB
      console.log('💳 Decrementing user credits...');

      // Solo decrementar si no es plan Ultimate (unlimited)
      if (user.plan !== 'ultimate') {
        const { error: creditError } = await supabaseAdmin
          .from('users')
          .update({
            credits_remaining: user.credits_remaining - 1,
          })
          .eq('id', userId);

        if (creditError) {
          console.error('❌ Failed to decrement credits:', creditError);
          // No fallar el request, pero log para debugging
        } else {
          console.log('✅ Credits decremented successfully');
        }
      } else {
        console.log('✅ Ultimate user - credits not decremented (unlimited)');
      }

      const totalTime = Date.now() - startTime;
      console.log(`🎉 Resume generation completed in ${totalTime}ms`);

      // 8. Retornar resultado
      return NextResponse.json({
        success: true,
        resumeId: savedResume.id,
        content: resumeContent,
        atsScore,
        keywordsMatched,
        keywordsTotal,
        suggestions: atsScoreData.suggestions || [],
        missingKeywords: atsScoreData.missingKeywords || [],
        creditsRemaining: user.credits_remaining - 1,
        generationTime: totalTime,
      });
    } catch (openaiError: any) {
      console.error('❌ OpenAI error:', openaiError);

      // Retry una vez si timeout
      if (openaiError.code === 'timeout') {
        console.log('⏱️ Retrying after timeout...');
        // Implementar retry logic aquí si es necesario
      }

      throw new Error(`OpenAI generation failed: ${openaiError.message}`);
    }
  } catch (error: any) {
    console.error('❌ Error generating resume:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate resume',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
