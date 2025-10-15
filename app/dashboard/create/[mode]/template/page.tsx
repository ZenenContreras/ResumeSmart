'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { SAMPLE_RESUME_DATA } from '@/lib/constants/sample-resume-data';

const TEMPLATES = [
  {
    id: 'harvard-ats',
    name: 'Harvard ATS Expert',
    description: 'Optimized for ATS systems with clean, professional design recommended by Harvard Career Services',
    features: ['ATS-Friendly', 'Single Column', 'Clean Typography', 'High Compatibility'],
    recommended: true,
    color: 'border-gray-900'
  },
  {
    id: 'purple-executive',
    name: 'Purple Executive',
    description: 'Modern professional template with purple accents, perfect for senior positions',
    features: ['Modern Design', 'Color Accents', 'Professional', 'Executive Level'],
    color: 'border-purple-600'
  },
  {
    id: 'blue-corporate',
    name: 'Blue Corporate',
    description: 'Two-column design with blue theme, ideal for business professionals',
    features: ['Corporate Style', 'Two Columns', 'Professional', 'Versatile'],
    color: 'border-blue-600'
  },
];

export default function TemplateSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const mode = params.mode as 'targeted' | 'general';
  const [selectedTemplate, setSelectedTemplate] = useState<string>('harvard-ats');

  const handleContinue = () => {
    // Navigate to the steps page with template in query
    router.push(`/dashboard/create/${mode}/steps?template=${selectedTemplate}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/create"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Mode Selection
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Template</h1>
        <p className="mt-2 text-gray-600">
          Select a template that best fits your style and industry
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`relative text-left rounded-xl border-2 transition-all hover:shadow-xl ${
              selectedTemplate === template.id
                ? `${template.color} shadow-lg scale-[1.02]`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {template.recommended && (
              <div className="absolute -top-3 left-6 z-10">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  RECOMMENDED
                </span>
              </div>
            )}

            {/* Template Preview */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl h-96 overflow-hidden">
              {/* Mini Resume Preview */}
              <div className="absolute inset-0 p-8 overflow-hidden">
                <div className="bg-white shadow-lg h-full rounded-lg p-6 text-xs">
                  {/* Name */}
                  <div className={`mb-4 pb-3 ${template.id === 'harvard-ats' ? 'border-b border-gray-900' : template.id === 'purple-executive' ? 'border-b-2 border-purple-600' : 'bg-blue-900 text-white -m-6 mb-4 p-4'}`}>
                    <h3 className="font-bold text-sm mb-1">{SAMPLE_RESUME_DATA.personalInfo.name}</h3>
                    <p className={`text-[8px] ${template.id === 'blue-corporate' ? 'text-blue-100' : 'text-gray-600'}`}>
                      {SAMPLE_RESUME_DATA.personalInfo.email} • {SAMPLE_RESUME_DATA.personalInfo.phone}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="mb-3">
                    <h4 className={`font-bold text-[10px] mb-1 uppercase ${template.id === 'purple-executive' ? 'text-purple-600' : template.id === 'blue-corporate' ? 'text-blue-900' : 'border-b border-gray-900'}`}>
                      Summary
                    </h4>
                    <p className="text-[7px] text-gray-700 leading-tight">
                      {SAMPLE_RESUME_DATA.summary.substring(0, 120)}...
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="mb-3">
                    <h4 className={`font-bold text-[10px] mb-1 uppercase ${template.id === 'purple-executive' ? 'text-purple-600' : template.id === 'blue-corporate' ? 'text-blue-900' : 'border-b border-gray-900'}`}>
                      Experience
                    </h4>
                    <div className="space-y-2">
                      {SAMPLE_RESUME_DATA.experience.slice(0, 1).map((exp, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <p className="font-bold text-[9px]">{exp.title}</p>
                              <p className={`text-[8px] ${template.id === 'purple-executive' ? 'text-purple-600' : template.id === 'blue-corporate' ? 'text-blue-600' : 'text-gray-600'}`}>
                                {exp.company}
                              </p>
                            </div>
                            <p className="text-[7px] text-gray-500">{exp.startDate}</p>
                          </div>
                          <ul className="space-y-0.5">
                            {exp.responsibilities.slice(0, 2).map((resp, i) => (
                              <li key={i} className="text-[7px] text-gray-600 leading-tight">
                                • {resp.substring(0, 45)}...
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Preview */}
                  <div>
                    <h4 className={`font-bold text-[10px] mb-1 uppercase ${template.id === 'purple-executive' ? 'text-purple-600' : template.id === 'blue-corporate' ? 'text-blue-900' : 'border-b border-gray-900'}`}>
                      Skills
                    </h4>
                    <p className="text-[7px] text-gray-700">
                      {SAMPLE_RESUME_DATA.skills.technical.slice(0, 4).join(' • ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Overlay for selection */}
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-6 bg-white rounded-b-xl">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                {selectedTemplate === template.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {template.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-6 sticky bottom-6 shadow-lg">
        <div>
          <p className="text-sm text-gray-600">Selected Template</p>
          <p className="font-semibold text-gray-900 text-lg">
            {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
          </p>
        </div>
        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-xl flex items-center"
        >
          Continue to Next Step
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Need help choosing a template?
            </h3>
            <p className="text-sm text-gray-700">
              We recommend the <strong>Harvard ATS Expert</strong> template for maximum compatibility with applicant tracking systems. It uses a clean, single-column layout that ensures your information is properly parsed by ATS software used by most companies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
