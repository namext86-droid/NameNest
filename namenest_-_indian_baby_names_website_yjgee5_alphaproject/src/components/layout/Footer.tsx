import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerLinks = {
    main: [
      { name: t('nav.names'), path: '/names' },
      { name: t('nav.blog'), path: '/blog' },
      { name: t('nav.reviews'), path: '/reviews' },
      { name: t('nav.favorites'), path: '/favorites' },
    ],
    company: [
      { name: t('nav.about'), path: '/about' },
      { name: t('nav.contact'), path: '/contact' },
    ],
    policies: [
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Disclaimer', path: '/disclaimer' },
    ],
    resources: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Sitemap', path: '/sitemap' },
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/namenest' },
    { icon: Twitter, href: 'https://twitter.com/namenest' },
    { icon: Instagram, href: 'https://instagram.com/namenest' },
  ];

  return (
    <footer className="bg-emerald-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand & Social */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-emerald-500 rounded-full"></div>
              </div>
              <span className="text-2xl font-bold">{t('site.title')}</span>
            </div>
            <p className="text-emerald-100 mb-4 text-sm">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-emerald-100 hover:text-white">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Explore', links: footerLinks.main },
            { title: 'Company', links: footerLinks.company },
            { title: 'Policies', links: footerLinks.policies },
            { title: 'Resources', links: footerLinks.resources },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-emerald-100 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-400 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-100 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {t('site.title')}. Made with <Heart size={14} className="inline text-red-400 fill-current" /> in India.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0 text-emerald-100">
            <Mail size={16} />
            <a href="mailto:hello@namenest.in" className="text-sm hover:text-white">hello@namenest.in</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
