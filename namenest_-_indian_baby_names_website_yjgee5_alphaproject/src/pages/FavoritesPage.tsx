import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search } from 'lucide-react';
import { googleSheetsService, ParsedName } from '../services/googleSheetsService';
import { mockNames } from '../data/mockData';
import NameCard from '../components/names/NameCard';
import Seo from '../components/common/Seo';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  const [favoriteNames, setFavoriteNames] = useState<ParsedName[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNamesAndFilter = async () => {
      setLoading(true);
      const favoriteIds = JSON.parse(localStorage.getItem('namenest-favorites') || '[]');
      
      if (favoriteIds.length === 0) {
        setLoading(false);
        return;
      }

      // Use the same data loading strategy as NamesPage
      let allNames: ParsedName[] = [];
      try {
        const sheetsData = await googleSheetsService.fetchNames();
        if (sheetsData.length > 0) {
          allNames = sheetsData;
        } else {
          allNames = mockNames.map(name => ({
            ...name,
            zodiac: name.numerology ? `Zodiac ${name.numerology}` : '',
            popularity: name.popularity || Math.floor(Math.random() * 100) + 1,
            religion: name.religion,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch names, using mock data for favorites.", error);
        allNames = mockNames.map(name => ({
          ...name,
          zodiac: name.numerology ? `Zodiac ${name.numerology}` : '',
          popularity: name.popularity || Math.floor(Math.random() * 100) + 1,
          religion: name.religion,
        }));
      }
      
      const favorites = allNames.filter(name => favoriteIds.includes(name.id));
      setFavoriteNames(favorites);
      setLoading(false);
    };

    fetchAllNamesAndFilter();
  }, []);

  return (
    <>
      <Seo
        title="My Favorite Names"
        description="View and manage your list of favorite Indian baby names on NameNest. Your personalized collection is saved here for easy access."
        canonicalUrl="https://namenest.in/favorites"
      />
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-red-50 text-center py-20">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-red-800">My Favorite Names</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal collection of beautiful names.
          </p>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="text-center text-gray-500">Loading your favorite names...</div>
          ) : favoriteNames.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {favoriteNames.map((name, index) => (
                <NameCard key={name.id} name={name as any} index={index} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your favorites list is empty.</h2>
              <p className="text-gray-500 mb-6">Click the heart icon on any name to save it here.</p>
              <Link to="/names" className="inline-flex items-center gap-2 px-6 py-3 bg-saffron-500 text-white font-semibold rounded-lg shadow-md hover:bg-saffron-600 transition-colors">
                <Search size={18} />
                Find Names
              </Link>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default FavoritesPage;
