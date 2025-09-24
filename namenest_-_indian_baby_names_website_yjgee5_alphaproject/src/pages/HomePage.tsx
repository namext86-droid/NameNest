import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, BookOpen, Users } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import NameCard from '../components/names/NameCard';
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel';
import { useLanguage } from '../contexts/LanguageContext';
import { mockNames, mockBlogs, mockTestimonials } from '../data/mockData';
import { SearchFilters } from '../types';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [searchResults, setSearchResults] = useState(mockNames.slice(0, 8));

  const handleSearch = (filters: SearchFilters) => {
    let filtered = mockNames;

    if (filters.query) {
      filtered = filtered.filter(name =>
        name.name.en.toLowerCase().includes(filters.query!.toLowerCase()) ||
        name.name.hi.includes(filters.query!) ||
        name.meaning.en.toLowerCase().includes(filters.query!.toLowerCase())
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(name => name.gender === filters.gender);
    }

    if (filters.religion) {
      filtered = filtered.filter(name => name.religion === filters.religion);
    }

    if (filters.origin) {
      filtered = filtered.filter(name => name.origin === filters.origin);
    }

    setSearchResults(filtered.slice(0, 8));
  };

  const handleRandomName = () => {
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    setSearchResults([randomName]);
  };

  const featuredBlogs = mockBlogs.slice(0, 3);
  const stats = [
    { label: 'Baby Names', value: '2800+', icon: Users },
    { label: 'Blog Articles', value: '15+', icon: BookOpen },
    { label: 'Happy Parents', value: '10K+', icon: Star }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-saffron-500 via-saffron-400 to-orange-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-saffron-100"
            >
              {t('hero.subtitle')}
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SearchBar
              onSearch={handleSearch}
              onRandomName={handleRandomName}
              showFilters={true}
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <stat.icon size={32} className="text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-saffron-100">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Names */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('popular.names')}</h2>
            <p className="text-lg text-gray-600">Discover beautiful names chosen by thousands of parents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {searchResults.map((name, index) => (
              <NameCard key={name.id} name={name} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/names"
              className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
            >
              View All Names
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* AdSense Inline */}
      <div className="bg-gray-100 h-32 flex items-center justify-center text-gray-500 text-sm">
        Google AdSense Inline Banner (728x90)
      </div>

      {/* Featured Blogs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('featured.blogs')}</h2>
            <p className="text-lg text-gray-600">Expert advice and insights for new parents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                <Link to={`/blog/${blog.slug}`}>
                  <img
                    src={blog.thumbnail}
                    alt={blog.title.en}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-saffron-500 transition-colors">
                      {blog.title.en}
                    </h3>
                    <p className="text-gray-600 mb-4">{blog.metaDescription.en}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{blog.readTime} min read</span>
                      <span className="text-emerald-500 hover:text-emerald-600 font-medium">
                        {t('read.more')} →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-saffron-500 text-white rounded-lg hover:bg-saffron-600 transition-colors font-medium"
            >
              View All Articles
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('testimonials.title')}</h2>
            <p className="text-lg text-gray-600">Trusted by thousands of parents across India</p>
          </div>

          <TestimonialCarousel testimonials={mockTestimonials} />

          <div className="text-center mt-8">
            <Link
              to="/reviews"
              className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
            >
              View All Reviews
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
