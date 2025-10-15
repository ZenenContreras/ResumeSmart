// Comprehensive Resume Data Types

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  portfolio?: string;
  github?: string;
}

export interface WorkExperience {
  id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string; // null means "Present"
  current?: boolean;
  description?: string;
  responsibilities: string[];
  achievements?: string[];
  technologies?: string[];
}

export interface Education {
  id?: string;
  degree: string;
  institution: string;
  location?: string;
  field?: string;
  graduationDate?: string;
  gpa?: string;
  honors?: string;
  relevant_coursework?: string[];
  activities?: string[];
}

export interface Certification {
  id?: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

export type LanguageProficiency =
  | 'Native'
  | 'Fluent'
  | 'Professional Working Proficiency'
  | 'Limited Working Proficiency'
  | 'Elementary Proficiency';

export interface Language {
  id?: string;
  language: string;
  proficiency: LanguageProficiency;
  certifications?: string[]; // e.g., "TOEFL 110", "DELE C2"
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  role?: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  highlights: string[];
}

export interface Publication {
  id?: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  doi?: string;
  authors?: string[];
  description?: string;
}

export interface VolunteerWork {
  id?: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  highlights: string[];
}

export interface Award {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Skills {
  [category: string]: string[];
}

// Main Resume Data Structure
export interface ResumeData {
  // Core sections
  personalInfo: PersonalInfo;
  summary?: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skills;

  // Additional sections
  certifications?: Certification[];
  languages?: Language[];
  projects?: Project[];
  publications?: Publication[];
  volunteer?: VolunteerWork[];
  awards?: Award[];

  // Metadata
  template?: string;
  fontSize?: number;
  sectionOrder?: string[];
}

// Database Resume Type
export interface Resume {
  id: string;
  user_id: string;
  title: string;
  type: 'targeted' | 'general';
  job_description?: string;
  ats_score: number;
  keywords_matched: number;
  keywords_total: number;
  template_id: string;
  content: ResumeData;
  font_size?: number;
  sections?: string[];
  editor_state?: any;

  // New comprehensive fields
  certifications?: Certification[];
  languages?: Language[];
  projects?: Project[];
  publications?: Publication[];
  volunteer?: VolunteerWork[];
  awards?: Award[];

  created_at: string;
  updated_at: string;
}

// Section configuration for editor
export interface SectionConfig {
  id: string;
  label: string;
  icon: string;
  enabled: boolean;
  required?: boolean;
}

export const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: 'personalInfo', label: 'Personal Information', icon: 'user', enabled: true, required: true },
  { id: 'summary', label: 'Professional Summary', icon: 'file-text', enabled: true },
  { id: 'experience', label: 'Work Experience', icon: 'briefcase', enabled: true, required: true },
  { id: 'education', label: 'Education', icon: 'graduation-cap', enabled: true, required: true },
  { id: 'skills', label: 'Skills', icon: 'tool', enabled: true, required: true },
  { id: 'certifications', label: 'Certifications', icon: 'award', enabled: false },
  { id: 'languages', label: 'Languages', icon: 'globe', enabled: false },
  { id: 'projects', label: 'Projects', icon: 'folder', enabled: false },
  { id: 'publications', label: 'Publications', icon: 'book', enabled: false },
  { id: 'volunteer', label: 'Volunteer Work', icon: 'heart', enabled: false },
  { id: 'awards', label: 'Awards & Honors', icon: 'trophy', enabled: false },
];

// Template types
export type TemplateId = 'harvard-ats' | 'modern' | 'purple-executive' | 'blue-corporate';

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  recommended?: boolean;
  preview?: string;
  features: string[];
  color: string; // Primary color for the template
  styleFile: string; // Path to the style file
}

export const AVAILABLE_TEMPLATES: TemplateInfo[] = [
  {
    id: 'harvard-ats',
    name: 'Harvard ATS Expert',
    description: 'Optimized for Applicant Tracking Systems with clean, professional layout',
    recommended: true,
    color: '#000000',
    styleFile: 'harvard-ats-styles',
    features: [
      'ATS-Optimized',
      'Single-column layout',
      'Clear section headers',
      'Black & white design',
      'Maximum compatibility'
    ]
  },
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design with blue accents',
    color: '#2563eb',
    styleFile: 'modern-styles',
    features: [
      'Modern styling',
      'Blue accent colors',
      'Professional layout',
      'Clean typography',
      'Eye-catching design'
    ]
  },
  {
    id: 'purple-executive',
    name: 'Executive Modern',
    description: 'Elegant purple accent design for senior-level professionals',
    color: '#7c3aed',
    styleFile: 'purple-executive-styles',
    features: [
      'Executive presence',
      'Purple accent colors',
      'Professional layout',
      'Sophisticated typography',
      'Leadership focused'
    ]
  },
  {
    id: 'blue-corporate',
    name: 'Corporate Professional',
    description: 'Two-column corporate design with blue sidebar',
    color: '#1e3a8a',
    styleFile: 'blue-corporate-styles',
    features: [
      'Two-column layout',
      'Blue corporate theme',
      'Side navigation',
      'Compact design',
      'Professional aesthetics'
    ]
  }
];
