import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
