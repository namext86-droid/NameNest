import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Globe, Heart } from 'lucide-react';
import Seo from '../components/common/Seo';

const AboutPage: React.FC = () => {
  const teamMembers = [
    { name: 'Aarav Sharma', role: 'Founder & CEO', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Diya Patel', role: 'Head of Content', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Rohan Singh', role: 'Lead Developer', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  return (
    <>
      <Seo
        title="About Us"
        description="Learn about NameNest's mission to provide a beautiful and comprehensive resource for Indian baby names, blending tradition with modernity for parents across the globe."
        canonicalUrl="https://namenest.in/about"
      />
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <header className="bg-saffron-500 text-white text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold">About NameNest</h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              Connecting generations through the power of a name. Discover our story and our passion for Indian culture.
            </p>
          </motion.div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Our Mission */}
          <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold text-navy-500 mb-4"
              >
                Our Mission
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-gray-600 leading-relaxed"
              >
                At NameNest, our mission is to be the most trusted and delightful resource for Indian baby names. We believe a name is more than just a word; it's a blessing, an identity, and a connection to our rich heritage. We strive to blend tradition with modernity, offering a comprehensive database that is both authentic and easy to navigate for parents in India and across the globe.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Target className="w-48 h-48 text-emerald-500" />
            </motion.div>
          </section>

          {/* Our Values */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-navy-500 text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Users className="w-12 h-12 text-saffron-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community-Centric</h3>
                <p className="text-gray-600">Built for the Indian community, with a deep respect for all cultures and religions within our diverse nation.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Globe className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Authenticity & Accuracy</h3>
                <p className="text-gray-600">We are committed to providing accurate meanings, origins, and cultural context for every name in our collection.</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Simplicity & Joy</h3>
                <p className="text-gray-600">The journey of choosing a name should be joyful. Our platform is designed to be intuitive, beautiful, and a pleasure to use.</p>
              </div>
            </div>
          </section>

          {/* Our Team */}
          <section>
            <h2 className="text-3xl font-bold text-navy-500 text-center mb-12">Meet the Team</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <img src={member.avatar} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200" />
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AboutPage;
