import { useEffect } from 'react';
import { usePlannerStore, Initiative } from '../../../stores/plannerStore';

const sampleInitiatives: Omit<Initiative, 'id' | 'createdAt'>[] = [
  {
    title: 'Engage Software Advisory Board',
    description: 'Establish software advisory board with key stakeholders',
    priority: 'high',
    status: 'not_started',
    year: 2024,
    quarter: 'Q1',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    progress: 0,
    stakeholders: [],
  },
  {
    title: 'Establish and Implement SAM Program',
    description: 'Core program implementation and structure setup',
    priority: 'high',
    status: 'in_progress',
    year: 2024,
    quarter: 'Q2',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    progress: 45,
    stakeholders: [],
  },
  {
    title: 'SAM Program License review',
    description: 'Comprehensive review of program licensing structure',
    priority: 'medium',
    status: 'review',
    year: 2024,
    quarter: 'Q1',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    progress: 85,
    stakeholders: [],
  },
  {
    title: 'SAM Program Scope review',
    description: 'Initial program scope definition and approval',
    priority: 'high',
    status: 'completed',
    year: 2024,
    quarter: 'Q2',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    progress: 100,
    stakeholders: [],
  },
  {
    title: 'Define SAM Guardrails',
    description: 'Develop and document key program guardrails',
    priority: 'medium',
    status: 'not_started',
    year: 2024,
    quarter: 'Q3',
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    progress: 0,
    stakeholders: [],
  },
  {
    title: 'SAM Tool Pilot (Flexera)',
    description: 'Initial tool implementation and configuration',
    priority: 'high',
    status: 'in_progress',
    year: 2024,
    quarter: 'Q2',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    progress: 60,
    stakeholders: [],
  },
  {
    title: 'Communicate SAM Plan/Goals',
    description: 'Share plans with wider organization',
    priority: 'medium',
    status: 'review',
    year: 2024,
    quarter: 'Q2',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    progress: 90,
    stakeholders: [],
  },
  {
    title: 'Establish SAM with Relevant Stakeholders',
    description: 'Initial stakeholder engagement and alignment',
    priority: 'high',
    status: 'completed',
    year: 2024,
    quarter: 'Q1',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    progress: 100,
    stakeholders: [],
  },
];

const InitialData: React.FC = () => {
  const { initiatives, addInitiative } = usePlannerStore();

  useEffect(() => {
    if (initiatives.length === 0) {
      sampleInitiatives.forEach((initiative) => {
        addInitiative(initiative);
      });
    }
  }, [initiatives.length, addInitiative]);

  return null;
};

export default InitialData;
