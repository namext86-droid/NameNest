import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import Seo from '../components/common/Seo';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    // In a real app, you would send this data to a server
    setTimeout(() => {
      setStatus('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with the NameNest team. We'd love to hear your feedback, suggestions, or questions about our Indian baby names platform."
        canonicalUrl="https://namenest.in/contact"
      />
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-emerald-500 text-white text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold">Get in Touch</h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto">
              We are here to help and answer any question you might have. We look forward to hearing from you!
            </p>
          </motion.div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-navy-500">Contact Information</h2>
              <p className="text-gray-600">
                Have a question, feedback, or a partnership inquiry? Feel free to reach out to us through the form or using the contact details below.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-saffron-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <a href="mailto:hello@namenest.in" className="text-gray-600 hover:text-saffron-500">hello@namenest.in</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-saffron-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Our Office</h3>
                    <p className="text-gray-600">123 NameNest Lane, Tech Park, <br /> Bangalore, Karnataka, 560001, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-navy-500 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron-500 focus:border-saffron-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron-500 focus:border-saffron-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-saffron-500 focus:border-saffron-500"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-saffron-500 hover:bg-saffron-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron-500">
                    <Send size={18} />
                    Send Message
                  </button>
                </div>
                {status && <p className="text-center text-emerald-600">{status}</p>}
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ContactPage;
