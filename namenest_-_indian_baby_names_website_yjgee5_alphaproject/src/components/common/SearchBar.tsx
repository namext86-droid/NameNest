import React, { useState } from 'react';
import { Search, Filter, Shuffle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { SearchFilters } from '../../types';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  onRandomName?: () => void;
  showFilters?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onRandomName, showFilters = true }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleSearch = () => {
    onSearch({ ...filters, query: query.trim() });
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters };
    if (value === 'all' || value === '') {
      delete newFilters[key];
    } else {
      newFilters[key] = value as any;
    }
    setFilters(newFilters);
    onSearch({ ...newFilters, query: query.trim() });
  };

  const handleRandomName = () => {
    if (onRandomName) {
      onRandomName();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={t('search.placeholder')}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 focus:border-transparent text-lg"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-saffron-500 text-white rounded-lg hover:bg-saffron-600 transition-colors font-medium"
          >
            {t('search.placeholder').split(' ')[0]}
          </button>
          
          {showFilters && (
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter size={20} />
            </button>
          )}
          
          {onRandomName && (
            <motion.button
              onClick={handleRandomName}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              <Shuffle size={20} />
              <span className="hidden sm:inline">{t('hero.random')}</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && showFilterMenu && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('filter.gender')}
              </label>
              <select
                value={filters.gender || ''}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500"
              >
                <option value="">{t('filter.all')}</option>
                <option value="boy">{t('gender.boy')}</option>
                <option value="girl">{t('gender.girl')}</option>
                <option value="unisex">{t('gender.unisex')}</option>
              </select>
            </div>

            {/* Religion Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('filter.religion')}
              </label>
              <select
                value={filters.religion || ''}
                onChange={(e) => handleFilterChange('religion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500"
              >
                <option value="">{t('filter.all')}</option>
                <option value="hindu">{t('religion.hindu')}</option>
                <option value="muslim">{t('religion.muslim')}</option>
                <option value="christian">{t('religion.christian')}</option>
                <option value="sikh">{t('religion.sikh')}</option>
              </select>
            </div>

            {/* Origin Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin
              </label>
              <select
                value={filters.origin || ''}
                onChange={(e) => handleFilterChange('origin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500"
              >
                <option value="">{t('filter.all')}</option>
                <option value="Sanskrit">Sanskrit</option>
                <option value="Arabic">Arabic</option>
                <option value="Hebrew">Hebrew</option>
                <option value="Punjabi">Punjabi</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
