'use client';

import { ReactNode } from 'react';
import BottomNav from './BottomNav';
import { useAuthStore } from '@/store/auth-store';

interface LayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const Layout = ({ children, showBottomNav = true }: LayoutProps) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      <main className={`pb-16 ${showBottomNav && isAuthenticated ? '' : ''}`}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default Layout;