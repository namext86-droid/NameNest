import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Seo from '../components/common/Seo';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 text-gray-600 overflow-hidden"
          >
            <p className="pb-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: 'How do you source your names and their meanings?',
      answer: 'Our team conducts extensive research using historical texts, cultural documents, linguistic analysis, and community contributions. We cross-reference multiple sources to ensure the accuracy of meanings, origins, and religious context for each name.'
    },
    {
      question: 'Is the information on NameNest completely free to use?',
      answer: 'Yes, all the information on NameNest is completely free for personal use. Our mission is to provide an accessible resource for all parents. The site is supported by advertisements, which allows us to keep the content free.'
    },
    {
      question: 'How does the "Favorites" feature work?',
      answer: 'The Favorites feature allows you to save names you like by clicking the heart icon. These names are stored in your browser\'s local storage, which means they are saved on your device and accessible whenever you return to the site from the same browser. This data is not sent to our servers.'
    },
    {
      question: 'Can I suggest a new name or a correction?',
      answer: 'Absolutely! We welcome contributions from our community. Please use our Contact Us page to send us any suggestions, corrections, or new names you\'d like to see on the site. Our team will review all submissions.'
    },
    {
      question: 'Why do you use Google Sheets for your data?',
      answer: 'We use Google Sheets as a flexible and easily updatable database for our names. This allows our content team to quickly add new names and make corrections without needing technical assistance, ensuring our database is always growing and improving.'
    }
  ];

  return (
    <>
      <Seo
        title="Frequently Asked Questions (FAQ)"
        description="Find answers to common questions about NameNest, including how we source names, how to use our features, and our commitment to accuracy."
        canonicalUrl="https://namenest.in/faq"
      />
      <div className="bg-white">
        <header className="bg-navy-500 text-white text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg">Have questions? We have answers.</p>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </main>
      </div>
    </>
  );
};

export default FAQPage;
