'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Package, 
  ShoppingCart, 
  Heart, 
  Settings, 
  LogOut,
  ChevronRight,
  Star,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import Layout from '@/components/layout/Layout';

const ProfilePage = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      logout();
      router.push('/auth/login');
    } finally {
      setLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p>Please log in to view your profile</p>
          </div>
        </div>
      </Layout>
    );
  }

  const menuItems = [
    {
      icon: Package,
      label: 'My Listings',
      description: user.isSeller ? 'Manage your active listings' : 'Become a seller to list items',
      href: user.isSeller ? '/profile/listings' : '/seller/gate',
      badge: user.isSeller ? null : 'Upgrade',
    },
    {
      icon: ShoppingCart,
      label: 'Orders to Deliver',
      description: user.isSeller ? 'View incoming orders' : 'No orders to deliver',
      href: user.isSeller ? '/profile/orders' : '#',
      badge: null,
    },
    {
      icon: Package,
      label: 'Order History',
      description: 'View your past orders',
      href: '/profile/history',
      badge: null,
    },
    {
      icon: Heart,
      label: 'Saved Items',
      description: 'View your saved items',
      href: '/profile/saved',
      badge: null,
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'Account settings and preferences',
      href: '/profile/settings',
      badge: null,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white z-40 border-b border-gray-200">
          <div className="p-4">
            <h1 className="text-xl font-light text-black">Profile</h1>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
              <User size={32} className="text-gray-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium text-black mb-1">{user.name}</h2>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Mail size={14} className="mr-1" />
                {user.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={14} className="mr-1" />
                {user.phone}
              </div>
              {user.isSeller && (
                <div className="flex items-center mt-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    Seller
                  </span>
                  {user.rating && (
                    <div className="flex items-center ml-2">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{user.rating}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isDisabled = item.href === '#';
              
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`block ${isDisabled ? 'cursor-not-allowed' : ''}`}
                >
                  <div className={`flex items-center justify-between p-4 border ${
                    isDisabled ? 'border-gray-100 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'
                  } transition-colors`}>
                    <div className="flex items-center">
                      <Icon size={20} className={`${isDisabled ? 'text-gray-400' : 'text-black'} mr-3`} />
                      <div>
                        <div className="flex items-center">
                          <p className={`font-medium ${isDisabled ? 'text-gray-400' : 'text-black'}`}>
                            {item.label}
                          </p>
                          {item.badge && (
                            <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-500'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {!isDisabled && <ChevronRight size={20} className="text-gray-400" />}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center justify-center p-4 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>

          {/* App Version */}
          <div className="text-center mt-8 pb-4">
            <p className="text-gray-400 text-xs">UniTrade v1.0.0</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;