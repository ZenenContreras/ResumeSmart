'use client';

import { ResumeData, SectionConfig } from '@/lib/types/resume';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useMemo } from 'react';
import { HarvardATSPreview } from './templates/HarvardATSPreview';
import { PurpleExecutivePreview } from './templates/PurpleExecutivePreview';
import { BlueCorporatePreview } from './templates/BlueCorporatePreview';
import { ModernPreview } from './templates/ModernPreview';

interface PreviewPanelProps {
  resumeData: ResumeData;
  template: string;
  fontSize: number;
  sections: SectionConfig[];
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export function PreviewPanel({
  resumeData,
  template,
  fontSize,
  sections,
  zoom,
  onZoomChange,
}: PreviewPanelProps) {
  const handleZoomIn = () => {
    if (zoom < 200) {
      onZoomChange(Math.min(200, zoom + 25));
    }
  };

  const handleZoomOut = () => {
    if (zoom > 25) {
      onZoomChange(Math.max(25, zoom - 25));
    }
  };

  const handleResetZoom = () => {
    onZoomChange(70);
  };

  // Filter resume data based on enabled sections
  const enabledSectionIds = sections.filter(s => s.enabled).map(s => s.id);

  const filteredResumeData = useMemo(() => {
    const filtered: any = { ...resumeData };

    // Only include sections that are enabled
    if (!enabledSectionIds.includes('personalInfo')) filtered.personalInfo = undefined;
    if (!enabledSectionIds.includes('summary')) filtered.summary = undefined;
    if (!enabledSectionIds.includes('experience')) filtered.experience = [];
    if (!enabledSectionIds.includes('education')) filtered.education = [];
    if (!enabledSectionIds.includes('skills')) filtered.skills = {};
    if (!enabledSectionIds.includes('certifications')) filtered.certifications = [];
    if (!enabledSectionIds.includes('languages')) filtered.languages = [];
    if (!enabledSectionIds.includes('projects')) filtered.projects = [];
    if (!enabledSectionIds.includes('publications')) filtered.publications = [];
    if (!enabledSectionIds.includes('volunteer')) filtered.volunteer = [];
    if (!enabledSectionIds.includes('awards')) filtered.awards = [];

    return filtered as ResumeData;
  }, [resumeData, enabledSectionIds]);

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Preview Controls */}
      <div className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-gray-700">Live Preview</div>
          <div className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
            {template === 'harvard-ats' ? 'Harvard ATS' : template === 'purple-executive' ? 'Purple Executive' : template === 'blue-corporate' ? 'Blue Corporate' : 'Modern'}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 25}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Zoom out"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>

          <button
            onClick={handleResetZoom}
            className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Reset zoom"
          >
            {zoom}%
          </button>

          <button
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Zoom in"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <div className="ml-2 h-6 w-px bg-gray-200" />

          <button
            onClick={handleResetZoom}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fit to screen"
            title="Fit to screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview Area with real A4 pages */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4 flex justify-center">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            width: 'fit-content',
            height: 'fit-content'
          }}
        >
          {/* Render appropriate template based on selection */}
          {template === 'harvard-ats' && <HarvardATSPreview data={filteredResumeData} />}
          {template === 'purple-executive' && <PurpleExecutivePreview data={filteredResumeData} />}
          {template === 'blue-corporate' && <BlueCorporatePreview data={filteredResumeData} />}
          {template === 'modern' && <ModernPreview data={filteredResumeData} />}
        </div>
      </div>
    </div>
  );
}
