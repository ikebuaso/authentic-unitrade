'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';

const CartPage = () => {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, closeCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = getTotalPrice();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white z-40 border-b border-gray-200">
          <div className="flex items-center p-4">
            <Link href="/marketplace">
              <ArrowLeft size={24} className="text-black mr-4" />
            </Link>
            <h1 className="text-xl font-light text-black">Shopping Bag ({totalItems})</h1>
          </div>
        </div>

        {/* Cart Content */}
        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Empty</span>
                </div>
              </div>
              <h2 className="text-xl font-light text-black mb-2">Your bag is empty</h2>
              <p className="text-gray-500 mb-6">Add items to get started</p>
              <Link
                href="/marketplace"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="border border-gray-200 p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                      
                      <div className="flex-1">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="text-black font-medium text-sm mb-1 hover:underline">
                            {item.title}
                          </h3>
                        </Link>
                        
                        <p className="text-black font-semibold mb-2">
                          {formatPrice(item.price)}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus size={16} />
                            </button>
                            
                            <span className="text-black font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-black font-medium">Total:</span>
                  <span className="text-xl font-bold text-black">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <button
                    onClick={() => router.push('/marketplace')}
                    className="w-full border border-gray-300 text-black py-3 hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;