'use client';

import { useState } from 'react';
import { Project } from '@/lib/types/resume';
import { Plus, Trash2, GripVertical, Link, Github, ChevronDown, ChevronUp } from 'lucide-react';
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

interface ProjectsEditorProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

function SortableProjectItem({
  project,
  index,
  onUpdate,
  onDelete,
}: {
  project: Project;
  index: number;
  onUpdate: (index: number, project: Project) => void;
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
  } = useSortable({ id: project.id || index.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleFieldChange = (field: keyof Project, value: any) => {
    onUpdate(index, { ...project, [field]: value });
  };

  const handleHighlightChange = (highlightIndex: number, value: string) => {
    const newHighlights = [...project.highlights];
    newHighlights[highlightIndex] = value;
    handleFieldChange('highlights', newHighlights);
  };

  const addHighlight = () => {
    handleFieldChange('highlights', [...project.highlights, '']);
  };

  const removeHighlight = (highlightIndex: number) => {
    const newHighlights = project.highlights.filter((_, i) => i !== highlightIndex);
    handleFieldChange('highlights', newHighlights);
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
            {project.name || 'Untitled Project'}
          </h3>
          <p className="text-sm text-gray-500">
            {project.role && `${project.role} • `}
            {project.startDate && `${project.startDate} - ${project.current ? 'Present' : project.endDate || 'Completed'}`}
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
                Project Name *
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="E-commerce Platform"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Role
              </label>
              <input
                type="text"
                value={project.role || ''}
                onChange={(e) => handleFieldChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Lead Developer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={project.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Brief description of the project and your contributions..."
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used *
            </label>
            <input
              type="text"
              value={project.technologies.join(', ')}
              onChange={(e) => handleFieldChange('technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js, MongoDB, AWS..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Link className="inline h-3 w-3 mr-1" />
                Project URL
              </label>
              <input
                type="url"
                value={project.url || ''}
                onChange={(e) => handleFieldChange('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://project.example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Github className="inline h-3 w-3 mr-1" />
                GitHub Repository
              </label>
              <input
                type="url"
                value={project.github || ''}
                onChange={(e) => handleFieldChange('github', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Highlights & Achievements
              </label>
              <button
                onClick={addHighlight}
                className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <Plus className="h-3 w-3" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {project.highlights.map((highlight, highlightIndex) => (
                <div key={highlightIndex} className="flex items-start gap-2">
                  <span className="text-sm text-gray-500 mt-2">•</span>
                  <input
                    value={highlight}
                    onChange={(e) => handleHighlightChange(highlightIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Key achievement or feature..."
                  />
                  <button
                    onClick={() => removeHighlight(highlightIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {project.highlights.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  Add key highlights or achievements
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectsEditor({ projects, onChange }: ProjectsEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over?.id);

      onChange(arrayMove(projects, oldIndex, newIndex));
    }
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      highlights: [''],
    };
    onChange([...projects, newProject]);
  };

  const updateProject = (index: number, project: Project) => {
    const newProjects = [...projects];
    newProjects[index] = project;
    onChange(newProjects);
  };

  const deleteProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const projectsWithIds = projects.map((project, index) => ({
    ...project,
    id: project.id || index.toString(),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>

      {projectsWithIds.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <button
            onClick={addProject}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first project
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projectsWithIds.map(p => p.id!)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {projectsWithIds.map((project, index) => (
                <SortableProjectItem
                  key={project.id}
                  project={project}
                  index={index}
                  onUpdate={updateProject}
                  onDelete={deleteProject}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}