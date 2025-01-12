import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  if (isAuthenticated) {
    // Redirect to the page user tried to visit or dashboard
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default PublicRoute; 