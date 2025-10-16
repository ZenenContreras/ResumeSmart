'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get('template') || 'harvard-ats';

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { title: 'Analyzing job description', icon: '🔍', duration: 3000 },
    { title: 'Extracting key requirements', icon: '🎯', duration: 2500 },
    { title: 'Matching your experience', icon: '✨', duration: 3000 },
    { title: 'Optimizing for ATS systems', icon: '🤖', duration: 2500 },
    { title: 'Generating tailored content', icon: '📝', duration: 3500 },
    { title: 'Calculating ATS score', icon: '📊', duration: 2000 },
  ];

  useEffect(() => {
    // Simulate processing steps
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step based on progress
      let stepIndex = 0;
      let stepStart = 0;
      for (let i = 0; i < steps.length; i++) {
        const stepEnd = stepStart + (steps[i].duration / totalDuration) * 100;
        if (newProgress < stepEnd) {
          stepIndex = i;
          break;
        }
        stepStart = stepEnd;
      }
      setCurrentStep(stepIndex);

      // Redirect when done
      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // TODO: In real implementation, pass the actual resume ID
          router.push('/dashboard/resumes');
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          {/* Animated Icon */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Rotating gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 animate-spin-slow"></div>

              {/* Current step icon */}
              <span className="text-6xl relative z-10 animate-bounce-slow">
                {steps[currentStep]?.icon}
              </span>
            </div>

            {/* Pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-blue-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Creating Your ATS-Optimized Resume
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Our AI is analyzing the job requirements and tailoring your experience...
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              <span className="text-sm font-semibold text-gray-900">
                {currentStep + 1} / {steps.length}
              </span>
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
            <p className="text-sm text-gray-600 mb-2">Current Step</p>
            <p className="text-xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <span>{steps[currentStep]?.icon}</span>
              {steps[currentStep]?.title}
            </p>
          </div>

          {/* Steps List */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  index < currentStep
                    ? 'bg-green-50 border border-green-200'
                    : index === currentStep
                    ? 'bg-blue-50 border-2 border-blue-500 scale-105'
                    : 'bg-gray-50 border border-gray-200 opacity-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index < currentStep
                      ? 'bg-green-500'
                      : index === currentStep
                      ? 'bg-blue-500 animate-pulse'
                      : 'bg-gray-300'
                  }`}
                >
                  {index < currentStep ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-2xl">{step.icon}</span>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <p
                    className={`font-semibold ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>

                {index < currentStep && (
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-gray-700 text-left">
                <p className="font-semibold mb-1">⏱️ This usually takes 15-30 seconds</p>
                <p>Don't close this window. We're using advanced AI to match your experience with the job requirements for maximum ATS compatibility.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts (optional) */}
        <div className="mt-6 text-center text-white text-sm">
          <p className="opacity-80">
            💡 Did you know? 75% of resumes are rejected by ATS before reaching a human recruiter.
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
