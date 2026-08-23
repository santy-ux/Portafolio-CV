import React from 'react';

interface ProjectLinksProps {
  liveUrl: string;
  githubUrl?: string;
}

export const ProjectLinks: React.FC<ProjectLinksProps> = ({ liveUrl, githubUrl }) => {
  return (
    <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-3">
      {/* Enlace a la aplicación en vivo */}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center pb-1 text-sm sm:text-base font-bold tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:text-[#ff4d5a]"
          aria-label="Abrir aplicación en vivo en una nueva pestaña"
        >
          <span>VER PROYECTO</span>
          {/* Subrayado rojo animado */}
          <span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff4d5a] origin-left transition-transform duration-300 ease-out group-hover:scale-x-105"
            aria-hidden="true"
          />
        </a>
      )}

      {/* Enlace a más detalles / repositorio */}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center pb-1 text-sm sm:text-base font-bold tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:text-[#ff4d5a]"
          aria-label="Ver código en GitHub en una nueva pestaña"
        >
          <span>SABER MÁS</span>
          {/* Subrayado rojo animado */}
          <span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff4d5a] origin-left transition-transform duration-300 ease-out group-hover:scale-x-105"
            aria-hidden="true"
          />
        </a>
      )}
    </div>
  );
};
