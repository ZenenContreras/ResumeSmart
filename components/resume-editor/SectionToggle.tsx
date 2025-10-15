'use client';

import { SectionConfig } from '@/lib/types/resume';
import { Eye, EyeOff } from 'lucide-react';

interface SectionToggleProps {
  sections: SectionConfig[];
  onChange: (sections: SectionConfig[]) => void;
}

export function SectionToggle({ sections, onChange }: SectionToggleProps) {
  const handleToggle = (sectionId: string) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? { ...section, enabled: !section.enabled }
        : section
    );
    onChange(updatedSections);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900 mb-3">
        Resume Sections
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => !section.required && handleToggle(section.id)}
            disabled={section.required}
            className={`
              flex items-center justify-between px-3 py-2 rounded-lg text-sm
              transition-colors border
              ${
                section.enabled
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-500'
              }
              ${
                section.required
                  ? 'cursor-not-allowed opacity-75'
                  : 'hover:bg-opacity-80'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <span>{section.label}</span>
              {section.required && (
                <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                  Required
                </span>
              )}
            </span>
            {section.enabled ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Toggle sections to show or hide them in your resume. Required sections
        cannot be disabled.
      </p>
    </div>
  );
}