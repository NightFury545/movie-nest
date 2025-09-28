import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes.config';
import PrivateRoute from './private-route';
import { MainLayout } from '@/layouts/main-layout.tsx';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        {routes.map(({ path, element, private: isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={
              isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
