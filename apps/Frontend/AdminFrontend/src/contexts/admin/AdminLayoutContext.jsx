import { createContext, useContext, useState } from 'react';

// Export the context itself
export const LayoutContext = createContext();

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};

export const AdminLayoutProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const value = {
    isSidebarOpen,
    toggleSidebar
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};

export default AdminLayoutProvider;