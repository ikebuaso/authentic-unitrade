'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';

const CheckoutPage = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!deliveryLocation.trim()) {
      setError('Please enter a delivery location');
      return;
    }

    setIsProcessing(true);

    try {
      // TODO: Call Backend API to process order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      setError('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = getTotalPrice();

  if (orderComplete) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="mb-6">
              <CheckCircle size={64} className="text-green-500 mx-auto" />
            </div>
            <h1 className="text-2xl font-light text-black mb-2">Order Placed!</h1>
            <p className="text-gray-500 mb-6">
              Your order has been confirmed. The seller will contact you shortly for delivery arrangements.
            </p>
            <div className="space-y-3">
              <Link
                href="/profile"
                className="block w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
              >
                View Orders
              </Link>
              <Link
                href="/marketplace"
                className="block w-full border border-gray-300 text-black py-3 hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white z-40 border-b border-gray-200">
          <div className="flex items-center p-4">
            <button onClick={() => router.back()}>
              <ArrowLeft size={24} className="text-black mr-4" />
            </button>
            <h1 className="text-xl font-light text-black">Checkout</h1>
          </div>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                href="/marketplace"
                className="inline-block bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Summary */}
              <div className="border border-gray-200 p-4">
                <h2 className="text-lg font-medium text-black mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-black text-sm font-medium">{item.title}</p>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-black font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-black font-medium">Total:</span>
                      <span className="text-xl font-bold text-black">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Location */}
              <div className="border border-gray-200 p-4">
                <h2 className="text-lg font-medium text-black mb-4">
                  <MapPin size={20} className="inline mr-2" />
                  Delivery Location
                </h2>
                <textarea
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="Enter your delivery address (hostel, room number, landmark, etc.)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                  disabled={isProcessing}
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? <Loading size="small" /> : 'Confirm Order'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;