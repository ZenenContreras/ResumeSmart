'use client';

import { VolunteerWork } from '@/lib/types/resume';
import { Plus, Trash2, Heart } from 'lucide-react';

interface VolunteerEditorProps {
  volunteer: VolunteerWork[];
  onChange: (volunteer: VolunteerWork[]) => void;
}

export function VolunteerEditor({ volunteer, onChange }: VolunteerEditorProps) {
  const addVolunteer = () => {
    const newVol: VolunteerWork = {
      id: Date.now().toString(),
      organization: '',
      role: '',
      startDate: '',
      highlights: [''],
    };
    onChange([...volunteer, newVol]);
  };

  const updateVolunteer = (index: number, updates: Partial<VolunteerWork>) => {
    const newVol = [...volunteer];
    newVol[index] = { ...newVol[index], ...updates };
    onChange(newVol);
  };

  const deleteVolunteer = (index: number) => {
    onChange(volunteer.filter((_, i) => i !== index));
  };

  const updateHighlight = (volIndex: number, highlightIndex: number, value: string) => {
    const vol = volunteer[volIndex];
    const newHighlights = [...vol.highlights];
    newHighlights[highlightIndex] = value;
    updateVolunteer(volIndex, { highlights: newHighlights });
  };

  const addHighlight = (volIndex: number) => {
    const vol = volunteer[volIndex];
    updateVolunteer(volIndex, { highlights: [...vol.highlights, ''] });
  };

  const removeHighlight = (volIndex: number, highlightIndex: number) => {
    const vol = volunteer[volIndex];
    updateVolunteer(volIndex, {
      highlights: vol.highlights.filter((_, i) => i !== highlightIndex)
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Heart className="h-5 w-5 text-gray-500" />
          Volunteer Work
        </h2>
        <button
          onClick={addVolunteer}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Volunteer Work
        </button>
      </div>

      {volunteer.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No volunteer work added yet</p>
          <button
            onClick={addVolunteer}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add volunteer experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {volunteer.map((vol, index) => (
            <div key={vol.id || index} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization *
                  </label>
                  <input
                    type="text"
                    value={vol.organization}
                    onChange={(e) => updateVolunteer(index, { organization: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Red Cross"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <input
                    type="text"
                    value={vol.role}
                    onChange={(e) => updateVolunteer(index, { role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Volunteer Coordinator"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={vol.location || ''}
                    onChange={(e) => updateVolunteer(index, { location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="New York, NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="text"
                    value={vol.startDate}
                    onChange={(e) => updateVolunteer(index, { startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jan 2020"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={vol.current ? 'Present' : vol.endDate || ''}
                      onChange={(e) => updateVolunteer(index, { endDate: e.target.value })}
                      disabled={vol.current}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Dec 2023"
                    />
                    <label className="flex items-center gap-1 text-sm whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={vol.current || false}
                        onChange={(e) => {
                          updateVolunteer(index, { current: e.target.checked });
                          if (e.target.checked) {
                            updateVolunteer(index, { endDate: '' });
                          }
                        }}
                        className="rounded"
                      />
                      Current
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={vol.description || ''}
                  onChange={(e) => updateVolunteer(index, { description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe your volunteer work and impact..."
                  rows={2}
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Key Contributions
                  </label>
                  <button
                    onClick={() => addHighlight(index)}
                    className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {vol.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-start gap-2">
                      <span className="text-sm text-gray-500 mt-2">•</span>
                      <input
                        value={highlight}
                        onChange={(e) => updateHighlight(index, hIndex, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe a key contribution or achievement..."
                      />
                      <button
                        onClick={() => removeHighlight(index, hIndex)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => deleteVolunteer(index)}
                className="mt-4 flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Remove Volunteer Work
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}