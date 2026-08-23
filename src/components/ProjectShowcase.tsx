import React from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../types';
import { ProjectImage } from './ProjectImage';
import { ProjectLinks } from './ProjectLinks';

interface ProjectShowcaseProps {
  project: ProjectItem;
  index: number;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project, index }) => {
  // Alternancia visual: proyectos pares muestran texto a la izquierda, impares a la derecha en escritorio
  const isImageOnLeft = index % 2 !== 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full"
    >
      <div
        className={`flex flex-col lg:items-center gap-10 sm:gap-14 lg:gap-12 xl:gap-16 ${
          isImageOnLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        <div className="w-full lg:w-[32%] xl:w-[30%] flex flex-col justify-center space-y-4 sm:space-y-5 order-1 lg:order-none">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#ff4d5a] uppercase">
              {project.category}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight">
            {project.title}
          </h3>

          <p className="text-[#c4c4c4] text-sm sm:text-base font-light leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <ProjectLinks liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
        </div>

        <div className="w-full lg:w-[68%] xl:w-[70%] order-2 lg:order-none">
          <ProjectImage
            image={project.image}
            title={project.title}
            liveUrl={project.liveUrl}
            isImageOnRight={!isImageOnLeft}
            themeColor={project.themeColor}
          />
        </div>
      </div>
    </motion.article>
  );
};
