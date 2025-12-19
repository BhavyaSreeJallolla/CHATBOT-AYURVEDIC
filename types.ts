
export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

export interface Therapy {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  duration: string;
  category: 'Detox' | 'Relaxation' | 'Skin' | 'Vitality';
}

export interface AppFeature {
  title: string;
  description: string;
  icon: string;
  action: string;
}
