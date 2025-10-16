'use client';

import React, { useState } from 'react';

interface PolicySection {
  title: string;
  content: string[];
}

const PrivacyPolicy = () => {
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>({});

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sections: PolicySection[] = [
    {
      title: '1. Information We Collect',
      content: [
        'Personal Information: When you create an account, we collect your name, email address, and authentication credentials through Clerk.',
        'Resume Data: We store the content you provide including your work experience, education, skills, and job descriptions you input.',
        'Usage Data: We collect information about how you interact with our service, including pages visited, features used, and time spent on the platform.',
        'Payment Information: Payment details are processed securely through Stripe. We do not store your credit card information on our servers.',
        'Technical Data: We collect IP addresses, browser type, device information, and operating system for security and analytics purposes.',
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'Service Delivery: To provide, maintain, and improve our resume optimization services.',
        'AI Processing: To generate optimized resumes using OpenAI\'s API based on your input.',
        'ATS Scoring: To analyze your resume against job descriptions and provide compatibility scores.',
        'Account Management: To manage your account, credits, and subscription status.',
        'Communication: To send service-related notifications, updates, and respond to your inquiries.',
        'Security: To detect, prevent, and address technical issues, fraud, or security threats.',
        'Analytics: To understand user behavior and improve our platform.',
      ],
    },
    {
      title: '3. Data Storage and Security',
      content: [
        'Database: Your data is stored securely on Supabase infrastructure with industry-standard encryption.',
        'Encryption: All data transmitted between your device and our servers is encrypted using SSL/TLS.',
        'AI Processing: Resume content is sent to OpenAI for processing. OpenAI does not use your data to train their models.',
        'Access Control: Only you have access to your resumes. Our team cannot view your resume content unless you explicitly grant permission for support purposes.',
        'Backups: Regular backups are performed to prevent data loss.',
      ],
    },
    {
      title: '4. Data Sharing and Third Parties',
      content: [
        'We do not sell your personal information to third parties. We share data only with the following service providers:',
        'Clerk: Authentication and user management.',
        'Supabase: Database hosting and storage.',
        'OpenAI: AI-powered resume generation and optimization.',
        'Stripe: Payment processing.',
        'Vercel: Application hosting and delivery.',
        'All third-party providers are bound by confidentiality agreements and comply with data protection regulations.',
      ],
    },
    {
      title: '5. Cookies and Tracking',
      content: [
        'Essential Cookies: Required for authentication and core functionality.',
        'Analytics Cookies: Used to understand usage patterns and improve the service.',
        'Third-Party Cookies: May be set by Stripe, Clerk, or analytics providers.',
        'You can disable cookies in your browser settings, though this may affect functionality.',
      ],
    },
    {
      title: '6. Your Rights and Choices',
      content: [
        'Access: You can access all your resume data at any time through your dashboard.',
        'Edit: You can modify or update your personal information and resumes.',
        'Delete: You can delete your account and all associated data at any time from your settings.',
        'Export: You can download your resumes in PDF format.',
        'Opt-Out: You can unsubscribe from promotional emails using the link in any email.',
        'Data Portability: You can request a copy of your data in a machine-readable format.',
      ],
    },
    {
      title: '7. Data Retention',
      content: [
        'Active Accounts: We retain your data as long as your account is active.',
        'Deleted Accounts: Upon account deletion, we permanently remove your data within 30 days.',
        'Legal Obligations: We may retain certain data longer if required by law or for legitimate business purposes (e.g., fraud prevention, financial records).',
        'Backups: Deleted data may persist in backups for up to 90 days before permanent deletion.',
      ],
    },
    {
      title: '8. Children\'s Privacy',
      content: [
        'Our service is not intended for users under 16 years of age.',
        'We do not knowingly collect personal information from children under 16.',
        'If we become aware that a user is under 16, we will delete their account and data immediately.',
        'Parents or guardians who believe their child has provided us with personal information should contact us.',
      ],
    },
    {
      title: '9. International Data Transfers',
      content: [
        'Your data may be transferred to and processed in countries other than your country of residence.',
        'We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.',
        'By using our service, you consent to the transfer of your information to the United States and other countries where our service providers operate.',
      ],
    },
    {
      title: '10. California Privacy Rights (CCPA)',
      content: [
        'California residents have additional rights under the California Consumer Privacy Act:',
        'Right to Know: Request disclosure of data collection and sharing practices.',
        'Right to Delete: Request deletion of personal information.',
        'Right to Opt-Out: Opt out of the sale of personal information (we do not sell data).',
        'Non-Discrimination: We will not discriminate against you for exercising your privacy rights.',
        'To exercise these rights, contact us at resumesmart0@gmail.com.',
      ],
    },
    {
      title: '11. European Privacy Rights (GDPR)',
      content: [
        'European Union residents have rights under the General Data Protection Regulation:',
        'Legal Basis: We process data based on consent, contract performance, and legitimate interests.',
        'Right to Access: Request a copy of your personal data.',
        'Right to Rectification: Correct inaccurate data.',
        'Right to Erasure: Request deletion of your data.',
        'Right to Restriction: Limit how we use your data.',
        'Right to Object: Object to data processing for marketing purposes.',
        'Right to Portability: Receive your data in a portable format.',
        'To exercise these rights or file a complaint, contact us or your local data protection authority.',
      ],
    },
    {
      title: '12. Changes to This Privacy Policy',
      content: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.',
        'Material changes will be notified via email or a prominent notice on our website.',
        'Continued use of the service after changes constitutes acceptance of the updated policy.',
        'We encourage you to review this policy periodically.',
      ],
    },
    {
      title: '13. Contact Information',
      content: [
        'If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:',
        'Email: resumesmart0@gmail.com',
        'Response Time: We respond to all inquiries within 48 hours.',
        'For urgent privacy matters or data deletion requests, please mark your email as "URGENT - Privacy Request".',
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 sm:mb-4 tracking-tighter">
            Privacy Policy
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4">
            Your privacy is important to us at{' '}
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
            This Privacy Policy explains how ResumeSmart ("we," "us," or "our") collects, uses,
            discloses, and protects your personal information when you use our resume optimization
            platform. By using our service, you agree to the collection and use of information in
            accordance with this policy.
          </p>
        </div>

        {/* Policy Sections */}
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
              Questions about your privacy?
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              We're here to help. Contact our privacy team for any concerns or data requests.
            </p>
            <a href="mailto:resumesmart0@gmail.com">
              <button className="text-sm sm:text-base font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg sm:rounded-xl text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-102 shadow-xl hover:shadow-blue-600/40">
                Contact Privacy Team
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
