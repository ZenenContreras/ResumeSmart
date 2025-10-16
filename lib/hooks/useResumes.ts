import { useState, useEffect } from 'react';

export interface Resume {
  id: string;
  title: string;
  type: 'targeted' | 'general';
  job_description?: string;
  ats_score?: number;
  template_id: string;
  created_at: string;
  updated_at: string;
}

export interface ResumesResponse {
  resumes: Resume[];
  total: number;
  limit: number;
  offset: number;
}

export function useResumes(type?: 'targeted' | 'general') {
  const [data, setData] = useState<ResumesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (type) params.append('type', type);
      params.append('limit', '10');

      const response = await fetch(`/api/resume/list?${params.toString()}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [type]);

  return {
    resumes: data?.resumes || [],
    total: data?.total || 0,
    loading,
    error,
    refetch: fetchResumes,
  };
}
