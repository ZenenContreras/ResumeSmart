'use client';

import React, { useState, useEffect } from 'react';

const WhyYoursDontWork = () => {
  const [activeCard, setActiveCard] = useState(0);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % 4);
        }, 2000); // Change active card every 1 second

        return () => clearInterval(interval);
    }, []);
  const problems = [
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      ),
      title: '75% REJECTED',
      subtitle: 'By Robots',
      titleColor: 'text-purple-600',
      description: 'ATS (automatic software) rejects your resume in 6 seconds without a human ever seeing it',
      visual: (
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 mt-3 bg-gray-50 rounded-lg p-2">
          <span className="text-gray-600">Your Resume</span>
          <span>→</span>
          <span className="text-purple-600 font-bold">ATS</span>
          <span>→</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
      )
    },
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
      ),
      title: 'WRONG WORDS',
      subtitle: 'Generic vs Impact',
      titleColor: 'text-blue-600',
      description: (
        <div className="space-y-2">
          <div className="bg-gray-50 rounded p-2">
            <div className="text-gray-500 text-sm">
              <span className="font-bold">Weak:</span> "Responsible for..."
            </div>
            <div className="text-green-600 text-sm mt-1">
              <span className="font-bold">Strong:</span> "Increased sales 34%..."
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            You use generic terms that ATS completely ignores
          </p>
        </div>
      )
    },
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      ),
      title: 'BROKEN FORMAT',
      subtitle: 'Looks Good, Works Bad',
      titleColor: 'text-purple-600',
      description: (
        <div className="space-y-2">
          <ul className="text-sm space-y-1 bg-gray-50 rounded p-2">
            <li className="flex items-center gap-2">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-gray-700">Tables</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-gray-700">Columns</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-gray-700">Graphics</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-gray-700">Text boxes</span>
            </li>
          </ul>
          <p className="text-gray-600 text-sm">
            ATS can't read your resume even if it looks "pretty"
          </p>
        </div>
      )
    },
    {
      icon: (
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      title: '10+ HOURS WASTED',
      subtitle: 'Still Unsure',
      titleColor: 'text-green-600',
      description: (
        <div className="space-y-2">
          <p className="text-gray-700 text-sm font-medium">Trying to optimize:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Read 15 articles</li>
            <li>• Try 5 templates</li>
            <li>• Rewrite everything 3 times</li>
            <li>• Still don't know if it works</li>
          </ul>
          <p className="text-gray-700 text-sm mt-2 font-bold">
            Result: ATS score = <span className="text-purple-600 text-lg">?</span>
          </p>
        </div>
      )
    }
  ];

  return (
    <div id="why-yours-dont-work" className="w-full min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-2 ">
        {/* Main Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl  font-extrabold text-gray-900 mb-2 sm:mb-4 tracking-tighter leading-tight">
          Why You Send <span className="text-purple-600">100 Resumes</span> and{' '}
          <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
            Don't Get a Single Call ?
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12">
          The harsh reality of  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            Modern
          </span> job hunting
        </p>

        {/* Problem Cards Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-left">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg border transition-all duration-300 transform flex flex-col hover:cursor-pointer ${
                activeCard === index
                  ? 'border-blue-600 -translate-y-2 shadow-2xl scale-105'
                  : 'border-gray-100 '
              }`}
            >
              {/* Icon and Title */}
              <div className="mb-3 sm:mb-4">
                {problem.icon}
                <h3 className={`text-base sm:text-lg font-bold ${problem.titleColor} mt-3`}>
                  {problem.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  {problem.subtitle}
                </p>
              </div>

              {/* Description */}
              <div className="flex-grow">
                {typeof problem.description === 'string' ? (
                  <p className="text-sm sm:text-base text-gray-700">
                    {problem.description}
                  </p>
                ) : (
                  problem.description
                )}
                {problem.visual && problem.visual}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-4 lg:mt-8">
            <div className="mb-4">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                ResumeSmart
                </span>{' '}
                shows you your ATS score{' '}
                <span className="font-bold text-green-600">BEFORE</span> you apply
                </p>
            </div>
        </div>
        <a 
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
            className="group inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:scale-101 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-600/50 w-full sm:w-auto max-w-xs"
            >
                See How It Works
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </a>
        </div>
    </div>
    );
};

export default WhyYoursDontWork;