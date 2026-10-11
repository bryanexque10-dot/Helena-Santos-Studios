import React from 'react';
import { STUDIO_CONFIG, STUDIO_PHOTOS } from '../config/studioConfig';
import { SmartPhoto } from './SmartPhoto';
import { Sparkles, Heart, SunMedium } from 'lucide-react';

export const About: React.FC = () => {
  // Foto para a composição Sobre: Foto #8 (Poltrona aconchegante)
  const aboutPhoto = STUDIO_PHOTOS[7] || STUDIO_PHOTOS[4];

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-[#141211] border-y border-[#2D2825] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LADO ESQUERDO: Composição Fotográfica com Detalhes Autorais */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Moldura de fundo offset elegante escura */}
              <div className="absolute -inset-4 bg-[#1E1C1A] rounded-2xl shadow-xl border border-[#2D2825] rotate-1 -z-10" />

              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 aspect-[3/4] sm:aspect-[4/5]">
                <SmartPhoto
                  photo={aboutPhoto}
                  className="w-full h-full"
                />
              </div>

              {/* Card de citação sobreposto delicado no tema escuro */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 max-w-[260px] bg-[#1A1817]/95 backdrop-blur-md p-4 rounded-lg shadow-2xl border border-[#2D2825]">
                <p className="font-serif-display italic text-xs text-[#E8D8C8] leading-relaxed">
                  "{STUDIO_CONFIG.about.quote}"
                </p>
                <p className="text-[10px] tracking-wider uppercase font-semibold text-[#DDB7BD] mt-2">
                  — {STUDIO_CONFIG.founderName}, Fotógrafa
                </p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Texto Editorial e Filosofia */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            {/* Kicker */}
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#DDB7BD] mb-3">
              <span className="w-6 h-[1px] bg-[#DDB7BD]/50" />
              <span>{STUDIO_CONFIG.about.kicker}</span>
            </div>

            {/* Título Oficial */}
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#FAF9F7] tracking-tight leading-[1.2] mb-6 [text-wrap:balance]">
              {STUDIO_CONFIG.about.title}
            </h2>

            {/* Texto Oficial */}
            <p className="text-base sm:text-lg text-[#B8ADA6] leading-relaxed mb-8">
              {STUDIO_CONFIG.about.text}
            </p>

            {/* 3 Pilares com Ícones Delicados no tema escuro */}
            <div className="space-y-4 pt-4 border-t border-[#2D2825]">
              <div className="flex items-start gap-4 p-3.5 rounded-lg bg-[#181615] border border-[#2D2825]/60">
                <div className="w-10 h-10 rounded-full bg-[#201D1B] flex items-center justify-center shrink-0 border border-[#2D2825] text-[#DDB7BD]">
                  <SunMedium className="w-5 h-5 text-[#DDB7BD]" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-semibold text-[#FAF9F7] mb-1">
                    Luz Natural & Sensibilidade
                  </h4>
                  <p className="text-sm text-[#B8ADA6] leading-relaxed">
                    Priorizamos a iluminação suave e a direção gentil para capturar sua espontaneidade sem poses forçadas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-lg bg-[#181615] border border-[#2D2825]/60">
                <div className="w-10 h-10 rounded-full bg-[#201D1B] flex items-center justify-center shrink-0 border border-[#2D2825] text-[#DDB7BD]">
                  <Heart className="w-5 h-5 text-[#DDB7BD]" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-semibold text-[#FAF9F7] mb-1">
                    Experiência Acolhedora
                  </h4>
                  <p className="text-sm text-[#B8ADA6] leading-relaxed">
                    Um ambiente pensado para que você se sinta confiante, relaxada e segura do primeiro ao último clique.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-lg bg-[#181615] border border-[#2D2825]/60">
                <div className="w-10 h-10 rounded-full bg-[#201D1B] flex items-center justify-center shrink-0 border border-[#2D2825] text-[#DDB7BD]">
                  <Sparkles className="w-5 h-5 text-[#DDB7BD]" />
                </div>
                <div>
                  <h4 className="font-serif-display text-base font-semibold text-[#FAF9F7] mb-1">
                    Edição Atemporal
                  </h4>
                  <p className="text-sm text-[#B8ADA6] leading-relaxed">
                    Tratamento de cor refinado e delicado que preserva a textura real da pele e a elegância de cada cena.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
