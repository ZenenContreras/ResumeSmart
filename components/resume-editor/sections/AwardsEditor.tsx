'use client';

import { Award } from '@/lib/types/resume';
import { Plus, Trash2, Trophy } from 'lucide-react';

interface AwardsEditorProps {
  awards: Award[];
  onChange: (awards: Award[]) => void;
}

export function AwardsEditor({ awards, onChange }: AwardsEditorProps) {
  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      date: '',
    };
    onChange([...awards, newAward]);
  };

  const updateAward = (index: number, updates: Partial<Award>) => {
    const newAwards = [...awards];
    newAwards[index] = { ...newAwards[index], ...updates };
    onChange(newAwards);
  };

  const deleteAward = (index: number) => {
    onChange(awards.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-gray-500" />
          Awards & Honors
        </h2>
        <button
          onClick={addAward}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Award
        </button>
      </div>

      {awards.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No awards added yet</p>
          <button
            onClick={addAward}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first award
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {awards.map((award, index) => (
            <div key={award.id || index} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Award Title *
                  </label>
                  <input
                    type="text"
                    value={award.title}
                    onChange={(e) => updateAward(index, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Employee of the Year"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={award.issuer}
                    onChange={(e) => updateAward(index, { issuer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tech Corp"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Received *
                </label>
                <input
                  type="text"
                  value={award.date}
                  onChange={(e) => updateAward(index, { date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="December 2023"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={award.description || ''}
                  onChange={(e) => updateAward(index, { description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Brief description of the award and why it was received..."
                  rows={2}
                />
              </div>

              <button
                onClick={() => deleteAward(index)}
                className="mt-4 flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Remove Award
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Tips</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Include awards that demonstrate excellence in your field</li>
          <li>• List academic honors like Dean's List or Cum Laude</li>
          <li>• Add professional recognitions and achievements</li>
          <li>• Include relevant scholarships or grants</li>
          <li>• Order by relevance or prestige, not just date</li>
        </ul>
      </div>
    </div>
  );
}