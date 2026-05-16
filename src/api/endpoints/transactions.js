// src/api/endpoints/transactions.js
import { paymentApi } from '../client';

// ============================================================
// TRANSACTIONS
// ============================================================

/**
 * Récupérer la liste des transactions avec filtres
 * @param {Object} params - Paramètres de filtrage
 * @param {number} [params.page=1] - Numéro de la page
 * @param {number} [params.limit=20] - Nombre d'éléments par page (max 100)
 * @param {string} [params.status] - Statut: SUCCESS, PENDING, FAILED, REFUNDED
 * @param {string} [params.type] - Type: CASHIN, CASHOUT
 * @param {string} [params.operator] - Opérateur: MTN, ORANGE, MOOV, etc.
 * @param {string} [params.country] - Pays: CM, SN, CI, etc.
 * @param {string} [params.reference] - Référence interne
 * @param {string} [params.external_id] - ID externe
 * @param {string} [params.start_date] - Date de début (YYYY-MM-DD)
 * @param {string} [params.end_date] - Date de fin (YYYY-MM-DD)
 * @returns {Promise<Object>} - Liste paginée des transactions
 */
export const getTransactions = async (params = {}) => {
  const {
    page = 1,
    limit = 20,
    status,
    type,
    operator,
    country,
    reference,
    external_id,
    start_date,
    end_date,
  } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', Math.min(limit, 100));
  if (status) queryParams.append('status', status);
  if (type) queryParams.append('type', type);
  if (operator) queryParams.append('operator', operator);
  if (country) queryParams.append('country', country);
  if (reference) queryParams.append('reference', reference);
  if (external_id) queryParams.append('external_id', external_id);
  if (start_date) queryParams.append('from', start_date);
  if (end_date) queryParams.append('to', end_date);

  const response = await paymentApi.get(`/v1/transactions?${queryParams.toString()}`);
  return response.data;
};

/**
 * Récupérer une transaction par sa référence
 * @param {string} reference - Référence de la transaction
 * @returns {Promise<Object>} - Détail complet de la transaction
 */
export const getTransactionByReference = async (reference) => {
  const response = await paymentApi.get(`/v1/transactions/${reference}`);
  return response.data;
};

/**
 * Récupérer une transaction par son ID externe
 * @param {string} externalId - ID externe de la transaction
 * @returns {Promise<Object>} - Détail de la transaction
 */
export const getTransactionByExternalId = async (externalId) => {
  const response = await paymentApi.get(`/v1/transactions?external_id=${externalId}`);
  return response.data;
};

/**
 * Récupérer les transactions du jour
 * @returns {Promise<Object>} - Liste des transactions du jour
 */
export const getTodayTransactions = async () => {
  const today = new Date().toISOString().split('T')[0];
  return getTransactions({ start_date: today, end_date: today });
};

/**
 * Récupérer les dernières transactions (pour le dashboard)
 * @param {number} [limit=10] - Nombre de transactions à récupérer
 * @returns {Promise<Array>} - Liste des dernières transactions
 */
export const getRecentTransactions = async (limit = 10) => {
  const response = await getTransactions({ page: 1, limit });
  return response.data?.data || [];
};

/**
 * Récupérer les transactions par statut
 * @param {string} status - Statut: SUCCESS, PENDING, FAILED, REFUNDED
 * @param {number} [page=1] - Page
 * @param {number} [limit=20] - Limite
 * @returns {Promise<Object>} - Transactions filtrées par statut
 */
export const getTransactionsByStatus = async (status, page = 1, limit = 20) => {
  return getTransactions({ status, page, limit });
};

/**
 * Récupérer les transactions par type
 * @param {string} type - Type: CASHIN ou CASHOUT
 * @param {number} [page=1] - Page
 * @param {number} [limit=20] - Limite
 * @returns {Promise<Object>} - Transactions filtrées par type
 */
export const getTransactionsByType = async (type, page = 1, limit = 20) => {
  return getTransactions({ type, page, limit });
};

/**
 * Récupérer les transactions sur une période
 * @param {string} startDate - Date de début (YYYY-MM-DD)
 * @param {string} endDate - Date de fin (YYYY-MM-DD)
 * @param {number} [page=1] - Page
 * @param {number} [limit=100] - Limite
 * @returns {Promise<Object>} - Transactions sur la période
 */
export const getTransactionsByDateRange = async (startDate, endDate, page = 1, limit = 100) => {
  return getTransactions({ start_date: startDate, end_date: endDate, page, limit });
};

/**
 * Compter le nombre total de transactions
 * @param {Object} params - Filtres optionnels
 * @returns {Promise<number>} - Nombre total de transactions
 */
export const countTransactions = async (params = {}) => {
  const response = await getTransactions({ ...params, limit: 1 });
  return response?.pagination?.total || 0;
};

/**
 * Calculer le volume total des transactions sur une période
 * @param {string} startDate - Date de début (YYYY-MM-DD)
 * @param {string} endDate - Date de fin (YYYY-MM-DD)
 * @returns {Promise<Object>} - Volumes par type
 */
export const getTransactionVolume = async (startDate, endDate) => {
  const response = await getTransactions({ start_date: startDate, end_date: endDate, limit: 1000 });
  const transactions = response?.data || [];

  const volumes = {
    total_cashin: 0,
    total_cashout: 0,
    total_fees: 0,
    cashin_count: 0,
    cashout_count: 0,
  };

  transactions.forEach((tx) => {
    if (tx.type === 'CASHIN' && tx.status === 'SUCCESS') {
      volumes.total_cashin += tx.amount;
      volumes.cashin_count++;
    } else if (tx.type === 'CASHOUT' && tx.status === 'SUCCESS') {
      volumes.total_cashout += tx.amount;
      volumes.cashout_count++;
    }
    if (tx.status === 'SUCCESS') {
      volumes.total_fees += tx.fee || 0;
    }
  });

  return volumes;
};

/**
 * Exporter les transactions au format CSV
 * @param {Object} params - Paramètres d'export
 * @param {string} params.start_date - Date de début (YYYY-MM-DD)
 * @param {string} params.end_date - Date de fin (YYYY-MM-DD)
 * @param {string} [params.format='csv'] - Format: csv, excel
 * @returns {Promise<Blob>} - Fichier à télécharger
 */
export const exportTransactions = async (params) => {
  const { start_date, end_date, format = 'csv' } = params;
  const response = await paymentApi.get(`/v1/reports/export?from=${start_date}&to=${end_date}&format=${format}`, {
    responseType: 'blob',
  });
  return response.data;
};

/**
 * Télécharger l'export CSV
 * @param {Object} params - Paramètres d'export
 * @param {string} params.start_date - Date de début
 * @param {string} params.end_date - Date de fin
 * @param {string} [params.filename] - Nom du fichier personnalisé
 */
export const downloadTransactionsExport = async (params) => {
  const { start_date, end_date, format = 'csv', filename } = params;
  const blob = await exportTransactions({ start_date, end_date, format });
  
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `transactions_${start_date}_${end_date}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};