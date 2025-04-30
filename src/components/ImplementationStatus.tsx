import React from 'react';

const ImplementationStatus: React.FC = () => {
  const statuses = [
    { phase: 'Planning', progress: 100, color: 'green' },
    { phase: 'Setup', progress: 80, color: 'blue' },
    { phase: 'Implementation', progress: 60, color: 'indigo' },
    { phase: 'Testing', progress: 30, color: 'purple' },
    { phase: 'Deployment', progress: 10, color: 'pink' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Implementation Status</h2>
      
      <div className="space-y-6">
        {statuses.map(({ phase, progress, color }) => (
          <div key={phase}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{phase}</span>
              <span className="text-sm font-medium text-gray-500">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`bg-${color}-600 h-2.5 rounded-full transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Overall Progress</span>
          <span className="font-medium text-gray-700">56%</span>
        </div>
      </div>
    </div>
  );
};

export default ImplementationStatus;
