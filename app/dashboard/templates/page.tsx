'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AVAILABLE_TEMPLATES, ResumeData, LanguageProficiency } from '@/lib/types/resume';
import { HarvardATSPreview } from '@/components/resume-editor/templates/HarvardATSPreview';
import { PurpleExecutivePreview } from '@/components/resume-editor/templates/PurpleExecutivePreview';
import { BlueCorporatePreview } from '@/components/resume-editor/templates/BlueCorporatePreview';
import { ModernPreview } from '@/components/resume-editor/templates/ModernPreview';

// Mock data for template previews
const getMockResumeData = (): ResumeData => ({
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
      proficiency: 'Native' as LanguageProficiency,
    },
    {
      language: 'Spanish',
      proficiency: 'Professional Working Proficiency' as LanguageProficiency,
    },
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with React and Node.js',
      role: 'Lead Developer',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      startDate: 'Mar 2023',
      endDate: 'Aug 2023',
      highlights: [
        'Implemented shopping cart and payment integration',
        'Optimized database queries reducing load time by 50%',
      ],
    },
  ],
  publications: [
    {
      title: 'Microservices Architecture Best Practices',
      publisher: 'Tech Journal',
      date: 'Jan 2023',
    },
  ],
  volunteer: [
    {
      organization: 'Code for Good',
      role: 'Volunteer Developer',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      current: true,
      description: 'Teaching coding to underprivileged youth',
      highlights: [
        'Mentored 10+ students in web development',
        'Organized coding workshops for local schools',
      ],
    },
  ],
  awards: [
    {
      title: 'Employee of the Year',
      issuer: 'Tech Company Inc.',
      date: 'Dec 2022',
      description: 'Recognized for outstanding contributions to the team',
    },
  ],
});

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('harvard-ats');
  const [zoom, setZoom] = useState(40);

  const mockData = getMockResumeData();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleUseTemplate = () => {
    router.push(`/dashboard/create/new?template=${selectedTemplate}&mode=general`);
  };

  const renderPreview = () => {
    switch (selectedTemplate) {
      case 'harvard-ats':
        return <HarvardATSPreview data={mockData} />;
      case 'purple-executive':
        return <PurpleExecutivePreview data={mockData} />;
      case 'blue-corporate':
        return <BlueCorporatePreview data={mockData} />;
      case 'modern':
        return <ModernPreview data={mockData} />;
      default:
        return <HarvardATSPreview data={mockData} />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resume Templates</h1>
            <p className="text-sm text-gray-600 mt-1">
              Choose a professional template for your resume
            </p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Templates List */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Available Templates
            </h2>
            <div className="space-y-3">
              {AVAILABLE_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    {selectedTemplate === template.id && (
                      <div className="bg-blue-600 text-white rounded-full p-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                  {template.recommended && (
                    <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      Recommended
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Use Template Button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleUseTemplate}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                Use This Template
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="flex-1 flex flex-col bg-gray-100">
          {/* Preview Controls */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Live Preview</span>
              <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
                {AVAILABLE_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom(Math.max(25, zoom - 10))}
                disabled={zoom <= 25}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>

              <button
                onClick={() => setZoom(40)}
                className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Reset zoom"
              >
                {zoom}%
              </button>

              <button
                onClick={() => setZoom(Math.min(100, zoom + 10))}
                disabled={zoom >= 100}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom in"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 overflow-auto p-6 flex justify-center">
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                width: 'fit-content',
                height: 'fit-content'
              }}
            >
              {renderPreview()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
