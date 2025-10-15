'use client';

import { useState } from 'react';
import { ResumeData, SectionConfig } from '@/lib/types/resume';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Globe,
  FolderOpen,
  BookOpen,
  Heart,
  Trophy,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { SectionToggle } from './SectionToggle';
import { PersonalInfoEditor } from './sections/PersonalInfoEditor';
import { SummaryEditor } from './sections/SummaryEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { EducationEditor } from './sections/EducationEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { CertificationsEditor } from './sections/CertificationsEditor';
import { LanguagesEditor } from './sections/LanguagesEditor';
import { ProjectsEditor } from './sections/ProjectsEditor';
import { PublicationsEditor } from './sections/PublicationsEditor';
import { VolunteerEditor } from './sections/VolunteerEditor';
import { AwardsEditor } from './sections/AwardsEditor';

interface EditorPanelProps {
  resumeData: ResumeData;
  sections: SectionConfig[];
  activeSection: string;
  onDataChange: (data: ResumeData) => void;
  onSectionChange: (section: string) => void;
  onSectionsChange: (sections: SectionConfig[]) => void;
}

const SECTION_ICONS: Record<string, any> = {
  personalInfo: User,
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Wrench,
  certifications: Award,
  languages: Globe,
  projects: FolderOpen,
  publications: BookOpen,
  volunteer: Heart,
  awards: Trophy,
};

export function EditorPanel({
  resumeData,
  sections,
  activeSection,
  onDataChange,
  onSectionChange,
  onSectionsChange,
}: EditorPanelProps) {
  const [showSectionSettings, setShowSectionSettings] = useState(false);

  const renderSectionEditor = () => {
    switch (activeSection) {
      case 'personalInfo':
        return (
          <PersonalInfoEditor
            data={resumeData.personalInfo}
            onChange={(personalInfo) =>
              onDataChange({ ...resumeData, personalInfo })
            }
          />
        );
      case 'summary':
        return (
          <SummaryEditor
            summary={resumeData.summary || ''}
            onChange={(summary) => onDataChange({ ...resumeData, summary })}
          />
        );
      case 'experience':
        return (
          <ExperienceEditor
            experiences={resumeData.experience}
            onChange={(experience) =>
              onDataChange({ ...resumeData, experience })
            }
          />
        );
      case 'education':
        return (
          <EducationEditor
            education={resumeData.education}
            onChange={(education) =>
              onDataChange({ ...resumeData, education })
            }
          />
        );
      case 'skills':
        return (
          <SkillsEditor
            skills={resumeData.skills}
            onChange={(skills) => onDataChange({ ...resumeData, skills })}
          />
        );
      case 'certifications':
        return (
          <CertificationsEditor
            certifications={resumeData.certifications || []}
            onChange={(certifications) =>
              onDataChange({ ...resumeData, certifications })
            }
          />
        );
      case 'languages':
        return (
          <LanguagesEditor
            languages={resumeData.languages || []}
            onChange={(languages) =>
              onDataChange({ ...resumeData, languages })
            }
          />
        );
      case 'projects':
        return (
          <ProjectsEditor
            projects={resumeData.projects || []}
            onChange={(projects) =>
              onDataChange({ ...resumeData, projects })
            }
          />
        );
      case 'publications':
        return (
          <PublicationsEditor
            publications={resumeData.publications || []}
            onChange={(publications) =>
              onDataChange({ ...resumeData, publications })
            }
          />
        );
      case 'volunteer':
        return (
          <VolunteerEditor
            volunteer={resumeData.volunteer || []}
            onChange={(volunteer) =>
              onDataChange({ ...resumeData, volunteer })
            }
          />
        );
      case 'awards':
        return (
          <AwardsEditor
            awards={resumeData.awards || []}
            onChange={(awards) =>
              onDataChange({ ...resumeData, awards })
            }
          />
        );
      default:
        return (
          <div className="p-6 text-center text-gray-500">
            Select a section to edit
          </div>
        );
    }
  };

  const enabledSections = sections.filter(s => s.enabled);

  return (
    <>
      {/* Section Tabs - Grid Layout */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="px-4 py-3">
          {/* Grid of section buttons - wraps instead of scrolls */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-2">
            {enabledSections.map((section) => {
              const Icon = SECTION_ICONS[section.id] || FileText;
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-medium rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings button */}
          <button
            onClick={() => setShowSectionSettings(!showSectionSettings)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors border border-gray-200"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>{showSectionSettings ? 'Hide' : 'Show'} Section Settings</span>
            {showSectionSettings ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Section Toggle Panel */}
      {showSectionSettings && (
        <div className="border-b border-gray-200 bg-white p-4">
          <SectionToggle sections={sections} onChange={onSectionsChange} />
        </div>
      )}

      {/* Section Editor Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">{renderSectionEditor()}</div>
      </div>
    </>
  );
}