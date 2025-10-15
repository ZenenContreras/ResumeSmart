'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Resume, ResumeData, SectionConfig, DEFAULT_SECTIONS } from '@/lib/types/resume';
import { ResumeEditorShell } from '@/components/resume-editor/ResumeEditorShell';
import { useToast } from '@/lib/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function ResumeEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [resume, setResume] = useState<Resume | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [sections, setSections] = useState<SectionConfig[]>(DEFAULT_SECTIONS);
  const [exporting, setExporting] = useState(false);
  const autoSaveTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch resume data on mount
  useEffect(() => {
    if (params.id) {
      fetchResume(params.id as string);
    }
  }, [params.id]);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges && resumeData) {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
      autoSaveTimeout.current = setTimeout(() => {
        handleSave(true);
      }, 5000); // Auto-save every 5 seconds
    }
    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [resumeData, hasUnsavedChanges]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resumeData]);

  const fetchResume = async (id: string) => {
    try {
      const response = await fetch(`/api/resumes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }
      const data = await response.json();
      setResume(data);
      setResumeData(data.content);

      // Initialize sections based on existing data
      if (data.sections) {
        const updatedSections = DEFAULT_SECTIONS.map(section => ({
          ...section,
          enabled: data.sections.includes(section.id) || section.required
        }));
        setSections(updatedSections);
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: 'Failed to load resume',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = useCallback(async (isAutoSave = false) => {
    if (!resume || !resumeData || saving) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/resumes/${resume.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: resume.title,
          content: resumeData,
          template_id: resume.template_id,
          font_size: resume.font_size,
          sections: sections.filter(s => s.enabled).map(s => s.id),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save resume');
      }

      const data = await response.json();
      setResume(data.resume);
      setHasUnsavedChanges(false);

      if (!isAutoSave) {
        toast({
          title: 'Success',
          description: 'Resume saved successfully',
        });
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: 'Failed to save resume',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  }, [resume, resumeData, sections, saving, toast]);

  const handleDataChange = useCallback((newData: ResumeData) => {
    setResumeData(newData);
    setHasUnsavedChanges(true);
  }, []);

  const handleTitleChange = useCallback((newTitle: string) => {
    if (resume) {
      setResume({ ...resume, title: newTitle });
      setHasUnsavedChanges(true);
    }
  }, [resume]);

  const handleTemplateChange = useCallback((templateId: string) => {
    if (resume) {
      setResume({ ...resume, template_id: templateId });
      setHasUnsavedChanges(true);
    }
  }, [resume]);

  const handleFontSizeChange = useCallback((fontSize: number) => {
    if (resume) {
      setResume({ ...resume, font_size: fontSize });
      setHasUnsavedChanges(true);
    }
  }, [resume]);

  const handleSectionsChange = useCallback((newSections: SectionConfig[]) => {
    setSections(newSections);
    setHasUnsavedChanges(true);
  }, []);

  const handleExportPDF = async () => {
    if (exporting) return; // Prevent double clicks

    try {
      setExporting(true);

      toast({
        title: 'Generating PDF...',
        description: 'Please wait, creating your resume...',
      });

      // Dynamic import for client-side only
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;

      // Find the preview element
      const previewElement = document.querySelector('[data-resume-preview]') as HTMLElement;
      if (!previewElement) {
        throw new Error('Preview element not found');
      }

      // Function to copy computed styles to inline styles
      const copyStylesToInline = (element: HTMLElement) => {
        const computedStyle = window.getComputedStyle(element);
        const cssText = Array.from(computedStyle).reduce((css, propertyName) => {
          // Skip oklch colors and problematic properties
          const value = computedStyle.getPropertyValue(propertyName);
          if (value && !value.includes('oklch')) {
            return `${css}${propertyName}:${value};`;
          }
          return css;
        }, '');

        element.setAttribute('style', element.getAttribute('style') + cssText);

        // Recursively apply to children
        Array.from(element.children).forEach(child => {
          copyStylesToInline(child as HTMLElement);
        });
      };

      // Create isolated iframe
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.width = '816px';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error('Failed to create iframe document');
      }

      // Clone the preview element deeply
      const clonedElement = previewElement.cloneNode(true) as HTMLElement;

      // Copy all computed styles to inline styles
      copyStylesToInline(clonedElement);

      // Write to iframe with minimal CSS
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { background: white; margin: 0; padding: 0; }
            </style>
          </head>
          <body>
            ${clonedElement.outerHTML}
          </body>
        </html>
      `);
      iframeDoc.close();

      // Wait for iframe to load
      await new Promise(resolve => setTimeout(resolve, 300));

      const iframeContent = iframeDoc.querySelector('[data-resume-preview]') as HTMLElement;
      if (!iframeContent) {
        throw new Error('Failed to copy content to iframe');
      }

      // Generate canvas from iframe content
      const canvas = await html2canvas(iframeContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 816,
      });

      // Remove iframe
      document.body.removeChild(iframe);

      // Create PDF with proper A4 dimensions
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit A4
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add pages if content is longer than one page
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Save PDF
      const fileName = `${resumeData?.personalInfo?.name || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

      toast({
        title: 'Success!',
        description: 'PDF downloaded successfully!',
      });

      setExporting(false);
    } catch (err: any) {
      console.error('PDF Export Error:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to export PDF. Please try again.',
        variant: 'destructive'
      });
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading resume editor...</p>
        </div>
      </div>
    );
  }

  if (error || !resume || !resumeData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-2">Error Loading Resume</h2>
          <p className="text-red-700">{error || 'Resume not found'}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-block mt-4 text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <ResumeEditorShell
      resumeData={resumeData}
      template={resume.template_id}
      fontSize={resume.font_size || 11}
      sections={sections}
      title={resume.title}
      saving={saving}
      exporting={exporting}
      hasUnsavedChanges={hasUnsavedChanges}
      atsScore={resume.ats_score}
      keywordsMatched={resume.keywords_matched}
      keywordsTotal={resume.keywords_total}
      onDataChange={handleDataChange}
      onTitleChange={handleTitleChange}
      onTemplateChange={handleTemplateChange}
      onFontSizeChange={handleFontSizeChange}
      onSectionsChange={handleSectionsChange}
      onSave={() => handleSave(false)}
      onExport={handleExportPDF}
    />
  );
}