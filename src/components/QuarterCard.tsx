import React from 'react';

export interface QuarterInfo {
  title: string;
  tasks: string[];
  isActive?: boolean;
}

interface QuarterCardProps {
  quarter: QuarterInfo;
  index: number;
}

const QuarterCard: React.FC<QuarterCardProps> = ({ quarter, index }) => {
  return (
    <div 
      className={`
        p-6 rounded-xl shadow-sm transition-all duration-200 
        ${quarter.isActive 
          ? 'bg-blue-50 border-2 border-blue-200' 
          : 'bg-white border border-gray-100'
        }
      `}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {quarter.title}
        {quarter.isActive && (
          <span className="ml-2 text-sm font-medium text-blue-600">
            (Current)
          </span>
        )}
      </h3>
      
      <ul className="space-y-3">
        {quarter.tasks.map((task, i) => (
          <li 
            key={i}
            className="flex items-start text-sm"
          >
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5 text-xs font-medium">
              {i + 1}
            </span>
            <span className="text-gray-600">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuarterCard;
