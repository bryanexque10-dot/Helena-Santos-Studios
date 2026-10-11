import React, { useState, useEffect } from 'react';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Ensaios', href: '#ensaios' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0E0D0C]/95 backdrop-blur-md shadow-lg border-b border-[#2D2825] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
        {/* ZONA 1: Marca minimalista */}
        <a
          href="#inicio"
          className="font-serif-display text-xl md:text-2xl font-medium tracking-tight text-[#FAF9F7] hover:text-[#DDB7BD] transition-colors whitespace-nowrap shrink-0"
        >
          {STUDIO_CONFIG.studioName}
        </a>

        {/* ZONA 2: Links de navegação limpos */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B8ADA6]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#FAF9F7] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#DDB7BD] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ZONA 3: Apenas UM botão de ação direto */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contato"
            className="px-5 py-2.5 text-xs tracking-wider uppercase font-semibold text-[#0E0D0C] bg-[#FAF9F7] hover:bg-[#E8D8C8] rounded-sm transition-all duration-300 whitespace-nowrap shadow-xs hover:shadow-md active:scale-[0.98]"
          >
            Agendar ensaio
          </a>

          {/* Menu Mobile Hamburguer */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#FAF9F7] hover:text-[#DDB7BD] rounded-md transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Drawer Responsivo Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141211] border-b border-[#2D2825] px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#FAF9F7] hover:text-[#DDB7BD] py-2 border-b border-[#2D2825]/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-3 text-xs tracking-wider uppercase font-semibold text-[#0E0D0C] bg-[#FAF9F7] rounded-sm shadow-xs"
              >
                Agendar meu ensaio
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
