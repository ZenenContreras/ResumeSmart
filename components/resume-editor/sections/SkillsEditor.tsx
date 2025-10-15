'use client';

import { useState } from 'react';
import { Skills } from '@/lib/types/resume';
import { Plus, Trash2, X, Tag } from 'lucide-react';

interface SkillsEditorProps {
  skills: Skills;
  onChange: (skills: Skills) => void;
}

export function SkillsEditor({ skills, onChange }: SkillsEditorProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSkill, setNewSkill] = useState<{ [key: string]: string }>({});
  const [showAddCategory, setShowAddCategory] = useState(false);

  const defaultCategories = ['Technical', 'Tools', 'Soft Skills', 'Languages', 'Frameworks'];

  const addCategory = () => {
    if (newCategoryName.trim() && !skills[newCategoryName]) {
      onChange({
        ...skills,
        [newCategoryName]: [],
      });
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  const removeCategory = (category: string) => {
    const newSkills = { ...skills };
    delete newSkills[category];
    onChange(newSkills);
  };

  const addSkill = (category: string) => {
    const skillToAdd = newSkill[category]?.trim();
    if (skillToAdd && !skills[category]?.includes(skillToAdd)) {
      onChange({
        ...skills,
        [category]: [...(skills[category] || []), skillToAdd],
      });
      setNewSkill({ ...newSkill, [category]: '' });
    }
  };

  const removeSkill = (category: string, skillIndex: number) => {
    onChange({
      ...skills,
      [category]: skills[category].filter((_, index) => index !== skillIndex),
    });
  };

  const handleSkillInputKeyDown = (e: React.KeyboardEvent, category: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  // Initialize with default categories if empty
  const categoriesWithDefaults = Object.keys(skills).length === 0
    ? defaultCategories.reduce((acc, cat) => ({ ...acc, [cat.toLowerCase()]: [] }), {})
    : skills;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
        <button
          onClick={() => setShowAddCategory(!showAddCategory)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showAddCategory && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Category name (e.g., Databases, Marketing, etc.)"
              autoFocus
            />
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddCategory(false);
                setNewCategoryName('');
              }}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Skills Categories */}
      <div className="space-y-4">
        {Object.entries(categoriesWithDefaults).map(([category, categorySkills]) => {
          const skillsList = Array.isArray(categorySkills) ? categorySkills : [];
          return (
          <div key={category} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 capitalize flex items-center gap-2">
                <Tag className="h-4 w-4 text-gray-500" />
                {category}
              </h3>
              {!['technical', 'tools', 'soft skills'].includes(category.toLowerCase()) && (
                <button
                  onClick={() => removeCategory(category)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(category, index)}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              {skillsList.length === 0 && (
                <span className="text-sm text-gray-500 italic">No skills added yet</span>
              )}
            </div>

            {/* Add Skill Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newSkill[category] || ''}
                onChange={(e) => setNewSkill({ ...newSkill, [category]: e.target.value })}
                onKeyDown={(e) => handleSkillInputKeyDown(e, category)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder={`Add a ${category.toLowerCase()} skill...`}
              />
              <button
                onClick={() => addSkill(category)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Add
              </button>
            </div>
          </div>
        );
        })}
      </div>

      {/* Suggested Skills */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Skill Suggestions</h3>
        <div className="space-y-2">
          <div>
            <span className="text-xs font-medium text-blue-800">Technical:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git'].map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (!skills.technical?.includes(skill)) {
                      onChange({
                        ...skills,
                        technical: [...(skills.technical || []), skill],
                      });
                    }
                  }}
                  className="px-2 py-1 text-xs bg-white text-blue-600 rounded hover:bg-blue-100 transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-medium text-blue-800">Soft Skills:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {['Leadership', 'Communication', 'Problem Solving', 'Team Work', 'Time Management'].map((skill) => (
                <button
                  key={skill}
                  onClick={() => {
                    if (!skills['soft skills']?.includes(skill)) {
                      onChange({
                        ...skills,
                        'soft skills': [...(skills['soft skills'] || []), skill],
                      });
                    }
                  }}
                  className="px-2 py-1 text-xs bg-white text-blue-600 rounded hover:bg-blue-100 transition-colors"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Tips</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Include skills mentioned in the job description</li>
          <li>• Order skills by relevance and proficiency</li>
          <li>• Mix technical and soft skills</li>
          <li>• Be honest about your skill level</li>
          <li>• Keep skills current and relevant</li>
        </ul>
      </div>
    </div>
  );
}