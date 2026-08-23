import React from 'react';
import { ArrowDown } from 'lucide-react';
import contentData from '../data/content.json';

export const Hero: React.FC = () => {
  const { hero } = contentData.portfolio;

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 sm:px-10 text-center select-none"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-light text-white tracking-tight leading-[1.18] font-['Raleway',sans-serif]">
          {hero.greeting}{' '}
          <span className="text-[#ff4d5a] font-light">{hero.name}</span>.
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-light text-white tracking-tight mt-4 sm:mt-6 max-w-3xl leading-[1.25] font-['Raleway',sans-serif]">
          {hero.subtitle}
        </p>

        <div className="mt-10 sm:mt-14">
          <a
            id="hero-cta-button"
            href={hero.cta.target}
            onClick={(e) => handleCtaClick(e, hero.cta.target)}
            className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 border border-[#ff4d5a] bg-transparent text-white text-base sm:text-lg font-light tracking-wide rounded-none hover:bg-[#ff4d5a] hover:text-white transition-all duration-300 shadow-sm"
          >
            <span>{hero.cta.text}</span>
            <ArrowDown
              size={18}
              className="text-[#ff4d5a] group-hover:text-white group-hover:translate-y-1 transition-transform duration-300"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
