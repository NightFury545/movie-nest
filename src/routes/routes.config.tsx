import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/SignInPage';
import ProfilePage from '@/pages/ProfilePage';
import React from 'react';
import SignUpPage from '@/pages/SignUpPage';
import MoviesPage from '@/pages/MoviesPage';
import MovieDetailsPage from '@/pages/MovieDetailsPage';
import CollectionsPage from '@/pages/CollectionsPage';

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
  { path: '/movies/:slug', element: <MovieDetailsPage /> },
  { path: '/collections', element: <CollectionsPage /> },
  { path: '/profile', element: <ProfilePage />, private: true },
];
