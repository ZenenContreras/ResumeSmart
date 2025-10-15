import { useState, useEffect } from 'react';

export interface UserPlan {
  plan: 'free' | 'pro' | 'ultimate';
  planName: string;
  planDescription: string;
  creditsRemaining: number;
  creditsTotal: number;
  purchasedAt: string | null;
  features: {
    cvs: number;
    coverLetters: boolean;
    templates: number;
    atsScore: boolean;
    aiOptimization: boolean;
    humanReview: boolean;
    prioritySupport: boolean;
    exportFormats: string[];
  };
}

export function useUserPlan() {
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/user/plan', {
        // Add cache control for better performance
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch plan');
      }

      const data = await response.json();
      setPlan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching user plan:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  return {
    plan,
    loading,
    error,
    refetch: fetchPlan,
  };
}
