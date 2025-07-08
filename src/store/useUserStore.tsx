import { create } from 'zustand';

interface UserStore {
  name: string;
  email: string;
  avatar: string | null;
  bio: string;
  setUser: (data: Partial<UserStore>) => void;
}

const useUserStore = create<UserStore>((set) => ({
  name: '',
  email: '',
  avatar: null,
  bio: '',
  setUser: (user) => set(state => ({ ...state, ...user })),
}));

export default useUserStore
