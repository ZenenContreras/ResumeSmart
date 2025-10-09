'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '../ui/Logo';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-10 py-4 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex justify-between items-center bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-xl text-gray-900">ResumeSmart</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/templates" className="hover:text-blue-600 transition-colors">
            Templates
          </Link>
          <Link href="/how-it-works" className="hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-colors">
            Pricing
          </Link>
        </nav>

        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;