import React from 'react';
import { STUDIO_CONFIG, STUDIO_PHOTOS } from '../config/studioConfig';
import { SmartPhoto } from './SmartPhoto';
import { ArrowDownRight, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExplorePortfolio: () => void;
  onBookSession: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePortfolio, onBookSession }) => {
  const photoMain = STUDIO_PHOTOS[1]; // Foto 2: Campo floral
  const photoSide1 = STUDIO_PHOTOS[0]; // Foto 1: Parque
  const photoSide2 = STUDIO_PHOTOS[6]; // Foto 7: Retrato beauty

  return (
    <section id="inicio" className="relative pt-24 md:pt-32 pb-16 lg:pb-20 overflow-hidden bg-[#0E0D0C]">
      {/* Luz ambiente escura */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#DDB7BD]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Bloco Superior: Tipografia e Fotos Integradas Logo no Início */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12">
          {/* Lado Esquerdo: Texto Elegante com Poucos Botões */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs tracking-widest uppercase font-semibold text-[#DDB7BD] mb-4">
              {STUDIO_CONFIG.hero.kicker}
            </span>

            <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-medium text-[#FAF9F7] tracking-tight leading-[1.15] mb-5 [text-wrap:balance]">
              {STUDIO_CONFIG.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-[#B8ADA6] max-w-lg font-normal leading-relaxed mb-8">
              {STUDIO_CONFIG.hero.subtitle}
            </p>

            {/* Apenas 1 Botão Principal + Link Suave */}
            <div className="flex items-center gap-5">
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  onBookSession();
                }}
                className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-wider uppercase font-semibold text-[#0E0D0C] bg-[#FAF9F7] hover:bg-[#E8D8C8] transition-all duration-300 rounded-sm shadow-md hover:shadow-xl active:scale-[0.98]"
              >
                <span>Agendar meu ensaio</span>
                <ArrowRight className="w-4 h-4 text-[#65524B]" />
              </a>

              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  onExplorePortfolio();
                }}
                className="text-xs tracking-wider uppercase font-semibold text-[#B8ADA6] hover:text-[#FAF9F7] transition-colors py-2 flex items-center gap-1.5"
              >
                <span>Ver fotos</span>
                <ArrowDownRight className="w-4 h-4 text-[#DDB7BD]" />
              </a>
            </div>
          </div>

          {/* Lado Direito: Composição de Fotografias Visíveis Logo no Início */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-center">
            {/* Foto Principal de Destaque */}
            <div className="col-span-7 rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[3/4] relative group">
              <SmartPhoto
                photo={photoMain}
                priority={true}
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#0E0D0C]/85 backdrop-blur-md rounded-md text-xs border border-white/10">
                <p className="font-serif-display text-white font-medium truncate">{photoMain.title}</p>
                <p className="text-[10px] text-[#DDB7BD] uppercase tracking-wider">{photoMain.categories[0]}</p>
              </div>
            </div>

            {/* Coluna com 2 Fotos Secundárias Complementares */}
            <div className="col-span-5 flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden shadow-xl border border-white/10 aspect-[4/5] relative">
                <SmartPhoto
                  photo={photoSide1}
                  priority={true}
                  className="w-full h-full"
                />
              </div>

              <div className="rounded-xl overflow-hidden shadow-xl border border-white/10 aspect-[4/5] relative">
                <SmartPhoto
                  photo={photoSide2}
                  priority={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
