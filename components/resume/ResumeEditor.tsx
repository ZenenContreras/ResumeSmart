'use client';

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  graduationDate: string;
  gpa?: string;
}

interface Section {
  id: string;
  type: 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'custom';
  title: string;
  visible: boolean;
  order: number;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Record<string, string[]>;
  certifications: Array<{ id: string; name: string; issuer: string; date?: string }>;
  sections: Section[];
  fontSize: number;
  template: string;
}

interface ResumeEditorProps {
  initialData: ResumeData;
  onSave: (data: ResumeData) => void;
  onCalculateATS: () => void;
}

// Sortable Section Component
function SortableSection({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div {...listeners} className="cursor-move p-2 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function ResumeEditor({ initialData, onSave, onCalculateATS }: ResumeEditorProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [activeTab, setActiveTab] = useState<'edit' | 'sections' | 'format'>('edit');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setResumeData((prev) => {
        const oldIndex = prev.sections.findIndex((s) => s.id === active.id);
        const newIndex = prev.sections.findIndex((s) => s.id === over.id);
        const newSections = arrayMove(prev.sections, oldIndex, newIndex);
        return { ...prev, sections: newSections };
      });
    }
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateSummary = (value: string) => {
    setResumeData((prev) => ({ ...prev, summary: value }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      responsibilities: [''],
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addResponsibility = (expId: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, responsibilities: [...exp.responsibilities, ''] }
          : exp
      ),
    }));
  };

  const updateResponsibility = (expId: string, index: number, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.map((r, i) =>
                i === index ? value : r
              ),
            }
          : exp
      ),
    }));
  };

  const removeResponsibility = (expId: string, index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              responsibilities: exp.responsibilities.filter((_, i) => i !== index),
            }
          : exp
      ),
    }));
  };

  const toggleSection = (sectionId: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      ),
    }));
  };

  const changeFontSize = (delta: number) => {
    setResumeData((prev) => ({
      ...prev,
      fontSize: Math.max(8, Math.min(16, prev.fontSize + delta)),
    }));
  };

  const handleSave = () => {
    onSave(resumeData);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Editor Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Resume</h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'sections'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setActiveTab('format')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'format'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Format
            </button>
          </div>

          {/* Content Tab */}
          {activeTab === 'edit' && (
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Professional Summary</h3>
                <textarea
                  placeholder="Write a compelling summary..."
                  value={resumeData.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Experience</h3>
                  <button
                    onClick={addExperience}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-4">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Position</span>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="text"
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          />
                        </div>

                        {/* Responsibilities */}
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-gray-600">Responsibilities</span>
                            <button
                              onClick={() => addResponsibility(exp.id)}
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              + Add bullet
                            </button>
                          </div>
                          {exp.responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                              <textarea
                                placeholder="Achievement or responsibility..."
                                value={resp}
                                onChange={(e) => updateResponsibility(exp.id, idx, e.target.value)}
                                rows={2}
                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                              <button
                                onClick={() => removeResponsibility(exp.id, idx)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sections Tab */}
          {activeTab === 'sections' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-900">
                  Drag sections to reorder them. Toggle visibility to show/hide sections.
                </p>
              </div>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={resumeData.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                  {resumeData.sections.map((section) => (
                    <SortableSection key={section.id} id={section.id}>
                      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">{section.title}</span>
                        </div>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            section.visible
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {section.visible ? 'Visible' : 'Hidden'}
                        </button>
                      </div>
                    </SortableSection>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* Format Tab */}
          {activeTab === 'format' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Font Size</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => changeFontSize(-1)}
                    className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-lg font-medium">{resumeData.fontSize}pt</span>
                  <button
                    onClick={() => changeFontSize(1)}
                    className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Template</h3>
                <select
                  value={resumeData.template}
                  onChange={(e) => setResumeData((prev) => ({ ...prev, template: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="harvard-ats">Harvard ATS Expert</option>
                  <option value="purple-executive">Purple Executive</option>
                  <option value="blue-corporate">Blue Corporate</option>
                </select>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleSave}
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={onCalculateATS}
              className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Calculate ATS Score
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-12" style={{ fontSize: `${resumeData.fontSize}pt` }}>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
            <div className="text-sm text-gray-600">
              {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
              {resumeData.personalInfo.phone && <span> • {resumeData.personalInfo.phone}</span>}
              {resumeData.personalInfo.location && <span> • {resumeData.personalInfo.location}</span>}
            </div>
          </div>

          {resumeData.sections
            .filter((s) => s.visible)
            .sort((a, b) => a.order - b.order)
            .map((section) => {
              if (section.type === 'summary' && resumeData.summary) {
                return (
                  <div key={section.id} className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-700">{resumeData.summary}</p>
                  </div>
                );
              }

              if (section.type === 'experience' && resumeData.experience.length > 0) {
                return (
                  <div key={section.id} className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-300 pb-2">
                      {section.title}
                    </h2>
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900">{exp.title}</h3>
                            <p className="text-gray-700">{exp.company}</p>
                          </div>
                          <span className="text-sm text-gray-600">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {exp.responsibilities
                            .filter((r) => r.trim())
                            .map((resp, idx) => (
                              <li key={idx} className="text-gray-700">
                                {resp}
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              }

              return null;
            })}
        </div>
      </div>
    </div>
  );
}
