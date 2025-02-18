import { create } from 'zustand';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { DashboardFormData } from '../utils/types';

interface Organization {
  id: string;
  name: string;
  dashboardData?: DashboardFormData;
}

interface Profile {
  organization: Organization | null;
  loading: boolean;
  error: string | null;
}

interface ProfileStore extends Profile {
  fetchProfile: () => Promise<void>;
  updateDashboardData: (data: DashboardFormData) => Promise<void>;
  reset: () => void;
}

const initialState: Profile = {
  organization: null,
  loading: false,
  error: null,
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  ...initialState,

  fetchProfile: async () => {
    try {
      set({ loading: true, error: null });
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('No user logged in');
      }

      // First, try to get the user's organization ID
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create user document with organization
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          organizationId: user.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        
        // Create organization document
        await setDoc(doc(db, 'organizations', user.uid), {
          name: 'My Organization',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          dashboardData: {
            metrics: {
              totalLicenses: 0,
              activeUsers: 0,
              complianceRate: 0,
              costOptimization: 0,
            },
            maturityScores: {
              "Strategy & Governance": 0,
              "Process & Automation": 0,
              "Technology & Tools": 0,
              "People & Skills": 0,
              "Vendor Management": 0,
            },
            complianceStatus: {
              compliant: 0,
              nonCompliant: 0,
              atRisk: 0,
            },
            stakeholders: []
          }
        });
      }

      const userData = userDoc.exists() ? userDoc.data() : { organizationId: user.uid };
      const orgDoc = await getDoc(doc(db, 'organizations', userData.organizationId));

      if (!orgDoc.exists()) {
        throw new Error('Organization not found');
      }

      const orgData = orgDoc.data();
      set({
        organization: {
          id: userData.organizationId,
          name: orgData.name,
          dashboardData: orgData.dashboardData,
        },
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateDashboardData: async (data: DashboardFormData) => {
    try {
      const { organization } = get();
      if (!organization) {
        throw new Error('No organization found');
      }

      const orgRef = doc(db, 'organizations', organization.id);
      await updateDoc(orgRef, {
        updatedAt: new Date().toISOString(),
        dashboardData: data,
      });

      set(state => ({
        organization: {
          ...state.organization!,
          dashboardData: data,
        },
      }));
    } catch (error) {
      console.error('Error updating dashboard data:', error);
      throw error;
    }
  },

  reset: () => {
    set(initialState);
  },
}));
