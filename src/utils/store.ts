import { create } from 'zustand';
import { db } from '../config/firebase';
import { collection, addDoc, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { Organization } from './types';

interface ProfileStore {
  loading: boolean;
  error: Error | null;
  organization: Organization | null;
  createOrganization: (orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>, userId: string) => Promise<void>;
  getOrganization: (userId: string) => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  loading: false,
  error: null,
  organization: null,

  createOrganization: async (orgData, userId) => {
    set({ loading: true, error: null });
    try {
      console.log("[Store] Creating organization for user:", userId);
      
      // Check if user already has an organization
      const orgRef = collection(db, 'organizations');
      const q = query(orgRef, where('createdBy', '==', userId));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        throw new Error('User already has an organization');
      }

      // Create new organization
      const newOrg = {
        ...orgData,
        createdBy: userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      console.log("[Store] Creating new organization:", newOrg);
      const docRef = await addDoc(collection(db, 'organizations'), newOrg);
      console.log("[Store] Organization created with ID:", docRef.id);
      
      set({ 
        organization: { ...newOrg, id: docRef.id },
        loading: false 
      });
    } catch (error) {
      console.error("[Store] Error creating organization:", error);
      set({ error: error as Error, loading: false });
      throw error;
    }
  },

  getOrganization: async (userId: string) => {
    console.log("[Store] Getting organization for user:", userId);
    set({ loading: true, error: null });
    
    try {
      if (!userId) {
        console.error("[Store] Invalid userId:", userId);
        set({ organization: null, loading: false });
        throw new Error("Invalid user ID");
      }

      console.log("[Store] Creating Firestore query for user:", userId);
      const orgRef = collection(db, 'organizations');
      const q = query(orgRef, where('createdBy', '==', userId));
      
      console.log("[Store] Executing Firestore query...");
      const querySnapshot = await getDocs(q);
      console.log("[Store] Query complete. Documents found:", querySnapshot.size);
      
      if (querySnapshot.empty) {
        console.log("[Store] No organization found for user:", userId);
        set({ organization: null, loading: false });
        throw new Error("No organization found");
      }

      const orgDoc = querySnapshot.docs[0];
      const orgData = orgDoc.data() as Omit<Organization, 'id'>;
      console.log("[Store] Organization found:", { id: orgDoc.id, ...orgData });
      
      set({ 
        organization: { ...orgData, id: orgDoc.id },
        loading: false 
      });
    } catch (error) {
      console.error("[Store] Error getting organization:", error);
      set({ error: error as Error, loading: false });
      throw error;
    }
  },
}));
