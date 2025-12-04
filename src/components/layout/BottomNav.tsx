'use client';

import { Home, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

const BottomNav = () => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

  // Only hide bottom nav on these specific pages
  const hideBottomNavRoutes = ['/splash', '/auth/login', '/auth/signup', '/seller/gate', '/seller/signup', '/listing/create/success' ,'/listing/create' , '/marketplace' ];
  const shouldHideNav = hideBottomNavRoutes.includes(pathname)|| !isAuthenticated;

  if (shouldHideNav) {
    return null;
  }

  // Only show if authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleListClick = (e: React.MouseEvent) => {
    if (!user?.isSeller) {
      e.preventDefault();
      window.location.href = '/seller/gate';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/marketplace"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            pathname === '/marketplace' ? 'text-black' : 'text-gray-500'
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <button
          onClick={handleListClick}
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            pathname === '/listing/create' ? 'text-black' : 'text-gray-500'
          }`}
        >
          <Plus size={20} />
          <span className="text-xs mt-1">List</span>
        </button>

        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center flex-1 h-full ${
            pathname === '/profile' ? 'text-black' : 'text-gray-500'
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;