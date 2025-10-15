'use client';

import { useState } from 'react';
import { Education } from '@/lib/types/resume';
import { Plus, Trash2, GripVertical, Calendar, MapPin, ChevronDown, ChevronUp, Award } from 'lucide-react';
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

interface EducationEditorProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

function SortableEducationItem({
  edu,
  index,
  onUpdate,
  onDelete,
}: {
  edu: Education;
  index: number;
  onUpdate: (index: number, edu: Education) => void;
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
  } = useSortable({ id: edu.id || index.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleFieldChange = (field: keyof Education, value: any) => {
    onUpdate(index, { ...edu, [field]: value });
  };

  const handleCourseworkChange = (courseIndex: number, value: string) => {
    const newCoursework = [...(edu.relevant_coursework || [])];
    newCoursework[courseIndex] = value;
    handleFieldChange('relevant_coursework', newCoursework);
  };

  const addCoursework = () => {
    handleFieldChange('relevant_coursework', [...(edu.relevant_coursework || []), '']);
  };

  const removeCoursework = (courseIndex: number) => {
    const newCoursework = (edu.relevant_coursework || []).filter((_, i) => i !== courseIndex);
    handleFieldChange('relevant_coursework', newCoursework);
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
            {edu.degree || 'Untitled Degree'} {edu.field && `in ${edu.field}`}
          </h3>
          <p className="text-sm text-gray-500">
            {edu.institution || 'Institution'} {edu.graduationDate && `• ${edu.graduationDate}`}
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
                Degree *
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleFieldChange('degree', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bachelor of Science"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={edu.field || ''}
                onChange={(e) => handleFieldChange('field', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution *
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleFieldChange('institution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="University of Technology"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="inline h-3 w-3 mr-1" />
                Location
              </label>
              <input
                type="text"
                value={edu.location || ''}
                onChange={(e) => handleFieldChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Boston, MA"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline h-3 w-3 mr-1" />
                Graduation Date
              </label>
              <input
                type="text"
                value={edu.graduationDate || ''}
                onChange={(e) => handleFieldChange('graduationDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="May 2020"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA
              </label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => handleFieldChange('gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3.8/4.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Award className="inline h-3 w-3 mr-1" />
                Honors
              </label>
              <input
                type="text"
                value={edu.honors || ''}
                onChange={(e) => handleFieldChange('honors', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Magna Cum Laude"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Relevant Coursework (Optional)
              </label>
              <button
                onClick={addCoursework}
                className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <Plus className="h-3 w-3" />
                Add Course
              </button>
            </div>
            {edu.relevant_coursework && edu.relevant_coursework.length > 0 && (
              <div className="space-y-2">
                {edu.relevant_coursework.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex items-center gap-2">
                    <input
                      value={course}
                      onChange={(e) => handleCourseworkChange(courseIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Data Structures and Algorithms"
                    />
                    <button
                      onClick={() => removeCoursework(courseIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activities & Organizations (Optional)
            </label>
            <textarea
              value={edu.activities?.join('\n') || ''}
              onChange={(e) => handleFieldChange('activities', e.target.value.split('\n').filter(a => a.trim()))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Computer Science Club President&#10;Dean's List (All Semesters)&#10;Teaching Assistant for Intro to Programming"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">Enter each activity on a new line</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function EducationEditor({ education, onChange }: EducationEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = education.findIndex((edu) => edu.id === active.id);
      const newIndex = education.findIndex((edu) => edu.id === over?.id);

      onChange(arrayMove(education, oldIndex, newIndex));
    }
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
    };
    onChange([...education, newEducation]);
  };

  const updateEducation = (index: number, edu: Education) => {
    const newEducation = [...education];
    newEducation[index] = edu;
    onChange(newEducation);
  };

  const deleteEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  // Ensure all education items have IDs for drag and drop
  const educationWithIds = education.map((edu, index) => ({
    ...edu,
    id: edu.id || index.toString(),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </button>
      </div>

      {educationWithIds.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No education added yet</p>
          <button
            onClick={addEducation}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your education
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={educationWithIds.map(edu => edu.id!)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {educationWithIds.map((edu, index) => (
                <SortableEducationItem
                  key={edu.id}
                  edu={edu}
                  index={index}
                  onUpdate={updateEducation}
                  onDelete={deleteEducation}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Tips</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• List education in reverse chronological order</li>
          <li>• Include GPA if 3.5 or higher</li>
          <li>• Add relevant coursework for recent graduates</li>
          <li>• Include honors, awards, and leadership roles</li>
          <li>• Drag and drop to reorder education entries</li>
        </ul>
      </div>
    </div>
  );
}