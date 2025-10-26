import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/SignInPage';
import ProfilePage from '@/pages/ProfilePage';
import React from 'react';
import SignUpPage from '@/pages/SignUpPage';
import MoviesPage from '@/pages/MoviesPage';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  private?: boolean;
}

export const routes: RouteConfig[] = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/sign-up', element: <SignUpPage /> },
  { path: '/movies', element: <MoviesPage /> },
  { path: '/profile', element: <ProfilePage />, private: true },
];
