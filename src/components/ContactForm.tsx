import React, { useState } from 'react';
import { STUDIO_CONFIG, buildWhatsAppLink } from '../config/studioConfig';
import { ContactFormData } from '../types';
import { MessageSquare, Calendar, User, Phone, AlertCircle, ArrowRight } from 'lucide-react';

interface ContactFormProps {
  initialSessionType?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialSessionType = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    whatsapp: '',
    sessionType: initialSessionType || 'Ensaio feminino',
    preferredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [showConfigNotice, setShowConfigNotice] = useState(false);

  const isWhatsAppConfigured = Boolean(
    STUDIO_CONFIG.contact.whatsappNumber &&
    STUDIO_CONFIG.contact.whatsappNumber.replace(/\D/g, '').length >= 10
  );

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, informe seu nome completo.';
    }

    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.whatsapp = 'Informe um número de WhatsApp válido com DDD.';
    }

    if (!formData.sessionType) {
      newErrors.sessionType = 'Selecione o tipo de ensaio desejado.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (!isWhatsAppConfigured) {
      setShowConfigNotice(true);
      return;
    }

    const formattedMessage = [
      `Olá, Helena! Conheci o Helena Ensaio Studios pelo site e gostaria de agendar um ensaio.`,
      ``,
      `*Nome:* ${formData.name.trim()}`,
      `*WhatsApp:* ${formData.whatsapp.trim()}`,
      `*Tipo de ensaio:* ${formData.sessionType}`,
      formData.preferredDate ? `*Data de preferência:* ${formData.preferredDate}` : null,
      formData.message.trim() ? `*Detalhes / Ideias:* ${formData.message.trim()}` : null,
      ``,
      `Como podemos dar continuidade ao agendamento?`,
    ]
      .filter(Boolean)
      .join('\n');

    const link = buildWhatsAppLink(formattedMessage);
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickInquiry = () => {
    if (!isWhatsAppConfigured) {
      setShowConfigNotice(true);
      return;
    }
    const link = buildWhatsAppLink();
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contato" className="py-20 lg:py-28 relative bg-[#0E0D0C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LADO ESQUERDO: Apresentação & Informações de Contato no Tema Escuro */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#DDB7BD] mb-3">
              <span className="w-6 h-[1px] bg-[#DDB7BD]/50" />
              <span>Atendimento & Agendamento</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#FAF9F7] tracking-tight mb-6 [text-wrap:balance]">
              Vamos planejar o seu momento?
            </h2>

            <p className="text-base text-[#B8ADA6] leading-relaxed mb-8">
              Será um prazer responder suas dúvidas, sugerir a melhor locação e alinhar todos os detalhes do seu ensaio. Envie uma mensagem direta ou preencha o formulário para um atendimento personalizado.
            </p>

            {/* Caixa de Ação Rápida WhatsApp Escura */}
            <div className="p-6 bg-[#181615] rounded-xl border border-[#2D2825] mb-8">
              <h4 className="font-serif-display text-base font-semibold text-[#FAF9F7] mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#DDB7BD]" />
                <span>Atendimento Ágil via WhatsApp</span>
              </h4>
              <p className="text-xs text-[#B8ADA6] leading-relaxed mb-4">
                Prefere conversar diretamente agora mesmo? Clique abaixo para iniciar uma conversa com nossa equipe.
              </p>

              <button
                type="button"
                onClick={handleQuickInquiry}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-wider uppercase font-semibold text-[#0E0D0C] bg-[#FAF9F7] hover:bg-[#E8D8C8] rounded-sm transition-colors shadow-sm"
              >
                <span>Falar no WhatsApp agora</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#65524B]" />
              </button>
            </div>

            {/* Aviso transparente de configuração de número */}
            {!isWhatsAppConfigured && (
              <div className="p-4 rounded-lg bg-[#1F1D1B] border border-[#2D2825] text-xs text-[#B8ADA6]">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#DDB7BD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#FAF9F7] mb-0.5">
                      Configuração de Contato
                    </span>
                    <p className="leading-relaxed">
                      O número comercial do WhatsApp pode ser inserido no arquivo <code className="bg-[#141211] px-1 py-0.5 rounded-xs text-[11px] text-[#FAF9F7]">src/config/studioConfig.ts</code> na chave <code className="bg-[#141211] px-1 py-0.5 rounded-xs text-[11px] text-[#FAF9F7]">whatsappNumber</code>.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* LADO DIREITO: Formulário de Contato Validador Escuro */}
          <div className="lg:col-span-7 bg-[#181615] p-8 sm:p-10 rounded-2xl border border-[#2D2825] shadow-xl relative">
            <h3 className="font-serif-display text-2xl font-medium text-[#FAF9F7] mb-2">
              Solicitar Proposta de Ensaio
            </h3>
            <p className="text-xs sm:text-sm text-[#B8ADA6] mb-6">
              Preencha os dados abaixo para direcionarmos as informações ideais para você.
            </p>

            {showConfigNotice && (
              <div className="mb-6 p-4 rounded-lg bg-[#2B231D] border border-amber-500/40 text-xs text-[#E8D8C8] animate-in fade-in">
                <p className="font-semibold mb-1 text-amber-200">Número do WhatsApp pronto para vincular</p>
                <p className="leading-relaxed">
                  Para enviar as informações diretamente para o seu aparelho, basta abrir o arquivo <strong>src/config/studioConfig.ts</strong> e preencher o seu número com DDD na variável <strong>whatsappNumber</strong> (exemplo: '5511999998888').
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#FAF9F7] mb-1.5">
                  Seu Nome Completo *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Como você gostaria de ser chamada(o)?"
                    className={`w-full px-4 py-3 pl-10 text-sm bg-[#141211] border rounded-sm text-[#FAF9F7] placeholder:text-[#B8ADA6]/40 focus:outline-hidden focus:ring-1 focus:ring-[#DDB7BD] transition-colors ${
                      errors.name ? 'border-red-400' : 'border-[#2D2825]'
                    }`}
                  />
                  <User className="w-4 h-4 text-[#B8ADA6]/50 absolute left-3.5 top-3.5" />
                </div>
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* WhatsApp e Tipo de Ensaio em 2 colunas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#FAF9F7] mb-1.5">
                    WhatsApp para Retorno *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => {
                        setFormData({ ...formData, whatsapp: e.target.value });
                        if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
                      }}
                      placeholder="(DDD) 90000-0000"
                      className={`w-full px-4 py-3 pl-10 text-sm bg-[#141211] border rounded-sm text-[#FAF9F7] placeholder:text-[#B8ADA6]/40 focus:outline-hidden focus:ring-1 focus:ring-[#DDB7BD] transition-colors ${
                        errors.whatsapp ? 'border-red-400' : 'border-[#2D2825]'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-[#B8ADA6]/50 absolute left-3.5 top-3.5" />
                  </div>
                  {errors.whatsapp && <p className="text-xs text-red-400 mt-1">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#FAF9F7] mb-1.5">
                    Tipo de Ensaio Desejado *
                  </label>
                  <select
                    value={formData.sessionType}
                    onChange={(e) => {
                      setFormData({ ...formData, sessionType: e.target.value });
                      if (errors.sessionType) setErrors({ ...errors, sessionType: undefined });
                    }}
                    className="w-full px-4 py-3 text-sm bg-[#141211] border border-[#2D2825] rounded-sm text-[#FAF9F7] focus:outline-hidden focus:ring-1 focus:ring-[#DDB7BD] transition-colors"
                  >
                    <option value="Ensaio feminino">Ensaio feminino (Autoestima & Sensibilidade)</option>
                    <option value="Ensaio ao ar livre">Ensaio ao ar livre (Luz Natural & Parques)</option>
                    <option value="Ensaio em estúdio">Ensaio em estúdio (Iluminação & Cenário)</option>
                    <option value="Retrato profissional">Retrato profissional (Carreira & Redes)</option>
                  </select>
                </div>
              </div>

              {/* Data Desejada */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#FAF9F7] mb-1.5">
                  Previsão ou Data Desejada (Opcional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    placeholder="Ex: Próximo mês, em um sábado pela manhã, etc."
                    className="w-full px-4 py-3 pl-10 text-sm bg-[#141211] border border-[#2D2825] rounded-sm text-[#FAF9F7] placeholder:text-[#B8ADA6]/40 focus:outline-hidden focus:ring-1 focus:ring-[#DDB7BD] transition-colors"
                  />
                  <Calendar className="w-4 h-4 text-[#B8ADA6]/50 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#FAF9F7] mb-1.5">
                  Conte um pouco sobre sua ideia ou expectativas
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tem alguma inspiração em mente, preferência de horário ou dúvida sobre looks?"
                  className="w-full px-4 py-3 text-sm bg-[#141211] border border-[#2D2825] rounded-sm text-[#FAF9F7] placeholder:text-[#B8ADA6]/40 focus:outline-hidden focus:ring-1 focus:ring-[#DDB7BD] transition-colors resize-none"
                />
              </div>

              {/* Botão de Envio via WhatsApp */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-xs tracking-wider uppercase font-semibold text-[#0E0D0C] bg-[#FAF9F7] hover:bg-[#E8D8C8] transition-all duration-300 rounded-sm shadow-md hover:shadow-xl active:scale-[0.99]"
              >
                <MessageSquare className="w-4 h-4 text-[#65524B]" />
                <span>Enviar Solicitação via WhatsApp</span>
              </button>

              <p className="text-center text-[11px] text-[#B8ADA6]/70 pt-2">
                Ao clicar em enviar, você será direcionado para o WhatsApp com todos os dados preenchidos de forma segura.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
