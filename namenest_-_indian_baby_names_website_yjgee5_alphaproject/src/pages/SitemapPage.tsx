import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import { mockBlogs } from '../data/mockData';

const SitemapPage: React.FC = () => {
  const mainPages = [
    { path: '/', name: 'Home' },
    { path: '/names', name: 'Names Database' },
    { path: '/blog', name: 'Blog' },
    { path: '/reviews', name: 'Reviews' },
    { path: '/favorites', name: 'My Favorites' },
    { path: '/about', name: 'About Us' },
    { path: '/contact', name: 'Contact Us' },
    { path: '/faq', name: 'FAQ' },
  ];

  const policyPages = [
    { path: '/privacy-policy', name: 'Privacy Policy' },
    { path: '/terms', name: 'Terms of Service' },
    { path: '/disclaimer', name: 'Disclaimer' },
  ];

  return (
    <>
      <Seo
        title="Sitemap"
        description="Explore the sitemap for NameNest to easily navigate through all our pages, including our names database, blog articles, and company information."
        canonicalUrl="https://namenest.in/sitemap"
      />
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-500 mb-8">Sitemap</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold text-saffron-500 mb-4 border-b pb-2">Main Pages</h2>
              <ul className="space-y-2">
                {mainPages.map(page => (
                  <li key={page.path}>
                    <Link to={page.path} className="text-gray-600 hover:text-emerald-500">{page.name}</Link>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold text-saffron-500 mt-8 mb-4 border-b pb-2">Legal</h2>
              <ul className="space-y-2">
                {policyPages.map(page => (
                  <li key={page.path}>
                    <Link to={page.path} className="text-gray-600 hover:text-emerald-500">{page.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-saffron-500 mb-4 border-b pb-2">Blog Articles</h2>
              <ul className="space-y-2 max-h-96 overflow-y-auto">
                {mockBlogs.map(blog => (
                  <li key={blog.id}>
                    <Link to={`/blog/${blog.slug}`} className="text-gray-600 hover:text-emerald-500 text-sm">
                      {blog.title.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SitemapPage;
