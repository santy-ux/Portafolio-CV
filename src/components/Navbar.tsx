import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import contentData from '../data/content.json';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('#home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navigationItems = contentData.portfolio.navigation;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navigationItems.map(item => item.target.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(`#${sections[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(target);
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#181818]/95 backdrop-blur-md border-b border-[#262626] shadow-lg'
          : 'bg-[#181818]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Espacio izquierdo para balancear el diseño */}
        <div aria-hidden="true" className="w-1" />

        {/* Navegación en escritorio */}
        <div className="hidden md:flex items-center space-x-10">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <a
                key={item.target}
                id={`nav-link-${item.target.replace('#', '')}`}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`text-base font-normal tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'text-[#ff4d5a]'
                    : 'text-[#cccccc] hover:text-[#ff4d5a]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Botón para alternar menú móvil */}
        <button
          id="mobile-menu-toggle-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none hover:text-[#ff4d5a] transition-colors"
          aria-label="Abrir menú"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú desplegable para móviles */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-[#181818] border-b border-[#262626] px-6 py-5 flex flex-col space-y-4 animate-fadeIn"
        >
          {navigationItems.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <a
                key={item.target}
                id={`mobile-nav-link-${item.target.replace('#', '')}`}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`text-lg font-normal tracking-wide py-1 transition-colors ${
                  isActive ? 'text-[#ff4d5a]' : 'text-[#cccccc] hover:text-[#ff4d5a]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};
