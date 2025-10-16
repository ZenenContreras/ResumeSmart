'use client';

import { useState } from 'react';
import { WorkExperience } from '@/lib/types/resume';
import { Plus, Trash2, GripVertical, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ExperienceEditorProps {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
}

function SortableExperienceItem({
  experience,
  index,
  onUpdate,
  onDelete,
}: {
  experience: WorkExperience;
  index: number;
  onUpdate: (index: number, exp: WorkExperience) => void;
  onDelete: (index: number) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: experience.id || index.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleFieldChange = (field: keyof WorkExperience, value: any) => {
    onUpdate(index, { ...experience, [field]: value });
  };

  const handleResponsibilityChange = (respIndex: number, value: string) => {
    const newResponsibilities = [...experience.responsibilities];
    newResponsibilities[respIndex] = value;
    handleFieldChange('responsibilities', newResponsibilities);
  };

  const addResponsibility = () => {
    handleFieldChange('responsibilities', [...experience.responsibilities, '']);
  };

  const removeResponsibility = (respIndex: number) => {
    const newResponsibilities = experience.responsibilities.filter((_, i) => i !== respIndex);
    handleFieldChange('responsibilities', newResponsibilities);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-lg bg-white"
    >
      <div className="flex items-center p-4 border-b border-gray-100">
        <button
          {...attributes}
          {...listeners}
          className="mr-3 cursor-move text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <div className="flex-1">
          <h3 className="font-medium text-gray-900">
            {experience.title || 'Untitled Position'} {experience.company && `at ${experience.company}`}
          </h3>
          <p className="text-sm text-gray-500">
            {experience.startDate || 'Start Date'} - {experience.endDate || 'Present'}
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        <button
          onClick={() => onDelete(index)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Senior Software Engineer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => handleFieldChange('company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tech Corp"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="inline h-3 w-3 mr-1" />
                Location
              </label>
              <input
                type="text"
                value={experience.location || ''}
                onChange={(e) => handleFieldChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New York, NY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline h-3 w-3 mr-1" />
                Start Date *
              </label>
              <input
                type="text"
                value={experience.startDate}
                onChange={(e) => handleFieldChange('startDate', e.target.value)}
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
                  value={experience.current ? 'Present' : experience.endDate || ''}
                  onChange={(e) => handleFieldChange('endDate', e.target.value)}
                  disabled={experience.current}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  placeholder="Dec 2023"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Responsibilities & Achievements *
              </label>
              <button
                onClick={addResponsibility}
                className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <Plus className="h-3 w-3" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {experience.responsibilities.map((resp, respIndex) => (
                <div key={respIndex} className="flex items-start gap-2">
                  <span className="text-sm text-gray-500 mt-2">•</span>
                  <textarea
                    value={resp}
                    onChange={(e) => handleResponsibilityChange(respIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Describe a key responsibility or achievement..."
                    rows={2}
                  />
                  <button
                    onClick={() => removeResponsibility(respIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {experience.responsibilities.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  Add at least 2-3 key responsibilities or achievements
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ExperienceEditor({ experiences, onChange }: ExperienceEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = experiences.findIndex((exp) => exp.id === active.id);
      const newIndex = experiences.findIndex((exp) => exp.id === over?.id);

      onChange(arrayMove(experiences, oldIndex, newIndex));
    }
  };

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      responsibilities: [''],
    };
    onChange([...experiences, newExperience]);
  };

  const updateExperience = (index: number, experience: WorkExperience) => {
    const newExperiences = [...experiences];
    newExperiences[index] = experience;
    onChange(newExperiences);
  };

  const deleteExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  // Ensure all experiences have IDs for drag and drop
  const experiencesWithIds = experiences.map((exp, index) => ({
    ...exp,
    id: exp.id || index.toString(),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </button>
      </div>

      {experiencesWithIds.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <button
            onClick={addExperience}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first experience
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={experiencesWithIds.map(exp => exp.id!)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {experiencesWithIds.map((experience, index) => (
                <SortableExperienceItem
                  key={experience.id}
                  experience={experience}
                  index={index}
                  onUpdate={updateExperience}
                  onDelete={deleteExperience}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Pro Tips</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Start each bullet point with a strong action verb</li>
          <li>• Include quantifiable achievements (increased sales by X%, managed team of Y)</li>
          <li>• Focus on results and impact, not just duties</li>
          <li>• List experiences in reverse chronological order</li>
          <li>• Drag and drop to reorder experiences</li>
        </ul>
      </div>
    </div>
  );
}