import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import FrameworkCard, { FrameworkSection } from '../../components/FrameworkCard';
import QuarterCard, { QuarterInfo } from '../../components/QuarterCard';
import SummaryStats from '../../components/SummaryStats';
import {
  Target,
  Users,
  FileBarChart,
  Settings2 as OperatingModelIcon,
  Wand2,
} from 'lucide-react';

// Framework component data
const frameworkSections: FrameworkSection[] = [
  {
    title: 'Program Scope',
    icon: <Target size={24} />,
    description: 'Define and manage the scope of your SAM program',
    items: [
      'SAM Program Charter',
      'Scope Definition',
      'Inclusion/Exclusions',
      'Coverage Targets',
    ],
    color: 'blue',
    path: '/dashboard/program-scope'
  },
  {
    title: 'Operating Model',
    icon: <OperatingModelIcon size={24} />,
    description: 'Core structure and approach for managing software assets',
    items: [
      'SAM Organization',
      'SAM Services',
      'Software Tiering & Prioritization',
      'Tier Criteria Definition',
      'Tier 1/2/3 Vendor Lists',
      'Tier Impact Model',
      'SAM Plan',
    ],
    color: 'green',
    path: '/operating-model'
  },
  {
    title: 'Software Vendors',
    icon: <FileBarChart size={24} />,
    description: 'Managing relationships and risk with software providers',
    items: [
      'List of Software Vendors',
      'Annual Wheel',
      'Vendor Risk Register',
      'ELP Project Calendar',
      'Annual Spend vs. Risk Score',
      'Rolling Schedule for ELPs',
    ],
    color: 'purple',
    path: '/vendors'
  },
  {
    title: 'Roles, Responsibilities & Governance',
    icon: <Users size={24} />,
    description: 'Defining who does what and ensuring accountability',
    items: [
      'SAM Team Roles',
      'RACI Matrix',
      'SAM-Advisory or Steering Board',
      'Communication Plan',
    ],
    color: 'orange',
    path: '/roles'
  },
  {
    title: 'Strategic Objectives & Maturity Goals',
    icon: <Target size={24} />,
    description: 'Setting direction and measuring progress',
    items: ['SAM "North Star" Vision', 'Business Objectives', 'Maturity Assessment'],
    color: 'red',
    path: '/objectives'
  },
  {
    title: 'Tooling & Data Management',
    icon: <Wand2 size={24} />,
    description: 'Supporting technologies and information governance',
    items: [
      'Primary SAM Tool',
      'Data Sources Integration',
      'Discovery & Deployment Plans',
      'Data Validation & Quality Plan',
    ],
    color: 'indigo',
    path: '/tooling'
  },
];

// Quarterly plan data
const quarters: QuarterInfo[] = [
  {
    title: 'Q1',
    tasks: [
      'Annual Planning',
      'Budget Alignment',
      'Tool Assessment',
      'Tier 1 Vendor Review'
    ],
    isActive: true
  },
  {
    title: 'Q2',
    tasks: [
      'Process Documentation',
      'Tier 2 Vendor Review',
      'Communication Plan',
      'Data Quality Audit'
    ]
  },
  {
    title: 'Q3',
    tasks: [
      'Mid-year Assessment',
      'Tier 3 Vendor Review',
      'SAM Tool Optimization',
      'Staff Training'
    ]
  },
  {
    title: 'Q4',
    tasks: [
      'Annual Performance Review',
      'Next Year Planning',
      'Executive Reporting',
      'Success Measurement'
    ]
  }
];

const Overview = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="px-4 pb-12">
        {/* Hero Section */}
        <header className="max-w-5xl mx-auto text-center py-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-600">
            SAM Framework & Operating Model
          </h1>
        </header>
        
        <main className="max-w-7xl mx-auto">
          {/* Summary Stats */}
          <SummaryStats />
          
          {/* Framework Components */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Framework Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {frameworkSections.map((section) => (
                <FrameworkCard 
                  key={section.title} 
                  section={section} 
                  onClick={() => navigate(section.path)}
                />
              ))}
            </div>
          </div>
          
          {/* Quarterly Plan Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">SAM Annual Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quarters.map((quarter, index) => (
                <QuarterCard key={quarter.title} quarter={quarter} index={index} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Overview;
