import { PhotoItem, SessionType, ClientStep, Testimonial } from '../types';

/**
 * CONFIGURAÇÃO CENTRAL — HELENA ENSAIO STUDIOS
 *
 * Todas as informações de contato, links sociais, textos e fotos
 * podem ser atualizados diretamente neste arquivo.
 */
export const STUDIO_CONFIG = {
  // Identidade
  studioName: 'Helena Ensaio Studios',
  founderName: 'Helena',
  tagline: 'Registrando sua essência em cada detalhe.',
  concept: 'Transformar momentos em memórias por meio de fotografias naturais, delicadas e autênticas.',

  // Textos Principais
  hero: {
    kicker: 'Estúdio Fotográfico Feminino & Autoral',
    title: 'Sua beleza. Sua essência. Seu momento.',
    subtitle: 'Ensaios fotográficos que revelam sua essência e transformam momentos especiais em lembranças inesquecíveis.',
    ctaPrimary: 'Agendar meu ensaio',
    ctaSecondary: 'Conhecer o portfólio',
  },

  about: {
    kicker: 'Nossa Filosofia',
    title: 'Mais do que fotografias, momentos para guardar.',
    text: 'No Helena Ensaio Studios, acreditamos que cada pessoa carrega uma beleza única e uma história que merece ser registrada. Nosso propósito é criar uma experiência leve, confortável e especial, valorizando expressões naturais, detalhes e sentimentos verdadeiros.',
    quote: 'A fotografia tem o poder de nos reconectar com o que temos de mais puro: a nossa própria verdade.',
    pillars: [
      {
        title: 'Luz Natural & Sensibilidade',
        desc: 'Priorizamos a iluminação suave e a direção gentil para capturar sua espontaneidade sem poses forçadas.',
      },
      {
        title: 'Experiência Acolhedora',
        desc: 'Um ambiente pensado para que você se sinta confiante, relaxada e segura do primeiro ao último clique.',
      },
      {
        title: 'Edição Atemporal',
        desc: 'Tratamento de cor refinado e delicado que preserva a textura da pele e a elegância de cada cena.',
      },
    ],
  },

  /**
   * CONTATOS & REDES SOCIAIS
   * 
   * Preencha com o número real do WhatsApp no formato internacional com DDD (apenas números).
   * Exemplo: '5511999998888'
   * Se vazio (''), o site avisará gentilmente os visitantes e exibirá o modal explicativo
   * sem gerar links quebrados.
   */
  contact: {
    // Número do WhatsApp (Ex: '5511999998888')
    whatsappNumber: '',
    whatsappDisplay: '(Configuração pendente)',

    // Mensagem padrão ao clicar em agendar
    defaultWhatsAppMessage: 'Olá! Conheci o Helena Ensaio Studios pelo site e gostaria de saber mais sobre os ensaios fotográficos e os horários disponíveis.',

    // Instagram (adicione seu arroba aqui, ex: 'helenaensaiostudios' ou deixe vazio)
    instagramHandle: '',
    instagramUrl: '',

    // E-mail comercial (opcional)
    email: '',

    // Localização do estúdio / cidade (opcional)
    city: 'Brasil',
  },

  /**
   * ESTRUTURA DE PREÇOS FUTUROS
   * 
   * Quando o estúdio definir tabelas públicas de preços, mude showPricing para true
   * e ajuste os valores nos sessionTypes abaixo.
   */
  pricing: {
    showPricing: false,
    disclaimer: 'Valores e pacotes sob consulta personalizada de acordo com a sua data e formato desejado.',
  },
};

/**
 * Função utilitária para gerar links do WhatsApp de forma segura e elegante
 */
export function buildWhatsAppLink(customMessage?: string): {
  url: string;
  isConfigured: boolean;
  messageText: string;
} {
  const rawNumber = STUDIO_CONFIG.contact.whatsappNumber.replace(/\D/g, '');
  const messageText = customMessage || STUDIO_CONFIG.contact.defaultWhatsAppMessage;
  const encodedMessage = encodeURIComponent(messageText);

  if (!rawNumber || rawNumber.length < 10) {
    return {
      url: '#contato',
      isConfigured: false,
      messageText,
    };
  }

  return {
    url: `https://wa.me/${rawNumber}?text=${encodedMessage}`,
    isConfigured: true,
    messageText,
  };
}

