'use client';

import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Background animated blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="flex min-h-screen flex-col justify-center pt-24 pb-12">
        {/* Main Title */}
        <div className="w-full max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 sm:text-5xl md:text-7xl tracking-tighter">
            The Resume that <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Finally</span> Gets You Interviews
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Now centered */}
          <div className="space-y-8 text-center">
            <div className="text-lg text-gray-600 md:text-xl">
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-2xl tracking-wide uppercase shadow-md transform -rotate-2">
                  AI
                </span>
                <span className="text-2xl mx-1 text-gray-900">+</span>
                <span className="inline-block px-4 py-2 rounded-lg bg-purple-600/20 text-purple-600 font-extrabold text-2xl tracking-wide uppercase shadow-md border border-purple-600/30 transform rotate-2">
                  ATS Optimization
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="text-2xl mx-1 text-gray-900">+</span>
                <span className="inline-block px-4 py-2 rounded-lg bg-green-500/20 text-green-600 font-extrabold text-2xl tracking-wide uppercase shadow-md border border-green-500/30 transform -rotate-1">
                  Professional Templates
                </span>
              </div>
              <p className="text-gray-600">
                Everything in one place. Everything in 3 minutes.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <Link
                href="/create-resume"
                className="group inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-600/50"
              >
                Create Free
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>

              <div className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 gap-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg aria-hidden="true" className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                  </svg>
                  <span>1st Resume Free</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg aria-hidden="true" className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                  </svg>
                  <span>No Paywall</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg aria-hidden="true" className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                  </svg>
                  <span>89% Pass ATS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="flex justify-center items-center">
            <div className="relative w-full aspect-video rounded-xl shadow-2xl shadow-purple-600/20 border border-gray-200 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>

              {/* Placeholder for video - replace with actual video iframe */}
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  <p className="text-gray-600">Video Demo</p>
                </div>
              </div>

              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;