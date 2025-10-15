'use client';

import { Language, LanguageProficiency } from '@/lib/types/resume';
import { Plus, Trash2, Globe } from 'lucide-react';

interface LanguagesEditorProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

const PROFICIENCY_LEVELS: LanguageProficiency[] = [
  'Native',
  'Fluent',
  'Professional Working Proficiency',
  'Limited Working Proficiency',
  'Elementary Proficiency',
];

export function LanguagesEditor({ languages, onChange }: LanguagesEditorProps) {
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      language: '',
      proficiency: 'Professional Working Proficiency',
    };
    onChange([...languages, newLanguage]);
  };

  const updateLanguage = (index: number, updates: Partial<Language>) => {
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], ...updates };
    onChange(newLanguages);
  };

  const deleteLanguage = (index: number) => {
    onChange(languages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="h-5 w-5 text-gray-500" />
          Languages
        </h2>
        <button
          onClick={addLanguage}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Language
        </button>
      </div>

      {languages.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No languages added yet</p>
          <button
            onClick={addLanguage}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your languages
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {languages.map((lang, index) => (
            <div key={lang.id || index} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language *
                  </label>
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => updateLanguage(index, { language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="English, Spanish, Mandarin..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proficiency Level *
                  </label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(index, { proficiency: e.target.value as LanguageProficiency })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {PROFICIENCY_LEVELS.map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certifications (Optional)
                </label>
                <input
                  type="text"
                  value={lang.certifications?.join(', ') || ''}
                  onChange={(e) => updateLanguage(index, {
                    certifications: e.target.value.split(',').map(c => c.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="TOEFL 110, DELE C2, HSK Level 5..."
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple certifications with commas</p>
              </div>

              <button
                onClick={() => deleteLanguage(index)}
                className="mt-3 flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Proficiency Guide</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li><strong>Native:</strong> Mother tongue or equivalent</li>
          <li><strong>Fluent:</strong> Near-native ability, can work professionally</li>
          <li><strong>Professional Working:</strong> Can conduct business effectively</li>
          <li><strong>Limited Working:</strong> Can handle routine work situations</li>
          <li><strong>Elementary:</strong> Basic conversational ability</li>
        </ul>
      </div>
    </div>
  );
}