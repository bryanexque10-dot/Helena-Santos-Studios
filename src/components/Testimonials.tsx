import React from 'react';
import { INITIAL_TESTIMONIALS } from '../config/studioConfig';
import { Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';

interface TestimonialsProps {
  onBookClick: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onBookClick }) => {
  const testimonials = INITIAL_TESTIMONIALS;

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-[#141211] border-y border-[#2D2825] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#DDB7BD] mb-3">
            <span className="w-6 h-[1px] bg-[#DDB7BD]/50" />
            <span>Memórias & Experiências</span>
            <span className="w-6 h-[1px] bg-[#DDB7BD]/50" />
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#FAF9F7] tracking-tight mb-4">
            Histórias Registradas
          </h2>
          <p className="text-sm sm:text-base text-[#B8ADA6] leading-relaxed">
            Mais do que retratos bonitos, buscamos criar um dia de acolhimento e celebração da sua verdadeira essência.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-8 bg-[#181615] rounded-xl border border-[#2D2825] shadow-md flex flex-col justify-between"
              >
                <p className="font-serif-display italic text-sm text-[#E8D8C8] leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-[#2D2825] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#FAF9F7]">{t.author}</span>
                  <span className="text-[#B8ADA6]">{t.sessionType}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Apresentação elegante enquanto não há depoimentos cadastrados */
          <div className="max-w-3xl mx-auto p-8 sm:p-12 bg-[#181615] rounded-2xl border border-[#2D2825] shadow-xl text-center relative overflow-hidden">
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#201D1B] border border-[#2D2825] flex items-center justify-center text-[#DDB7BD]">
              <HeartHandshake className="w-7 h-7 text-[#DDB7BD]" />
            </div>

            <h3 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#FAF9F7] mb-4 [text-wrap:balance]">
              Sua história merece ser o nosso próximo registro
            </h3>

            <p className="text-sm sm:text-base text-[#B8ADA6] leading-relaxed max-w-xl mx-auto mb-8">
              Cada sessão é planejada de forma individual e intimista. Convidamos você a viver essa experiência e transformar sua beleza e momento atual em lembranças que você guardará com carinho por toda a vida.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs tracking-wider uppercase font-semibold text-[#0E0D0C] bg-[#FAF9F7] hover:bg-[#E8D8C8] transition-colors rounded-sm shadow-md"
              >
                <span>Agendar minha sessão</span>
                <ArrowRight className="w-4 h-4 text-[#65524B]" />
              </button>

              <a
                href="#portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs tracking-wider uppercase font-semibold text-[#FAF9F7] hover:text-[#DDB7BD] transition-colors"
              >
                Explorar portfólio completo
              </a>
            </div>

            {/* Aviso sutil de compromisso com a verdade */}
            <div className="mt-8 pt-6 border-t border-[#2D2825] flex items-center justify-center gap-2 text-[11px] text-[#B8ADA6]/70">
              <Sparkles className="w-3.5 h-3.5 text-[#DDB7BD]" />
              <span>O Helena Ensaio Studios preza por relatos autênticos e pela privacidade dos clientes.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
