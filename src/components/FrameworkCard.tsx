import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Circle } from 'lucide-react';

export interface FrameworkSection {
  title: string;
  icon: React.ReactNode;
  description: string;
  items: string[];
  color: string;
  path: string;
}

interface FrameworkCardProps {
  section: FrameworkSection;
  onClick?: () => void;
}

const FrameworkCard: React.FC<FrameworkCardProps> = ({ section, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; hover: string; text: string }> = {
      blue: { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-50', hover: 'hover:bg-green-100', text: 'text-green-600' },
      purple: { bg: 'bg-purple-50', hover: 'hover:bg-purple-100', text: 'text-purple-600' },
      orange: { bg: 'bg-orange-50', hover: 'hover:bg-orange-100', text: 'text-orange-600' },
      red: { bg: 'bg-red-50', hover: 'hover:bg-red-100', text: 'text-red-600' },
      indigo: { bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', text: 'text-indigo-600' },
    };
    return colorMap[color] || { bg: 'bg-gray-50', hover: 'hover:bg-gray-100', text: 'text-gray-600' };
  };

  const colorClasses = getColorClasses(section.color);
  const displayedItems = isExpanded ? section.items : section.items.slice(0, 3);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={onClick}
      className={`${colorClasses.bg} ${colorClasses.hover} p-6 rounded-xl shadow-sm transition-all duration-200 transform hover:scale-105 cursor-pointer relative`}
    >
      <div className="flex items-center mb-4">
        <div className={`${colorClasses.text} mr-3`}>
          {section.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{section.description}</p>
      
      <ul className="space-y-2">
        {displayedItems.map((item, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-start">
            <Circle 
              size={6} 
              className={`${colorClasses.text} mr-2 mt-1.5 flex-shrink-0 fill-current`} 
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {section.items.length > 3 && (
        <button
          onClick={handleToggle}
          className={`mt-3 flex items-center text-sm ${colorClasses.text} hover:opacity-80 transition-opacity`}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              Show More
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default FrameworkCard;
