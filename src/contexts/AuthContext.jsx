// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useAuth as useAuthHook } from '../hooks/useAuth';

// Création du contexte
const AuthContext = createContext(null);

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Provider du contexte
export const AuthProvider = ({ children }) => {
  // Utilisation du hook useAuth
  const auth = useAuthHook();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    auth.checkAuthStatus();
  }, []);

  // Valeur à fournir aux composants enfants
  const value = {
    // États
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
    merchantId: auth.merchantId,
    
    // Méthodes
    login: auth.login,
    signup: auth.signup,
    logout: auth.logout,
    refreshToken: auth.refreshToken,
    updateProfile: auth.updateProfile,
    checkAuthStatus: auth.checkAuthStatus,
    clearError: () => auth.setError(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};