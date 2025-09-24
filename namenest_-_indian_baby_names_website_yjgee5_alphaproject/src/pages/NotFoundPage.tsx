import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Seo from '../components/common/Seo';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Seo
        title="404 - Page Not Found"
        description="The page you are looking for does not exist on NameNest. Please check the URL or return to the homepage."
      />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-9xl font-extrabold text-saffron-500 tracking-wider">404</h1>
          <h2 className="text-3xl font-bold text-navy-500 mt-4">Page Not Found</h2>
          <p className="text-gray-600 mt-2 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 transition-colors"
            >
              <Home size={18} />
              Go to Homepage
            </Link>
            <Link
              to="/names"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Search size={18} />
              Search Names
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