/**
 * AS NOVE FOTOGRAFIAS OFICIAIS DO HELENA ENSAIO STUDIOS
 * 
 * Organizadas meticulosamente nas 4 categorias:
 * - Natureza
 * - Estúdio
 * - Retratos
 * - Lifestyle
 */
export const STUDIO_PHOTOS: PhotoItem[] = [
  {
    id: 1,
    title: 'Tarde Dourada no Parque',
    subtitle: 'Ensaio ao ar livre com jaqueta de couro e saia plissada rosa',
    categories: ['Natureza', 'Lifestyle'],
    primaryPath: '/photos/foto-1.jpg',
    fallbackPaths: [
      '/photos/foto-1.png',
      '/photos/Imagem do ChatGPT 11 de out. de 2026, 12_40_58-1.png',
    ],
    description: 'Composição suave em banco de madeira sob a luz do entardecer. Contraste contemporâneo entre a jaqueta de couro preta e a leveza da saia rosa.',
    aspectRatio: 'portrait',
    lighting: 'Golden Hour (Luz natural filtrada)',
    location: 'Parque ecológico ao entardecer',
    paletteColors: {
      bg: '#F5ECE7',
      accent: '#65524B',
      text: '#222222',
    },
  },
  {
    id: 2,
    title: 'Caminho Floral ao Entardecer',
    subtitle: 'Vestido branco leve em campo de flores silvestres',
    categories: ['Natureza', 'Lifestyle'],
    primaryPath: '/photos/foto-2.jpg',
    fallbackPaths: [
      '/photos/foto-2.png',
      '/photos/Imagem do ChatGPT 11 de out. de 2026, 12_41_03-2.png',
    ],
    description: 'Movimento natural capturado no meio da vegetação florida com o sol se pondo no horizonte. Atmosfera etérea, poética e feminina.',
    aspectRatio: 'portrait',
    lighting: 'Contraluz de pôr do sol quente',
    location: 'Campo aberto de margaridas',
    paletteColors: {
      bg: '#F8F6F0',
      accent: '#DDB7BD',
      text: '#222222',
    },
  },
  {
    id: 3,
    title: 'Serenidade à Beira do Lago',
    subtitle: 'Montanhas alpinas e águas calmas em composição contemplativa',
    categories: ['Natureza', 'Retratos'],
    primaryPath: '/photos/foto-3.jpg',
    fallbackPaths: [
      '/photos/foto-3.png',
      '/photos/Imagem do ChatGPT 11 de out. de 2026, 12_41_06-3.png',
    ],
    description: 'Sentada nas rochas costeiras em frente a um lago límpido, com pinheiros e cumes nevados ao fundo. Look confortável em tons terrosos e jeans.',
    aspectRatio: 'portrait',
    lighting: 'Luz difusa de montanha',
    location: 'Lago com cordilheira ao fundo',
    paletteColors: {
      bg: '#EAF0F2',
      accent: '#65524B',
      text: '#222222',
    },
  },
  {
    id: 4,
    title: 'Balanço em Meio às Flores',
    subtitle: 'Balanço rústico de corda com raios de sol e folhagens',
    categories: ['Natureza', 'Lifestyle'],
    primaryPath: '/photos/foto-4.jpg',
    fallbackPaths: [
      '/photos/foto-4.png',
      '/photos/Imagem do ChatGPT 11 de out. de 2026, 12_41_08-4.png',
    ],
    description: 'Momento lúdico e gracioso em balanço suspenso por cordas floridas, com raios de sol permeando a copa das árvores em um jardim florido.',
    aspectRatio: 'portrait',
    lighting: 'Raios solares matinais (Sunflare natural)',
    location: 'Jardim florido reservado',
    paletteColors: {
      bg: '#EDF3EC',
      accent: '#DDB7BD',
      text: '#222222',
    },
  },
  {
    id: 5,
    title: 'Presença & Alfaiataria Minimalista',
    subtitle: 'Retrato de estúdio com camisa branca e calça de alfaiataria',
    categories: ['Estúdio', 'Retratos'],
    primaryPath: '/photos/foto-5.jpg',
    fallbackPaths: [
      '/photos/foto-5.png',
      '/photos/Imagem do ChatGPT 11 de out. de 2026, 12_41_10-5.png',
    ],
    description: 'Posicionamento profissional seguro e elegante. Fundo cinza minimalista com iluminação uniforme que valoriza o caimento da camisa e postura.',
    aspectRatio: 'portrait',
    lighting: 'Softbox duplo de estúdio',
    location: 'Estúdio Helena — Fundo neutro cinza',
    paletteColors: {
      bg: '#E9E9EA',
      accent: '#222222',
      text: '#222222',
    },
  },
  {
    id: 6,
    title: 'Estilo Editorial em Fundo Neutro',
    subtitle: 'Retrato de corpo inteiro com fundo infinito bege porcelana',
    categories: ['Estúdio', 'Lifestyle'],
    primaryPath: '/photos/foto-6.jpg',
    fallbackPaths: [
      '/photos/foto-6.png',
      '/photos/Imagem do ChatGPT 11 de out. de 2026, 12_41_12-6.png',
    ],
    description: 'Ensaio fotográfico moderno com jaqueta de couro cropped, jeans reto e tênis branco sobre fundo infinito bege porcelana. Autenticidade e atitude.',
    aspectRatio: 'portrait',
    lighting: 'Octabox difuso com preenchimento quente',
    location: 'Estúdio Helena — Ciclorama bege',
    paletteColors: {
      bg: '#F3EAE3',
      accent: '#65524B',
      text: '#222222',
    },
  },
  {
    id: 7,
    title: 'Olhar & Expressão Genuína',
    subtitle: 'Retrato close-up de beleza (beauty) com detalhes delicados',
    categories: ['Retratos', 'Estúdio'],
    primaryPath: '/photos/foto-7.jpg',
    fallbackPaths: [
      '/photos/foto-7.png',
      '/photos/Imagem do ChatGPT 11 de out. de 2026, 12_41_14-7.png',
    ],
    description: 'Close-up focado na textura natural da pele, brilho nos olhos castanhos e sorriso delicado. Colar minimalista com pingente sutil e iluminação límpida.',
    aspectRatio: 'portrait',
    lighting: 'Beauty Dish + Refletor prateado inferior',
    location: 'Estúdio Helena — Close-up Beauty',
    paletteColors: {
      bg: '#FAF9F7',
      accent: '#DDB7BD',
      text: '#222222',
    },
  },
  {
    id: 8,
    title: 'Aconchego & Luz de Janela',
    subtitle: 'Composição intimista sentada em poltrona estofada',
    categories: ['Estúdio', 'Lifestyle'],
    primaryPath: '/photos/foto-8.jpg',
    fallbackPaths: [
      '/photos/foto-8.png',
      '/photos/Imagem do ChatGPT 11 de out. de 2026, 12_41_16-8.png',
    ],
    description: 'Cenário aconchegante com poltrona de linho, cortinas brancas e luz natural vinda da janela lateral. Postura relaxada que transmite conforto e paz.',
    aspectRatio: 'portrait',
    lighting: 'Luz difusa de janela com cortina translúcida',
    location: 'Estúdio Helena — Sala de Luz Natural',
    paletteColors: {
      bg: '#F4ECE6',
      accent: '#65524B',
      text: '#222222',
    },
  },
  {
    id: 9,
    title: 'Contraste Sofisticado em Fundo Escuro',
    subtitle: 'Retrato marcante com fundo escuro e iluminação de contorno',
    categories: ['Estúdio', 'Retratos'],
    primaryPath: '/photos/foto-9.jpg',
    fallbackPaths: [
      '/photos/foto-9.png',
      '/photos/Imagem do ChatGPT 11 de out. de 2026, 12_41_17-9.png',
    ],
    description: 'Iluminação de recorte delicada sobre fundo escuro. A jaqueta de couro e a expressão confiante trazem sofisticação e mistério para a fotografia.',
    aspectRatio: 'portrait',
    lighting: 'Rim Light de recorte + Key Light lateral',
    location: 'Estúdio Helena — Cenário Dark Noir',
    paletteColors: {
      bg: '#2A2928',
      accent: '#DDB7BD',
      text: '#FAF9F7',
    },
  },
];

