import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Schema de validación
const atsScoreSchema = z.object({
  resumeContent: z.string().min(100, 'Resume content too short'),
  jobDescription: z.string().min(100, 'Job description too short'),
});

// Tipos para el contenido del resume
interface ResumeContent {
  personalInfo?: any;
  summary?: string;
  experience?: any[];
  education?: any[];
  skills?: any[];
  [key: string]: any;
}

// POST - Calcular ATS score
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parsear y validar input
    const body = await req.json();
    const validation = atsScoreSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { resumeContent, jobDescription } = validation.data;

    // Parsear resume content si es JSON string
    let resumeData: ResumeContent;
    try {
      resumeData = typeof resumeContent === 'string'
        ? JSON.parse(resumeContent)
        : resumeContent;
    } catch {
      resumeData = { content: resumeContent };
    }

    // Convertir resume a texto plano para análisis
    const resumeText = extractTextFromResume(resumeData);

    // Extraer keywords del job description usando OpenAI
    console.log('Extracting keywords from job description...');
    const keywordsResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at analyzing job descriptions and extracting key skills, requirements, and technologies. Extract keywords that are important for ATS matching.',
        },
        {
          role: 'user',
          content: `Extract the most important keywords, skills, technologies, and requirements from this job description. Return them as a JSON array of strings.\n\nJob Description:\n${jobDescription}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 500,
    });

    const keywordsData = JSON.parse(
      keywordsResponse.choices[0].message.content || '{"keywords":[]}'
    );
    const keywords: string[] = keywordsData.keywords || [];

    console.log(`Extracted ${keywords.length} keywords:`, keywords);

    // Contar keywords que aparecen en el resume (case insensitive)
    const resumeLower = resumeText.toLowerCase();
    const matchedKeywords = keywords.filter((keyword) =>
      resumeLower.includes(keyword.toLowerCase())
    );
    const keywordsMatched = matchedKeywords.length;
    const keywordsTotal = keywords.length;

    // Calcular keyword score (60% del total)
    const keywordScore = keywordsTotal > 0
      ? (keywordsMatched / keywordsTotal) * 60
      : 0;

    // Calcular format score (25% del total)
    const formatScore = calculateFormatScore(resumeText, resumeData);

    // Calcular structure score (15% del total)
    const structureScore = calculateStructureScore(resumeData);

    // Score final (0-100)
    const totalScore = Math.round(keywordScore + formatScore + structureScore);

    // Identificar keywords faltantes
    const missingKeywords = keywords.filter(
      (keyword) => !resumeLower.includes(keyword.toLowerCase())
    );

    // Generar sugerencias
    const suggestions = generateSuggestions(
      missingKeywords,
      resumeData,
      formatScore,
      structureScore
    );

    // Identificar problemas de formato
    const formatIssues = identifyFormatIssues(resumeText, resumeData);

    console.log(`ATS Score calculated: ${totalScore}/100`);

    return NextResponse.json({
      score: totalScore,
      keywordsMatched,
      keywordsTotal,
      matchedKeywords,
      breakdown: {
        keywordScore: Math.round(keywordScore),
        formatScore: Math.round(formatScore),
        structureScore: Math.round(structureScore),
      },
      formatIssues,
      suggestions,
      missingKeywords: missingKeywords.slice(0, 10), // Top 10 missing keywords
    });
  } catch (error: any) {
    console.error('Error calculating ATS score:', error);
    return NextResponse.json(
      {
        error: 'Failed to calculate ATS score',
        details: error.message
      },
      { status: 500 }
    );
  }
}

// Funciones auxiliares

function extractTextFromResume(resumeData: ResumeContent): string {
  let text = '';

  // Extraer información personal
  if (resumeData.personalInfo) {
    text += `${resumeData.personalInfo.name || ''} ${resumeData.personalInfo.email || ''} ${resumeData.personalInfo.phone || ''}\n`;
  }

  // Extraer summary
  if (resumeData.summary) {
    text += `${resumeData.summary}\n`;
  }

  // Extraer experiencia
  if (resumeData.experience && Array.isArray(resumeData.experience)) {
    resumeData.experience.forEach((exp: any) => {
      text += `${exp.title || ''} ${exp.company || ''} ${exp.description || ''}\n`;
      if (exp.responsibilities && Array.isArray(exp.responsibilities)) {
        text += exp.responsibilities.join(' ') + '\n';
      }
    });
  }

  // Extraer educación
  if (resumeData.education && Array.isArray(resumeData.education)) {
    resumeData.education.forEach((edu: any) => {
      text += `${edu.degree || ''} ${edu.institution || ''} ${edu.field || ''}\n`;
    });
  }

  // Extraer skills
  if (resumeData.skills) {
    if (Array.isArray(resumeData.skills)) {
      text += resumeData.skills.join(' ') + '\n';
    } else if (typeof resumeData.skills === 'object') {
      Object.values(resumeData.skills).forEach((skillGroup: any) => {
        if (Array.isArray(skillGroup)) {
          text += skillGroup.join(' ') + '\n';
        }
      });
    }
  }

  return text;
}

function calculateFormatScore(resumeText: string, resumeData: ResumeContent): number {
  let score = 0;

  // No contiene "table" indicators (ATS-friendly) +10
  if (!resumeText.includes('|') && !resumeText.includes('┃')) {
    score += 10;
  }

  // Tiene estructura clara con secciones estándar +10
  const hasStandardSections =
    resumeText.toLowerCase().includes('experience') ||
    resumeText.toLowerCase().includes('education') ||
    resumeText.toLowerCase().includes('skills');
  if (hasStandardSections) {
    score += 10;
  }

  // Longitud apropiada (500-2000 palabras) +5
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount >= 500 && wordCount <= 2000) {
    score += 5;
  }

  return Math.min(score, 25); // Max 25 points
}

function calculateStructureScore(resumeData: ResumeContent): number {
  let score = 0;

  // Tiene secciones estándar +5
  if (resumeData.experience && Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    score += 5;
  }

  // Tiene información de contacto +5
  if (resumeData.personalInfo && resumeData.personalInfo.email) {
    score += 5;
  }

  // Tiene skills organizados +5
  if (resumeData.skills && (Array.isArray(resumeData.skills) || typeof resumeData.skills === 'object')) {
    score += 5;
  }

  return Math.min(score, 15); // Max 15 points
}

function generateSuggestions(
  missingKeywords: string[],
  resumeData: ResumeContent,
  formatScore: number,
  structureScore: number
): string[] {
  const suggestions: string[] = [];

  // Sugerencias de keywords faltantes (top 5)
  if (missingKeywords.length > 0) {
    missingKeywords.slice(0, 5).forEach((keyword) => {
      suggestions.push(`Add keyword: "${keyword}" to relevant sections`);
    });
  }

  // Sugerencias de formato
  if (formatScore < 20) {
    suggestions.push('Use standard section headers (Experience, Education, Skills)');
    suggestions.push('Remove tables or complex formatting for better ATS compatibility');
  }

  // Sugerencias de estructura
  if (structureScore < 10) {
    if (!resumeData.personalInfo?.email) {
      suggestions.push('Add contact information including email');
    }
    if (!resumeData.experience || resumeData.experience.length === 0) {
      suggestions.push('Add work experience section with detailed descriptions');
    }
    if (!resumeData.skills) {
      suggestions.push('Add a skills section highlighting your key competencies');
    }
  }

  // Sugerencia general
  if (suggestions.length === 0) {
    suggestions.push('Your resume looks great! Consider adding quantified achievements to stand out.');
  }

  return suggestions;
}

function identifyFormatIssues(resumeText: string, resumeData: ResumeContent): string[] {
  const issues: string[] = [];

  // Detectar tablas
  if (resumeText.includes('|') || resumeText.includes('┃')) {
    issues.push('Tables detected - may not be ATS-friendly');
  }

  // Detectar longitud
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 500) {
    issues.push('Resume is too short - aim for 500-2000 words');
  } else if (wordCount > 2000) {
    issues.push('Resume is too long - consider condensing to 1-2 pages');
  }

  // Verificar contacto
  if (!resumeData.personalInfo?.email) {
    issues.push('Missing contact email');
  }

  return issues;
}
