import React from 'react';
import { SESSION_TYPES, STUDIO_CONFIG, STUDIO_PHOTOS } from '../config/studioConfig';
import { SmartPhoto } from './SmartPhoto';
import { Clock, Check, ArrowRight } from 'lucide-react';
import { SessionType } from '../types';

interface SessionTypesProps {
  onSelectSession: (session: SessionType) => void;
}

export const SessionTypes: React.FC<SessionTypesProps> = ({ onSelectSession }) => {
  return (
    <section id="ensaios" className="py-20 lg:py-28 bg-[#141211] border-y border-[#2D2825] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#DDB7BD] mb-3">
            <span className="w-6 h-[1px] bg-[#DDB7BD]/50" />
            <span>Formatos & Experiências</span>
            <span className="w-6 h-[1px] bg-[#DDB7BD]/50" />
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#FAF9F7] tracking-tight mb-4">
            Tipos de Ensaio
          </h2>
          <p className="text-sm sm:text-base text-[#B8ADA6] leading-relaxed">
            Experiências desenhadas com sensibilidade para atender ao seu momento de vida, propósito e estilo pessoal.
          </p>
        </div>

        {/* 4 Cards Elegantes no Tema Escuro */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SESSION_TYPES.map((session) => {
            const previewPhoto = STUDIO_PHOTOS.find((p) => p.id === session.photoId) || STUDIO_PHOTOS[0];

            return (
              <div
                key={session.id}
                className="group bg-[#181615] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-[#2D2825] hover:border-[#DDB7BD]/50 flex flex-col justify-between"
              >
                <div>
                  {/* Mini thumbnail fotográfica correspondente */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141211]">
                    <SmartPhoto
                      photo={previewPhoto}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    {session.badge && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold text-[#FAF9F7] bg-[#221F1D]/90 backdrop-blur-xs rounded-xs border border-[#2D2825]">
                        {session.badge}
                      </span>
                    )}

                    <div className="absolute bottom-2.5 left-3 text-white text-xs font-medium">
                      <span className="flex items-center gap-1.5 opacity-90">
                        <Clock className="w-3.5 h-3.5 text-[#DDB7BD]" />
                        {session.duration}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="p-6">
                    <h3 className="font-serif-display text-xl font-medium text-[#FAF9F7] mb-1 group-hover:text-[#DDB7BD] transition-colors">
                      {session.title}
                    </h3>

                    <p className="text-xs text-[#DDB7BD]/90 font-medium mb-3">
                      {session.subtitle}
                    </p>

                    <p className="text-xs text-[#B8ADA6] leading-relaxed mb-6">
                      {session.description}
                    </p>

                    {/* Entregáveis */}
                    {session.deliverables && (
                      <ul className="space-y-2 pt-4 border-t border-[#2D2825] mb-4">
                        {session.deliverables.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#B8ADA6]">
                            <Check className="w-3.5 h-3.5 text-[#DDB7BD] shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Rodapé do Card */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#2D2825] flex items-center justify-between mb-4 text-xs text-[#B8ADA6]">
                    <span className="text-[11px] font-medium text-[#B8ADA6]/70">Investimento:</span>
                    <span className="font-medium text-[#FAF9F7]">
                      {STUDIO_CONFIG.pricing.showPricing && session.startingPrice
                        ? session.startingPrice
                        : 'Sob consulta'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectSession(session)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs tracking-wider uppercase font-semibold text-[#0E0D0C] bg-[#FAF9F7] hover:bg-[#E8D8C8] transition-colors rounded-sm shadow-sm active:scale-[0.98]"
                  >
                    <span>Quero agendar</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#65524B]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota transparente de preços futuros */}
        <p className="text-center text-xs text-[#B8ADA6]/70 mt-10">
          {STUDIO_CONFIG.pricing.disclaimer}
        </p>
      </div>
    </section>
  );
};