/**
 * 4 TIPOS DE ENSAIO (Conforme item 6 do prompt)
 */
export const SESSION_TYPES: SessionType[] = [
  {
    id: 'ar-livre',
    title: 'Ensaio ao ar livre',
    subtitle: 'Luz natural e cenários vivos',
    description: 'Fotografias com luz natural em parques, jardins e paisagens encantadoras. Perfeito para quem busca liberdade de movimento, espontaneidade e uma conexão genuína com a natureza.',
    duration: '1h30 a 2h de sessão',
    idealFor: 'Passeios ao entardecer, campos floridos e ambientes abertos',
    startingPrice: 'Consulte pacotes',
    badge: 'Popular',
    photoId: 2,
    deliverables: [
      'Orientação completa de looks e paleta de cores',
      'Locações selecionadas com luz suave',
      'Galeria online privada para escolha',
      'Fotografias em alta resolução tratadas com carinho',
    ],
  },
  {
    id: 'estudio',
    title: 'Ensaio em estúdio',
    subtitle: 'Iluminação controlada e precisão estética',
    description: 'Retratos profissionais com iluminação controlada e cenários cuidadosamente preparados. Clima intimista e acolhedor onde cada detalhe técnico está a favor da sua melhor versão.',
    duration: '1h a 1h30 de sessão',
    idealFor: 'Ensaios atemporais, fundos infinitos e composições minimalistas',
    startingPrice: 'Consulte pacotes',
    photoId: 6,
    deliverables: [
      'Ambiente climatizado com trilha sonora suave',
      'Trocas de look com suporte de styling',
      'Controle impecável de luzes e sombras',
      'Entrega digital refinada em alta definição',
    ],
  },
  {
    id: 'feminino',
    title: 'Ensaio feminino',
    subtitle: 'Autoestima, identidade e delicadeza',
    description: 'Uma experiência dedicada à autoestima, à personalidade e à beleza de cada mulher. Um dia especial para celebrar suas conquistas, sua feminilidade e sua essência sem julgamentos.',
    duration: '2h de experiência imersiva',
    idealFor: 'Mulheres que desejam se reconectar com seu amor-próprio',
    startingPrice: 'Consulte pacotes',
    badge: 'Assinatura Helena',
    photoId: 1,
    deliverables: [
      'Guia pré-ensaio com dicas de preparação e bem-estar',
      'Direção de poses leve, sem nada engessado',
      'Café de boas-vindas e atendimento individualizado',
      'Fotografias que contam a sua verdadeira história',
    ],
  },
  {
    id: 'profissional',
    title: 'Retrato profissional',
    subtitle: 'Posicionamento e autoridade autêntica',
    description: 'Fotografias para posicionamento pessoal, perfis profissionais e redes sociais. Retratos modernos e humanos que transmitem credibilidade, proximidade e elegância para sua carreira.',
    duration: '45min a 1h de sessão',
    idealFor: 'Médicas, advogadas, psicólogas, líderes e empreendedoras',
    startingPrice: 'Consulte pacotes',
    photoId: 5,
    deliverables: [
      'Alinhamento prévio com foco na sua identidade de marca',
      'Formatos otimizados para LinkedIn, site e imprensa',
      'Edição limpa preservando naturalidade e pele real',
      'Agilidade na entrega das fotos finais',
    ],
  },
];

