import React from 'react';
import { motion } from 'framer-motion';
import { mockTestimonials } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import Seo from '../components/common/Seo';
import { Star, Calendar } from 'lucide-react';

const ReviewsPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <>
      <Seo
        title="Parent Reviews"
        description="See what parents across India are saying about NameNest. Read testimonials and reviews from our happy users."
        canonicalUrl="https://namenest.in/reviews"
      />
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-emerald-50 text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800">What Parents Say</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of families on their journey to find the perfect name.
          </p>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-saffron-200" />
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                  ))}
                </div>
                <blockquote className="text-gray-600 italic mb-4 flex-grow">
                  &ldquo;{testimonial.review[language.code]}&rdquo;
                </blockquote>
                <div className="text-xs text-gray-400 flex items-center gap-1 mt-auto">
                  <Calendar size={14} />
                  <span>Reviewed on {new Date(testimonial.date).toLocaleDateString('en-GB')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default ReviewsPage;
