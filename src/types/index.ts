export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface SearchResult {
  title: string;
  content: string;
  url: string;
  platform: string;
  score: number;
}

export type Platform = 'segment' | 'mparticle' | 'lytics' | 'zeotap' | 'all';