import React from 'react';
import captura1Img from '../image/captura1.png';
import captura2Img from '../image/captura2.png';

interface ProjectImageProps {
  image: string;
  title: string;
  liveUrl: string;
  isImageOnRight?: boolean;
  themeColor?: string;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  image,
  title,
  liveUrl,
  isImageOnRight = true,
  themeColor = 'violet',
}) => {
  const resolvedImage =
    image.includes('captura1') || title.toLowerCase().includes('honda') || title.toLowerCase().includes('cbr')
      ? captura1Img
      : image.includes('captura2') || title.toLowerCase().includes('montessori')
      ? captura2Img
      : image;

  const isRedTheme = themeColor === 'red';
  const blockBackgroundClass = isRedTheme
    ? 'bg-gradient-to-tr from-[#a4133c] via-[#d62828] to-[#ff3c00] shadow-red-950/50'
    : 'bg-[#6d28d9] shadow-purple-950/40';

  return (
    <div className="relative w-full pt-8 pb-4 px-2 sm:px-4 group">
      {/* Bloque de acento decorativo desplazado detrás del marco del proyecto */}
      <div
        className={`absolute rounded-2xl sm:rounded-3xl ${blockBackgroundClass} transition-transform duration-500 ease-out pointer-events-none z-0 ${
          isImageOnRight
            ? 'top-0 right-0 sm:-right-4 w-[90%] sm:w-[94%] h-[88%] sm:h-[92%] group-hover:-translate-y-1 group-hover:translate-x-1'
            : 'top-0 left-0 sm:-left-4 w-[90%] sm:w-[94%] h-[88%] sm:h-[92%] group-hover:-translate-y-1 group-hover:translate-x-1'
        } shadow-2xl`}
        aria-hidden="true"
      />

      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver proyecto en vivo: ${title}`}
        className="relative block z-10 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#121212] shadow-2xl shadow-black/80 transition-all duration-500 ease-out group-hover:border-white/20 group-hover:shadow-black/95"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#161616]">
          <img
            src={resolvedImage}
            alt={`Captura de ${title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-90"
          />

          <div 
            className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 backdrop-blur-[1px]" 
            aria-hidden="true" 
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#161616]/95 border border-white/25 text-white font-bold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-2xl backdrop-blur-md opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-[#ff4d5a]/70">
              <span className="text-white">VER PROYECTO</span>
              <span className="text-[#ff4d5a] text-base leading-none font-sans">↗</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
