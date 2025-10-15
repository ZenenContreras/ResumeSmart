'use client';

import { Publication } from '@/lib/types/resume';
import { Plus, Trash2, BookOpen, Link } from 'lucide-react';

interface PublicationsEditorProps {
  publications: Publication[];
  onChange: (publications: Publication[]) => void;
}

export function PublicationsEditor({ publications, onChange }: PublicationsEditorProps) {
  const addPublication = () => {
    const newPub: Publication = {
      id: Date.now().toString(),
      title: '',
      publisher: '',
      date: '',
    };
    onChange([...publications, newPub]);
  };

  const updatePublication = (index: number, updates: Partial<Publication>) => {
    const newPubs = [...publications];
    newPubs[index] = { ...newPubs[index], ...updates };
    onChange(newPubs);
  };

  const deletePublication = (index: number) => {
    onChange(publications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-gray-500" />
          Publications
        </h2>
        <button
          onClick={addPublication}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Publication
        </button>
      </div>

      {publications.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No publications added yet</p>
          <button
            onClick={addPublication}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first publication
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {publications.map((pub, index) => (
            <div key={pub.id || index} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={pub.title}
                    onChange={(e) => updatePublication(index, { title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Machine Learning in Healthcare"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher/Journal *
                  </label>
                  <input
                    type="text"
                    value={pub.publisher}
                    onChange={(e) => updatePublication(index, { publisher: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="IEEE Journal"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publication Date *
                  </label>
                  <input
                    type="text"
                    value={pub.date}
                    onChange={(e) => updatePublication(index, { date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="March 2023"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    DOI
                  </label>
                  <input
                    type="text"
                    value={pub.doi || ''}
                    onChange={(e) => updatePublication(index, { doi: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10.1234/example.doi"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Link className="inline h-3 w-3 mr-1" />
                  URL
                </label>
                <input
                  type="url"
                  value={pub.url || ''}
                  onChange={(e) => updatePublication(index, { url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://journal.com/article"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Co-Authors
                </label>
                <input
                  type="text"
                  value={pub.authors?.join(', ') || ''}
                  onChange={(e) => updatePublication(index, {
                    authors: e.target.value.split(',').map(a => a.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe, Jane Smith..."
                />
                <p className="text-xs text-gray-500 mt-1">Separate authors with commas</p>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Abstract/Description
                </label>
                <textarea
                  value={pub.description || ''}
                  onChange={(e) => updatePublication(index, { description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Brief description of the publication..."
                  rows={2}
                />
              </div>

              <button
                onClick={() => deletePublication(index)}
                className="mt-4 flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Remove Publication
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}