import React from 'react';
import portfolioData from '../data/content.json';
import { SectionHeader } from './SectionHeader';
import { ProjectShowcase } from './ProjectShowcase';
import { ProjectItem } from '../types';

export const ProjectsSection: React.FC = () => {
  const { title, description, items } = portfolioData.portfolio.projects as {
    title: string;
    description: string;
    items: ProjectItem[];
  };

  return (
    <section id="projects" className="py-24 sm:py-32 lg:py-40 relative bg-[#181818] overflow-hidden">
      <div 
        className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-1/3 -right-48 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader title={title} subtitle={description} />

        {items && items.length > 0 ? (
          <>
            <div className="mt-16 sm:mt-24 lg:mt-28 space-y-28 sm:space-y-36 lg:space-y-48">
              {items.map((project, index) => (
                <ProjectShowcase key={project.id || index} project={project} index={index} />
              ))}
            </div>

            <div className="mt-20 sm:mt-28 text-center">
              <p
                id="more-projects-notice"
                className="text-xs sm:text-sm font-light tracking-widest text-white/35 uppercase select-none"
              >
                Más adelante habrán más proyectos
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-20 px-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-[#888888] text-base">Actualmente actualizando la lista de proyectos.</p>
          </div>
        )}
      </div>
    </section>
  );
};
