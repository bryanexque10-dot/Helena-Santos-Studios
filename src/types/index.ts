export type PhotoCategory = 'Todos' | 'Natureza' | 'Estúdio' | 'Retratos' | 'Lifestyle';

export interface PhotoItem {
  id: number;
  title: string;
  subtitle: string;
  categories: ('Natureza' | 'Estúdio' | 'Retratos' | 'Lifestyle')[];
  primaryPath: string;
  fallbackPaths: string[];
  description: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  lighting: string;
  location: string;
  paletteColors: {
    bg: string;
    accent: string;
    text: string;
  };
}

export interface SessionType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration?: string;
  deliverables?: string[];
  startingPrice?: string; // Preço futuro configurável
  idealFor: string;
  badge?: string;
  photoId: number;
}

export interface ClientStep {
  number: string;
  title: string;
  description: string;
  iconName: 'Sparkles' | 'MessageSquareHeart' | 'Camera' | 'HeartHandshake';
}

export interface Testimonial {
  id: string;
  author: string;
  role?: string;
  quote: string;
  photoUrl?: string;
  date?: string;
  sessionType?: string;
}

export interface ContactFormData {
  name: string;
  whatsapp: string;
  sessionType: string;
  preferredDate: string;
  message: string;
}
