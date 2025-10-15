import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getUserFromClerk } from '@/lib/clerk-helpers';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper to send SSE message
function sendSSE(controller: ReadableStreamDefaultController, data: any) {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  controller.enqueue(new TextEncoder().encode(message));
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const formData = await req.formData();
  const jobDescription = formData.get('jobDescription') as string;
  const experienceInput = formData.get('experience') as string;
  const template = (formData.get('template') as string) || 'harvard-ats';

  if (!jobDescription || jobDescription.length < 100) {
    return new Response(
      JSON.stringify({ error: 'Job description must be at least 100 characters' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!experienceInput || experienceInput.length < 50) {
    return new Response(
      JSON.stringify({ error: 'Experience must be at least 50 characters' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Create streaming response
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Step 1: Check credits
        sendSSE(controller, {
          phase: 'checking_credits',
          message: '💳 Checking your credits...',
          progress: 10,
        });

        let user;
        const { data: existingUser, error: userError } = await supabaseAdmin
          .from('users')
          .select('credits_remaining, plan')
          .eq('id', userId)
          .single();

        if (userError && userError.code === 'PGRST116') {
          sendSSE(controller, {
            phase: 'creating_user',
            message: '👤 Setting up your account...',
            progress: 15,
          });

          const clerkUser = await getUserFromClerk(userId);
          const { data: newUser } = await supabaseAdmin
            .from('users')
            .insert({
              id: userId,
              email: clerkUser?.email || 'unknown@email.com',
              name: clerkUser?.name || 'User',
              plan: 'free',
              credits_remaining: 1,
              credits_total: 1,
            })
            .select('credits_remaining, plan')
            .single();
          user = newUser;
        } else {
          user = existingUser;
        }

        if (user && user.credits_remaining < 1 && user.plan !== 'ultimate') {
          sendSSE(controller, {
            phase: 'error',
            message: '❌ Insufficient credits',
            error: 'no_credits',
          });
          controller.close();
          return;
        }

        // Step 2: Extract keywords
        sendSSE(controller, {
          phase: 'extracting_keywords',
          message: '🔍 Analyzing job requirements with AI...',
          progress: 20,
        });

        const keywordsResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Extract key requirements, skills, and keywords from job descriptions for ATS optimization.',
            },
            {
              role: 'user',
              content: `Extract the most important keywords from this job posting. Return as JSON: {"keywords": ["keyword1", "keyword2"...]}\n\n${jobDescription}`,
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.3,
        });

        const keywordsData = JSON.parse(
          keywordsResponse.choices[0].message.content || '{"keywords":[]}'
        );
        const keywords = keywordsData.keywords || [];

        sendSSE(controller, {
          phase: 'keywords_extracted',
          message: `✅ Found ${keywords.length} key requirements`,
          progress: 35,
          data: { keywords },
        });

        // Step 3: Generate optimized resume
        sendSSE(controller, {
          phase: 'generating_content',
          message: '🤖 Creating your optimized resume with GPT-4...',
          progress: 40,
        });

        const systemPrompt = `You are an expert resume writer and career coach. Create an ATS-optimized resume that:
- Naturally incorporates keywords: ${keywords.join(', ')}
- Uses strong action verbs and quantifies achievements
- Maintains professional tone and authenticity
- Follows ATS-friendly formatting

Return JSON with this structure:
{
  "personalInfo": {"name": "", "email": "", "phone": "", "location": ""},
  "summary": "3-4 sentences highlighting relevant experience",
  "experience": [{"title": "", "company": "", "location": "", "startDate": "", "endDate": "", "responsibilities": []}],
  "education": [{"degree": "", "institution": "", "location": "", "graduationDate": ""}],
  "skills": {"category": ["skill1", "skill2"]},
  "certifications": [],
  "languages": [],
  "projects": [],
  "awards": []
}`;

        const userPrompt = `Create an optimized resume for this job.\n\nJOB:\n${jobDescription}\n\nCANDIDATE EXPERIENCE:\n${experienceInput}`;

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

        sendSSE(controller, {
          phase: 'content_generated',
          message: '✅ Resume content created successfully',
          progress: 70,
        });

        // Step 4: Calculate ATS score
        sendSSE(controller, {
          phase: 'calculating_ats',
          message: '📊 Calculating ATS score...',
          progress: 75,
        });

        const resumeText = JSON.stringify(resumeContent).toLowerCase();
        const matchedKeywords = keywords.filter((k: string) =>
          resumeText.includes(k.toLowerCase())
        );
        const keywordScore = (matchedKeywords.length / keywords.length) * 60;
        const formatScore = 25; // Perfect format
        const structureScore = 15; // Perfect structure
        const atsScore = Math.round(keywordScore + formatScore + structureScore);

        sendSSE(controller, {
          phase: 'ats_calculated',
          message: `✅ ATS Score: ${atsScore}/100 (${matchedKeywords.length}/${keywords.length} keywords matched)`,
          progress: 85,
          data: {
            atsScore,
            keywordsMatched: matchedKeywords.length,
            keywordsTotal: keywords.length,
          },
        });

        // Step 5: Save to database
        sendSSE(controller, {
          phase: 'saving',
          message: '💾 Saving your resume...',
          progress: 90,
        });

        const resumeTitle = `${resumeContent.personalInfo?.name || 'My Resume'} - ${new Date().toLocaleDateString()}`;

        const { data: savedResume } = await supabaseAdmin
          .from('resumes')
          .insert({
            user_id: userId,
            title: resumeTitle,
            type: 'targeted',
            job_description: jobDescription,
            ats_score: atsScore,
            keywords_matched: matchedKeywords.length,
            keywords_total: keywords.length,
            template_id: template,
            content: resumeContent,
          })
          .select()
          .single();

        // Step 6: Deduct credits
        if (user && user.plan !== 'ultimate') {
          await supabaseAdmin
            .from('users')
            .update({ credits_remaining: user.credits_remaining - 1 })
            .eq('id', userId);
        }

        // Final success message
        sendSSE(controller, {
          phase: 'complete',
          message: '🎉 Resume generated successfully!',
          progress: 100,
          data: {
            resumeId: savedResume.id,
            atsScore,
            keywordsMatched: matchedKeywords.length,
            keywordsTotal: keywords.length,
            creditsRemaining: user ? (user.plan === 'ultimate' ? 999 : user.credits_remaining - 1) : 0,
          },
        });

        controller.close();
      } catch (error: any) {
        sendSSE(controller, {
          phase: 'error',
          message: `❌ Error: ${error.message}`,
          error: error.message,
        });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
