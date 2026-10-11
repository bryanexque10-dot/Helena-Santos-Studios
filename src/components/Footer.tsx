import React from 'react';
import { STUDIO_CONFIG, buildWhatsAppLink } from '../config/studioConfig';
import { Instagram, MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const whatsappData = buildWhatsAppLink();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0909] text-[#FAF9F7] pt-16 pb-12 border-t border-[#2D2825] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#2D2825] items-start">
          {/* Coluna da Marca */}
          <div className="md:col-span-5">
            <h3 className="font-serif-display text-2xl lg:text-3xl font-medium tracking-tight mb-3 text-white">
              {STUDIO_CONFIG.studioName}
            </h3>
            <p className="font-serif-display italic text-[#DDB7BD] text-base mb-6">
              "{STUDIO_CONFIG.tagline}"
            </p>
            <p className="text-xs text-[#B8ADA6] max-w-sm leading-relaxed">
              {STUDIO_CONFIG.concept}
            </p>
          </div>

          {/* Links Rápidos de Navegação */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B8ADA6]/60 mb-4">
              Navegação
            </h4>
            <ul className="grid grid-cols-2 gap-2.5 text-xs text-[#B8ADA6]">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre o Estúdio
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Portfólio Completo
                </a>
              </li>
              <li>
                <a href="#ensaios" className="hover:text-white transition-colors">
                  Tipos de Ensaio
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">
                  Agendar Sessão
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais & Contato Configuráveis */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B8ADA6]/60 mb-4">
                Canais Oficiais
              </h4>
              <div className="flex flex-col gap-3">
                {/* Instagram configurável */}
                {STUDIO_CONFIG.contact.instagramUrl ? (
                  <a
                    href={STUDIO_CONFIG.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-[#FAF9F7] hover:text-[#DDB7BD] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#DDB7BD]" />
                    <span>@{STUDIO_CONFIG.contact.instagramHandle}</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-xs text-[#B8ADA6]/50" title="Configurável em studioConfig.ts">
                    <Instagram className="w-4 h-4 text-[#B8ADA6]/30" />
                    <span>Instagram (Configuração pendente)</span>
                  </span>
                )}

                {/* WhatsApp configurável */}
                <a
                  href={whatsappData.isConfigured ? whatsappData.url : '#contato'}
                  target={whatsappData.isConfigured ? '_blank' : undefined}
                  rel={whatsappData.isConfigured ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-xs text-[#FAF9F7] hover:text-[#DDB7BD] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>
                    {whatsappData.isConfigured ? 'WhatsApp Direto' : 'Agendar via formulário'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Direitos Autorais e Voltar ao Topo */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8ADA6]/60">
          <p>© {new Date().getFullYear()} {STUDIO_CONFIG.studioName}. Todos os direitos reservados.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#B8ADA6] hover:text-white transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
