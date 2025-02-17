import { create } from 'zustand';

export const useProfileStore = create((set) => ({
  profile: null,
  fetchProfile: async (uid) => {
    // Mock implementation - replace with actual Firebase fetch
    const mockProfile = {
      uid,
      organizationId: 'org123',
      name: 'Test User',
      email: 'test@example.com',
    };
    set({ profile: mockProfile });
    return mockProfile;
  },
}));
