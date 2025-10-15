export type PlanType = 'free' | 'pro' | 'ultimate';

export interface PlanFeatures {
  cvs: number | 'unlimited';
  coverLetters: boolean;
  templates: number;
  atsScore: boolean;
  aiOptimization: boolean;
  humanReview: boolean;
  prioritySupport: boolean;
  exportFormats: string[];
}

export const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  free: {
    cvs: 1,
    coverLetters: false,
    templates: 3,
    atsScore: true,
    aiOptimization: true,
    humanReview: false,
    prioritySupport: false,
    exportFormats: ['pdf'],
  },
  pro: {
    cvs: 10,
    coverLetters: true,
    templates: 15,
    atsScore: true,
    aiOptimization: true,
    humanReview: false,
    prioritySupport: false,
    exportFormats: ['pdf', 'docx'],
  },
  ultimate: {
    cvs: 'unlimited' as const,
    coverLetters: true,
    templates: 15,
    atsScore: true,
    aiOptimization: true,
    humanReview: true,
    prioritySupport: true,
    exportFormats: ['pdf', 'docx', 'txt'],
  },
};

export const PLAN_PRICES = {
  free: 0,
  pro: 19,
  ultimate: 49,
};

export const PLAN_NAMES = {
  free: 'Free',
  pro: 'Pro',
  ultimate: 'Ultimate',
};

export const PLAN_DESCRIPTIONS = {
  free: 'Perfect for getting started',
  pro: 'Best for job seekers',
  ultimate: 'For serious professionals',
};
