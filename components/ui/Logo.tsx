import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8" }) => {
  return (
      <svg className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L12 6" stroke="url(#gradient-1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 18L12 22" stroke="url(#gradient-2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M22 12L18 12" stroke="url(#gradient-3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M6 12L2 12" stroke="url(#gradient-4)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M18.364 5.63604L15.5355 8.46447" stroke="url(#gradient-5)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M8.46447 15.5355L5.63604 18.364" stroke="url(#gradient-6)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M18.364 18.364L15.5355 15.5355" stroke="url(#gradient-7)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M8.46447 8.46447L5.63604 5.63604" stroke="url(#gradient-8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        <defs>
          <linearGradient id="gradient-1" x1="12" x2="12" y1="2" y2="6">
            <stop offset="0%" stopColor="#2563EB"></stop>
            <stop offset="100%" stopColor="#7C3AED"></stop>
          </linearGradient>
          <linearGradient id="gradient-2" x1="12" x2="12" y1="18" y2="22">
            <stop offset="0%" stopColor="#7C3AED"></stop>
            <stop offset="100%" stopColor="#2563EB"></stop>
          </linearGradient>
          <linearGradient id="gradient-3" x1="22" x2="18" y1="12" y2="12">
            <stop offset="0%" stopColor="#F59E0B"></stop>
            <stop offset="100%" stopColor="#7C3AED"></stop>
          </linearGradient>
          <linearGradient id="gradient-4" x1="6" x2="2" y1="12" y2="12">
            <stop offset="0%" stopColor="#2563EB"></stop>
            <stop offset="100%" stopColor="#F59E0B"></stop>
          </linearGradient>
          <linearGradient id="gradient-5" x1="18.364" x2="15.5355" y1="5.63604" y2="8.46447">
            <stop offset="0%" stopColor="#F59E0B"></stop>
            <stop offset="100%" stopColor="#7C3AED"></stop>
          </linearGradient>
          <linearGradient id="gradient-6" x1="8.46447" x2="5.63604" y1="15.5355" y2="18.364">
            <stop offset="0%" stopColor="#2563EB"></stop>
            <stop offset="100%" stopColor="#F59E0B"></stop>
          </linearGradient>
          <linearGradient id="gradient-7" x1="18.364" x2="15.5355" y1="18.364" y2="15.5355">
            <stop offset="0%" stopColor="#7C3AED"></stop>
            <stop offset="100%" stopColor="#2563EB"></stop>
          </linearGradient>
          <linearGradient id="gradient-8" x1="8.46447" x2="5.63604" y1="8.46447" y2="5.63604">
            <stop offset="0%" stopColor="#F59E0B"></stop>
            <stop offset="100%" stopColor="#2563EB"></stop>
          </linearGradient>
        </defs>
    </svg>
  );
};

export default Logo;