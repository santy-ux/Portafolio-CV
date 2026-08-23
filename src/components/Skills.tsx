import React from 'react';
import contentData from '../data/content.json';
import { TechIcon, getTechTheme } from './TechIcon';

export const Skills: React.FC = () => {
  const { technologies } = contentData.portfolio.skills;

  return (
    <div id="skills-container" className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {technologies.map((tech) => {
          const theme = getTechTheme(tech);

          return (
            <div
              key={tech}
              id={`skill-card-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-[#181818] border ${theme.border} transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl ${theme.glow} group cursor-default select-none`}
            >
              <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105">
                <TechIcon
                  name={tech}
                  className="w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] object-contain"
                />
              </div>
              <span className="text-white text-xs sm:text-sm font-medium tracking-wider uppercase text-center mt-1">
                {tech}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
