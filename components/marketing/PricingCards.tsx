'use client';

import React from 'react';
import Link from 'next/link';

const PricingCards = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            Pricing Plans
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that best suits your needs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* FREE Plan */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col h-full shadow-lg">
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-gray-900">FREE</h2>
              <p className="mt-2 text-sm font-semibold text-gray-500">Try Before You Buy</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-gray-900">$0</span>
                <span className="text-lg font-semibold text-gray-500">- Forever</span>
              </div>

              <ul className="mt-8 space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">1 optimized resume/month</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">Full ATS Score</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">PDF Download without paywall</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">3 professional templates</span>
                </li>

                {/* Disabled features */}
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">10 Resumes + 10 Cover Letters</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">15 premium templates</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">LinkedIn optimizer</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Interview prep (10 questions)</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Money-back guarantee</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Unlimited resumes (3 per day)</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Recruiter review with video</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Mock interviews with AI</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Salary negotiation scripts</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Priority support 24hrs</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link
                href="/signup"
                className="block w-full text-center rounded-lg px-6 py-3 text-base font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                Start Now
              </Link>
            </div>
          </div>

          {/* PRO Plan - Most Popular */}
          <div className="relative bg-white border-2 border-blue-600 rounded-xl p-8 flex flex-col h-full shadow-2xl transform lg:scale-105">
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <div className="bg-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded-full px-4 py-1.5">
                MOST POPULAR
              </div>
            </div>

            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-blue-600">PRO</h2>
              <p className="mt-2 text-sm font-semibold text-purple-600">78% of users choose this</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-gray-900">$19</span>
                <span className="text-lg font-semibold text-gray-500">- One Time</span>
              </div>

              <ul className="mt-8 space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">10 Resumes + 10 Cover Letters</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">15 premium templates</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">LinkedIn optimizer</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">Interview prep (10 questions)</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">Money-back guarantee</span>
                </li>

                {/* Disabled features */}
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Unlimited resumes (3 per day)</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Recruiter review with video</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Mock interviews with AI</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Salary negotiation scripts</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <svg className="flex-shrink-0 h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                  <span className="ml-3">Priority support 24hrs</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link
                href="/purchase?plan=pro"
                className="block w-full text-center rounded-lg px-6 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
              >
                Select PRO Plan
              </Link>
            </div>
          </div>

          {/* ULTIMATE Plan */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col h-full shadow-lg">
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-purple-600">ULTIMATE</h2>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-gray-900">$49</span>
                <span className="text-lg font-semibold text-gray-500">- 90 Days</span>
              </div>
              <p className="mt-4 text-gray-600">EVERYTHING in Pro, PLUS:</p>

              <ul className="mt-8 space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">Unlimited resumes (3 per day)</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">Recruiter review with video</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">Mock interviews with AI</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3">Salary negotiation scripts</span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-6 w-6 text-amber-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="ml-3 font-semibold text-amber-600">Priority support 24hrs</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link
                href="/purchase?plan=ultimate"
                className="block w-full text-center rounded-lg px-6 py-3 text-base font-semibold text-purple-600 bg-purple-100 hover:bg-purple-200 transition-colors"
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