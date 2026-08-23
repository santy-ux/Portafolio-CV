import React from 'react';
import contentData from '../data/content.json';
import { SectionHeader } from './SectionHeader';
import { Skills } from './Skills';

export const About: React.FC = () => {
  const { about } = contentData.portfolio;

  return (
    <section
      id="about"
      className="py-20 sm:py-28 px-6 sm:px-10 relative z-10 max-w-6xl mx-auto"
    >
      <SectionHeader title={about.title} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Silueta geométrica con degradado representativo */}
          <div className="mb-8 relative flex items-center justify-center">
            <svg
              className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-md"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="avatarGradient" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#51a2e9" />
                  <stop offset="100%" stopColor="#ff4d5a" />
                </linearGradient>
              </defs>
              <path
                d="M50 18 C39 18 36 28 36 38 C36 48 40 54 50 54 C60 54 64 48 64 38 C64 28 61 18 50 18 Z"
                stroke="url(#avatarGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 78 C24 64 34 58 50 58 C66 58 76 64 76 78"
                stroke="url(#avatarGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="text-[#cccccc] text-base sm:text-lg font-light leading-relaxed space-y-4">
            <p id="about-bio-text">
              {about.description}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 w-full">
          <Skills />
        </div>
      </div>
    </section>
  );
};
