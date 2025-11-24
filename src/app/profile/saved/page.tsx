'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, ShoppingBag, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useSavedStore } from '@/store/saved-store';
import { useCartStore } from '@/store/cart-store';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';

const SavedItemsPage = () => {
  const router = useRouter();
  const { savedItems, removeFromSaved, toggleSaved } = useSavedStore();
  const { addToCart } = useCartStore();
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = async (product: any) => {
    setLoadingStates(prev => ({ ...prev, [product.id]: true }));
    try {
      addToCart(product);
    } finally {
      setLoadingStates(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleRemoveFromSaved = (productId: string) => {
    toggleSaved({ id: productId } as any);
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
          <div className="flex items-center p-4">
            <button onClick={() => router.back()}>
              <ArrowLeft size={24} className="text-black mr-4" />
            </button>
            <h1 className="text-xl font-light text-black">Saved Items ({savedItems.length})</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {savedItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <Heart size={64} className="text-gray-300 mx-auto" />
              </div>
              <h2 className="text-xl font-light text-black mb-2">No saved items</h2>
              <p className="text-gray-500 mb-6">
                Start browsing and save items you're interested in
              </p>
              <Link
                href="/marketplace"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <>
              {/* Actions Bar */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <p className="text-gray-600 text-sm">
                  {savedItems.length} {savedItems.length === 1 ? 'item' : 'items'} saved
                </p>
                <button
                  onClick={() => {
                    if (confirm('Remove all saved items?')) {
                      savedItems.forEach(item => removeFromSaved(item.id));
                    }
                  }}
                  className="text-red-500 text-sm hover:text-red-600"
                >
                  Clear All
                </button>
              </div>

              {/* Saved Items Grid */}
              <div className="grid grid-cols-2 gap-4">
                {savedItems.map((product) => (
                  <div key={product.id} className="border border-gray-200 bg-white relative">
                    {/* Remove from Saved Button */}
                    <button
                      onClick={() => handleRemoveFromSaved(product.id)}
                      className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Heart size={16} className="text-red-500 fill-current" />
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

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={loadingStates[product.id]}
                          className="flex-1 bg-black text-white py-2 text-xs hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {loadingStates[product.id] ? (
                            <Loading size="small" />
                          ) : (
                            <>
                              <ShoppingBag size={12} className="mr-1" />
                              Add
                            </>
                          )}
                        </button>
                        
                        <Link
                          href={`/product/${product.id}`}
                          className="flex-1 border border-gray-300 text-black py-2 text-xs hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SavedItemsPage;