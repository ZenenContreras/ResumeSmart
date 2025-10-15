'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Calendar, Target, Sparkles, Trash2, Download, Search, Filter, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Resume {
  id: string;
  title: string;
  type: 'targeted' | 'general';
  ats_score: number;
  created_at: string;
  updated_at: string;
  job_description: string | null;
}

export default function ResumesPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'targeted' | 'general'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/resumes/list');

      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }

      const data = await response.json();
      setResumes(data.resumes || []);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(id);
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete resume');
      }

      // Remove from local state
      setResumes(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const handleExport = async (id: string, title: string) => {
    try {
      const response = await fetch(`/api/pdf/export?resumeId=${id}`);

      if (!response.ok) {
        throw new Error('Failed to export PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  // Filter and sort resumes
  const filteredResumes = resumes
    .filter(resume => {
      const matchesSearch = resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (resume.job_description?.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = filterType === 'all' || resume.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return (b.ats_score || 0) - (a.ats_score || 0);
      }
    });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Resumes</h1>
            <p className="text-gray-600">
              Manage and track all your generated resumes
            </p>
          </div>
          <Link
            href="/dashboard/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            <FileText className="w-5 h-5" />
            Create New Resume
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border rounded-xl p-4">
            <div className="text-gray-600 text-sm mb-1">Total Resumes</div>
            <div className="text-2xl font-bold">{resumes.length}</div>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <div className="text-gray-600 text-sm mb-1">Targeted</div>
            <div className="text-2xl font-bold">
              {resumes.filter(r => r.type === 'targeted').length}
            </div>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <div className="text-gray-600 text-sm mb-1">General</div>
            <div className="text-2xl font-bold">
              {resumes.filter(r => r.type === 'general').length}
            </div>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <div className="text-gray-600 text-sm mb-1">Avg. ATS Score</div>
            <div className="text-2xl font-bold">
              {resumes.length > 0
                ? Math.round(resumes.reduce((sum, r) => sum + (r.ats_score || 0), 0) / resumes.length)
                : 0}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border rounded-xl p-4 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="targeted">Targeted Only</option>
              <option value="general">General Only</option>
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="score">Sort by ATS Score</option>
          </select>
        </div>
      </div>

      {/* Resume List */}
      {filteredResumes.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {searchQuery || filterType !== 'all' ? 'No resumes found' : 'No resumes yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || filterType !== 'all'
              ? 'Try adjusting your filters or search query'
              : 'Create your first optimized resume to get started'}
          </p>
          {!searchQuery && filterType === 'all' && (
            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              <FileText className="w-5 h-5" />
              Create Your First Resume
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredResumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white border rounded-xl p-6 hover:shadow-lg transition group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Resume Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                      {resume.type === 'targeted' ? (
                        <Target className="w-6 h-6 text-blue-600" />
                      ) : (
                        <Sparkles className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/dashboard/resumes/${resume.id}`}
                        className="text-xl font-semibold hover:text-blue-600 transition block truncate"
                      >
                        {resume.title}
                      </Link>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(resume.created_at)}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                          {resume.type === 'targeted' ? 'Targeted' : 'General'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {resume.job_description && (
                    <p className="text-sm text-gray-600 line-clamp-2 ml-14">
                      {resume.job_description.substring(0, 150)}...
                    </p>
                  )}
                </div>

                {/* ATS Score & Actions */}
                <div className="flex items-center gap-4">
                  {/* ATS Score */}
                  {resume.ats_score > 0 && (
                    <div className="text-center">
                      <div className="text-xs text-gray-600 mb-1">ATS Score</div>
                      <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getScoreColor(resume.ats_score)}`}>
                        {resume.ats_score}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExport(resume.id, resume.title)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="Download PDF"
                    >
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(resume.id)}
                      disabled={deleting === resume.id}
                      className="p-2 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                      title="Delete"
                    >
                      {deleting === resume.id ? (
                        <Loader2 className="w-5 h-5 text-red-600 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5 text-red-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
