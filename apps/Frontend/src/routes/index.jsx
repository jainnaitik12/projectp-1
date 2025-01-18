import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';
import CompanyLayout from '../components/layout/company/CompanyLayout';
import routes from './routes';
import Error404 from '../pages/Error404';
import Settings from '../pages/admin/Settings';
import LandingPage from '../pages/Landing/LandingPage';
const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          {routes
            .find((r) => r.path === '/auth')
            ?.children.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<MainLayout />}>
          {routes
            .find((r) => r.path === '/admin')
            ?.children.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* Company Routes */}
        <Route path="/company" element={<CompanyLayout />}>
          {routes
            .find((r) => r.path === '/company')
            ?.children.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
        </Route>

        {/* Root Redirect */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/landing" element={<LandingPage />} />
        {/* 404 Route */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;