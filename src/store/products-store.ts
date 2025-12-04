import { create } from 'zustand';
import { Product } from './cart-store';

interface ProductsState {
  products: Product[];
  categories: string[];
  searchQuery: string;
  selectedCategory: string;
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  getFilteredProducts: () => Product[];
}

// Mock data for development
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Peanut',
    price: 500,
    description: 'Peanut snacks, very tasty and healthy.',
    category: 'food',
    condition: 'Like New',
    location: 'Lagos',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    sellerId: 'seller1',
    sellerName: 'Snack hub',
    sellerPhone: '+234 9012 663 411',
    sellerEmail: '',
    sellerRating: 4.8,
    createdAt: '2025-11-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'chin chin',
    price: 500,
    description: 'Medium size chin chin snacks, crispy and delicious.',
    category: 'food',
    condition: 'Good',
    location: 'Enugu',
    imageUrl: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',
    sellerId: 'seller2',
    sellerName: 'campus care',
    sellerPhone: '+234 810 069 9489',
    sellerEmail: '',
    sellerRating: 4.6,
    createdAt: '2024-01-14T15:30:00Z',
  },
  {
    id: '3',
    title: 'chin chin',
    price: 1000,
    description: 'Large size chin chin snacks, crispy and delicious.',
    category: 'food',
    condition: 'Good',
    location: 'Enugu',
    imageUrl: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',
    sellerId: 'seller2',
    sellerName: 'campus care',
    sellerPhone: '+234 810 069 9489',
    sellerEmail: '',
    sellerRating: 4.6,
    createdAt: '2024-01-14T15:30:00Z',
  },
  {
    id: '4',
    title: 'Textbook Bundle',
    price: 15000,
    description: 'Engineering textbooks bundle. All in good condition.',
    category: 'Books',
    condition: 'Fair',
    location: 'Enugu',
    imageUrl: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=500&h=500&fit=crop',
    sellerId: 'seller4',
    sellerName: 'Book Store',
    sellerPhone: '+234 804 567 8901',
    sellerEmail: 'books@unitrade.ng',
    sellerRating: 4.7,
    createdAt: '2024-01-12T14:20:00Z',
  },
  {
    id: '5',
    title: 'Textbook Bundle',
    price: 15000,
    description: 'Engineering textbooks bundle. All in good condition.',
    category: 'Books',
    condition: 'Fair',
    location: 'Ibadan',
    imageUrl: 'https://images.unsplash.com/photo-1571802354043-2de0527b14af?w=500&h=500&fit=crop',
    sellerId: 'seller4',
    sellerName: 'Book Store',
    sellerPhone: '+234 804 567 8901',
    sellerEmail: 'books@unitrade.ng',
    sellerRating: 4.7,
    createdAt: '2024-01-12T14:20:00Z',
  },
  {
    id: '6',
    title: 'Textbook Bundle',
    price: 15000,
    description: 'Engineering textbooks bundle. All in good condition.',
    category: 'Books',
    condition: 'Fair',
    location: 'Ibadan',
    imageUrl: 'https://images.unsplash.com/photo-1571802354043-2de0527b14af?w=500&h=500&fit=crop',
    sellerId: 'seller4',
    sellerName: 'Book Store',
    sellerPhone: '+234 804 567 8901',
    sellerEmail: 'books@unitrade.ng',
    sellerRating: 4.7,
    createdAt: '2024-01-12T14:20:00Z',
  },
  {
    id: '7',
    title: 'Textbook Bundle',
    price: 15000,
    description: 'Engineering textbooks bundle. All in good condition.',
    category: 'Books',
    condition: 'Fair',
    location: 'Ibadan',
    imageUrl: 'https://images.unsplash.com/photo-1571802354043-2de0527b14af?w=500&h=500&fit=crop',
    sellerId: 'seller4',
    sellerName: 'Book Store',
    sellerPhone: '+234 804 567 8901',
    sellerEmail: 'books@unitrade.ng',
    sellerRating: 4.7,
    createdAt: '2024-01-12T14:20:00Z',
  },
  {
    id: '8',
    title: 'Textbook Bundle',
    price: 15000,
    description: 'Engineering textbooks bundle. All in good condition.',
    category: 'Books',
    condition: 'Fair',
    location: 'Ibadan',
    imageUrl: 'https://images.unsplash.com/photo-1571802354043-2de0527b14af?w=500&h=500&fit=crop',
    sellerId: 'seller4',
    sellerName: 'Book Store',
    sellerPhone: '+234 804 567 8901',
    sellerEmail: 'books@unitrade.ng',
    sellerRating: 4.7,
    createdAt: '2024-01-12T14:20:00Z',
  },
];

export const useProductsStore = create<ProductsState>((set, get) => ({
      products: mockProducts,
      categories: ['All', 'Electronics', 'Furniture', 'Books', 'Clothing', 'Sports'],
      searchQuery: '',
      selectedCategory: 'All',
      isLoading: false,

      fetchProducts: async () => {
        set({ isLoading: true });
        try {
          // TODO: Call Backend API
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Mock data is already set
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      createProduct: async (productData) => {
        set({ isLoading: true });
        try {
          // TODO: Call Backend API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newProduct: Product = {
            ...productData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            products: [newProduct, ...state.products],
            isLoading: false,
          }));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      updateProduct: async (id: string, updates) => {
        set({ isLoading: true });
        try {
          // TODO: Call Backend API
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set((state) => ({
            products: state.products.map(product =>
              product.id === id ? { ...product, ...updates } : product
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      deleteProduct: async (id: string) => {
        set({ isLoading: true });
        try {
          // TODO: Call Backend API
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set((state) => ({
            products: state.products.filter(product => product.id !== id),
            isLoading: false,
          }));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category: string) => {
        set({ selectedCategory: category });
      },

      getFilteredProducts: () => {
        const { products, searchQuery, selectedCategory } = get();
        
        let filtered = products;
        
        // Filter by category
        if (selectedCategory !== 'All') {
          filtered = filtered.filter(product => product.category === selectedCategory);
        }
        
        // Filter by search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.location.toLowerCase().includes(query)
          );
        }
        
        return filtered;
      },
    })
);