import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: Language[];
  t: (key: string) => string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
];

const translations = {
  en: {
    'site.title': 'NameNest',
    'site.tagline': 'Beautiful Indian Baby Names with Meanings',
    'nav.home': 'Home',
    'nav.names': 'Names',
    'nav.blog': 'Blog',
    'nav.reviews': 'Reviews',
    'nav.favorites': 'Favorites',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'search.placeholder': 'Search for names...',
    'filter.gender': 'Gender',
    'filter.religion': 'Religion',
    'filter.all': 'All',
    'gender.boy': 'Boy',
    'gender.girl': 'Girl',
    'gender.unisex': 'Unisex',
    'religion.hindu': 'Hindu',
    'religion.muslim': 'Muslim',
    'religion.christian': 'Christian',
    'religion.sikh': 'Sikh',
    'hero.title': 'Discover Beautiful Indian Baby Names',
    'hero.subtitle': 'Find the perfect name for your little one from our collection of traditional and modern Indian names with beautiful meanings',
    'hero.cta': 'Explore Names',
    'hero.random': 'Random Name',
    'featured.blogs': 'Featured Articles',
    'testimonials.title': 'What Parents Say',
    'footer.description': 'Your trusted source for beautiful Indian baby names with meanings',
    'loading': 'Loading...',
    'favorites.add': 'Add to Favorites',
    'favorites.remove': 'Remove from Favorites',
    'read.more': 'Read More',
    'share': 'Share',
    'related.names': 'Related Names',
    'popular.names': 'Popular Names',
    'recent.blogs': 'Recent Articles'
  },
  hi: {
    'site.title': 'नेमनेस्ट',
    'site.tagline': 'अर्थ के साथ सुंदर भारतीय बच्चों के नाम',
    'nav.home': 'होम',
    'nav.names': 'नाम',
    'nav.blog': 'ब्लॉग',
    'nav.reviews': 'समीक्षा',
    'nav.favorites': 'पसंदीदा',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'search.placeholder': 'नाम खोजें...',
    'filter.gender': 'लिंग',
    'filter.religion': 'धर्म',
    'filter.all': 'सभी',
    'gender.boy': 'लड़का',
    'gender.girl': 'लड़की',
    'gender.unisex': 'दोनों',
    'religion.hindu': 'हिंदू',
    'religion.muslim': 'मुस्लिम',
    'religion.christian': 'ईसाई',
    'religion.sikh': 'सिख',
    'hero.title': 'सुंदर भारतीय बच्चों के नाम खोजें',
    'hero.subtitle': 'पारंपरिक और आधुनिक भारतीय नामों के हमारे संग्रह से अपने छोटे से बच्चे के लिए सही नाम चुनें',
    'hero.cta': 'नाम देखें',
    'hero.random': 'रैंडम नाम',
    'featured.blogs': 'विशेष लेख',
    'testimonials.title': 'माता-पिता क्या कहते हैं',
    'footer.description': 'अर्थ के साथ सुंदर भारतीय बच्चों के नामों का आपका विश्वसनीय स्रोत',
    'loading': 'लोड हो रहा है...',
    'favorites.add': 'पसंदीदा में जोड़ें',
    'favorites.remove': 'पसंदीदा से हटाएं',
    'read.more': 'और पढ़ें',
    'share': 'साझा करें',
    'related.names': 'संबंधित नाम',
    'popular.names': 'लोकप्रिय नाम',
    'recent.blogs': 'हाल के लेख'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    const savedLang = localStorage.getItem('namenest-language');
    if (savedLang) {
      const lang = languages.find(l => l.code === savedLang);
      if (lang) setLanguage(lang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('namenest-language', lang.code);
  };

  const t = (key: string): string => {
    return translations[language.code][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      languages,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
