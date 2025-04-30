import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useStakeholderStore } from '../stores/stakeholderStore';

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  department: string;
}

interface Risk {
  id: string;
  title: string;
  score: number;
  owner: string;
  date: string;
}

interface DashboardState {
  stakeholders: Stakeholder[];
  risks: Risk[];
  connectors: number;
  reportsGenerated: number;
  upcomingDeadlines: Array<{
    id: string;
    title: string;
    date: string;
    status: 'Due Soon' | 'In Progress' | 'Completed';
  }>;
}

type DashboardAction =
  | { type: 'SET_STAKEHOLDERS'; payload: Stakeholder[] }
  | { type: 'ADD_STAKEHOLDER'; payload: Stakeholder }
  | { type: 'REMOVE_STAKEHOLDER'; payload: string }
  | { type: 'ADD_RISK'; payload: Risk }
  | { type: 'UPDATE_RISK'; payload: Risk }
  | { type: 'INCREMENT_CONNECTORS' }
  | { type: 'DECREMENT_CONNECTORS' }
  | { type: 'INCREMENT_REPORTS' }
  | { type: 'ADD_DEADLINE'; payload: { id: string; title: string; date: string; status: 'Due Soon' | 'In Progress' | 'Completed' } }
  | { type: 'UPDATE_DEADLINE_STATUS'; payload: { id: string; status: 'Due Soon' | 'In Progress' | 'Completed' } };

const initialState: DashboardState = {
  stakeholders: [],
  risks: [],
  connectors: 0,
  reportsGenerated: 0,
  upcomingDeadlines: [],
};

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'SET_STAKEHOLDERS':
      return {
        ...state,
        stakeholders: action.payload,
      };
    case 'ADD_STAKEHOLDER':
      return {
        ...state,
        stakeholders: [...state.stakeholders, action.payload],
      };
    case 'REMOVE_STAKEHOLDER':
      return {
        ...state,
        stakeholders: state.stakeholders.filter((s) => s.id !== action.payload),
      };
    case 'ADD_RISK':
      return {
        ...state,
        risks: [...state.risks, action.payload],
      };
    case 'UPDATE_RISK':
      return {
        ...state,
        risks: state.risks.map((risk) =>
          risk.id === action.payload.id ? action.payload : risk
        ),
      };
    case 'INCREMENT_CONNECTORS':
      return {
        ...state,
        connectors: state.connectors + 1,
      };
    case 'DECREMENT_CONNECTORS':
      return {
        ...state,
        connectors: Math.max(0, state.connectors - 1),
      };
    case 'INCREMENT_REPORTS':
      return {
        ...state,
        reportsGenerated: state.reportsGenerated + 1,
      };
    case 'ADD_DEADLINE':
      return {
        ...state,
        upcomingDeadlines: [...state.upcomingDeadlines, action.payload],
      };
    case 'UPDATE_DEADLINE_STATUS':
      return {
        ...state,
        upcomingDeadlines: state.upcomingDeadlines.map((deadline) =>
          deadline.id === action.payload.id
            ? { ...deadline, status: action.payload.status }
            : deadline
        ),
      };
    default:
      return state;
  }
};

interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const stakeholders = useStakeholderStore((state) => state.stakeholders);

  // Sync stakeholders from Zustand store
  useEffect(() => {
    // Transform stakeholders to match our format
    const transformedStakeholders = stakeholders.map(stakeholder => ({
      id: stakeholder.id,
      name: stakeholder.name,
      role: 'Stakeholder', // Default role
      department: 'General'  // Default department
    }));
    
    dispatch({ type: 'SET_STAKEHOLDERS', payload: transformedStakeholders });
  }, [stakeholders]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const useStakeholders = () => {
  const { state } = useDashboard();
  return {
    total: state.stakeholders.length,
    byDepartment: state.stakeholders.reduce((acc, curr) => {
      acc[curr.department] = (acc[curr.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
};

export const useRisks = () => {
  const { state } = useDashboard();
  return {
    total: state.risks.length,
    highSeverity: state.risks.filter((risk) => risk.score >= 75).length,
    byMonth: state.risks.reduce((acc, curr) => {
      const month = new Date(curr.date).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
};
