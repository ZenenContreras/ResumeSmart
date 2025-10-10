'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '../ui/Logo';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    // Check if we're on the home page
    if (window.location.pathname !== '/') {
      // If not on home page, navigate to home page with hash
      window.location.href = `/#${targetId}`;
      return;
    }

    // If already on home page, smooth scroll to element
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex justify-between items-center bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200 shadow-sm">
        <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, 'hero')}
          >
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-xl text-gray-900">ResumeSmart</span>
        </div>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-600">
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, 'hero')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <a
            href="#why-yours-dont-work"
            onClick={(e) => handleSmoothScroll(e, 'why-yours-dont-work')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Why Yours Don't Works?
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            How It Works?
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleSmoothScroll(e, 'pricing')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Pricing
          </a>
          <Link
            href="/faq"
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            FAQ
          </Link>
        </nav>

        {/* Clerk Authentication */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-20 h-20"
              }
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;