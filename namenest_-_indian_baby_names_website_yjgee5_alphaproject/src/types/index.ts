export interface BabyName {
  id: string;
  slug: string;
  name: {
    en: string;
    hi: string;
  };
  meaning: {
    en: string;
    hi: string;
  };
  gender: 'boy' | 'girl' | 'unisex';
  origin: string;
  religion: 'hindu' | 'muslim' | 'christian' | 'sikh';
  popularity?: number;
  numerology?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: {
    en: string;
    hi: string;
  };
  metaDescription: {
    en: string;
    hi: string;
  };
  thumbnail: string;
  featuredImage: string;
  content: {
    en: string;
    hi: string;
  };
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  relatedNames: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: {
    en: string;
    hi: string;
  };
  location: string;
  date: string;
}

export interface Language {
  code: 'en' | 'hi';
  name: string;
  flag: string;
}

export interface SearchFilters {
  gender?: 'boy' | 'girl' | 'unisex';
  religion?: 'hindu' | 'muslim' | 'christian' | 'sikh';
  origin?: string;
  query?: string;
}
