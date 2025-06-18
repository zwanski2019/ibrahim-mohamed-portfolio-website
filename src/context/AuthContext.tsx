
import React, { createContext, useContext } from 'react';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';

const AuthContext = createContext<ReturnType<typeof useEnhancedAuth> | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useEnhancedAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
