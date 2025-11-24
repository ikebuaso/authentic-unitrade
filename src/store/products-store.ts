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
    title: 'MacBook Pro 14"',
    price: 850000,
    description: 'M1 Pro chip, 16GB RAM, 512GB SSD. Excellent condition, barely used.',
    category: 'Electronics',
    condition: 'Like New',
    location: 'Lagos',
    imageUrl: '/api/placeholder/300/200',
    sellerId: 'seller1',
    sellerName: 'Tech Seller',
    sellerPhone: '+234 801 234 5678',
    sellerEmail: 'techseller@unitrade.ng',
    sellerRating: 4.8,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'iPhone 13 Pro',
    price: 450000,
    description: '256GB, Graphite color. Great condition with original box and accessories.',
    category: 'Electronics',
    condition: 'Good',
    location: 'Abuja',
    imageUrl: '/api/placeholder/300/200',
    sellerId: 'seller2',
    sellerName: 'Mobile Hub',
    sellerPhone: '+234 802 345 6789',
    sellerEmail: 'mobilehub@unitrade.ng',
    sellerRating: 4.6,
    createdAt: '2024-01-14T15:30:00Z',
  },
  {
    id: '3',
    title: 'Study Desk',
    price: 35000,
    description: 'Wooden study desk with drawers. Perfect for students.',
    category: 'Furniture',
    condition: 'Good',
    location: 'Port Harcourt',
    imageUrl: '/api/placeholder/300/200',
    sellerId: 'seller3',
    sellerName: 'Furniture Plus',
    sellerPhone: '+234 803 456 7890',
    sellerEmail: 'furniture@unitrade.ng',
    sellerRating: 4.5,
    createdAt: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    title: 'Textbook Bundle',
    price: 15000,
    description: 'Engineering textbooks bundle. All in good condition.',
    category: 'Books',
    condition: 'Fair',
    location: 'Ibadan',
    imageUrl: '/api/placeholder/300/200',
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