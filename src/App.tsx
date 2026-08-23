import React from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsSection } from './components/ProjectsSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#181818] text-[#ffffff] font-['Raleway',sans-serif] relative selection:bg-[#ff4d5a] selection:text-white">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <ProjectsSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
