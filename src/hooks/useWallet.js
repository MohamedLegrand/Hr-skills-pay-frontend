// src/hooks/useWallet.js
import { useState, useCallback, useEffect } from 'react';
import * as walletEndpoints from '../api/endpoints/wallets';

export const useWallet = () => {
  // États
  const [balance, setBalance] = useState(null);
  const [movements, setMovements] = useState([]);
  const [limits, setLimits] = useState(null);
  const [holds, setHolds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  /**
   * Récupérer le solde du wallet
   * @param {string} [currency] - Devise spécifique
   */
  const getBalance = useCallback(async (currency = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await walletEndpoints.getBalance(currency);
      setBalance(response);
      
      // Extraire les limites et holds si disponibles
      if (response?.limits) setLimits(response.limits);
      if (response?.holds) setHolds(response.holds);
      
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement du solde');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Rafraîchir le solde (alias de getBalance)
   */
  const refreshBalance = useCallback(async (currency = null) => {
    return getBalance(currency);
  }, [getBalance]);

  /**
   * Récupérer l'historique des mouvements du wallet
   * @param {Object} filters - Filtres optionnels
   * @param {number} [filters.page=1] - Page
   * @param {number} [filters.limit=20] - Limite
   * @param {string} [filters.type] - 'CREDIT' ou 'DEBIT'
   * @param {string} [filters.from] - Date de début
   * @param {string} [filters.to] - Date de fin
   */
  const getMovements = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await walletEndpoints.getWalletMovements(filters);
      
      setMovements(response.data || []);
      setPagination({
        page: response.pagination?.page || 1,
        limit: response.pagination?.limit || 20,
        total: response.pagination?.total || 0,
        totalPages: response.pagination?.total_pages || 0,
      });
      
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des mouvements');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Récupérer uniquement les limites du wallet
   */
  const getLimits = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await walletEndpoints.getWalletLimits();
      setLimits(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des limites');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Récupérer les fonds en attente (holds)
   */
  const getHolds = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await walletEndpoints.getWalletHolds();
      setHolds(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des holds');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Vérifier si le solde est suffisant pour un montant
   * @param {number} amount - Montant à vérifier
   */
  const hasSufficientBalance = useCallback(async (amount) => {
    try {
      const currentBalance = balance?.balance?.available || 0;
      return currentBalance >= amount;
    } catch (err) {
      return false;
    }
  }, [balance]);

  /**
   * Obtenir le solde disponible
   */
  const getAvailableBalance = useCallback(() => {
    return balance?.balance?.available || 0;
  }, [balance]);

  /**
   * Obtenir le solde total (disponible + hold)
   */
  const getTotalBalance = useCallback(() => {
    return balance?.balance?.total || 0;
  }, [balance]);

  /**
   * Obtenir les statistiques du jour
   */
  const getTodayStats = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await walletEndpoints.getTodayStats();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des statistiques');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Créer une demande de retrait
   * @param {number} amount - Montant à retirer
   * @param {string} [currency='XAF'] - Devise
   */
  const createWithdrawal = useCallback(async (amount, currency = 'XAF') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await walletEndpoints.createWithdrawal(amount, currency);
      
      // Rafraîchir le solde après le retrait
      await refreshBalance();
      
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la demande de retrait');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [refreshBalance]);

  /**
   * Réinitialiser les erreurs
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Réinitialiser l'état du wallet
   */
  const reset = useCallback(() => {
    setBalance(null);
    setMovements([]);
    setLimits(null);
    setHolds([]);
    setError(null);
    setPagination({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
    });
  }, []);

  // Chargement initial du solde (optionnel)
  useEffect(() => {
    // getBalance();
  }, []);

  return {
    // États
    balance,
    movements,
    limits,
    holds,
    loading,
    error,
    pagination,
    
    // Données dérivées
    availableBalance: getAvailableBalance(),
    totalBalance: getTotalBalance(),
    
    // Méthodes principales
    getBalance,
    refreshBalance,
    getMovements,
    getLimits,
    getHolds,
    getTodayStats,
    createWithdrawal,
    
    // Utilitaires
    hasSufficientBalance,
    getAvailableBalance,
    getTotalBalance,
    clearError,
    reset,
  };
};