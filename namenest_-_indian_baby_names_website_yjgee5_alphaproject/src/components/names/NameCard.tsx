import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, User, Star } from 'lucide-react';
import { BabyName } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface NameCardProps {
  name: BabyName;
  index?: number;
}

const NameCard: React.FC<NameCardProps> = ({ name, index = 0 }) => {
  const { language, t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    // Update localStorage
    const favorites = JSON.parse(localStorage.getItem('namenest-favorites') || '[]');
    if (isFavorite) {
      const updated = favorites.filter((id: string) => id !== name.id);
      localStorage.setItem('namenest-favorites', JSON.stringify(updated));
    } else {
      favorites.push(name.id);
      localStorage.setItem('namenest-favorites', JSON.stringify(favorites));
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: `${name.name[language.code]} - ${t('site.title')}`,
        text: `Check out this beautiful name: ${name.name[language.code]} meaning ${name.meaning[language.code]}`,
        url: window.location.origin + `/names/${name.slug}`
      });
    }
  };

  const genderIcon = {
    boy: '👦',
    girl: '👧',
    unisex: '👶'
  };

  const religionColors = {
    hindu: 'bg-orange-100 text-orange-800',
    muslim: 'bg-green-100 text-green-800',
    christian: 'bg-blue-100 text-blue-800',
    sikh: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link to={`/names/${name.slug}`}>
        {/* Header */}
        <div className="bg-saffron-500 text-white p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">{name.name[language.code]}</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleFavoriteToggle}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <Heart
                  size={18}
                  className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <Share2 size={18} className="text-white" />
              </button>
            </div>
          </div>
          <p className="text-saffron-100 text-sm font-medium">
            {name.meaning[language.code]}
          </p>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${religionColors[name.religion]}`}>
              {t(`religion.${name.religion}`)}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center gap-1">
              <span>{genderIcon[name.gender]}</span>
              {t(`gender.${name.gender}`)}
            </span>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Origin:</span>
              <span>{name.origin}</span>
            </div>
            {name.popularity && (
              <div className="flex items-center gap-2">
                <Star size={14} className="text-yellow-500" />
                <span>Popularity: {name.popularity}/100</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>#{name.id}</span>
            <span className="text-emerald-500 hover:text-emerald-600 font-medium">
              {t('read.more')} →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NameCard;
