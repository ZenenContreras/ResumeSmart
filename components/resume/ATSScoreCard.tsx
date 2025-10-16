'use client';

import { useState } from 'react';

interface ATSScore {
  score: number;
  keywordsMatched: number;
  keywordsTotal: number;
  suggestions: string[];
  missingKeywords: string[];
}

interface ATSScoreCardProps {
  resumeId: string;
  jobDescription?: string;
  onCalculate?: () => void;
}

export default function ATSScoreCard({ resumeId, jobDescription, onCalculate }: ATSScoreCardProps) {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<ATSScore | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateScore = async () => {
    if (!jobDescription) {
      setError('Job description is required for ATS scoring');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, jobDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate ATS score');
      }

      const data = await response.json();
      setScore(data);
      if (onCalculate) onCalculate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-200';
    if (score >= 60) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">ATS Score</h2>
        <button
          onClick={calculateScore}
          disabled={loading || !jobDescription}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculating...
            </span>
          ) : (
            'Calculate ATS Score'
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {!jobDescription && (
        <div className="text-center py-8">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
          <p className="text-gray-600 text-sm">
            Add a job description to calculate ATS compatibility
          </p>
        </div>
      )}

      {score && (
        <div className="space-y-6">
          {/* Score Display */}
          <div className={`p-6 rounded-xl border-2 ${getScoreBgColor(score.score)}`}>
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(score.score)}`}>
                {score.score}
              </div>
              <div className="text-sm text-gray-600 mb-4">out of 100</div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${getProgressColor(score.score)}`}
                  style={{ width: `${score.score}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Keywords Match */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Keywords Matched</span>
              <span className="text-sm font-bold text-gray-900">
                {score.keywordsMatched} / {score.keywordsTotal}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${(score.keywordsMatched / score.keywordsTotal) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Missing Keywords */}
          {score.missingKeywords && score.missingKeywords.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Missing Keywords ({score.missingKeywords.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {score.missingKeywords.slice(0, 10).map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full border border-red-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {score.suggestions && score.suggestions.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Suggestions for Improvement
              </h3>
              <ul className="space-y-2">
                {score.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Score Interpretation */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              What does this mean?
            </h4>
            <p className="text-sm text-blue-800">
              {score.score >= 80 && (
                <>
                  <strong>Excellent!</strong> Your resume is highly optimized for ATS systems.
                  It has a strong chance of passing automated screening.
                </>
              )}
              {score.score >= 60 && score.score < 80 && (
                <>
                  <strong>Good, but can improve.</strong> Your resume will likely pass ATS
                  screening, but adding more relevant keywords could improve your chances.
                </>
              )}
              {score.score < 60 && (
                <>
                  <strong>Needs improvement.</strong> Your resume may struggle with ATS systems.
                  Consider adding more relevant keywords and following the suggestions above.
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
