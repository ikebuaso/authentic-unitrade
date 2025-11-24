import { create } from 'zustand';
import { Product } from './cart-store';

interface SavedState {
  savedItems: Product[];
  addToSaved: (product: Product) => void;
  removeFromSaved: (productId: string) => void;
  isSaved: (productId: string) => boolean;
  toggleSaved: (product: Product) => void;
  clearSaved: () => void;
  getSavedCount: () => number;
}

export const useSavedStore = create<SavedState>((set, get) => ({
  savedItems: [],

  addToSaved: (product: Product) => {
    set((state) => {
      const exists = state.savedItems.some(item => item.id === product.id);
      if (exists) {
        return state; // Already saved
      }
      return {
        savedItems: [...state.savedItems, product]
      };
    });
  },

  removeFromSaved: (productId: string) => {
    set((state) => ({
      savedItems: state.savedItems.filter(item => item.id !== productId)
    }));
  },

  isSaved: (productId: string) => {
    return get().savedItems.some(item => item.id === productId);
  },

  toggleSaved: (product: Product) => {
    const { isSaved, addToSaved, removeFromSaved } = get();
    if (isSaved(product.id)) {
      removeFromSaved(product.id);
    } else {
      addToSaved(product);
    }
  },

  clearSaved: () => {
    set({ savedItems: [] });
  },

  getSavedCount: () => {
    return get().savedItems.length;
  },
}));