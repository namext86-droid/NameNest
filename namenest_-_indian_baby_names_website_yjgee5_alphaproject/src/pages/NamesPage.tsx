import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Database, Loader, AlertCircle } from 'lucide-react';
import NamesTable from '../components/names/NamesTable';
import { googleSheetsService, ParsedName } from '../services/googleSheetsService';
import { useLanguage } from '../contexts/LanguageContext';
import { mockNames } from '../data/mockData';

const NamesPage: React.FC = () => {
  const { t } = useLanguage();
  const [names, setNames] = useState<ParsedName[]>([]);
  const [filteredNames, setFilteredNames] = useState<ParsedName[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    genders: [] as string[],
    religions: [] as string[],
    origins: [] as string[]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'sheets' | 'mock'>('mock');

  const loadNames = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch from Google Sheets first
      const sheetsData = await googleSheetsService.fetchNames();
      
      if (sheetsData.length > 0) {
        setNames(sheetsData);
        setFilteredNames(sheetsData);
        setFilterOptions(googleSheetsService.getFilterOptions(sheetsData));
        setDataSource('sheets');
        console.log(`✅ Loaded ${sheetsData.length} names from Google Sheets`);
      } else {
        // Fallback to mock data
        const transformedMockData = mockNames.map(name => ({
          ...name,
          zodiac: name.numerology ? `Zodiac ${name.numerology}` : '',
          popularity: name.popularity || Math.floor(Math.random() * 100) + 1
        }));
        
        setNames(transformedMockData);
        setFilteredNames(transformedMockData);
        setFilterOptions(googleSheetsService.getFilterOptions(transformedMockData));
        setDataSource('mock');
        console.log(`⚠️ Using mock data (${transformedMockData.length} names)`);
      }
    } catch (err) {
      console.error('Error loading names:', err);
      setError('Failed to load names. Please try again later.');
      
      // Fallback to mock data on error
      const transformedMockData = mockNames.map(name => ({
        ...name,
        zodiac: name.numerology ? `Zodiac ${name.numerology}` : '',
        popularity: name.popularity || Math.floor(Math.random() * 100) + 1
      }));
      
      setNames(transformedMockData);
      setFilteredNames(transformedMockData);
      setFilterOptions(googleSheetsService.getFilterOptions(transformedMockData));
      setDataSource('mock');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNames();
  }, [loadNames]);

  const handleFilterChange = useCallback((filters: any) => {
    const filtered = googleSheetsService.filterNames(names, filters);
    setFilteredNames(filtered);
  }, [names]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-saffron-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Names...</h2>
          <p className="text-gray-600">Fetching data from Google Sheets</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('nav.names')} Database
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Explore our comprehensive collection of Indian baby names with meanings
            </p>
            
            {/* Data Source Indicator */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <Database size={16} className={dataSource === 'sheets' ? 'text-green-500' : 'text-yellow-500'} />
              <span className={dataSource === 'sheets' ? 'text-green-600' : 'text-yellow-600'}>
                {dataSource === 'sheets' ? '🔄 Live data from Google Sheets' : '⚠️ Using sample data'}
              </span>
              {dataSource === 'mock' && (
                <button
                  onClick={loadNames}
                  className="ml-2 text-saffron-500 hover:text-saffron-600 underline"
                >
                  Retry
                </button>
              )}
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg inline-flex items-center gap-2 text-red-600">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Names Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <NamesTable
            names={filteredNames}
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
          />
        </motion.div>
      </div>

      {/* Stats */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-saffron-500">{names.length}</div>
              <div className="text-sm text-gray-600">Total Names</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-500">{filterOptions.religions.length}</div>
              <div className="text-sm text-gray-600">Religions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">{filterOptions.origins.length}</div>
              <div className="text-sm text-gray-600">Origins</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">{filterOptions.genders.length}</div>
              <div className="text-sm text-gray-600">Gender Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Footer */}
      <div className="bg-gray-100 h-24 flex items-center justify-center text-gray-500 text-sm">
        Google AdSense Footer Banner (728x90)
      </div>
    </div>
  );
};

export default NamesPage;
