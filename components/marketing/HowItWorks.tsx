'use client';

import React from 'react';

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="bg-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-22">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
            Your Path to a Winning Resume
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            Discover how our AI platform guides you step by step to create a resume that opens doors and beats Applicant Tracking Systems (ATS).
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Steps Column */}
            <div className="space-y-8 sm:space-y-10">
              {/* Step 1 */}
              <div className="relative flex items-start gap-4 sm:gap-5 step-item">
                <div className="step-line"></div>
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white text-lg sm:text-xl font-bold z-10">
                  1
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                    Upload or Start Fresh
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Import your existing resume in any format or choose from our professional templates. Our AI will extract and organize your information automatically.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-4 sm:gap-5 step-item">
                <div className="step-line"></div>
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600 text-white text-lg sm:text-xl font-bold z-10">
                  2
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                    Instant AI Optimization
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Our AI analyzes your resume and the job you're targeting, suggesting content improvements, action verbs, and industry-specific keywords to maximize your impact and ATS compatibility.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-4 sm:gap-5 step-item">
                <div className="step-line"></div>
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500 text-white text-lg sm:text-xl font-bold z-10">
                  3
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                    Customize and Preview
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Adjust the design, colors, and fonts with our intuitive editor. See changes in real-time and ensure your resume perfectly reflects your personal brand.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-start gap-4 sm:gap-5 step-item">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 text-white text-lg sm:text-xl font-bold z-10">
                  4
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                    Download and Get Interviews
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Export your optimized resume in ATS-proof PDF format with a single click. You'll be ready to apply with confidence and land more interviews.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Assistant Preview */}
            <div className="sticky top-24">
              <div className="relative h-[400px] sm:h-[500px] lg:h-[550px] bg-gray-900/90 rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>

                {/* Browser Window Frame */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex-shrink-0 p-3 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-6 overflow-y-auto">
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <h4 className="font-bold text-lg text-white">ResumeSmart AI Assistant</h4>
                        <p className="text-sm text-gray-300">Analyzing your profile for "Frontend Developer" position...</p>
                      </div>

                      {/* AI Suggestions */}
                      <div className="bg-blue-600/20 p-4 rounded-lg mb-4 border border-blue-600/30">
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          <div>
                            <h5 className="font-semibold text-blue-400">Keyword Suggestion</h5>
                            <p className="text-sm text-gray-200">Consider adding "Responsive Design" to your skills. It's one of the top 10 keywords for this role.</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-600/20 p-4 rounded-lg mb-4 border border-purple-600/30">
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-purple-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <div>
                            <h5 className="font-semibold text-purple-400">ATS Optimization</h5>
                            <p className="text-sm text-gray-200">Your "Experience" section has 95% ATS compatibility. Excellent! To improve, quantify achievements with numbers.</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-500/20 p-4 rounded-lg border border-amber-500/30">
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-amber-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <div>
                            <h5 className="font-semibold text-amber-400">Writing Enhancement</h5>
                            <p className="text-sm text-gray-200">Instead of "Responsible for...", try action verbs like "Led the development of..." for greater impact.</p>
                          </div>
                        </div>
                      </div>

                      {/* Download Button */}
                      <div className="mt-auto pt-6 text-center">
                        <button className="w-full flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-green-500 text-white text-base font-bold shadow-lg hover:bg-green-600 transition-transform hover:scale-105">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Download Optimized Resume</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 border-y border-gray-200 py-10 sm:py-14 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
            Ready to Make Your Resume Work for You?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-gray-600">
            Join thousands of professionals who have already landed their dream jobs with ResumeSmart.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center justify-center rounded-lg h-10 sm:h-11 px-6 sm:px-8 bg-blue-600 text-white text-sm sm:text-base font-bold shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
              <span>Start Now</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;