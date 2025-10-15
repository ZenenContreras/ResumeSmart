'use client';

import { useState, useEffect } from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface SummaryEditorProps {
  summary: string;
  onChange: (summary: string) => void;
}

export function SummaryEditor({ summary, onChange }: SummaryEditorProps) {
  const [localSummary, setLocalSummary] = useState(summary);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 500;

  useEffect(() => {
    setCharCount(localSummary.length);
  }, [localSummary]);

  const handleChange = (value: string) => {
    setLocalSummary(value);
    onChange(value);
  };

  const sampleSummaries = [
    "Results-driven professional with 5+ years of experience in software development and team leadership. Proven track record of delivering high-quality solutions and driving business growth through innovative technology implementations.",
    "Dedicated marketing specialist with expertise in digital marketing, brand management, and content strategy. Successfully increased brand awareness by 40% and generated $2M in new revenue through strategic campaigns.",
    "Experienced project manager with PMP certification and 8+ years managing cross-functional teams. Expert in Agile methodologies with a history of delivering complex projects on time and under budget.",
  ];

  const handleUseSample = (sampleText: string) => {
    handleChange(sampleText);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Professional Summary</h2>
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="AI suggestions coming soon"
        >
          <Sparkles className="h-4 w-4" />
          AI Enhance
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <FileText className="inline h-4 w-4 mr-1" />
          Summary
        </label>
        <textarea
          value={localSummary}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Write a brief professional summary that highlights your key qualifications, experience, and career objectives..."
          rows={6}
          maxLength={MAX_CHARS}
        />
        <div className="flex justify-between mt-2">
          <p className="text-xs text-gray-500">
            A strong summary is 3-4 sentences that capture your value proposition
          </p>
          <p className={`text-xs ${charCount > MAX_CHARS * 0.9 ? 'text-orange-600' : 'text-gray-500'}`}>
            {charCount}/{MAX_CHARS} characters
          </p>
        </div>
      </div>

      {/* Sample Summaries */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Sample Summaries</h3>
        <div className="space-y-2">
          {sampleSummaries.map((sample, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleUseSample(sample)}
            >
              <p className="text-sm text-gray-700 line-clamp-2">{sample}</p>
              <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                Use this summary
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Writing Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Writing Tips</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Start with your years of experience and primary expertise</li>
          <li>• Include 2-3 key achievements with quantifiable results</li>
          <li>• Mention your core skills relevant to your target role</li>
          <li>• Keep it concise and avoid generic statements</li>
          <li>• Tailor it to match the job you're applying for</li>
        </ul>
      </div>
    </div>
  );
}