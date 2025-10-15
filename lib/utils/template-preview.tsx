/**
 * Template Preview Components
 * Generates visual previews for templates in the selection page
 */

import { TemplateId } from '@/lib/types/resume';

interface TemplatePreviewProps {
  templateId: TemplateId;
  color: string;
}

export function TemplatePreviewCard({ templateId, color }: TemplatePreviewProps) {
  // Harvard ATS - Simple, clean, black & white
  if (templateId === 'harvard-ats') {
    return (
      <div className="w-full h-full bg-white border border-gray-300 p-3">
        <div className="text-center mb-2">
          <div className="h-3 bg-gray-800 w-2/3 mx-auto mb-1"></div>
          <div className="h-2 bg-gray-500 w-1/2 mx-auto"></div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-300 w-full"></div>
          <div className="h-2 bg-gray-300 w-5/6"></div>
          <div className="h-1 bg-gray-200 w-full mt-2"></div>
          <div className="space-y-1 mt-2">
            <div className="h-1.5 bg-gray-400 w-full"></div>
            <div className="h-1.5 bg-gray-400 w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  // Blue Corporate - Two-column with sidebar
  if (templateId === 'blue-corporate') {
    return (
      <div className="w-full h-full flex">
        <div className="w-2/5 p-2" style={{ backgroundColor: color }}>
          <div className="h-2 bg-white w-full mb-1"></div>
          <div className="h-1 bg-blue-300 w-3/4 mb-2"></div>
          <div className="h-1 bg-blue-300 w-full mb-0.5"></div>
          <div className="h-1 bg-blue-300 w-5/6"></div>
        </div>
        <div className="w-3/5 bg-white p-2">
          <div className="h-1.5 w-1/3 mb-1" style={{ backgroundColor: color }}></div>
          <div className="h-1 bg-gray-300 w-full mb-0.5"></div>
          <div className="h-1 bg-gray-300 w-4/5"></div>
        </div>
      </div>
    );
  }

  // Modern & Purple Executive - Single column with colored accents
  return (
    <div className="w-full h-full bg-white p-3">
      <div className="border-b-2 pb-2 mb-2" style={{ borderColor: color }}>
        <div className="h-3 bg-gray-800 w-2/3 mb-1"></div>
        <div className="h-2 bg-gray-500 w-1/2"></div>
      </div>
      <div className="space-y-2">
        <div className="h-2 w-1/3 mb-1" style={{ backgroundColor: color }}></div>
        <div className="h-1.5 bg-gray-300 w-full"></div>
        <div className="h-1.5 bg-gray-300 w-5/6"></div>
      </div>
    </div>
  );
}
