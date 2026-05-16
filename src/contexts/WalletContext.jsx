// src/contexts/WalletContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useWallet as useWalletHook } from '../hooks/useWallet';

// Création du contexte
const WalletContext = createContext(null);

// Hook personnalisé pour utiliser le contexte
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet doit être utilisé à l\'intérieur d\'un WalletProvider');
  }
  return context;
};

// Provider du contexte
export const WalletProvider = ({ children }) => {
  // Utilisation du hook useWallet
  const wallet = useWalletHook();

  // Charger le solde au démarrage
  useEffect(() => {
    if (wallet.getBalance) {
      wallet.getBalance();
    }
  }, []);

  // Valeur à fournir aux composants enfants
  const value = {
    // États
    balance: wallet.balance,
    movements: wallet.movements,
    limits: wallet.limits,
    holds: wallet.holds,
    loading: wallet.loading,
    error: wallet.error,
    pagination: wallet.pagination,
    
    // Données dérivées
    availableBalance: wallet.availableBalance,
    totalBalance: wallet.totalBalance,
    
    // Méthodes principales
    getBalance: wallet.getBalance,
    refreshBalance: wallet.refreshBalance,
    getMovements: wallet.getMovements,
    getLimits: wallet.getLimits,
    getHolds: wallet.getHolds,
    getTodayStats: wallet.getTodayStats,
    createWithdrawal: wallet.createWithdrawal,
    
    // Utilitaires
    hasSufficientBalance: wallet.hasSufficientBalance,
    clearError: () => wallet.clearError(),
    reset: wallet.reset,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};