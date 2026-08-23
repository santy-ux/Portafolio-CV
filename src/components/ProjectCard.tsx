import React from 'react';
import { ExternalLink, Github, Code } from 'lucide-react';

export interface ProjectItem {
  name: string;
  category?: string;
  description: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export const ProjectCard: React.FC<ProjectItem> = ({
  name,
  category,
  description,
  technologies = [],
  liveUrl,
  githubUrl,
  image,
}) => {
  return (
    <div
      id={`project-card-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      className="bg-[#181818] border border-[#262626] rounded-xl overflow-hidden shadow-2xl flex flex-col lg:flex-row transition-all duration-300 hover:border-[#3a3a3a]"
    >
      {/* Área visual / Captura con fondo temático */}
      <div className="lg:w-1/2 bg-[#2d3291] p-6 sm:p-10 flex items-center justify-center relative min-h-[260px] sm:min-h-[320px] overflow-hidden group">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-auto max-h-[280px] object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full min-h-[220px] bg-[#1a1a1a]/80 backdrop-blur-sm rounded-lg border border-white/10 p-6 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-xs text-white/50 font-mono">proyecto.dev</span>
            </div>
            <div className="my-auto text-center py-6">
              <Code className="w-12 h-12 text-[#ff4d5a] mx-auto mb-2 opacity-80" />
              <p className="text-white text-lg font-semibold">{name}</p>
              {category && <p className="text-white/70 text-xs mt-1">{category}</p>}
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="text-[10px] uppercase font-mono px-2 py-0.5 bg-black/40 text-white/80 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detalles del proyecto */}
      <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {name}
            </h3>
            {category && (
              <p className="text-lg sm:text-xl font-bold text-[#ff4d5a] mt-1">
                {category}
              </p>
            )}
          </div>

          <p className="text-[#cccccc] text-base sm:text-lg font-light leading-relaxed mb-6">
            {description}
          </p>

          {technologies && technologies.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs uppercase font-medium tracking-wider px-3 py-1 bg-[#222222] text-[#cccccc] border border-[#333333] rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enlaces de acción con estilo de subrayado rojo */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#262626]">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center text-sm sm:text-base font-bold tracking-widest text-white uppercase relative pb-1 transition-colors"
            >
              <span>VER PROYECTO</span>
              <ExternalLink size={15} className="ml-1.5 text-[#ff4d5a] group-hover:translate-x-0.5 transition-transform" />
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff4d5a]" />
            </a>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center text-sm sm:text-base font-bold tracking-widest text-white uppercase relative pb-1 transition-colors"
            >
              <span>VER CÓDIGO</span>
              <Github size={15} className="ml-1.5 text-[#ff4d5a] group-hover:translate-x-0.5 transition-transform" />
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff4d5a]" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
