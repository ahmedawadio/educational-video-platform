import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  username: string;
};

type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

// Available users in the system
export const USERS: User[] = [
  {
    id: 'ahmed_awad',
    username: 'ahmed_awad',
    name: 'Ahmed Awad',
    email: 'Ahmed@videomind.com',
    avatarUrl: '/AhmedAwad.png',
  },
  {
    id: 'ahmed_awad_andy_anderson',
    username: 'ahmed_awad_andy_anderson',
    name: 'Andy Anderson',
    email: 'andy@videomind.com',
    avatarUrl: '/AndyAnderson.png',
  },
  {
    id: 'ahmed_awad_kelly_kellerson',
    username: 'ahmed_awad_kelly_kellerson',
    name: 'Kelly Kellerson',
    email: 'kelly@videomind.com',
    avatarUrl: '/KellyKellerson.png',
  },
  {
    id: 'ahmed_awad_moe_shmoe',
    username: 'ahmed_awad_moe_shmoe',
    name: 'Moe Shmoe',
    email: 'moe@videomind.com',
    avatarUrl: '/MoeShmoe.png',
  },
];

// Create the store with persistence
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Default to Andy as the current user
      currentUser: USERS[0],
      setCurrentUser: (user) => set({ currentUser: user }),
    }),
    {
      name: 'videomind-user-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
); 