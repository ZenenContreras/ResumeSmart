'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const faqCategories: FAQCategory[] = [
    {
      title: 'PRICING & ACCESS',
      items: [
        {
          question: 'Can I really download for free?',
          answer: 'Yes. Your first resume is 100% free, no credit card required. You only pay if you want to create more resumes.',
        },
        {
          question: 'What happens after I create my free resume?',
          answer: 'You can create 1 free resume each month. If you need more, the Pro plan costs $19 (one-time payment) for 10 resumes. No subscriptions or recurring charges.',
        },
        {
          question: 'Why don\'t you charge monthly like others?',
          answer: 'Because job hunting isn\'t monthly. You use the tool intensively for 2-4 weeks and then you get a job. Why pay $10/month for 6 months when you\'ll only use it for 1 month?',
        },
        {
          question: 'Do resumes expire?',
          answer: 'No. The Pro plan includes 10 resumes that you can use whenever you want. There\'s no expiration date.',
        },
      ],
    },
    {
      title: 'ABOUT ATS',
      items: [
        {
          question: 'What is an ATS?',
          answer: 'Applicant Tracking System. The software that 75% of companies use to automatically filter resumes before humans see them.',
        },
        {
          question: 'How do I know if my resume will pass the ATS?',
          answer: 'Our system gives you a score from 0-100. Above 80 = excellent probability. Below 60 = very likely automatic rejection. We show exactly what to fix.',
        },
        {
          question: 'Do all companies use ATS?',
          answer: '75% of medium/large companies do. Small startups might not. But optimizing for ATS also improves your resume for human readers (clearer, better structured).',
        },
        {
          question: 'Does the ATS score guarantee I\'ll get the job?',
          answer: 'No. The ATS score guarantees your resume REACHES human hands. Getting the job depends on your experience, interview, etc. But at least you\'ve passed the first filter.',
        },
      ],
    },
    {
      title: 'PRODUCT FEATURES',
      items: [
        {
          question: 'Can I create a resume without a job description?',
          answer: 'Of course! You can create a professional general resume without a specific position. It\'s perfect for having a base resume you can adapt later.',
        },
        {
          question: 'Does it work for any industry?',
          answer: 'Yes. It works for any job that has a job description. Tech, marketing, finance, education, healthcare, etc.',
        },
        {
          question: 'Can I edit my resume after creating it?',
          answer: 'Yes. You can edit all sections as many times as you want. The ATS score updates in real-time as you edit.',
        },
        {
          question: 'Can I change the design/template?',
          answer: 'Yes. We have 15+ professional templates (Pro plan). You can change the design without losing your content. All are ATS-friendly.',
        },
        {
          question: 'Can I download in Word or only PDF?',
          answer: 'Currently only PDF (the format companies prefer and ATS reads best). Word is coming soon.',
        },
        {
          question: 'Does the AI write my resume from scratch?',
          answer: 'No. You provide your real experience, the AI optimizes it: improves wording, adds keywords, quantifies achievements, adjusts format. We NEVER invent experience.',
        },
      ],
    },
    {
      title: 'COMPARISONS',
      items: [
        {
          question: 'Why not use ChatGPT for free?',
          answer: 'ChatGPT doesn\'t calculate ATS score, doesn\'t have ATS-friendly templates, and requires multiple prompts. ResumeSmart does everything in 3 minutes with a single flow.',
        },
        {
          question: 'How is it different from others?',
          answer: '1) They have a paywall AFTER creating (bait-and-switch). We offer free download. 2) They charge subscriptions ($2.95/week = $153/year). We charge $19 one-time. 3) They DON\'T show ATS score. We do, in real-time.',
        },
        {
          question: 'Is it better than a professional resume writer?',
          answer: 'Different. Resume writers cost $100-500 and take days. We cost $19 and take 3 minutes. For most people, our AI is sufficient. If you want a human touch, we offer recruiter review for $9 extra.',
        },
      ],
    },
    {
      title: 'SPECIAL CASES',
      items: [
        {
          question: 'Does it work if I have no work experience?',
          answer: 'Yes! The AI can optimize academic projects, internships, volunteer work, courses, certifications. We highlight your skills and potential even if you\'re entry-level.',
        },
        {
          question: 'Does it work for career changers?',
          answer: 'Absolutely. The AI identifies transferable skills from your previous experience and repositions them for your new target industry.',
        },
        {
          question: 'Can I use it if I have an employment gap?',
          answer: 'Yes. The AI helps you structure your resume to minimize the gap\'s impact and highlight what you HAVE done (freelancing, courses, personal projects).',
        },
        {
          question: 'Does it work for resumes in Spanish?',
          answer: 'Yes, we support Spanish, English, and Portuguese. The ATS score works for any language.',
        },
        {
          question: 'Does it work for academic or research resumes?',
          answer: 'The targeted model works well for academic jobs. For highly specialized research CVs (with publications, grants, etc.), we recommend using our general CV as a base and adding sections manually.',
        },
      ],
    },
    {
      title: 'TECHNICAL',
      items: [
        {
          question: 'What happens with my personal information?',
          answer: 'Your data is encrypted and never shared. We don\'t sell information. Only you have access to your resumes. You can delete your account and all your data at any time.',
        },
        {
          question: 'Does it work on mobile?',
          answer: 'Yes, but we recommend desktop/laptop for a better editing experience. You can download and review on mobile without any problem.',
        },
        {
          question: 'Do I need to install anything?',
          answer: 'No. It\'s 100% web-based. You only need a modern browser (Chrome, Firefox, Safari, Edge).',
        },
        {
          question: 'What format does my current resume need to be to upload it?',
          answer: 'PDF, DOCX, or plain text. You can also connect LinkedIn or simply paste the text.',
        },
      ],
    },
    {
      title: 'SUPPORT',
      items: [
        {
          question: 'What do I do if my resume doesn\'t generate?',
          answer: 'First, verify that the job description has at least 100 characters and your experience is complete. If the problem persists, contact us at resumesmart0@gmail.com - we respond within 24 hours.',
        },
        {
          question: 'Do you offer customer support?',
          answer: 'Yes. Email support for everyone (24-48hr response). Priority support for Ultimate users (response in <6 hours).',
        },
        {
          question: 'Can I ask for help improving my resume?',
          answer: 'Sure! Pro/Ultimate users can add Human Recruiter Review ($9) to receive personalized video feedback from a real recruiter.',
        },
      ],
    },
  ];

  return (
    <div id="faq" className="w-full min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 sm:mb-4 tracking-tighter">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Everything you need to know about{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
              ResumeSmart
            </span>
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8 sm:space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              {/* Category Title */}
              <div className="border-b-2 border-gray-200 pb-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-800 tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* FAQ Items */}
              <div className="space-y-3 sm:space-y-4">
                {category.items.map((item, itemIndex) => {
                  const key = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <div
                      key={itemIndex}
                      className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      {/* Question Button */}
                      <button
                        onClick={() => toggleItem(categoryIndex, itemIndex)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4">
                          {item.question}
                        </span>
                        <svg
                          className={`w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Answer */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-blue-200">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Still have questions?
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Can't find the answer you're looking for? Contact our support team.
            </p>
            <a href="mailto:resumesmart0@gmail.com">

            <button className="text-sm sm:text-base font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg sm:rounded-xl text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-102 shadow-xl hover:shadow-blue-600/40">
              Contact Support 
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;