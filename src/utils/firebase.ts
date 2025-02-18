import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import type { DashboardFormData } from './types';

export async function getCurrentUserOrg() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) {
    throw new Error('User document not found');
  }

  const userData = userDoc.data();
  if (!userData.organizationId) {
    throw new Error('User has no organization');
  }

  return userData.organizationId;
}

export async function updateDashboardData(data: DashboardFormData) {
  try {
    const orgId = await getCurrentUserOrg();
    const orgRef = doc(db, 'organizations', orgId);
    const orgDoc = await getDoc(orgRef);

    if (!orgDoc.exists()) {
      // Create new organization with dashboard data
      await setDoc(orgRef, {
        name: 'My Organization',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dashboardData: data,
      });
    } else {
      // Update existing organization
      await updateDoc(orgRef, {
        updatedAt: new Date().toISOString(),
        dashboardData: data,
      });
    }

    return orgId;
  } catch (error) {
    console.error('Error updating dashboard data:', error);
    throw error;
  }
}

export async function getDashboardData(): Promise<DashboardFormData | null> {
  try {
    const orgId = await getCurrentUserOrg();
    const orgDoc = await getDoc(doc(db, 'organizations', orgId));

    if (!orgDoc.exists()) {
      return null;
    }

    return orgDoc.data().dashboardData;
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    throw error;
  }
}
