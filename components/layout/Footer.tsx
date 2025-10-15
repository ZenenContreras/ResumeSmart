'use client';

import React from 'react';
import Logo from '../ui/Logo';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, link: string) => {
      e.preventDefault();

    // Check if we're on the home page
    if (window.location.pathname !== link ){
      // If not on home page, navigate to home page with hash
      window.location.href = `${link}#${targetId}`;
      return;
    }

    // If already on home page, smooth scroll to element

      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {/* Logo & Branding */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="h-7 w-7" />
              <span className="text-lg font-semibold text-gray-900">ResumeSmart</span>
            </div>
            <p className="text-sm text-gray-600">
              Build your perfect resume — smart, simple, and professional.
            </p>
          </div>

          {/* Product */}
          <div className='text-center'>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a onClick={(e) => handleSmoothScroll(e, 'why-yours-dont-work','/')}href="#why-yours-dont-work" className="hover:text-gray-900">Why Yours Don't Works?</a></li>
              <li><a onClick={(e) => handleSmoothScroll(e, 'how-it-works','/')} href="#how-it-works" className="hover:text-gray-900">How it Works</a></li>
              <li><a href="#pricing" className="hover:text-gray-900" onClick={(e) => handleSmoothScroll(e, 'pricing','/')}>Pricing</a></li>
              <li><Link onClick={(e) => handleSmoothScroll(e, 'faq','/faq')} href="#faq" className="hover:text-gray-900">FAQ</Link></li>
            </ul>
          </div>


          {/* Company */}
          <div className='text-center'>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">About</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className='text-center'>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">Terms</a></li>
              <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
              <li><a href="#" className="hover:text-gray-900">Refund</a></li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 sm:mb-0 items-center">
            <a href="https://www.instagram.com/resumesmart.io/" target='_blank' aria-label="Instagram" className="text-gray-600 hover:text-gray-900">
              <img className="h-5 w-5" src='/iconos/instagramIcon.svg'/>
            </a>
            <a href="https://x.com/ResumeSmartio" target='_blank' aria-label="X" className="text-gray-600 hover:text-gray-900">
              <img className="h-5 w-5" src='/iconos/xIcon.svg'/>
            </a>
            <a href="#" aria-label="Tiktok" target='_blank' className="text-gray-600 hover:text-gray-900">
              <img className="h-5 w-5" src='/iconos/tiktokIcon.svg'/>
            </a>
            <a href="https://www.threads.com/@resumesmart.io" target='_blank' aria-label="Threads" className="text-gray-600 hover:text-gray-900">
              <img className="h-5 w-5" src='/iconos/threadsIcon.svg'/>
            </a>
            <a href="#" aria-label="LinkedIn" target='_blank' className="text-gray-600 hover:text-gray-900">
              <img className="h-5 w-5" src='/iconos/linkedinIcon.svg'/>
            </a>
            <a href="#" aria-label="Reddit" target='_blank' className="text-gray-600 hover:text-gray-900">
              <img className="h-5 w-5" src='/iconos/redditIcon.svg'/>
            </a>
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
