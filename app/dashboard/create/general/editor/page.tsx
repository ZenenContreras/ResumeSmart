'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResumeData, SectionConfig, DEFAULT_SECTIONS } from '@/lib/types/resume';
import { ResumeEditorShell } from '@/components/resume-editor/ResumeEditorShell';
import { Loader2 } from 'lucide-react';

export default function GeneralEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get('template') || 'harvard-ats';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);

  // Initialize with empty resume data
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: 'John Doe',
      email: 'Jhondoe@gmail.com',
      phone: '(123)456789',
      location: 'Location',
      linkedin: '',
      website: '',
    },
    summary: 'Experienced {Your Profession} with {X} years of expertise in {key skill area}, {key skill area}, and {key skill area}. Proven track record of {major achievement type} and {major achievement type}, resulting in measurable impact across diverse industries. Strong background in {core competency} with demonstrated ability to {key capability} and {key capability}. Skilled at {soft skill}, {soft skill}, and {soft skill}, consistently delivering results in fast-paced environments.',
    experience: [],
    education: [],
    skills: {
      'Technical Skills': [],
      'Soft Skills' :[]
    },
    certifications: [],
    languages: [],
    projects: [],
    template: template,
    fontSize: 10,
  });

  const [sections, setSections] = useState<SectionConfig[]>(DEFAULT_SECTIONS);
  const [fontSize, setFontSize] = useState(10);
  const [title, setTitle] = useState('My General Resume');

  useEffect(() => {
    // Simulate loading (in real app, might load draft from localStorage)
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleDataChange = (data: ResumeData) => {
    setResumeData(data);
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Call the generate-general API
      const response = await fetch('/api/resume/generate-general', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          template_id: template,
          ...resumeData,
        }),
      });

      const result = await response.json();

      // Check for insufficient credits (403)
      if (response.status === 403) {
        setCreditsRemaining(result.creditsRemaining || 0);
        setShowUpgradeModal(true);
        setSaving(false);
        return;
      }

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save resume');
      }

      setHasUnsavedChanges(false);

      // Redirect to the saved resume
      router.push(`/dashboard/resumes/${result.resume.id}`);
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    // For now, just save first
    await handleSave();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
              Out of Credits
            </h2>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6">
              You've used all your free resume credits. Upgrade to create unlimited resumes and unlock premium features!
            </p>

            {/* Credits Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Credits Remaining</span>
                <span className="text-2xl font-bold text-red-600">{creditsRemaining || 0}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => router.push('/dashboard/upgrade')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Upgrade for More Credits
              </button>

              <button
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Continue Editing
              </button>
            </div>

            {/* Info */}
            <p className="text-xs text-gray-500 text-center mt-4">
              💡 Pro plan: $19 one-time for 10 resumes + premium features
            </p>
          </div>
        </div>
      )}

      <ResumeEditorShell
      resumeData={resumeData}
      template={template}
      fontSize={fontSize}
      sections={sections}
      title={title}
      saving={saving}
      exporting={false}
      hasUnsavedChanges={hasUnsavedChanges}
      onDataChange={handleDataChange}
      onTitleChange={setTitle}
      onTemplateChange={(newTemplate) => {
        setResumeData({ ...resumeData, template: newTemplate });
        setHasUnsavedChanges(true);
      }}
      onFontSizeChange={(newSize) => {
        setFontSize(newSize);
        setHasUnsavedChanges(true);
      }}
      onSectionsChange={setSections}
      onSave={handleSave}
      onExport={handleExport}
    />
    </>
  );
}
