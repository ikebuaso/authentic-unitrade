'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, MapPin, Heart } from 'lucide-react';
import Link from 'next/link';
import { useProductsStore } from '@/store/products-store';
import { useCartStore } from '@/store/cart-store';
import { useSavedStore } from '@/store/saved-store';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';

const MarketplacePage = () => {
  const { 
    categories, 
    searchQuery, 
    selectedCategory, 
    setSearchQuery, 
    setSelectedCategory, 
    getFilteredProducts,
    fetchProducts,
    isLoading 
  } = useProductsStore();
  
  const { addToCart } = useCartStore();
  const { isSaved, toggleSaved } = useSavedStore();
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = getFilteredProducts();

  const handleAddToCart = async (product: any) => {
    setLocalLoading(true);
    try {
      addToCart(product);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleToggleSaved = (product: any) => {
    toggleSaved(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white z-40 border-b border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-light text-black">UniTrade</h1>
              <Link href="/cart">
                <div className="relative">
                  <ShoppingBag size={24} className="text-black" />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {useCartStore.getState().getTotalItems()}
                  </span>
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1 border whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loading size="large" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 bg-white relative">
                  {/* Save Button */}
                  <button
                    onClick={() => handleToggleSaved(product)}
                    className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Heart 
                      size={14} 
                      className={isSaved(product.id) ? 'fill-current text-red-500' : 'text-gray-400'} 
                    />
                  </button>
                  
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square bg-gray-100 relative">
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-3">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-black font-medium text-sm mb-1 line-clamp-2">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <p className="text-black font-semibold mb-1">
                      {formatPrice(product.price)}
                    </p>
                    
                    <div className="flex items-center text-gray-500 text-xs mb-2">
                      <MapPin size={12} className="mr-1" />
                      {product.location}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={localLoading}
                      className="w-full bg-black text-white py-2 text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MarketplacePage;