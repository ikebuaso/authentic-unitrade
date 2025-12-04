'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag, MapPin, User, Flag, Heart } from 'lucide-react';
import Link from 'next/link';
import { useProductsStore } from '@/store/products-store';
import { useCartStore } from '@/store/cart-store';
import { useSavedStore } from '@/store/saved-store';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';
import ContactSellerModal from '@/components/common/ContactSellerModal';

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const { products, isLoading } = useProductsStore();
  const { addToCart } = useCartStore();
  const { isSaved, toggleSaved } = useSavedStore();
  const [product, setProduct] = useState<any>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct || null);
  }, [productId, products]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      addToCart(product);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleSaved = () => {
    if (!product) return;
    toggleSaved(product);
  };

  const handleContactSeller = () => {
    if (isMounted) {
      console.log('Contact seller button clicked');
      setShowContactModal(true);
    }
  };

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

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-light text-black mb-2">Product Not Found</h1>
            <p className="text-gray-500 mb-4">This item may have been sold or removed</p>
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
            <div className="flex items-center gap-4">
              <button 
                onClick={handleToggleSaved}
                className="text-black"
              >
                <Heart 
                  size={20} 
                  className={isSaved(product?.id || '') ? 'fill-current text-red-500' : ''} 
                />
              </button>
              <button className="text-black">
                <Flag size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/500x500?text=No+Image';
            }}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Title and Price */}
          <div className="mb-4">
            <h1 className="text-2xl font-light text-black mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-black">{formatPrice(product.price)}</p>
          </div>

          {/* Location and Condition */}
          <div className="flex items-center gap-4 mb-6 text-sm">
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              {product.location}
            </div>
            <div className="text-gray-600">
              Condition: {product.condition}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-black mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Seller Info */}
          <div className="border border-gray-200 p-4 mb-6">
            <Link href={`/seller/${product.sellerId}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-black font-medium">{product.sellerName}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-sm">★</span>
                      <span className="text-gray-600 text-sm ml-1">{product.sellerRating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-gray-400">
                  <ArrowLeft size={20} className="rotate-180" />
                </div>
              </div>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
           {/* <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {addingToCart ? (
                <Loading size="small" />
              ) : (
                <>
                  <ShoppingBag size={20} className="mr-2" />
                  Add to Bag
                </>
              )}
            </button>*/}

            <button 
              onClick={handleContactSeller}
              className="w-full border-2 border-gray-300 text-black py-3 hover:bg-gray-50 transition-colors cursor-pointer font-medium"
              type="button"
            >
              📞 Contact Seller
            </button>
          </div>

          {/* Report Listing */}
          <div className="text-center mt-6">
            <button className="text-red-500 text-sm hover:text-red-600">
              Report Listing
            </button>
          </div>
        </div>

        {/* Contact Seller Modal */}
        <ContactSellerModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          sellerName={product.sellerName}
          sellerPhone={product.sellerPhone}
          sellerEmail={product.sellerEmail}
          productName={product.title}
        />
      </div>
    </Layout>
  );
};

export default ProductDetailPage;