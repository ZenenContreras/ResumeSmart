'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AVAILABLE_TEMPLATES } from '@/lib/types/resume';
import { TemplatePreviewCard } from '@/lib/utils/template-preview';

// Mock data for template previews
const getMockResumeData = () => ({
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
  },
  summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading cross-functional teams.',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      responsibilities: [
        'Led development of microservices architecture serving 1M+ users',
        'Mentored team of 5 junior developers and conducted code reviews',
        'Reduced deployment time by 40% through CI/CD pipeline optimization',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'StartupCo',
      location: 'San Francisco, CA',
      startDate: 'Jun 2019',
      endDate: 'Dec 2020',
      responsibilities: [
        'Built RESTful APIs using Node.js and Express',
        'Implemented responsive UI components with React and TypeScript',
        'Collaborated with product team to define technical requirements',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California',
      location: 'Berkeley, CA',
      graduationDate: 'May 2019',
      gpa: '3.8',
    },
  ],
  skills: {
    technical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python'],
    tools: ['Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL'],
  },
  certifications: [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: 'Mar 2023',
    },
  ],
  languages: [
    {
      language: 'English',
      proficiency: 'Native',
    },
    {
      language: 'Spanish',
      proficiency: 'Professional',
    },
  ],
});

export default function SelectTemplatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'general';
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  const mockData = getMockResumeData();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (!selectedTemplate) return;
    router.push(`/dashboard/create/new?template=${selectedTemplate}&mode=${mode}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      {/* Header */}
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
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Template</h1>
        <p className="mt-2 text-gray-600">
          Select a professional template for your resume. You can change it anytime in the editor.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {AVAILABLE_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            onMouseEnter={() => setHoveredTemplate(template.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
            className={`relative group bg-white rounded-xl border-2 transition-all overflow-hidden ${
              selectedTemplate === template.id
                ? 'border-blue-500 shadow-xl scale-105'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
            }`}
          >
            {/* Preview Image Placeholder */}
            <div className="aspect-[8.5/11] bg-gray-100 relative overflow-hidden">
              {/* Template Preview - Dynamically generated based on template config */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <TemplatePreviewCard templateId={template.id} color={template.color} />
              </div>

              {/* Overlay on hover */}
              {hoveredTemplate === template.id && (
                <div className="absolute inset-0 bg-blue-600 bg-opacity-10 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-sm font-semibold text-blue-600">Preview</span>
                  </div>
                </div>
              )}

              {/* Selected Indicator */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Template Info */}
            <div className="p-4 text-left">
              <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>
              {template.recommended && (
                <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                  Recommended
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedTemplate}
          className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            selectedTemplate
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Editor
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
