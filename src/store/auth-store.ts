import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isSeller: boolean;
  rating?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  activateSeller: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // TODO: Call Backend API
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser: User = {
            id: '1',
            name: 'John Doe',
            email,
            phone: '+234 800 000 0000',
            isSeller: false,
            rating: 4.5,
          };

          set({ 
            user: mockUser, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (userData) => {
        set({ isLoading: true });
        try {
          // TODO: Call Backend API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser: User = {
            id: '1',
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            isSeller: false,
          };

          set({ 
            user: mockUser, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },

      activateSeller: async () => {
        set({ isLoading: true });
        try {
          // TODO: Call Backend API for payment processing
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const currentUser = get().user;
          if (currentUser) {
            set({ 
              user: { ...currentUser, isSeller: true },
              isLoading: false 
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...updates }
          });
        }
      },
    })
);