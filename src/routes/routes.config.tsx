import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/SignInPage';
import ProfilePage from '@/pages/ProfilePage';
import React from 'react';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  private?: boolean;
}

export const routes: RouteConfig[] = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/profile', element: <ProfilePage />, private: true },
];
