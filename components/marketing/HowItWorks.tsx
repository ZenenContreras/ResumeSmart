'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const HowItWorks = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 2000); // Change active card every 4 second

    return () => clearInterval(interval);
  }, []);
  const steps = [
    {
      number: 1,
      title: 'Choose Your Approach',
      titleColor: 'from-blue-600 to-purple-600',
      description: (
        <div className="space-y-3">
          <p className="text-gray-700 font-bold">
            Have a specific job in mind?
          </p>
          <p className="text-gray-700 text-sm">
            Optimize your resume for that position.
          </p>
          <p className="text-gray-700 font-bold mt-3">
            Want a general resume?
          </p>
          <p className="text-gray-700 text-sm">
            Create a versatile professional resume.
          </p>
        </div>
      ),
      imageUrl: '/photo/step1.webp',
      altText: 'Mode selector screenshot'
    },
    {
      number: 2,
      title: 'Add Your Experience',
      titleColor: 'from-purple-600 to-green-600',
      description: (
        <div className="space-y-3">
          <p className="text-gray-700 font-medium">
            Upload your <span className="text-blue-600 font-bold">current resume</span> or paste text.
          </p>
          <p className="text-gray-700 font-bold mt-3">
            No work experience? Include:
          </p>
          <ul className="text-gray-700 text-sm space-y-1 ml-2">
            <li>• <span className="text-purple-600 font-bold">Academic</span> or personal projects</li>
            <li>• <span className="text-purple-600 font-bold">Internships</span> or volunteering</li>
            <li>• Courses and <span className="text-purple-600 font-bold">certifications</span></li>
            <li>• <span className="text-purple-600 font-bold">Technical skills</span></li>
          </ul>
        </div>
      ),
      imageUrl: '/photo/step2.webp',
      altText: 'Upload options screenshot'
    },
    {
      number: 3,
      title: 'AI Optimizes Your Content',
      titleColor: 'from-green-600 to-blue-600',
      description: (
        <div className="space-y-3">
          <p className="text-gray-700 font-bold">
            In 30 seconds, our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
              AI
            </span>:
          </p>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>• <span className="text-blue-600 font-bold">Rewrites</span> bullets with <span className=" font-bold">impact verbs</span></li>
            <li>• <span className="text-blue-600 font-bold">Extracts</span> and adds <span className="font-bold">relevant keywords</span></li>
            <li>• <span className="text-blue-600 font-bold">Optimizes</span> format to pass <span className=" font-bold">ATS</span></li>
            <li>• <span className="text-blue-600 font-bold">Generates</span> <span className="font-bold">professional summary</span></li>
          </ul>
        </div>
      ),
      imageUrl: '/photo/step3.webp',
      altText: 'AI processing animation screenshot'
    },
    {
      number: 4,
      title: 'Download and Apply',
      titleColor: 'from-blue-600 to-green-600',
      description: (
        <div className="space-y-3">
          <p className="text-gray-700 font-bold">
            Your resume is ready:
          </p>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>• <span className="text-green-600 font-bold">ATS score</span> + suggestions (if targeted)</li>
            <li>• Professional <span className="text-green-600 font-bold">PDF</span> with <span className="text-green-600 font-bold">no paywall</span></li>
            <li>• <span className="text-green-600 font-bold">Editable</span> anytime</li>
          </ul>
        </div>
      ),
      imageUrl: '/photo/step4.webp',
      altText: 'Results page with ATS score screenshot'
    }
  ];

  return (
    <div id="how-it-works" className="w-full min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br  from-blue-50 to-purple-50">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4 tracking-tighter">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4 </span>Steps to Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Perfect</span> Resume
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 md:mb-16">
          Simple, fast, and powered by{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            AI
          </span>
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`hover:cursor-pointer bg-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border transition-all duration-300 transform flex flex-col ${
                activeCard === index
                  ? 'border-blue-600 -translate-y-2 shadow-2xl scale-103 lg:scale-105'
                  : 'border-gray-100'
              }`}
            >
              <div className="mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-base sm:text-xl flex-shrink-0">
                    {step.number}
                  </div>
                  <h3 className={`text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 not-only:bg-clip-text text-transparent`}>
                    {step.title}
                  </h3>
                </div>
              </div>

              <div className="text-sm sm:text-base mb-4 sm:mb-6 flex-grow">
                {step.description}
              </div>

              <div className="aspect-[4/3] bg-gray-100 shadow-md mt-auto relative">
                <img
                  alt={step.altText}
                  className="w-full h-full object-fill rounded-xl"
                  src={step.imageUrl}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
              <Link
                href="/dashboard/create"
                className="group inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:scale-101 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-600/50 w-full sm:w-auto max-w-xs"
              >
                Try Now Free
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
         
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;