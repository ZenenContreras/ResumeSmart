'use client';

import React, { useState } from 'react';

interface TermsSection {
  title: string;
  content: string[];
}

const TermsOfService = () => {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections: TermsSection[] = [
    {
      title: '1. Acceptance of Terms',
      content: [
        'By accessing or using ResumeSmart, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
        'If you do not agree with any part of these terms, you may not use our service.',
        'We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance.',
        'You must be at least 16 years old to use this service.',
      ],
    },
    {
      title: '2. Description of Service',
      content: [
        'ResumeSmart is an AI-powered platform that helps you create optimized, ATS-friendly resumes.',
        'We provide resume generation, editing, ATS scoring, and PDF export features.',
        'Our service uses artificial intelligence (OpenAI) to optimize your resume content based on your input.',
        'We offer different pricing plans: Free (1 CV/month), Pro ($19 for 10 CVs), and Ultimate ($49 for 90 days unlimited).',
        'Service availability and features may vary based on your selected plan.',
      ],
    },
    {
      title: '3. User Accounts and Registration',
      content: [
        'You must create an account to use our service, providing accurate and complete information.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to notify us immediately of any unauthorized use of your account.',
        'You may not share your account with others or create multiple accounts to circumvent usage limits.',
        'We reserve the right to suspend or terminate accounts that violate these terms.',
      ],
    },
    {
      title: '4. User Content and Intellectual Property',
      content: [
        'You retain ownership of all content you provide (work experience, education, skills, etc.).',
        'By using our service, you grant us a limited license to process your content for the purpose of providing our services.',
        'You represent that you have the right to provide all content you submit and that it does not infringe on third-party rights.',
        'We do not claim ownership over the resumes you create using our platform.',
        'You may not use our service to create resumes containing false, misleading, or fraudulent information.',
        'ResumeSmart and its logos, design, and original content are protected by copyright, trademark, and other intellectual property laws.',
      ],
    },
    {
      title: '5. Pricing and Payment',
      content: [
        'Free Plan: Includes 1 resume per month at no charge. No credit card required.',
        'Pro Plan: One-time payment of $19 for 10 resume credits. Credits do not expire.',
        'Ultimate Plan: $49 for 90 days of unlimited resume creation plus additional features.',
        'All payments are processed securely through Stripe. We do not store your payment information.',
        'Prices are subject to change. Existing users will be notified 30 days before price changes affect them.',
        'You may be eligible for a refund within 7 days of purchase if the service does not meet expectations. Contact support for refund requests.',
      ],
    },
    {
      title: '6. Usage Credits and Limits',
      content: [
        'Free users receive 1 resume credit per month, reset on the 1st of each month.',
        'Pro users receive 10 credits upon purchase. Credits do not expire.',
        'Ultimate users have unlimited resume creation during their 90-day active period.',
        'Creating a new resume (targeted or general) consumes 1 credit.',
        'Editing existing resumes does not consume additional credits.',
        'Converting a general resume to a targeted version consumes 1 credit.',
        'Credits are non-transferable and cannot be refunded once used.',
      ],
    },
    {
      title: '7. Prohibited Uses',
      content: [
        'You may not use our service to create resumes containing false credentials, fabricated work history, or fraudulent information.',
        'You may not attempt to circumvent usage limits, credits, or paywalls through technical means.',
        'You may not reverse engineer, decompile, or attempt to extract our AI prompts or proprietary algorithms.',
        'You may not use automated tools (bots, scrapers) to access our service without written permission.',
        'You may not resell, redistribute, or commercialize resumes created on our platform as a service to others without a commercial license.',
        'You may not use our service for illegal purposes or to harass, abuse, or harm others.',
      ],
    },
    {
      title: '8. AI-Generated Content Disclaimer',
      content: [
        'Our AI service optimizes and improves your provided content but does not guarantee job placement or interview success.',
        'AI-generated suggestions are based on best practices but may require human review and customization.',
        'You are responsible for reviewing and verifying all AI-generated content before use.',
        'We do not guarantee that AI-generated resumes will pass all ATS systems, as each employer uses different criteria.',
        'ATS scores are estimates based on common ATS algorithms and should be used as guidance, not guarantees.',
      ],
    },
    {
      title: '9. Service Availability and Support',
      content: [
        'We strive to maintain 99.9% uptime but do not guarantee uninterrupted service availability.',
        'Scheduled maintenance will be announced in advance when possible.',
        'We provide email support to all users (24-48 hour response time).',
        'Ultimate plan users receive priority support (response within 6 hours).',
        'We are not liable for delays or failures caused by third-party services (OpenAI, Stripe, Clerk, Supabase).',
      ],
    },
    {
      title: '10. Data Privacy and Security',
      content: [
        'We collect and process your data in accordance with our Privacy Policy.',
        'Your resume data is stored securely and encrypted in transit and at rest.',
        'We use third-party services (OpenAI, Supabase, Clerk) that have access to your data as necessary to provide our services.',
        'You can delete your account and all associated data at any time from your account settings.',
        'We do not sell your personal information to third parties.',
      ],
    },
    {
      title: '11. Refund Policy',
      content: [
        'Free Plan: No refunds applicable as the service is free.',
        'Pro Plan: Refund available within 7 days of purchase if you have used 0 credits. Partial refunds for unused credits may be considered on a case-by-case basis.',
        'Ultimate Plan: Refund available within 7 days if you have created fewer than 3 resumes. Prorated refunds may be available after 7 days.',
        'To request a refund, contact resumesmart0@gmail.com with your order details and reason.',
        'Refunds are processed within 5-10 business days to your original payment method.',
        'Accounts receiving refunds may have access revoked and credits removed.',
      ],
    },
    {
      title: '12. Limitation of Liability',
      content: [
        'ResumeSmart is provided "as is" without warranties of any kind, express or implied.',
        'We do not guarantee that our service will meet your specific requirements or result in job offers.',
        'We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the service.',
        'Our total liability to you for any claims related to the service is limited to the amount you paid in the last 12 months.',
        'We are not responsible for the content you create or decisions made by employers based on resumes created using our platform.',
      ],
    },
    {
      title: '13. Indemnification',
      content: [
        'You agree to indemnify and hold ResumeSmart harmless from any claims, damages, or expenses arising from:',
        'Your violation of these Terms of Service.',
        'Your violation of any third-party rights, including intellectual property or privacy rights.',
        'Content you provide that contains false, fraudulent, or misleading information.',
        'Your use of the service in a manner not authorized by these terms.',
      ],
    },
    {
      title: '14. Termination',
      content: [
        'You may terminate your account at any time by deleting it from your account settings.',
        'We reserve the right to suspend or terminate your account if you violate these Terms of Service.',
        'Upon termination, you lose access to all saved resumes and unused credits.',
        'We may retain certain data as required by law or for legitimate business purposes (e.g., fraud prevention).',
        'Provisions regarding intellectual property, limitation of liability, and indemnification survive termination.',
      ],
    },
    {
      title: '15. Third-Party Services',
      content: [
        'Our service integrates with third-party providers: Clerk (authentication), Supabase (database), OpenAI (AI), Stripe (payments), and Vercel (hosting).',
        'Your use of these services is subject to their respective terms of service and privacy policies.',
        'We are not responsible for the actions, policies, or content of third-party services.',
        'Links to third-party websites or services are provided for convenience and do not imply endorsement.',
      ],
    },
    {
      title: '16. Dispute Resolution and Governing Law',
      content: [
        'These Terms of Service are governed by the laws of the United States and the state of Delaware, without regard to conflict of law principles.',
        'Any disputes arising from these terms or your use of the service will be resolved through binding arbitration, except where prohibited by law.',
        'You agree to resolve disputes individually and waive the right to participate in class actions.',
        'If arbitration is unavailable, disputes will be handled in the state or federal courts located in Delaware.',
      ],
    },
    {
      title: '17. Changes to Terms',
      content: [
        'We reserve the right to modify these Terms of Service at any time.',
        'Material changes will be communicated via email or a prominent notice on our website at least 30 days before taking effect.',
        'Continued use of the service after changes constitutes acceptance of the updated terms.',
        'If you do not agree with the changes, you may terminate your account.',
      ],
    },
    {
      title: '18. Contact Information',
      content: [
        'If you have questions about these Terms of Service, please contact us:',
        'Email: resumesmart0@gmail.com',
        'Response Time: We respond to all inquiries within 48 hours.',
        'For legal or compliance matters, please mark your email as "URGENT - Legal Matter".',
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 sm:mb-4 tracking-tighter">
            Terms of Service
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4">
            Legal agreement for using{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
              ResumeSmart
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Last Updated: October 15, 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-6 sm:p-8 mb-8 shadow-sm">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            These Terms of Service  govern your access to and use of ResumeSmart's
            website, services, and applications. Please read these
            terms carefully before using our platform. By accessing or using the Service, you
            acknowledge that you have read, understood, and agree to be bound by these Terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => {
            const isOpen = openSections[index];

            return (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Section Title Button */}
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900 pr-4">
                    {section.title}
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

                {/* Section Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[2000px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
                    <ul className="space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <li
                          key={pIndex}
                          className="text-sm text-gray-700 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600 before:font-bold"
                        >
                          {paragraph}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-blue-200">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Questions about our terms?
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Need clarification on any of these terms? Our legal team is here to help.
            </p>
            <a href="mailto:resumesmart0@gmail.com">
              <button className="text-sm sm:text-base font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg sm:rounded-xl text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-102 shadow-xl hover:shadow-blue-600/40">
                Contact Legal Team
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
