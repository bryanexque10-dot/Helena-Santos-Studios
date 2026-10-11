import React from 'react';
import { CLIENT_STEPS } from '../config/studioConfig';
import { Sparkles, MessageSquareHeart, Camera, HeartHandshake } from 'lucide-react';

export const ClientExperience: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#DDB7BD]" />;
      case 'MessageSquareHeart':
        return <MessageSquareHeart className="w-6 h-6 text-[#DDB7BD]" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-[#DDB7BD]" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-6 h-6 text-[#DDB7BD]" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 relative bg-[#0E0D0C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#DDB7BD] mb-3">
            <span className="w-6 h-[1px] bg-[#DDB7BD]/50" />
            <span>Passo a Passo</span>
            <span className="w-6 h-[1px] bg-[#DDB7BD]/50" />
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#FAF9F7] tracking-tight mb-4">
            Como Funciona Sua Experiência
          </h2>
          <p className="text-sm sm:text-base text-[#B8ADA6] leading-relaxed">
            Desde o primeiro contato até a entrega dos seus arquivos finais, cada etapa é pensada para ser leve, acolhedora e memorável.
          </p>
        </div>

        {/* 4 Etapas no Tema Escuro */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {CLIENT_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-6 sm:p-8 bg-[#181615] rounded-xl border border-[#2D2825] shadow-md hover:border-[#DDB7BD]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Número do Passo Editorial + Ícone */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#201D1B] border border-[#2D2825] flex items-center justify-center">
                    {getStepIcon(step.iconName)}
                  </div>
                  <span className="font-serif-display text-2xl font-light text-[#DDB7BD]/40 tabular-nums">
                    {step.number}
                  </span>
                </div>

                {/* Título do Passo */}
                <h3 className="font-serif-display text-lg font-medium text-[#FAF9F7] mb-3 leading-snug">
                  {step.title}
                </h3>

                {/* Descrição Curta */}
                <p className="text-xs sm:text-sm text-[#B8ADA6] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Indicador visual inferior */}
              <div className="mt-6 pt-4 border-t border-[#2D2825] flex items-center text-[11px] text-[#B8ADA6]/70 uppercase tracking-wider font-semibold">
                <span>Etapa {idx + 1} de 4</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
