import React from 'react';
import { ChevronUp, Github, Instagram, FileText} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[#141414] border-t border-[#222222] py-10 px-6 sm:px-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6">
        {/* Botón para volver arriba */}
        <button
          id="back-to-top-button"
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-[#202020] border border-[#333333] flex items-center justify-center text-[#cccccc] hover:text-white hover:border-[#ff4d5a] hover:bg-[#ff4d5a]/10 transition-all duration-300 group shadow-md"
          aria-label="Volver arriba"
        >
          <ChevronUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Iconos de redes sociales */}
        <div className="flex items-center justify-center gap-6">
          <a
            id="footer-github-link"
            href="https://github.com/santy-ux"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:border-[#ff4d5a]/50 hover:bg-[#ff4d5a]/10 transition-all duration-300 transform hover:scale-105"
            aria-label="Perfil de GitHub"
          >
            <Github size={22} />
          </a>

          <a
            id="footer-instagram-link"
            href="https://www.instagram.com/orozco__santy/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-[#ff4d5a] hover:border-[#ff4d5a]/50 hover:bg-[#ff4d5a]/10 transition-all duration-300 transform hover:scale-105"
            aria-label="Perfil de Instagram"
          >
            <Instagram size={22} />
          </a>

          <a
            id="footer-cv-link"
            href="/Hojadevida.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:border-[#ff4d5a]/50 hover:bg-[#ff4d5a]/10 transition-all duration-300 transform hover:scale-105"
            aria-label="Ver mi CV"
          >
            <FileText size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};
