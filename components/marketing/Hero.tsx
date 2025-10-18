'use client';

import React from 'react';
import Link from 'next/link';
import { Waitlist } from '@clerk/nextjs';

const Hero = () => {
  return (
    <div id="hero" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <div className="flex min-h-screen flex-col justify-center pt-20 ">
        {/* Main Title */}
        <div className="w-full max-w-4xl mx-auto text-center mb-8 sm:mb-12">
          <h1 className="text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-tight">
            The Resume that <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Finally</span> Gets You Interviews
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Left Content - Now centered */}
          <div className="space-y-6 sm:space-y-8 text-center md:mt-14">
            <div className="text-base sm:text-lg md:text-xl text-gray-600">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-3 sm:mb-4">
                <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-lg sm:text-xl md:text-2xl tracking-wide uppercase shadow-md transform -rotate-2">
                  AI
                </span>
                <span className="text-xl sm:text-2xl mx-1 text-gray-900 font-bold">+</span>
                <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-purple-600/20 text-purple-600 font-extrabold text-lg sm:text-xl md:text-2xl tracking-wide uppercase shadow-md border border-purple-600/30 transform rotate-2">
                  ATS Optimization
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl mx-1 text-gray-900 font-bold">+</span>
                <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-green-500/20 text-green-600 font-extrabold text-lg sm:text-xl md:text-2xl tracking-wide uppercase shadow-md border border-green-500/30 transform -rotate-1">
                  Professional Templates
                </span>
              </div>
              <p className="text-gray-600 text-base sm:text-lg">
                Everything in one place. Everything in 3 minutes.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:gap-6">
              <a
                href="/dashboard/create"
                className="group inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 hover:scale-101 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-600/50 w-full sm:w-auto max-w-xs"
              >
                Create Free
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>

              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-x-4 lg:gap-x-6 gap-y-2">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                  <svg aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                  </svg>
                  <span>1st Resume Free</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                  <svg aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                  </svg>
                  <span>No Paywall</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lado derecho: simulación HTML de la UI con cards flotantes */}
          <div className="relative hidden lg:block w-full overflow-visible min-h-[400px] ">
            <div className="relative max-w-[900px] mx-auto h-[600px]">
              {/* Card izquierda - Preview Resume (base layer) */}
              <div className="absolute top-0 left-0 bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-2xl rounded-2xl p-8 w-[340px] z-10 shadow-purple-100 ">
                <div className="">
                  <h2 className="font-bold text-2xl text-gray-900 mb-1">John Doe</h2>
                  <p className="text-gray-500 text-sm mb-6">john.doe@example.com | (555) 123-4567</p>

                  <div className="mb-5">
                    <h3 className="text-gray-900 font-bold text-sm mb-2 border-b border-gray-900 pb-1">Job Title</h3>
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-gray-900 font-bold text-sm mb-2">Responsabilities </h3>
                    <ul className="text-xs text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>Led & personalized engineering team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span><strong>Reducing</strong> bug rate <strong>35%</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span><strong>Accelerating</strong> delivery speed <strong>50%</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card derecha - AI Optimization (top layer, overlapping) */}
              <div className="absolute top-10 left-[300px] bg-white border border-gray-200 shadow-2xl rounded-2xl p-6 w-[340px] z-20 shadow-purple-100 ">
                <h3 className="font-bold text-gray-900 text-lg mb-4"><span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 '>AI </span>Optimization</h3>

                <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-5">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">Improvement suggestions</p>
                      <p className="text-sm text-purple-900">
                        Consider adding relevant skills to this position
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900">Job Title</p>
                      <div className="flex items-center gap-1">
                        <div className="h-2 bg-purple-500 rounded-full w-52"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ul className="space-y-1.5 text-sm text-gray-900 font-semibold">
                      <li className="flex items-center gap-2">
                        <span>Bullet Points</span>
                        <div className="flex-1 ml-2">
                          <div className="h-2 bg-purple-400 rounded-full w-[90%]]"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">ATS score</p>
                      <p className="text-xs text-gray-600">Keyword optimization</p>
                    </div>
                    <div className="relative">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="34" stroke="#e5e7eb" strokeWidth="8" fill="none"/>
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          stroke="#c27bff"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="213.628"
                          strokeDashoffset="21.36"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-purple-500">92</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;