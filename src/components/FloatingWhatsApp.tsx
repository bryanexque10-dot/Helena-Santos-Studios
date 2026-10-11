import React, { useState } from 'react';
import { STUDIO_CONFIG, buildWhatsAppLink } from '../config/studioConfig';
import { MessageCircle, X, HelpCircle, ArrowUpRight } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showConfigTooltip, setShowConfigTooltip] = useState(false);
  const whatsappData = buildWhatsAppLink();

  const handleClick = (e: React.MouseEvent) => {
    if (!whatsappData.isConfigured) {
      e.preventDefault();
      setShowConfigTooltip(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip explicativo caso o número não esteja configurado */}
      {showConfigTooltip && (
        <div className="mb-3 max-w-xs p-4 bg-white text-[#222222] rounded-xl shadow-xl border border-[#65524B]/15 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between font-semibold mb-1 text-[#65524B]">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#DDB7BD]" />
              Número Pendente
            </span>
            <button
              onClick={() => setShowConfigTooltip(false)}
              className="p-1 hover:text-[#222222] text-[#65524B]/60"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="leading-relaxed text-[#65524B] mb-2">
            Insira o telefone do estúdio na variável <code className="bg-[#FAF9F7] px-1 py-0.5 rounded-xs text-[11px] font-mono text-[#222222]">whatsappNumber</code> em <code className="bg-[#FAF9F7] px-1 py-0.5 rounded-xs text-[11px] font-mono text-[#222222]">src/config/studioConfig.ts</code> para ativar o direcionamento automático.
          </p>
          <a
            href="#contato"
            onClick={() => setShowConfigTooltip(false)}
            className="inline-flex items-center gap-1 font-semibold text-[#222222] hover:text-[#65524B]"
          >
            <span>Ir para o formulário de contato</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Botão Flutuante */}
      <a
        href={whatsappData.isConfigured ? whatsappData.url : '#contato'}
        target={whatsappData.isConfigured ? '_blank' : undefined}
        rel={whatsappData.isConfigured ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="Abrir WhatsApp para agendamento"
        title="Agendar via WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="text-xs font-semibold tracking-wide whitespace-nowrap hidden sm:inline">
          Agendar no WhatsApp
        </span>
      </a>
    </div>
  );
};
