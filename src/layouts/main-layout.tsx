import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useScrollToTop } from '@/hooks/useScrollToTop.ts';

export function MainLayout() {
  const { scrollToTop } = useScrollToTop();
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
