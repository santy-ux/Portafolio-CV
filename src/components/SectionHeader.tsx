import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, id }) => {
  return (
    <div id={id} className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
      <div className="relative inline-block">
        <h2 className="relative z-10 text-3xl sm:text-5xl md:text-5xl font-bold tracking-tight text-white uppercase sm:normal-case">
          {title}
        </h2>
        <div 
          className="h-2 sm:h-2.5 w-16 sm:w-20 bg-[#ff4d5a] mx-auto mt-2" 
          aria-hidden="true"
        />
      </div>
      {subtitle && (
        <p className="mt-6 text-[#cccccc] max-w-2xl text-base sm:text-lg font-light leading-relaxed px-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};
