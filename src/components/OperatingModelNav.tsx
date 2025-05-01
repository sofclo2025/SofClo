import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OperatingModelNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isTeamActive = location.pathname.includes('/operating-model/team');
  const isMatrixActive = location.pathname.includes('/operating-model/tier-matrix');

  return (
    <div className="bg-white shadow-sm mb-6">
      <div className="max-w-4xl mx-auto">
        <nav className="flex space-x-4 p-4">
          <button
            onClick={() => navigate('/dashboard/operating-model/team')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isTeamActive 
                ? 'bg-[#00ADEF] text-white' 
                : 'text-gray-600 hover:text-[#007BBF] hover:bg-gray-100'
            }`}
          >
            SAM Team Structure
          </button>
          <button
            onClick={() => navigate('/dashboard/operating-model/tier-matrix')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isMatrixActive 
                ? 'bg-[#00ADEF] text-white' 
                : 'text-gray-600 hover:text-[#007BBF] hover:bg-gray-100'
            }`}
          >
            Software Tier Matrix
          </button>
        </nav>
      </div>
    </div>
  );
};

export default OperatingModelNav;
