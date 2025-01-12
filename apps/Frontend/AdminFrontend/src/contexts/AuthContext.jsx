import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/admin/useNotification';

const AuthContext = createContext({
  isInitialized: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { checkAuth, isAuthenticated, isLoading } = useAuth();
  const { showError } = useNotification();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        showError('Authentication failed');
        navigate('/auth/login');
      }
    };

    initAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  return (
    <AuthContext.Provider value={{ isInitialized: !isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}; 