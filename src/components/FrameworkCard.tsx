import React from 'react';

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
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; hover: string }> = {
      blue: { bg: 'bg-blue-50', hover: 'hover:bg-blue-100' },
      green: { bg: 'bg-green-50', hover: 'hover:bg-green-100' },
      purple: { bg: 'bg-purple-50', hover: 'hover:bg-purple-100' },
      orange: { bg: 'bg-orange-50', hover: 'hover:bg-orange-100' },
      red: { bg: 'bg-red-50', hover: 'hover:bg-red-100' },
      indigo: { bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100' },
    };
    return colorMap[color] || { bg: 'bg-gray-50', hover: 'hover:bg-gray-100' };
  };

  const colorClasses = getColorClasses(section.color);

  return (
    <div
      onClick={onClick}
      className={`${colorClasses.bg} ${colorClasses.hover} p-6 rounded-xl shadow-sm transition-all duration-200 transform hover:scale-105 cursor-pointer`}
    >
      <div className="flex items-center mb-4">
        <div className={`text-${section.color}-600 mr-3`}>
          {section.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{section.description}</p>
      
      <ul className="space-y-2">
        {section.items.slice(0, 3).map((item, index) => (
          <li key={index} className="text-sm text-gray-500 flex items-center">
            <span className={`w-1.5 h-1.5 rounded-full bg-${section.color}-400 mr-2`} />
            {item}
          </li>
        ))}
        {section.items.length > 3 && (
          <li className="text-sm text-gray-400 italic">
            +{section.items.length - 3} more items...
          </li>
        )}
      </ul>
    </div>
  );
};

export default FrameworkCard;
