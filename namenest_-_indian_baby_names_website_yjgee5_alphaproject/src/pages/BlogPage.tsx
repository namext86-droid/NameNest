import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockBlogs } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import Seo from '../components/common/Seo';
import { Calendar, Clock } from 'lucide-react';

const BlogPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Seo
        title="Blog"
        description="Read articles on Indian baby names, parenting tips, cultural traditions, and astrology from the NameNest blog."
        canonicalUrl="https://namenest.in/blog"
      />
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-saffron-50 text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-500">NameNest Blog</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your guide to Indian culture, parenting, and the beautiful world of names.
          </p>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col"
              >
                <Link to={`/blog/${blog.slug}`} className="flex flex-col h-full">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title[language.code]}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {blog.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs font-semibold text-saffron-600 bg-saffron-100 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-saffron-500 transition-colors">
                        {blog.title[language.code]}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {blog.metaDescription[language.code]}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(blog.publishedAt).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{blog.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default BlogPage;
