'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Crown, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';

const SellerGatePage = () => {
  const router = useRouter();
  const { user, activateSeller, isLoading } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = async (method: string) => {
    setPaymentMethod(method);
    setIsProcessing(true);

    try {
      // TODO: Call Backend API for payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await activateSeller();
      setPaymentComplete(true);
    } catch (error) {
      console.error('Payment failed:', error);
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

  if (paymentComplete) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="mb-6">
              <CheckCircle size={64} className="text-green-500 mx-auto" />
            </div>
            <h1 className="text-2xl font-light text-black mb-2">Seller Account Activated!</h1>
            <p className="text-gray-500 mb-6">
              Welcome to UniTrade Sellers! You can now create listings and start selling.
            </p>
            <div className="space-y-3">
              <Link
                href="/listing/create"
                className="block w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
              >
                Create First Listing
              </Link>
              <Link
                href="/marketplace"
                className="block w-full border border-gray-300 text-black py-3 hover:bg-gray-50 transition-colors"
              >
                Browse Marketplace
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
            <h1 className="text-xl font-light text-black">Become a Seller</h1>
          </div>
        </div>

        <div className="p-4">
          <div className="max-w-sm mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <Crown size={64} className="text-yellow-500 mx-auto" />
              </div>
              <h2 className="text-2xl font-light text-black mb-2">
                Activate Seller Account
              </h2>
              <p className="text-gray-500 text-sm">
                One-time activation fee to start selling on UniTrade
              </p>
            </div>

            {/* Pricing Card */}
            <div className="border border-gray-200 p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-gray-500 text-sm mb-2">One-time Fee</p>
                <p className="text-3xl font-bold text-black">
                  {formatPrice(1000)}
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-black">Unlimited listings</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-black">Reach campus buyers</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-black">Seller dashboard</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-black">Order management</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <button
                  onClick={() => handlePayment('transfer')}
                  disabled={isProcessing}
                  className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isProcessing && paymentMethod === 'transfer' ? (
                    <Loading size="small" />
                  ) : (
                    'Pay via Bank Transfer'
                  )}
                </button>

                <button
                  onClick={() => handlePayment('ussd')}
                  disabled={isProcessing}
                  className="w-full border border-gray-300 text-black py-3 hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {isProcessing && paymentMethod === 'ussd' ? (
                    <Loading size="small" />
                  ) : (
                    'Pay via USSD'
                  )}
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="text-center">
              <p className="text-gray-500 text-xs">
                Payment is secure and encrypted. Your seller account will be activated immediately after payment confirmation.
              </p>
            </div>

            {/* Back Link */}
            <div className="text-center mt-6">
              <button
                onClick={() => router.back()}
                className="text-gray-500 text-sm hover:text-black"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerGatePage;