import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Priority = 'high' | 'medium' | 'low';
export type Status = 'not_started' | 'in_progress' | 'review' | 'completed';

export interface BusinessObjective {
  id: string;
  text: string;
  order: number;
}

export interface Initiative {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  year: number;
  quarter: string;
  startDate: string;
  endDate: string;
  progress: number;
  stakeholders: string[];
  createdAt: number;
}

interface PlannerStore {
  initiatives: Initiative[];
  businessObjectives: BusinessObjective[];
  addInitiative: (initiative: Omit<Initiative, 'id' | 'createdAt'>) => void;
  updateInitiative: (id: string, updates: Partial<Initiative>) => void;
  removeInitiative: (id: string) => void;
  moveInitiative: (initiativeId: string, newStatus: Status) => void;
  addBusinessObjective: (text: string) => void;
  updateBusinessObjective: (id: string, text: string) => void;
  removeBusinessObjective: (id: string) => void;
  reorderBusinessObjectives: (objectives: BusinessObjective[]) => void;
  resetPlanner: () => void;
}

const defaultBusinessObjectives = [
  { id: '1', text: 'Enable software assets to be optimized and correctly licensed (compliant).', order: 1 },
  { id: '2', text: 'Provide systematic visibility of the licensing position and costs.', order: 2 },
  { id: '3', text: 'Support, monitor and drive evolvement of SAM guardrails.', order: 3 },
  { id: '4', text: 'Enable SAM tool software to visualize certified licensed software to the accountable stakeholders.', order: 4 },
  { id: '5', text: 'Ensure the quality and usability of data within the SAM tool.', order: 5 },
  { id: '6', text: 'Provide guidance, insight and actionable consumption data to management making strategic decisions.', order: 6 },
  { id: '7', text: 'Identify, quantify and report on software to Product owners, Service owners and Controllers.', order: 7 },
  { id: '8', text: 'Align responsibility and cooperate with relevant IT Supporting Functions regarding software.', order: 8 },
  { id: '9', text: 'Focus on the software that has the greatest impact.', order: 9 },
];

export const usePlannerStore = create<PlannerStore>()(
  persist(
    (set) => ({
      initiatives: [],
      businessObjectives: defaultBusinessObjectives,
      addInitiative: (initiative) =>
        set((state) => ({
          initiatives: [
            ...state.initiatives,
            {
              ...initiative,
              id: uuidv4(),
              createdAt: Date.now(),
            },
          ],
        })),
      updateInitiative: (id, updates) =>
        set((state) => ({
          initiatives: state.initiatives.map((initiative) =>
            initiative.id === id ? { ...initiative, ...updates } : initiative
          ),
        })),
      removeInitiative: (id) =>
        set((state) => ({
          initiatives: state.initiatives.filter((initiative) => initiative.id !== id),
        })),
      moveInitiative: (initiativeId, newStatus) =>
        set((state) => ({
          initiatives: state.initiatives.map((initiative) =>
            initiative.id === initiativeId
              ? {
                  ...initiative,
                  status: newStatus,
                  progress:
                    newStatus === 'completed'
                      ? 100
                      : newStatus === 'not_started'
                      ? 0
                      : initiative.progress,
                }
              : initiative
          ),
        })),
      addBusinessObjective: (text) =>
        set((state) => ({
          businessObjectives: [
            ...state.businessObjectives,
            {
              id: uuidv4(),
              text,
              order: state.businessObjectives.length + 1,
            },
          ],
        })),
      updateBusinessObjective: (id, text) =>
        set((state) => ({
          businessObjectives: state.businessObjectives.map((obj) =>
            obj.id === id ? { ...obj, text } : obj
          ),
        })),
      removeBusinessObjective: (id) =>
        set((state) => ({
          businessObjectives: state.businessObjectives
            .filter((obj) => obj.id !== id)
            .map((obj, index) => ({ ...obj, order: index + 1 })),
        })),
      reorderBusinessObjectives: (objectives) =>
        set(() => ({
          businessObjectives: objectives,
        })),
      resetPlanner: () =>
        set(() => ({
          initiatives: [],
          businessObjectives: defaultBusinessObjectives,
        })),
    }),
    {
      name: 'sam-planner-storage',
    }
  )
);
