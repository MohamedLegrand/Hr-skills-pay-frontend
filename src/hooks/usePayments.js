// src/hooks/usePayments.js
import { useState, useCallback } from 'react';
import * as paymentEndpoints from '../api/endpoints/payments';
import * as transactionEndpoints from '../api/endpoints/transactions';

export const usePayments = () => {
  // États
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  /**
   * Initier un paiement (cashin ou cashout)
   * @param {Object} paymentData - Données du paiement
   * @param {string} paymentData.direction - 'cashin' ou 'cashout'
   * @param {string} paymentData.operator - 'MTN', 'ORANGE', etc.
   * @param {string} paymentData.country - Code pays
   * @param {string} paymentData.phone_number - Numéro de téléphone
   * @param {number} paymentData.amount - Montant
   * @param {string} [paymentData.reference] - Référence interne
   */
  const initiatePayment = useCallback(async (paymentData) => {
    setProcessing(true);
    setError(null);
    
    try {
      const response = await paymentEndpoints.initiatePayment(paymentData);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'initiation du paiement');
      throw err;
    } finally {
      setProcessing(false);
    }
  }, []);

  /**
   * Vérifier le statut d'un paiement
   * @param {string} reference - Référence du paiement
   */
  const checkPaymentStatus = useCallback(async (reference) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await paymentEndpoints.getPaymentByReference(reference);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la vérification du statut');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Rembourser un paiement
   * @param {string} reference - Référence du paiement
   * @param {number} [amount] - Montant à rembourser (optionnel)
   */
  const refundPayment = useCallback(async (reference, amount = null) => {
    setProcessing(true);
    setError(null);
    
    try {
      const response = await paymentEndpoints.refundPayment(reference, amount);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du remboursement');
      throw err;
    } finally {
      setProcessing(false);
    }
  }, []);

  /**
   * Récupérer la liste des transactions
   * @param {Object} filters - Filtres optionnels
   * @param {number} [filters.page=1] - Page
   * @param {number} [filters.limit=20] - Limite
   * @param {string} [filters.status] - Statut
   * @param {string} [filters.type] - Type
   * @param {string} [filters.operator] - Opérateur
   * @param {string} [filters.country] - Pays
   * @param {string} [filters.start_date] - Date de début
   * @param {string} [filters.end_date] - Date de fin
   */
  const getTransactions = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await transactionEndpoints.getTransactions(filters);
      
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
  }, []);

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
    
    try {
      const response = await transactionEndpoints.getTodayTransactions();
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
    
    try {
      const response = await transactionEndpoints.getRecentTransactions(limit);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Réinitialiser les erreurs
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
    processing,
    error,
    pagination,
    
    // Méthodes principales
    initiatePayment,
    checkPaymentStatus,
    refundPayment,
    getTransactions,
    getTransaction,
    getTodayTransactions,
    getRecentTransactions,
    
    // Utilitaires
    clearError,
    reset,
  };
};