import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Stakeholder {
  id: string;
  name: string;
  color: string;
  createdAt: number;
}

interface StakeholderStore {
  stakeholders: Stakeholder[];
  addStakeholder: (name: string, color: string) => void;
  removeStakeholder: (id: string) => void;
  resetStakeholders: () => void;
}

export const useStakeholderStore = create<StakeholderStore>()(
  persist(
    (set) => ({
      stakeholders: [],
      addStakeholder: (name: string, color: string) =>
        set((state) => ({
          stakeholders: [
            ...state.stakeholders,
            {
              id: uuidv4(),
              name,
              color,
              createdAt: Date.now(),
            },
          ],
        })),
      removeStakeholder: (id: string) =>
        set((state) => ({
          stakeholders: state.stakeholders.filter((s) => s.id !== id),
        })),
      resetStakeholders: () =>
        set(() => ({
          stakeholders: [],
        })),
    }),
    {
      name: 'stakeholder-store',
    }
  )
);
