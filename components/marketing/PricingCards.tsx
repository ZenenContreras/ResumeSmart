'use client';

import React from 'react';
import Link from 'next/link';

const PricingCards = () => {
  return (
    <div id="pricing" className="bg-white py-10 sm:py-12 lg:py-22 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            Pricing Plans
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600">
            Choose the plan that best suits your needs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* FREE Plan */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col h-full shadow-lg">
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">FREE</h2>
              <p className="mt-1 text-sm font-semibold text-gray-500">Try Before You Buy</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-sm sm:text-base font-semibold text-gray-500">Forever</span>
              </div>

              <ul className="mt-6 space-y-2.5 text-gray-700 text-sm">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">1 optimized resume/month</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">Full ATS Score</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">PDF Download without paywall</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">3 professional templates</span>
                </li>

                {/* Disabled features */}
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">10 Resumes + 10 Cover Letters</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">15 premium templates</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">LinkedIn optimizer</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Interview prep (10 questions)</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Money-back guarantee</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Unlimited resumes (3 per day)</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Recruiter review with video</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Mock interviews with AI</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Salary negotiation scripts</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Priority support 24hrs</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link
                href="/signup"
                className="block w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                Start Now
              </Link>
            </div>
          </div>

          {/* PRO Plan - Most Popular */}
          <div className="relative bg-white border-2 border-blue-600 rounded-xl p-6 flex flex-col h-full shadow-2xl md:col-span-2 lg:col-span-1 lg:scale-105">
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <div className="bg-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded-full px-4 py-1.5">
                MOST POPULAR
              </div>
            </div>

            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-600">PRO</h2>
              <p className="mt-1 text-sm font-semibold text-purple-600">78% of users choose this</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">$19</span>
                <span className="text-sm sm:text-base font-semibold text-gray-500">One Time</span>
              </div>

              <ul className="mt-6 space-y-2.5 text-gray-700 text-sm">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">10 Resumes + 10 Cover Letters</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">15 premium templates</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">LinkedIn optimizer</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">Interview prep (10 questions)</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">Money-back guarantee</span>
                </li>

                {/* Disabled features */}
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Unlimited resumes (3 per day)</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Recruiter review with video</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Mock interviews with AI</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Salary negotiation scripts</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-2">Priority support 24hrs</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link
                href="/purchase?plan=pro"
                className="block w-full text-center rounded-lg px-4 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
              >
                Select PRO Plan
              </Link>
            </div>
          </div>

          {/* ULTIMATE Plan */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col h-full shadow-lg">
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-600">ULTIMATE</h2>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">$49</span>
                <span className="text-sm sm:text-base font-semibold text-gray-500">90 Days</span>
              </div>
              <p className="mt-3 text-sm text-gray-600">EVERYTHING in Pro, PLUS:</p>

              <ul className="mt-6 space-y-2.5 text-gray-700 text-sm">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">Unlimited resumes (3 per day)</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">Recruiter review with video</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">Mock interviews with AI</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-2">Salary negotiation scripts</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 mt-0.5 text-amber-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 font-semibold text-amber-600">Priority support 24hrs</span>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Link
                href="/purchase?plan=ultimate"
                className="block w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold text-purple-600 bg-purple-100 hover:bg-purple-200 transition-colors"
              >
                Get ULTIMATE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;