'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, X } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useProductsStore } from '@/store/products-store';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/common/Loading';

const CreateListingPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { createProduct, isLoading, categories } = useProductsStore();
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: categories[1] || 'Electronics', // Skip 'All'
    condition: 'Good',
    location: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Redirect if not a seller
    if (user && !user.isSeller) {
      router.push('/seller/gate');
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.title || !formData.price || !formData.description || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return;
    }

    try {
      await createProduct({
        title: formData.title,
        price,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        location: formData.location,
        imageUrl: '', // TODO: Handle image upload
        sellerId: user?.id || '',
        sellerName: user?.name || '',
        sellerRating: user?.rating || 0,
        sellerPhone: '',
        sellerEmail: ''
      });

      setSuccess(true);
    } catch (err) {
      setError('Failed to create listing. Please try again.');
    }
  };

  const formatPrice = (value: string) => {
    const num = value.replace(/\D/g, '');
    return num ? parseInt(num).toLocaleString() : '';
  };

  if (success) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
            </div>
            <h1 className="text-2xl font-light text-black mb-2">Listing Created!</h1>
            <p className="text-gray-500 mb-6">
              Your item is now live on the marketplace. Buyers can contact you for purchase.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    title: '',
                    price: '',
                    description: '',
                    category: categories[1] || 'Electronics',
                    condition: 'Good',
                    location: '',
                  });
                }}
                className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
              >
                Create Another Listing
              </button>
              <button
                onClick={() => router.push('/marketplace')}
                className="w-full border border-gray-300 text-black py-3 hover:bg-gray-50 transition-colors"
              >
                View Marketplace
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user?.isSeller) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <Loading size="large" />
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
            <div className="flex items-center">
              <button onClick={() => router.back()}>
                <ArrowLeft size={24} className="text-black mr-4" />
              </button>
              <h1 className="text-xl font-light text-black">Create Listing</h1>
            </div>
          </div>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Photos
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm mb-2">Add photos of your item</p>
                <button
                  type="button"
                  className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
                >
                  Choose Photos
                </button>
                <p className="text-gray-400 text-xs mt-2">PNG, JPG up to 10MB</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What are you selling?"
                className="w-full px-4 py-3 border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Price (₦) *
              </label>
              <input
                type="text"
                name="price"
                value={formatPrice(formData.price)}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value.replace(/\D/g, '') }))}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 text-black focus:outline-none focus:border-black transition-colors"
                disabled={isLoading}
              >
                {categories.filter(cat => cat !== 'All').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Condition *
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 text-black focus:outline-none focus:border-black transition-colors"
                disabled={isLoading}
              >
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item (condition, features, reason for selling, etc.)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-black text-sm font-medium mb-2">
                Pickup Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Hostel, room number, or preferred meeting spot"
                className="w-full px-4 py-3 border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loading size="small" /> : 'Publish Listing'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateListingPage;