import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              SofClo
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              Help
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
