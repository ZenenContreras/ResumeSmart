'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Briefcase, User, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProgressStep {
  phase: string;
  message: string;
  progress: number;
  completed: boolean;
}

export default function TargetedInputPage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [template, setTemplate] = useState('harvard-ats');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<ProgressStep[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [atsScore, setAtsScore] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description');
      return;
    }

    if (!experience.trim()) {
      setError('Please describe your experience');
      return;
    }

    setError('');
    setGenerating(true);
    setSteps([]);
    setProgress(0);
    setKeywords([]);
    setAtsScore(null);

    try {
      const formData = new FormData();
      formData.append('jobDescription', jobDescription);
      formData.append('experience', experience);
      formData.append('template', template);

      const response = await fetch('/api/resumes/generate-stream', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response stream');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));

            setCurrentStep(data.message);
            setProgress(data.progress || 0);

            setSteps((prev) => {
              const newStep: ProgressStep = {
                phase: data.phase,
                message: data.message,
                progress: data.progress,
                completed: data.progress >= 100 || data.phase === 'complete',
              };

              const existingIndex = prev.findIndex((s) => s.phase === data.phase);
              if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = newStep;
                return updated;
              }
              return [...prev, newStep];
            });

            if (data.data?.keywords) {
              setKeywords(data.data.keywords);
            }

            if (data.data?.atsScore !== undefined) {
              setAtsScore(data.data.atsScore);
            }

            if (data.phase === 'complete' && data.data?.resumeId) {
              setTimeout(() => {
                router.push(`/dashboard/resumes/${data.data.resumeId}`);
              }, 1500);
            }

            if (data.phase === 'error') {
              setError(data.message);
              setGenerating(false);
            }
          }
        }
      }
    } catch (err: any) {
      console.error('Error generating resume:', err);
      setError(err.message || 'Failed to generate resume. Please try again.');
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/dashboard/create"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI-Powered Resume Generation</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Create Your Targeted Resume</h1>
            <p className="text-lg text-gray-600">Our AI will analyze the job posting and optimize your resume to match</p>
          </div>
        </div>

        {!generating ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Job Posting</h2>
                    <p className="text-sm text-gray-600">Paste the full job description</p>
                  </div>
                </div>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                />
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Your Experience</h2>
                    <p className="text-sm text-gray-600">Describe your background</p>
                  </div>
                </div>
                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Tell us about your professional experience..."
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Choose Template</label>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="harvard-ats">Harvard ATS (Recommended)</option>
                    <option value="purple-executive">Purple Executive</option>
                    <option value="blue-corporate">Blue Corporate</option>
                    <option value="modern">Modern</option>
                  </select>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={handleGenerate}
                    className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate AI Resume
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <h2 className="text-2xl font-bold text-gray-900">Generating Your Resume</h2>
                </div>
                <p className="text-gray-600">{currentStep}</p>
              </div>

              <div className="relative w-full bg-gray-200 rounded-full h-4 mb-8 overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-700">{progress}%</span>
                </div>
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                      step.completed ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{step.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {keywords.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 Key Requirements Identified</h3>
                <div className="flex flex-wrap gap-2">
                  {keywords.slice(0, 20).map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {keyword}
                    </span>
                  ))}
                  {keywords.length > 20 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">+{keywords.length - 20} more</span>
                  )}
                </div>
              </div>
            )}

            {atsScore !== null && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">📊 ATS Score</h3>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-green-600">{atsScore}/100</div>
                    <p className="text-sm text-gray-600">Excellent match!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
