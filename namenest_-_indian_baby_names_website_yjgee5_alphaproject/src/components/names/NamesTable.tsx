import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, Star, User, BookOpen } from 'lucide-react';
import { ParsedName } from '../../services/googleSheetsService';
import { useLanguage } from '../../contexts/LanguageContext';

interface NamesTableProps {
  names: ParsedName[];
  onFilterChange: (filters: any) => void;
  filterOptions: {
    genders: string[];
    religions: string[];
    origins: string[];
  };
}

const NamesTable: React.FC<NamesTableProps> = ({ names, onFilterChange, filterOptions }) => {
  const { language, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedReligion, setSelectedReligion] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const itemsPerPage = 20;

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('namenest-favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    onFilterChange({
      gender: selectedGender,
      religion: selectedReligion,
      origin: selectedOrigin,
      search: searchTerm
    });
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedGender, selectedReligion, selectedOrigin, onFilterChange]);

  const totalPages = Math.ceil(names.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedNames = names.slice(startIndex, startIndex + itemsPerPage);

  const toggleFavorite = (nameId: string) => {
    const updatedFavorites = favorites.includes(nameId)
      ? favorites.filter(id => id !== nameId)
      : [...favorites, nameId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('namenest-favorites', JSON.stringify(updatedFavorites));
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'boy': return '👦';
      case 'girl': return '👧';
      default: return '👶';
    }
  };

  const getReligionColor = (religion: string) => {
    const colors: Record<string, string> = {
      'hindu': 'bg-orange-100 text-orange-800',
      'muslim': 'bg-green-100 text-green-800',
      'christian': 'bg-blue-100 text-blue-800',
      'sikh': 'bg-yellow-100 text-yellow-800',
      'jain': 'bg-purple-100 text-purple-800',
      'buddhist': 'bg-red-100 text-red-800'
    };
    return colors[religion.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-4"
          >
            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('filter.gender')}
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500"
              >
                <option value="all">{t('filter.all')}</option>
                {filterOptions.genders.map(gender => (
                  <option key={gender} value={gender}>
                    {t(`gender.${gender}`) || gender}
                  </option>
                ))}
              </select>
            </div>

            {/* Religion Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('filter.religion')}
              </label>
              <select
                value={selectedReligion}
                onChange={(e) => setSelectedReligion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500"
              >
                <option value="all">{t('filter.all')}</option>
                {filterOptions.religions.map(religion => (
                  <option key={religion} value={religion}>
                    {religion.charAt(0).toUpperCase() + religion.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Origin Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin
              </label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-saffron-500"
              >
                <option value="all">{t('filter.all')}</option>
                {filterOptions.origins.map(origin => (
                  <option key={origin} value={origin}>
                    {origin}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {displayedNames.length} of {names.length} names
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {displayedNames.map((name, index) => (
          <motion.div
            key={name.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{name.name[language.code]}</h3>
                <p className="text-sm text-gray-600">{name.meaning[language.code]}</p>
              </div>
              <button
                onClick={() => toggleFavorite(name.id)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Heart
                  size={18}
                  className={favorites.includes(name.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReligionColor(name.religion)}`}>
                {name.religion.charAt(0).toUpperCase() + name.religion.slice(1)}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center gap-1">
                <span>{getGenderIcon(name.gender)}</span>
                {t(`gender.${name.gender}`) || name.gender}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {name.origin}
              </span>
              {name.zodiac && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {name.zodiac}
                </span>
              )}
            </div>
            
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <Star size={14} className="text-yellow-500" />
              <span>Popularity: {name.popularity}/100</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-saffron-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    Name
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} />
                    Meaning
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Religion</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Origin</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Zodiac</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Star size={16} />
                    Popularity
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedNames.map((name, index) => (
                <motion.tr
                  key={name.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{name.name[language.code]}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">{name.meaning[language.code]}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <span>{getGenderIcon(name.gender)}</span>
                      {t(`gender.${name.gender}`) || name.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getReligionColor(name.religion)}`}>
                      {name.religion.charAt(0).toUpperCase() + name.religion.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {name.origin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {name.zodiac || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" />
                      <span className="text-sm text-gray-600">{name.popularity}/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => toggleFavorite(name.id)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Heart
                        size={16}
                        className={favorites.includes(name.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                      />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === pageNum
                      ? 'bg-saffron-500 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Empty State */}
      {displayedNames.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No names found</h3>
          <p className="text-gray-500">Try adjusting your filters or search term</p>
        </div>
      )}
    </div>
  );
};

export default NamesTable;
