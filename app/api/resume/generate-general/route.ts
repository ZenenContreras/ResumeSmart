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
const profileSchema = z.object({
  title: z.string().optional(),
  industries: z.array(z.string()).optional(),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'executive']).optional(),
  objective: z.string().optional(),
});

// POST - Generar resume general (sin job específico)
export async function POST(req: Request) {
  console.log('🚀 Starting general resume generation...');

  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Parsear y validar input
    const contentType = req.headers.get('content-type') || '';
    let experienceInput;
    let template = 'harvard-ats';
    let profile: any = {};
    let personalInfo: any;
    let resumeData: any;

    if (contentType.includes('application/json')) {
      // JSON from editor
      const body = await req.json();
      resumeData = body;
      template = body.template_id || body.template || 'harvard-ats';
      personalInfo = body.personalInfo;
      profile = body.profile || {};

      // Convert ResumeData to experienceText for AI processing
      if (body.experience && Array.isArray(body.experience)) {
        experienceInput = body.experience.map((exp: any) =>
          `${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})\n` +
          (exp.responsibilities || []).join('\n')
        ).join('\n\n');
      } else {
        experienceInput = body.experience || '';
      }
    } else {
      // FormData from wizard
      const formData = await req.formData();
      experienceInput = formData.get('experience');
      template = (formData.get('template') as string) || 'harvard-ats';
      const profileStr = formData.get('profile') as string;
      const personalInfoStr = formData.get('personalInfo') as string;

      try {
        profile = profileStr ? JSON.parse(profileStr) : {};
        personalInfo = personalInfoStr ? JSON.parse(personalInfoStr) : undefined;
      } catch {
        profile = {};
        personalInfo = undefined;
      }
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
        console.error('❌ Error creating user:', createError);

        // Si ya existe por duplicate key (email o id)
        if (createError.code === '23505') {
          console.log('🔄 User with this email already exists, checking if it matches this Clerk ID...');

          // Check if constraint is on email or id
          if (createError.details?.includes('email')) {
            // Email exists but possibly different Clerk ID - this is a sync issue
            console.log('⚠️  Email exists in DB but Clerk ID might be different');
            // Try to fetch by id anyway in case it was actually created
            const { data: retryUser, error: retryError } = await supabaseAdmin
              .from('users')
              .select('credits_remaining, plan, email')
              .eq('id', userId)
              .single();

            if (!retryError && retryUser) {
              user = retryUser;
              console.log('✅ User fetched successfully on retry');
            } else {
              // User with this email exists but different ID - update the email to include suffix
              console.log('🔧 Creating user with modified email to avoid conflict');
              const { data: modifiedUser, error: modError } = await supabaseAdmin
                .from('users')
                .insert({
                  id: userId,
                  email: `${clerkUser?.email || 'user'}+${userId.slice(0, 8)}@clerk.sync`,
                  name: clerkUser?.name || personalInfo?.name || 'User',
                  plan: 'free',
                  credits_remaining: 1,
                  credits_total: 1,
                  created_at: new Date().toISOString(),
                })
                .select('credits_remaining, plan')
                .single();

              if (modError) {
                console.error('❌ Failed to create user even with modified email:', modError);
                return NextResponse.json(
                  {
                    error: 'Failed to create user account',
                    details: 'Email sync conflict. Please contact support.',
                    code: modError.code
                  },
                  { status: 500 }
                );
              }
              user = modifiedUser;
              console.log('✅ User created with modified email');
            }
          } else {
            // ID exists - just fetch it
            console.log('🔄 User ID already exists, fetching...');
            const { data: retryUser, error: retryError } = await supabaseAdmin
              .from('users')
              .select('credits_remaining, plan')
              .eq('id', userId)
              .single();

            if (!retryError && retryUser) {
              user = retryUser;
              console.log('✅ User fetched successfully on retry');
            } else {
              return NextResponse.json(
                {
                  error: 'Failed to fetch existing user',
                  details: retryError?.message || 'Unknown error',
                },
                { status: 500 }
              );
            }
          }
        } else {
          return NextResponse.json(
            {
              error: 'Failed to create user account',
              details: createError.message,
              code: createError.code
            },
            { status: 500 }
          );
        }
      } else {
        // Solo asignar si createError es null
        user = newUser;
        console.log('✅ New user created with 1 credit');
      }
    } else if (userError) {
      console.error('Error fetching user:', userError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    } else {
      user = existingUser;
    }

    // Verificación de seguridad: asegurar que user está definido
    if (!user) {
      console.error('❌ User is undefined after all checks');
      return NextResponse.json(
        { error: 'Failed to verify user account' },
        { status: 500 }
      );
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
    let isFromEditor = contentType.includes('application/json') && resumeData;

    if (isFromEditor) {
      // Data already structured from editor - skip AI generation
      experienceText = experienceInput || '';
      console.log('✅ Data from editor - using structured content');
    } else if (typeof experienceInput === 'string') {
      experienceText = experienceInput;

      if (experienceText.length < 50) {
        return NextResponse.json(
          { error: 'Experience must be at least 50 characters' },
          { status: 400 }
        );
      }
      console.log(`✅ Experience parsed: ${experienceText.length} characters`);
    } else {
      // TODO: Agregar soporte para PDF/DOCX files en el futuro
      return NextResponse.json(
        { error: 'Please enter your experience as text. File upload support coming soon!' },
        { status: 400 }
      );
    }

    // 4. Generar CV general con OpenAI (o usar data del editor)
    const startTime = Date.now();
    let resumeContent;

    if (isFromEditor) {
      // Use data directly from editor
      console.log('✅ Using structured data from editor - skipping AI generation');
      resumeContent = {
        personalInfo: resumeData.personalInfo || {},
        summary: resumeData.summary || '',
        experience: resumeData.experience || [],
        education: resumeData.education || [],
        skills: resumeData.skills || {},
        certifications: resumeData.certifications || [],
        languages: resumeData.languages || [],
        projects: resumeData.projects || [],
      };
    } else {
      console.log('🤖 Calling OpenAI to generate versatile resume...');

    const systemPrompt = `You are an expert resume writer specializing in creating versatile, professional resumes that work across multiple roles and industries. Your task is to create a general-purpose resume that highlights transferable skills and achievements.

Key principles for general resumes:
- Focus on transferable skills that apply across industries
- Quantify achievements with metrics to show impact
- Use strong action verbs that demonstrate leadership and results
- Highlight adaptability and versatility
- Keep language professional and concise
- Structure content to be ATS-friendly (no tables, clear sections)
- Emphasize achievements that translate to different contexts
- Show progression and growth in career

Return the resume as a structured JSON object with this format:
{
  "personalInfo": { "name": "...", "email": "...", "phone": "...", "location": "...", "linkedin": "...", "website": "..." },
  "summary": "A compelling 3-4 sentence summary emphasizing versatility and key strengths",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, State",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "responsibilities": [
        "Achievement-focused bullet with transferable skills and metrics",
        "Another quantified achievement showing impact"
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
    "leadership": ["Leadership skill 1", "Leadership skill 2"],
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

    let userPrompt = `Create a professional, versatile resume that can be used for multiple opportunities. Focus on transferable skills, quantified achievements, and professional polish.

CANDIDATE EXPERIENCE:
${experienceText}

${personalInfo ? `PERSONAL INFO:\n${JSON.stringify(personalInfo, null, 2)}` : ''}`;

    // Agregar contexto del perfil si existe
    if (profile.title) {
      userPrompt += `\n\nTarget Role/Industry: ${profile.title}`;
    }
    if (profile.industries && profile.industries.length > 0) {
      userPrompt += `\nIndustries of Interest: ${profile.industries.join(', ')}`;
    }
    if (profile.experienceLevel) {
      userPrompt += `\nExperience Level: ${profile.experienceLevel}`;
    }
    if (profile.objective) {
      userPrompt += `\nCareer Objective: ${profile.objective}`;
    }

      userPrompt += `\n\nGenerate a complete, professional resume that emphasizes versatility and can be used for various opportunities. Make sure achievements are quantified and skills are organized clearly.`;

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

        resumeContent = JSON.parse(
          completion.choices[0].message.content || '{}'
        );

        const generationTime = Date.now() - startTime;
        console.log(`✅ Resume generated in ${generationTime}ms`);
      } catch (openaiError: any) {
        console.error('❌ OpenAI error:', openaiError);
        throw new Error(`OpenAI generation failed: ${openaiError.message}`);
      }
    }

    // 5. Para resume general, asignar un ATS score genérico alto (80-85)
    // ya que no hay job específico para comparar
    const genericAtsScore = 82;

    // 6. Guardar en base de datos
    console.log('💾 Saving resume to database...');
    const resumeTitle = resumeData?.title || `${resumeContent.personalInfo?.name || 'My Resume'} - General - ${new Date().toLocaleDateString()}`;

    const { data: savedResume, error: saveError } = await supabaseAdmin
      .from('resumes')
      .insert({
        user_id: userId,
        title: resumeTitle,
        type: 'general',
        job_description: null, // No job description for general resumes
        ats_score: genericAtsScore,
        keywords_matched: null,
        keywords_total: null,
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
    console.log(`🎉 General resume generation completed in ${totalTime}ms`);

    // 8. Retornar resultado
    return NextResponse.json({
      success: true,
      resume: savedResume,
      resumeId: savedResume.id,
      content: resumeContent,
      atsScore: genericAtsScore,
      creditsRemaining: user.credits_remaining - 1,
      generationTime: totalTime,
    });
  } catch (error: any) {
    console.error('❌ Error generating general resume:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate resume',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
