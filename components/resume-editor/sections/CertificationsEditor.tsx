'use client';

import { useState } from 'react';
import { Certification } from '@/lib/types/resume';
import { Plus, Trash2, GripVertical, Calendar, Link, ChevronDown, ChevronUp } from 'lucide-react';
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

interface CertificationsEditorProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

function SortableCertificationItem({
  cert,
  index,
  onUpdate,
  onDelete,
}: {
  cert: Certification;
  index: number;
  onUpdate: (index: number, cert: Certification) => void;
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
  } = useSortable({ id: cert.id || index.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleFieldChange = (field: keyof Certification, value: any) => {
    onUpdate(index, { ...cert, [field]: value });
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
            {cert.name || 'Untitled Certification'}
          </h3>
          <p className="text-sm text-gray-500">
            {cert.issuer || 'Issuer'} {cert.date && `• ${cert.date}`}
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
                Certification Name *
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="AWS Certified Solutions Architect"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => handleFieldChange('issuer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Amazon Web Services"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline h-3 w-3 mr-1" />
                Issue Date *
              </label>
              <input
                type="text"
                value={cert.date}
                onChange={(e) => handleFieldChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jan 2023"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                value={cert.expiryDate || ''}
                onChange={(e) => handleFieldChange('expiryDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jan 2026 (or leave empty if no expiry)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credential ID
              </label>
              <input
                type="text"
                value={cert.credentialId || ''}
                onChange={(e) => handleFieldChange('credentialId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ABC123XYZ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Link className="inline h-3 w-3 mr-1" />
                Credential URL
              </label>
              <input
                type="url"
                value={cert.credentialUrl || ''}
                onChange={(e) => handleFieldChange('credentialUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://verify.certification.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={cert.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Brief description of what this certification covers or validates..."
              rows={2}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function CertificationsEditor({ certifications, onChange }: CertificationsEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = certifications.findIndex((cert) => cert.id === active.id);
      const newIndex = certifications.findIndex((cert) => cert.id === over?.id);

      onChange(arrayMove(certifications, oldIndex, newIndex));
    }
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
    };
    onChange([...certifications, newCert]);
  };

  const updateCertification = (index: number, cert: Certification) => {
    const newCerts = [...certifications];
    newCerts[index] = cert;
    onChange(newCerts);
  };

  const deleteCertification = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  const certsWithIds = certifications.map((cert, index) => ({
    ...cert,
    id: cert.id || index.toString(),
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
        <button
          onClick={addCertification}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Certification
        </button>
      </div>

      {certsWithIds.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No certifications added yet</p>
          <button
            onClick={addCertification}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first certification
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={certsWithIds.map(cert => cert.id!)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {certsWithIds.map((cert, index) => (
                <SortableCertificationItem
                  key={cert.id}
                  cert={cert}
                  index={index}
                  onUpdate={updateCertification}
                  onDelete={deleteCertification}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Tips</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Include certifications relevant to your target role</li>
          <li>• List most recent or prestigious certifications first</li>
          <li>• Add credential IDs for verification</li>
          <li>• Include expiry dates when applicable</li>
          <li>• Provide verification URLs when available</li>
        </ul>
      </div>
    </div>
  );
}