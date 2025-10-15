'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  Download,
  Palette,
  Type,
  Check,
  Loader2,
  ChevronDown
} from 'lucide-react';
import { AVAILABLE_TEMPLATES } from '@/lib/types/resume';

interface TopBarProps {
  title: string;
  template: string;
  fontSize: number;
  saving: boolean;
  exporting?: boolean;
  hasUnsavedChanges: boolean;
  atsScore?: number | null;
  keywordsMatched?: number | null;
  keywordsTotal?: number | null;
  onTitleChange: (title: string) => void;
  onTemplateChange: (templateId: string) => void;
  onFontSizeChange: (fontSize: number) => void;
  onSave: () => void;
  onExportPDF: () => void;
  onBack: () => void;
}

export function TopBar({
  title,
  template,
  fontSize,
  saving,
  exporting = false,
  hasUnsavedChanges,
  atsScore,
  keywordsMatched,
  keywordsTotal,
  onTitleChange,
  onTemplateChange,
  onFontSizeChange,
  onSave,
  onExportPDF,
  onBack,
}: TopBarProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTitleSubmit = () => {
    if (editableTitle.trim()) {
      onTitleChange(editableTitle.trim());
    } else {
      setEditableTitle(title);
    }
    setIsEditingTitle(false);
  };

  const currentTemplate = AVAILABLE_TEMPLATES.find(t => t.id === template);

  // Get ATS score color
  const getATSScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
    if (score >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
    return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>

        {/* Title Editor */}
        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              value={editableTitle}
              onChange={(e) => setEditableTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleTitleSubmit();
                } else if (e.key === 'Escape') {
                  setEditableTitle(title);
                  setIsEditingTitle(false);
                }
              }}
              className="px-3 py-1.5 text-lg font-semibold border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ width: `${Math.max(150, editableTitle.length * 10)}px` }}
            />
          ) : (
            <h1
              onClick={() => setIsEditingTitle(true)}
              className="text-lg font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              {title}
            </h1>
          )}
        </div>

        {/* Save Status */}
        {hasUnsavedChanges && (
          <span className="text-sm text-orange-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
            Unsaved changes
          </span>
        )}
        {saving && (
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Saving...
          </span>
        )}
        {!hasUnsavedChanges && !saving && (
          <span className="text-sm text-green-600 flex items-center gap-1">
            <Check className="h-4 w-4" />
            Saved
          </span>
        )}
      </div>

      {/* Center Section - ATS Score */}
      {atsScore !== null && atsScore !== undefined && (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getATSScoreColor(atsScore).bg} ${getATSScoreColor(atsScore).border}`}>
            <div className="text-center">
              <div className={`text-xl font-bold ${getATSScoreColor(atsScore).text}`}>
                {atsScore}
              </div>
              <div className="text-[10px] text-gray-600 font-medium leading-tight">
                ATS
              </div>
            </div>
            {keywordsMatched !== null && keywordsTotal !== null && (
              <div className="ml-1 pl-2 border-l border-gray-300">
                <div className={`text-sm font-semibold ${getATSScoreColor(atsScore).text}`}>
                  {keywordsMatched}/{keywordsTotal}
                </div>
                <div className="text-[10px] text-gray-600 leading-tight">
                  Keywords
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Template Selector */}
        <div className="relative">
          <button
            onClick={() => setShowTemplateMenu(!showTemplateMenu)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Template</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showTemplateMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowTemplateMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-2">
                  {AVAILABLE_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => {
                        onTemplateChange(tmpl.id);
                        setShowTemplateMenu(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        template === tmpl.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">
                        {tmpl.name}
                        {tmpl.recommended && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {tmpl.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Font Size Selector */}
        <div className="relative">
          <button
            onClick={() => setShowFontMenu(!showFontMenu)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Type className="h-4 w-4" />
            <span className="hidden sm:inline">{fontSize}pt</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {showFontMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowFontMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-2">
                  {[8, 9, 10, 11, 12, 14, 16].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        onFontSizeChange(size);
                        setShowFontMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        fontSize === size
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {size}pt
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={!hasUnsavedChanges || saving}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            hasUnsavedChanges && !saving
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">Save</span>
        </button>

        {/* Export PDF Button */}
        <button
          onClick={onExportPDF}
          disabled={exporting}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            exporting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {exporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Downloading...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}