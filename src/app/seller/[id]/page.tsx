'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, Star, MapPin, Flag } from 'lucide-react';
import Link from 'next/link';
import { useProductsStore } from '@/store/products-store';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';

const SellerProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const sellerId = params.id as string;
  
  const { products, isLoading } = useProductsStore();
  const [sellerProducts, setSellerProducts] = useState<any[]>([]);
  const [sellerInfo, setSellerInfo] = useState<any>(null);

  useEffect(() => {
    const sellerProducts = products.filter(p => p.sellerId === sellerId);
    setSellerProducts(sellerProducts);
    
    if (sellerProducts.length > 0) {
      setSellerInfo({
        id: sellerId,
        name: sellerProducts[0].sellerName,
        rating: sellerProducts[0].sellerRating,
        location: sellerProducts[0].location,
      });
    }
  }, [sellerId, products]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loading size="large" />
        </div>
      </Layout>
    );
  }

  if (!sellerInfo) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-light text-black mb-2">Seller Not Found</h1>
            <button
              onClick={() => router.back()}
              className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
            >
              Go Back
            </button>
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
          <div className="flex items-center justify-between p-4">
            <button onClick={() => router.back()}>
              <ArrowLeft size={24} className="text-black" />
            </button>
            <button className="text-red-500">
              <Flag size={20} />
            </button>
          </div>
        </div>

        {/* Seller Info */}
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
              <User size={32} className="text-gray-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-medium text-black mb-1">{sellerInfo.name}</h1>
              <div className="flex items-center mb-1">
                <Star size={16} className="text-yellow-500 fill-current" />
                <span className="text-gray-600 text-sm ml-1">{sellerInfo.rating}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={14} className="mr-1" />
                {sellerInfo.location}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around mb-6 py-4 border border-gray-200">
            <div className="text-center">
              <p className="text-xl font-bold text-black">{sellerProducts.length}</p>
              <p className="text-gray-500 text-sm">Active Listings</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-black">{sellerInfo.rating}</p>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-black">Fast</p>
              <p className="text-gray-500 text-sm">Response</p>
            </div>
          </div>

          {/* Other Listings */}
          <div>
            <h2 className="text-lg font-medium text-black mb-4">Other listings from this seller</h2>
            
            {sellerProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No active listings</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {sellerProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <div className="border border-gray-200">
                      <div className="aspect-square bg-gray-100">
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-black font-medium text-sm mb-1 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-black font-semibold mb-1">
                          {formatPrice(product.price)}
                        </p>
                        <p className="text-gray-500 text-xs">{product.condition}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerProfilePage;