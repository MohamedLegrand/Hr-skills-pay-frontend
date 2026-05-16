// src/hooks/useTransactions.js
import { useState, useCallback } from 'react';
import * as transactionEndpoints from '../api/endpoints/transactions';

export const useTransactions = () => {
  // États
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    status: null,
    type: null,
    operator: null,
    country: null,
    reference: null,
    start_date: null,
    end_date: null,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  /**
   * Récupérer la liste des transactions
   * @param {Object} additionalFilters - Filtres supplémentaires
   */
  const getTransactions = useCallback(async (additionalFilters = {}) => {
    setLoading(true);
    setError(null);
    
    const mergedFilters = { ...filters, ...additionalFilters };
    
    try {
      const response = await transactionEndpoints.getTransactions(mergedFilters);
      
      setTransactions(response.data || []);
      setPagination({
        page: response.pagination?.page || 1,
        limit: response.pagination?.limit || 20,
        total: response.pagination?.total || 0,
        totalPages: response.pagination?.total_pages || 0,
      });
      
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des transactions');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Récupérer une transaction spécifique
   * @param {string} reference - Référence de la transaction
   */
  const getTransaction = useCallback(async (reference) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await transactionEndpoints.getTransactionByReference(reference);
      setSelectedTransaction(response.data);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction non trouvée');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Récupérer les transactions du jour
   */
  const getTodayTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await transactionEndpoints.getTodayTransactions();
      setTransactions(response.data || []);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Récupérer les dernières transactions
   * @param {number} [limit=10] - Nombre de transactions
   */
  const getRecentTransactions = useCallback(async (limit = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await transactionEndpoints.getRecentTransactions(limit);
      setTransactions(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filtrer les transactions par statut
   * @param {string} status - Statut (SUCCESS, PENDING, FAILED, REFUNDED)
   * @param {number} [page=1] - Page
   */
  const filterByStatus = useCallback(async (status, page = 1) => {
    setFilters(prev => ({ ...prev, status, page }));
    return getTransactions({ status, page });
  }, [getTransactions]);

  /**
   * Filtrer les transactions par type
   * @param {string} type - Type (CASHIN, CASHOUT)
   * @param {number} [page=1] - Page
   */
  const filterByType = useCallback(async (type, page = 1) => {
    setFilters(prev => ({ ...prev, type, page }));
    return getTransactions({ type, page });
  }, [getTransactions]);

  /**
   * Filtrer les transactions par période
   * @param {string} startDate - Date de début (YYYY-MM-DD)
   * @param {string} endDate - Date de fin (YYYY-MM-DD)
   * @param {number} [page=1] - Page
   */
  const filterByDateRange = useCallback(async (startDate, endDate, page = 1) => {
    setFilters(prev => ({ ...prev, start_date: startDate, end_date: endDate, page }));
    return getTransactions({ start_date: startDate, end_date: endDate, page });
  }, [getTransactions]);

  /**
   * Rechercher une transaction par référence
   * @param {string} reference - Référence à rechercher
   */
  const searchByReference = useCallback(async (reference) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await transactionEndpoints.getTransactionByReference(reference);
      setSelectedTransaction(response.data);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Transaction non trouvée');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Changer de page
   * @param {number} page - Nouvelle page
   */
  const changePage = useCallback(async (page) => {
    setFilters(prev => ({ ...prev, page }));
    return getTransactions({ page });
  }, [getTransactions]);

  /**
   * Changer le nombre d'éléments par page
   * @param {number} limit - Nouvelle limite
   */
  const changeLimit = useCallback(async (limit) => {
    setFilters(prev => ({ ...prev, limit, page: 1 }));
    return getTransactions({ limit, page: 1 });
  }, [getTransactions]);

  /**
   * Réinitialiser tous les filtres
   */
  const resetFilters = useCallback(async () => {
    const defaultFilters = {
      page: 1,
      limit: 20,
      status: null,
      type: null,
      operator: null,
      country: null,
      reference: null,
      start_date: null,
      end_date: null,
    };
    setFilters(defaultFilters);
    return getTransactions(defaultFilters);
  }, [getTransactions]);

  /**
   * Exporter les transactions en CSV
   * @param {Object} exportParams - Paramètres d'export
   * @param {string} exportParams.start_date - Date de début
   * @param {string} exportParams.end_date - Date de fin
   * @param {string} [exportParams.format='csv'] - Format
   * @param {string} [exportParams.filename] - Nom du fichier
   */
  const exportTransactions = useCallback(async (exportParams) => {
    setExporting(true);
    setError(null);
    
    try {
      await transactionEndpoints.downloadTransactionsExport(exportParams);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'export');
      throw err;
    } finally {
      setExporting(false);
    }
  }, []);

  /**
   * Calculer le volume total des transactions
   * @param {string} startDate - Date de début
   * @param {string} endDate - Date de fin
   */
  const getTransactionVolume = useCallback(async (startDate, endDate) => {
    setLoading(true);
    
    try {
      const response = await transactionEndpoints.getTransactionVolume(startDate, endDate);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du calcul du volume');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Compter le nombre total de transactions
   * @param {Object} countFilters - Filtres pour le comptage
   */
  const countTransactions = useCallback(async (countFilters = {}) => {
    setLoading(true);
    
    try {
      const response = await transactionEndpoints.countTransactions(countFilters);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du comptage');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Réinitialiser l'erreur
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Réinitialiser l'état
   */
  const reset = useCallback(() => {
    setTransactions([]);
    setSelectedTransaction(null);
    setError(null);
    setFilters({
      page: 1,
      limit: 20,
      status: null,
      type: null,
      operator: null,
      country: null,
      reference: null,
      start_date: null,
      end_date: null,
    });
    setPagination({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
    });
  }, []);

  return {
    // États
    transactions,
    selectedTransaction,
    loading,
    exporting,
    error,
    filters,
    pagination,
    
    // Méthodes principales
    getTransactions,
    getTransaction,
    getTodayTransactions,
    getRecentTransactions,
    
    // Filtres
    filterByStatus,
    filterByType,
    filterByDateRange,
    searchByReference,
    changePage,
    changeLimit,
    resetFilters,
    
    // Export et statistiques
    exportTransactions,
    getTransactionVolume,
    countTransactions,
    
    // Utilitaires
    clearError,
    reset,
  };
};