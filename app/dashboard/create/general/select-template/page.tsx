'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AVAILABLE_TEMPLATES } from '@/lib/types/resume';
import { TemplatePreviewCard } from '@/lib/utils/template-preview';
import Image from 'next/image';

export default function SelectTemplatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('harvard-ats');

  const handleContinue = () => {
    router.push(`/dashboard/create/general/editor?template=${selectedTemplate}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/create"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Mode Selection
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Template
          </h1>
          <p className="text-gray-600">
            Select a professional template. You can customize everything in the editor.
          </p>
        </div>

        {/* Continue Button */}
        <div className="pb-10 z-20">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Selected Template</p>
                <p className="text-lg font-bold text-gray-900">
                  {AVAILABLE_TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
                </p>
              </div>
              <button
                onClick={handleContinue}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Start Editing
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {AVAILABLE_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`group relative bg-white rounded-xl overflow-hidden transition-all duration-200 ${
                selectedTemplate === template.id
                  ? 'ring-2 ring-blue-500 shadow-xl scale-105'
                  : 'hover:shadow-lg border border-gray-200'
              }`}
            >

              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-3 right-3 z-10 bg-blue-500 rounded-full p-1.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              {/* Template Preview - Check for image first, fallback to component */}
              <div className="aspect-[8.5/11] bg-gray-50 relative overflow-hidden">
                {template.preview ? (
                  // If template has image preview
                  <Image
                    src={template.preview}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  // Fallback to component preview
                  <div className="absolute inset-0 p-4 flex items-center justify-center">
                    <div className="w-full h-full">
                      <TemplatePreviewCard
                        templateId={template.id}
                        color={template.color}
                      />
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all ${
                  selectedTemplate === template.id ? 'bg-opacity-5' : ''
                }`}></div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{template.description}</p>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>



        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">💡 Pro Tip</p>
              <p>The <strong>Harvard ATS Expert</strong> template is optimized for Applicant Tracking Systems and recommended for most applications.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