/**
 * 4 ETAPAS DA EXPERIÊNCIA DO CLIENTE (Conforme item 7 do prompt)
 */
export const CLIENT_STEPS: ClientStep[] = [
  {
    number: '01',
    title: 'Escolha o estilo do seu ensaio',
    description: 'Navegue pelo portfólio e selecione a atmosfera que mais combina com seu momento: ao ar livre, estúdio minimalista ou retrato profissional.',
    iconName: 'Sparkles',
  },
  {
    number: '02',
    title: 'Entre em contato e combine os detalhes',
    description: 'Conversamos sobre suas expectativas, tiramos dúvidas, definimos looks, locação ideal e agendamos a melhor data na agenda.',
    iconName: 'MessageSquareHeart',
  },
  {
    number: '03',
    title: 'Viva a experiência fotográfica',
    description: 'No dia do ensaio, criamos um espaço seguro e leve. Com direção gentil e acolhedora, você vai se sentir à vontade desde o primeiro minuto.',
    iconName: 'Camera',
  },
  {
    number: '04',
    title: 'Receba suas fotografias',
    description: 'Acesse uma galeria privada e protegida com suas fotos em alta resolução, tratadas com carinho e prontas para eternizar sua história.',
    iconName: 'HeartHandshake',
  },
];

/**
 * DEPOIMENTOS (Conforme item 8 do prompt)
 * 
 * "Criar uma seção preparada para receber depoimentos reais.
 *  Não inventar nomes, avaliações ou relatos de clientes.
 *  Enquanto não houver depoimentos cadastrados, utilizar uma apresentação elegante convidando visitantes a conhecerem o trabalho."
 */
export const INITIAL_TESTIMONIALS: Testimonial[] = [];
