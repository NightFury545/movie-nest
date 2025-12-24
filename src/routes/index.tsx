import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes.config';
import PrivateRoute from './private-route';
import { MainLayout } from '@/layouts/main-layout.tsx';
import { NuqsAdapter } from 'nuqs/adapters/react';
import GuestRoute from '@/routes/guest-route.tsx';

export const AppRoutes = () => (
  <BrowserRouter>
    <NuqsAdapter>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map(({ path, element, private: isPrivate, guestOnly }) => (
            <Route
              key={path}
              path={path}
              element={
                isPrivate ? (
                  <PrivateRoute>{element}</PrivateRoute>
                ) : guestOnly ? (
                  <GuestRoute>{element}</GuestRoute>
                ) : (
                  element
                )
              }
            />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </NuqsAdapter>
  </BrowserRouter>
);
