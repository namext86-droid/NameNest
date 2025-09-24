import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockBlogs, mockNames } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import Seo from '../components/common/Seo';
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react';
import NameCard from '../components/names/NameCard';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const blog = mockBlogs.find(b => b.slug === slug);

  if (!blog) {
    return <Navigate to="/404" />;
  }

  const relatedNames = mockNames.filter(name => blog.relatedNames.includes(name.slug.split('-')[0]));

  return (
    <>
      <Seo
        title={blog.title[language.code]}
        description={blog.metaDescription[language.code]}
        canonicalUrl={`https://namenest.in/blog/${blog.slug}`}
        imageUrl={blog.featuredImage}
        type="article"
      />
      <div className="bg-white min-h-screen">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <Link to="/blog" className="flex items-center gap-2 text-saffron-500 hover:text-saffron-600 font-medium">
                <ArrowLeft size={18} />
                Back to Blog
              </Link>
            </div>

            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-navy-500 mb-4">{blog.title[language.code]}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{blog.readTime} min read</span>
                </div>
              </div>
            </header>

            <img
              src={blog.featuredImage}
              alt={blog.title[language.code]}
              className="w-full rounded-lg shadow-lg mb-8"
            />

            <div
              className="prose lg:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content[language.code] }}
            />

            <div className="mt-12 flex flex-wrap items-center gap-2">
              <Tag size={16} className="text-gray-500" />
              {blog.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Related Names */}
          {relatedNames.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-navy-500 mb-6">Related Names</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedNames.map(name => (
                  <NameCard key={name.id} name={name} />
                ))}
              </div>
            </section>
          )}

          {/* Ad Placeholder */}
          <div className="mt-16 bg-gray-100 h-32 flex items-center justify-center text-gray-500 text-sm rounded-lg">
            Google AdSense Inline Banner
          </div>

        </main>
      </div>
    </>
  );
};

export default BlogDetailPage;
