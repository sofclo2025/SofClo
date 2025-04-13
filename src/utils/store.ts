import { create } from 'zustand';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { Organization } from './types';

interface ProfileStore {
  loading: boolean;
  error: Error | null;
  organization: Organization | null;
  createOrganization: (orgData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>, userId: string) => Promise<void>;
  getOrganization: (userId: string) => Promise<void>;
}

const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
};

const getDocuments = async (collectionName: string, userId: string) => {
  try {
    const q = query(collection(db, collectionName), where('createdBy', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

export const useProfileStore = create<ProfileStore>((set) => ({
  loading: false,
  error: null,
  organization: null,

  createOrganization: async (orgData, userId) => {
    set({ loading: true, error: null });
    try {
      console.log("[Store] Creating organization for user:", userId);
      
      // Check if user already has an organization
      const existingOrgs = await getDocuments('organizations', userId);
      
      if (existingOrgs.length > 0) {
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
      const docId = await addDocument('organizations', newOrg);
      console.log("[Store] Organization created with ID:", docId);
      
      set({ 
        organization: { ...newOrg, id: docId },
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

      const orgs = await getDocuments('organizations', userId);
      
      if (orgs.length === 0) {
        console.log("[Store] No organization found for user:", userId);
        set({ organization: null, loading: false });
        throw new Error("No organization found");
      }

      const org = orgs[0];
      console.log("[Store] Organization found:", org);
      
      set({ 
        organization: org,
        loading: false 
      });
    } catch (error) {
      console.error("[Store] Error getting organization:", error);
      set({ error: error as Error, loading: false });
      throw error;
    }
  },
}));
