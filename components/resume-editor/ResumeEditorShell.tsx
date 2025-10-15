'use client';

import { useState, useEffect } from 'react';
import { Resume, ResumeData, SectionConfig } from '@/lib/types/resume';
import { TopBar } from './TopBar';
import { EditorPanel } from './EditorPanel';
import { PreviewPanel } from './PreviewPanel';
import { Toast } from './Toast';

interface ResumeEditorShellProps {
  resumeData: ResumeData;
  template: string;
  fontSize: number;
  sections: SectionConfig[];
  title: string;
  saving?: boolean;
  exporting?: boolean;
  hasUnsavedChanges?: boolean;
  atsScore?: number | null;
  keywordsMatched?: number | null;
  keywordsTotal?: number | null;
  onDataChange: (data: ResumeData) => void;
  onTitleChange: (title: string) => void;
  onTemplateChange: (templateId: string) => void;
  onFontSizeChange: (fontSize: number) => void;
  onSectionsChange: (sections: SectionConfig[]) => void;
  onSave: () => void;
  onExport: () => void;
}

export function ResumeEditorShell({
  resumeData,
  template,
  fontSize,
  sections,
  title,
  saving = false,
  exporting = false,
  hasUnsavedChanges = false,
  atsScore,
  keywordsMatched,
  keywordsTotal,
  onDataChange,
  onTitleChange,
  onTemplateChange,
  onFontSizeChange,
  onSectionsChange,
  onSave,
  onExport,
}: ResumeEditorShellProps) {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [previewZoom, setPreviewZoom] = useState(70); // Start at 70% to fit better without scroll
  const [isMobileView, setIsMobileView] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Navigation Bar */}
      <TopBar
        title={title}
        template={template}
        fontSize={fontSize}
        saving={saving}
        exporting={exporting}
        hasUnsavedChanges={hasUnsavedChanges}
        atsScore={atsScore}
        keywordsMatched={keywordsMatched}
        keywordsTotal={keywordsTotal}
        onTitleChange={onTitleChange}
        onTemplateChange={onTemplateChange}
        onFontSizeChange={onFontSizeChange}
        onSave={onSave}
        onExportPDF={onExport}
        onBack={() => window.history.back()}
      />

      {/* Main Content Area - Fixed to prevent horizontal scroll */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex w-full h-full">
          {/* Editor Panel - Fixed width, no overflow */}
          <div className="w-1/2 border-r border-gray-200 bg-white flex-shrink-0 flex flex-col overflow-hidden">
            <EditorPanel
              resumeData={resumeData}
              sections={sections}
              activeSection={activeSection}
              onDataChange={onDataChange}
              onSectionChange={setActiveSection}
              onSectionsChange={onSectionsChange}
            />
          </div>

          {/* Preview Panel - Fixed width, no overflow */}
          <div className="w-1/2 bg-gray-100 flex-shrink-0 overflow-hidden">
            <PreviewPanel
              resumeData={resumeData}
              template={template}
              fontSize={fontSize}
              sections={sections}
              zoom={previewZoom}
              onZoomChange={setPreviewZoom}
            />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
}