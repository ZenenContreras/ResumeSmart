'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useUserPlan } from '@/lib/hooks/useUserPlan';
import { useResumes } from '@/lib/hooks/useResumes';

export default function DashboardPage() {
  const { user } = useUser();
  const { plan, loading: planLoading } = useUserPlan();
  const { resumes, total, loading: resumesLoading } = useResumes();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back, {user?.firstName || 'User'}! 👋
        </h1>
        <p className="mt-2 text-gray-600">
          Ready to create your next optimized resume?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/create"
          className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
            <svg
              className="w-6 h-6 text-blue-600 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Create New Resume
          </h3>
          <p className="text-sm text-gray-600">
            Start from scratch or optimize for a specific job
          </p>
        </Link>

        <Link
          href="/dashboard/resumes"
          className="p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500 transition-colors">
            <svg
              className="w-6 h-6 text-purple-600 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            My Resumes
          </h3>
          <p className="text-sm text-gray-600">
            View and edit your saved resumes
          </p>
        </Link>

        {plan && plan.plan !== 'ultimate' && (
          <Link
            href="/dashboard/upgrade"
            className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl hover:shadow-lg transition-all group relative overflow-hidden"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {plan.plan === 'free' ? 'Upgrade to Pro' : 'Upgrade to Ultimate'}
            </h3>
            <p className="text-sm text-white/90">
              {plan.plan === 'free'
                ? 'Get 10 resumes and premium features'
                : 'Get unlimited resumes for 90 days'}
            </p>
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
              {plan.plan === 'free' ? 'POPULAR' : 'ULTIMATE'}
            </div>
          </Link>
        )}
      </div>

      {/* Your Stats */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Stats</h2>
        {planLoading || resumesLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">CVs Created</p>
              <p className="text-3xl font-bold text-gray-900">{total}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Average ATS Score</p>
              <p className="text-3xl font-bold text-gray-900">
                {resumes.length > 0
                  ? Math.round(
                      resumes
                        .filter((r) => r.ats_score)
                        .reduce((sum, r) => sum + (r.ats_score || 0), 0) /
                        resumes.filter((r) => r.ats_score).length || 0
                    )
                  : '--'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Credits Remaining</p>
              <p className="text-3xl font-bold text-blue-600">
                {plan?.creditsRemaining ?? 1}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Plan</p>
              <p className="text-3xl font-bold text-gray-900">
                {plan?.planName || 'Free'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recent Resumes */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Resumes</h2>
          <Link
            href="/dashboard/resumes"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All →
          </Link>
        </div>

        {resumesLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Create Your First Resume
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Get started by creating your first optimized resume. It only takes 3 minutes!
            </p>
            <Link
              href="/dashboard/create"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Resume
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.slice(0, 6).map((resume) => (
              <Link
                key={resume.id}
                href={`/dashboard/resumes/${resume.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 truncate flex-1">
                    {resume.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      resume.type === 'targeted'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {resume.type === 'targeted' ? 'Targeted' : 'General'}
                  </span>
                </div>
                {resume.ats_score !== undefined && resume.ats_score !== null && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">ATS Score</span>
                      <span className="font-semibold text-gray-900">
                        {resume.ats_score}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          resume.ats_score >= 80
                            ? 'bg-green-500'
                            : resume.ats_score >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${resume.ats_score}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Updated {new Date(resume.updated_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Tips & Resources */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-blue-900 mb-4">
          💡 Tips & Resources
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <div>
              <Link href="#" className="text-blue-900 hover:text-blue-700 font-medium">
                How to Write Better Bullets
              </Link>
              <p className="text-sm text-blue-700">Learn the STAR method for resume bullets</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <div>
              <Link href="#" className="text-blue-900 hover:text-blue-700 font-medium">
                Top Keywords for Tech Jobs
              </Link>
              <p className="text-sm text-blue-700">Essential keywords to include in your resume</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <div>
              <Link href="#" className="text-blue-900 hover:text-blue-700 font-medium">
                Interview Prep Checklist
              </Link>
              <p className="text-sm text-blue-700">Get ready for your next interview</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
