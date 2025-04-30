import React from 'react';
import { Users, FileBarChart, Target, Wand2 } from 'lucide-react';

const SummaryStats: React.FC = () => {
  const stats = [
    {
      title: 'Active Users',
      value: '245',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Software Assets',
      value: '1,432',
      change: '+8%',
      icon: FileBarChart,
      color: 'green'
    },
    {
      title: 'Compliance Rate',
      value: '94%',
      change: '+3%',
      icon: Target,
      color: 'indigo'
    },
    {
      title: 'Automation Rate',
      value: '76%',
      change: '+15%',
      icon: Wand2,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm p-6 flex items-start justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm font-medium text-green-600 mt-1">
                {stat.change}
              </p>
            </div>
            <div className={`text-${stat.color}-500`}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryStats;
