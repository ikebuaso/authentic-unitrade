'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import Layout from '@/components/layout/Layout';

const SplashScreen = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger fade in animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    // Navigate after 2 seconds
    const navigationTimer = setTimeout(() => {
      if (isAuthenticated) {
        router.push('/marketplace');
      } else {
        router.push('/auth/login');
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, [isAuthenticated, router]);

  return (
    <Layout showBottomNav={false}>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div
          className={`text-center transition-opacity duration-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="text-white text-4xl font-light tracking-wider mb-2">
            UniTrade
          </h1>
          <p className="text-gray-400 text-sm font-light">
            Campus Marketplace
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SplashScreen;