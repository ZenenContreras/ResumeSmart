'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TargetedInputPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [jobDescription, setJobDescription] = useState('');
  const [experienceText, setExperienceText] = useState('');
  const [template, setTemplate] = useState('harvard-ats');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (step === 1) {
      if (jobDescription.length < 100) {
        setError('Job description must be at least 100 characters');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (experienceText.length < 50) {
        setError('Experience must be at least 50 characters');
        return;
      }
      setError('');
      setStep(3);
    } else if (step === 3) {
      // Navigate to processing page with data
      router.push(`/dashboard/create/targeted/processing?template=${template}&jobLength=${jobDescription.length}&expLength=${experienceText.length}`);
    }
  };

  const handleBack = () => {
    setError('');
    if (step === 1) {
      router.push('/dashboard/create');
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Job Description */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <Link
                href="/dashboard/create"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Mode Selection
              </Link>

              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Paste the Job Description
              </h1>
              <p className="text-lg text-gray-600">
                Copy and paste the full job posting you're applying for. Our AI will analyze it to optimize your resume.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Posting *
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={16}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Paste the complete job description here...

Example:
Senior Software Engineer at TechCorp

We are seeking an experienced Senior Software Engineer to join our team...

Requirements:
- 5+ years of experience in software development
- Proficiency in JavaScript, React, and Node.js
- Strong problem-solving skills
..."
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    {jobDescription.length} / 100 characters minimum
                  </p>
                  {jobDescription.length >= 100 && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Looks good!
                    </span>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">💡 Pro Tip:</p>
                    <p>Include the complete job description with requirements, responsibilities, and qualifications for best results. The more details, the better our AI can tailor your resume.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Experience Input */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Add Your Experience
              </h1>
              <p className="text-lg text-gray-600">
                Paste your current resume or type your work experience. Our AI will optimize it for the job.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Experience *
                </label>
                <textarea
                  value={experienceText}
                  onChange={(e) => setExperienceText(e.target.value)}
                  rows={16}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Paste your resume or type your experience...

Example:
Senior Developer at ABC Corp (2020 - Present)
- Led development of microservices architecture
- Managed team of 5 developers
- Reduced deployment time by 40%

Software Engineer at XYZ Inc (2018 - 2020)
- Built RESTful APIs using Node.js
- Implemented CI/CD pipelines
..."
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    {experienceText.length} / 50 characters minimum
                  </p>
                  {experienceText.length >= 50 && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Perfect!
                    </span>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">💡 Pro Tip:</p>
                    <p>Include all your relevant experience, skills, and achievements. Don't worry about formatting - our AI will restructure everything to match the job requirements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Template Selection */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Choose Your Template
              </h1>
              <p className="text-lg text-gray-600">
                Select a professional template for your ATS-optimized resume
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { id: 'harvard-ats', name: 'Harvard ATS', color: 'from-gray-700 to-gray-900', recommended: true },
                { id: 'purple-executive', name: 'Purple Executive', color: 'from-purple-600 to-purple-800' },
                { id: 'blue-corporate', name: 'Blue Corporate', color: 'from-blue-600 to-blue-800' },
              ].map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setTemplate(tmpl.id)}
                  className={`relative bg-white rounded-xl p-6 border-2 transition-all ${
                    template === tmpl.id ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  }`}
                >
                  {tmpl.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        RECOMMENDED
                      </span>
                    </div>
                  )}

                  <div className={`h-40 bg-gradient-to-br ${tmpl.color} rounded-lg mb-4 flex items-center justify-center`}>
                    <div className="bg-white w-3/4 h-3/4 rounded shadow-lg p-3">
                      <div className="h-2 bg-gray-300 rounded mb-2"></div>
                      <div className="h-1 bg-gray-200 rounded mb-3"></div>
                      <div className="space-y-1">
                        <div className="h-1 bg-gray-200 rounded"></div>
                        <div className="h-1 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-center">{tmpl.name}</h3>

                  {template === tmpl.id && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={
              (step === 1 && jobDescription.length < 100) ||
              (step === 2 && experienceText.length < 50)
            }
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {step === 3 ? 'Generate Resume' : 'Continue'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
