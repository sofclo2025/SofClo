import React from 'react';
import { useNavigate } from 'react-router-dom';

const OperatingModelLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-[#003A5D] mb-8">Operating Model & Software Vendors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* SAM Team Structure Card */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-[#007BBF]/20">
          <h2 className="text-xl font-semibold text-[#003A5D] mb-4">SAM Team Structure</h2>
          <p className="text-gray-600 mb-6">Define and organize your Software Asset Management team structure, roles, and responsibilities.</p>
          <button
            onClick={() => navigate('/dashboard/operating-model/team')}
            className="w-full px-4 py-2 bg-[#00ADEF] text-white rounded hover:bg-[#007BBF] transition-colors"
          >
            Configure Team Structure
          </button>
        </div>

        {/* Software Tier Matrix Card */}
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-[#007BBF]/20">
          <h2 className="text-xl font-semibold text-[#003A5D] mb-4">Software Tier Matrix</h2>
          <p className="text-gray-600 mb-6">Set up and manage your software vendor tiers based on spend, risk, and criticality metrics.</p>
          <button
            onClick={() => navigate('/dashboard/operating-model/tier-matrix')}
            className="w-full px-4 py-2 bg-[#00ADEF] text-white rounded hover:bg-[#007BBF] transition-colors"
          >
            Configure Tier Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperatingModelLanding;
