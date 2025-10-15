'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResumeEditorShell } from '@/components/resume-editor/ResumeEditorShell';
import { ResumeData, DEFAULT_SECTIONS } from '@/lib/types/resume';
import { useToast } from '@/lib/hooks/use-toast';

export default function NewResumePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Get template and mode from URL params
  const templateParam = searchParams.get('template') || 'harvard-ats';
  const modeParam = searchParams.get('mode') as 'targeted' | 'general' || 'general';

  // Initialize with empty resume data
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: {},
    certifications: [],
    languages: [],
    projects: [],
    publications: [],
    volunteer: [],
    awards: [],
    template: templateParam,
    fontSize: 11,
  });

  const [template, setTemplate] = useState(templateParam);
  const [fontSize, setFontSize] = useState(11);
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [title, setTitle] = useState('Untitled Resume');
  const [resumeType, setResumeType] = useState<'targeted' | 'general'>(modeParam);

  const handleDataChange = useCallback((newData: ResumeData) => {
    setResumeData(newData);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/resumes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          type: resumeType,
          content: resumeData,
          template_id: template,
          font_size: fontSize,
          sections: sections.filter(s => s.enabled).map(s => s.id),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save resume');
      }

      const data = await response.json();

      toast({
        title: 'Success',
        description: 'Resume saved successfully!',
        variant: 'success',
      });

      // Redirect to the resume editor
      setTimeout(() => {
        router.push(`/dashboard/resumes/${data.id}`);
      }, 1000);
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to save resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    toast({
      title: 'Save Required',
      description: 'Please save your resume first before exporting',
      variant: 'destructive',
    });
  };

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <ResumeEditorShell
      resumeData={resumeData}
      template={template}
      fontSize={fontSize}
      sections={sections}
      title={title}
      onDataChange={handleDataChange}
      onTemplateChange={setTemplate}
      onFontSizeChange={setFontSize}
      onSectionsChange={setSections}
      onTitleChange={setTitle}
      onSave={handleSave}
      onExport={handleExport}
      saving={saving}
      hasUnsavedChanges={true}
    />
  );
}
