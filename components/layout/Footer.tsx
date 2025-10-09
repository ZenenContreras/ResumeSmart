'use client';

import React from 'react';
import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Logo className="h-6 w-6" />
            <span className="text-lg font-semibold text-gray-900">ResumeSmart</span>
          </div>
          <p className="text-sm text-gray-600">
            © 2025 ResumeSmart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;