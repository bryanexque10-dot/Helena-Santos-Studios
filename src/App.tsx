/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PhotoProvider, useStudioPhotos } from './context/PhotoContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { SessionTypes } from './components/SessionTypes';
import { ClientExperience } from './components/ClientExperience';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SessionType } from './types';
import { Upload, CheckCircle2 } from 'lucide-react';

function AppContent() {
  const [selectedSessionName, setSelectedSessionName] = useState<string>('Ensaio feminino');
  const [isDraggingGlobal, setIsDraggingGlobal] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);
  const { uploadMultipleFiles } = useStudioPhotos();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSession = (session: SessionType) => {
    setSelectedSessionName(session.title);
    scrollToSection('contato');
  };

  const handleSelectPhotoSession = (categoryName: string) => {
    if (categoryName === 'Natureza') {
      setSelectedSessionName('Ensaio ao ar livre');
    } else if (categoryName === 'Estúdio') {
      setSelectedSessionName('Ensaio em estúdio');
    } else if (categoryName === 'Retratos') {
      setSelectedSessionName('Retrato profissional');
    } else {
      setSelectedSessionName('Ensaio feminino');
    }
    scrollToSection('contato');
  };

  // Suporte a arrastar e soltar as fotos em qualquer lugar da tela
  const handleGlobalDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingGlobal(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const count = await uploadMultipleFiles(e.dataTransfer.files);
      setUploadToast(`${count} fotografia(s) atualizada(s) com sucesso!`);
      setTimeout(() => setUploadToast(null), 4000);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingGlobal(true);
      }}
      onDragLeave={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        setIsDraggingGlobal(false);
      }}
      onDrop={handleGlobalDrop}
      className="min-h-screen bg-[#0E0D0C] text-[#FAF9F7] flex flex-col selection:bg-[#DDB7BD]/30 selection:text-[#FAF9F7] relative"
    >
      {/* Overlay discreto apenas ao arrastar fotos para a página */}
      {isDraggingGlobal && (
        <div className="fixed inset-0 z-50 bg-[#0E0D0C]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 border-4 border-dashed border-[#DDB7BD]/60 pointer-events-none">
          <Upload className="w-16 h-16 text-[#DDB7BD] animate-bounce mb-4" />
          <h3 className="font-serif-display text-2xl text-white font-medium mb-1">
            Solte as suas fotos aqui
          </h3>
          <p className="text-sm text-[#B8ADA6]">
            Elas serão aplicadas instantaneamente ao portfólio e salvas na galeria.
          </p>
        </div>
      )}

      {/* Notificação toast flutuante discreta */}
      {uploadToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-[#1E1C1A] border border-emerald-500/40 text-emerald-300 text-xs shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-medium text-sm">{uploadToast}</span>
        </div>
      )}

      {/* Top Bar de navegação fixa limpa */}
      <Navbar />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* 1. Página Inicial / Hero com fotos visíveis logo no início */}
        <Hero
          onExplorePortfolio={() => scrollToSection('portfolio')}
          onBookSession={() => scrollToSection('contato')}
        />

        {/* 2. Galeria de Fotos Completa logo após o Hero */}
        <Gallery onSelectPhotoSession={handleSelectPhotoSession} />

        {/* 3. Sobre o Estúdio */}
        <About />

        {/* 4. Tipos de Ensaio (4 cards elegantes) */}
        <SessionTypes onSelectSession={handleSelectSession} />

        {/* 5. Experiência do Cliente (4 passos) */}
        <ClientExperience />

        {/* 6. Depoimentos */}
        <Testimonials onBookClick={() => scrollToSection('contato')} />

        {/* 7. Agendamento & Formulário de Contato via WhatsApp */}
        <ContactForm initialSessionType={selectedSessionName} />
      </main>

      {/* Rodapé Oficial da Marca */}
      <Footer />

      {/* Botão Flutuante de WhatsApp discreto */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <PhotoProvider>
      <AppContent />
    </PhotoProvider>
  );
}
