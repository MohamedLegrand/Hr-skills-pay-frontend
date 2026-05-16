// src/api/endpoints/payments.js
import { paymentApi } from '../client';

// ============================================================
// PAIEMENTS
// ============================================================

/**
 * Initier un paiement (cashin ou cashout)
 * @param {Object} data - Données du paiement
 * @param {string} data.direction - 'cashin' ou 'cashout'
 * @param {string} data.operator - 'MTN', 'ORANGE', 'MOOV', etc.
 * @param {string} data.country - Code pays ('CM', 'SN', 'CI', etc.)
 * @param {string} data.phone_number - Numéro de téléphone (format E.164: +237XXXXXXXXX)
 * @param {number} data.amount - Montant en FCFA
 * @param {string} [data.currency] - Devise (XAF par défaut)
 * @param {string} [data.reference] - Référence interne de la commande
 * @returns {Promise<Object>} - Détails de la transaction initiée
 * 
 * @example
 * initiatePayment({
 *   direction: 'cashin',
 *   operator: 'MTN',
 *   country: 'CM',
 *   phone_number: '+237690001234',
 *   amount: 10000,
 *   reference: 'ORDER-12345'
 * })
 */
export const initiatePayment = async (data) => {
  const response = await paymentApi.post('/v1/payments/initiate', data);
  return response.data;
};

/**
 * Récupérer un paiement par sa référence
 * @param {string} reference - Référence de la transaction (votre ID ou l'ID externe)
 * @returns {Promise<Object>} - Détails du paiement
 * 
 * @example
 * getPaymentByReference('ORDER-12345')
 */
export const getPaymentByReference = async (reference) => {
  const response = await paymentApi.get(`/v1/payments/${reference}`);
  return response.data;
};

/**
 * Rembourser un paiement
 * @param {string} reference - Référence du paiement à rembourser
 * @param {number} [amount] - Montant à rembourser (si null, remboursement total)
 * @returns {Promise<Object>} - Détails du remboursement
 * 
 * @example
 * // Remboursement total
 * refundPayment('ORDER-12345')
 * 
 * // Remboursement partiel
 * refundPayment('ORDER-12345', 5000)
 */
export const refundPayment = async (reference, amount = null) => {
  const body = amount ? { amount } : {};
  const response = await paymentApi.post(`/v1/payments/${reference}/refund`, body);
  return response.data;
};

// ============================================================
// TRANSACTIONS
// ============================================================

/**
 * Lister les transactions avec filtres et pagination
 * @param {Object} params - Paramètres de filtrage
 * @param {number} [params.page=1] - Numéro de la page
 * @param {number} [params.limit=20] - Nombre d'éléments par page (max 100)
 * @param {string} [params.status] - 'SUCCESS', 'PENDING', 'FAILED', 'REFUNDED'
 * @param {string} [params.type] - 'CASHIN' ou 'CASHOUT'
 * @param {string} [params.operator] - 'MTN', 'ORANGE', etc.
 * @param {string} [params.country] - Code pays ('CM', 'SN', etc.)
 * @param {string} [params.reference] - Recherche partielle sur la référence
 * @param {string} [params.external_id] - Recherche partielle sur l'ID externe
 * @returns {Promise<Object>} - Liste paginée des transactions
 * 
 * @example
 * getTransactions({ page: 1, limit: 20, status: 'SUCCESS', type: 'CASHIN' })
 */
export const getTransactions = async (params = {}) => {
  const { page = 1, limit = 20, status, type, operator, country, reference, external_id } = params;
  
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', Math.min(limit, 100));
  if (status) queryParams.append('status', status);
  if (type) queryParams.append('type', type);
  if (operator) queryParams.append('operator', operator);
  if (country) queryParams.append('country', country);
  if (reference) queryParams.append('reference', reference);
  if (external_id) queryParams.append('external_id', external_id);
  
  const response = await paymentApi.get(`/v1/transactions?${queryParams.toString()}`);
  return response.data;
};

/**
 * Récupérer une transaction par sa référence
 * @param {string} reference - Référence de la transaction
 * @returns {Promise<Object>} - Détail complet de la transaction
 * 
 * @example
 * getTransactionByReference('ORDER-12345')
 */
export const getTransactionByReference = async (reference) => {
  const response = await paymentApi.get(`/v1/transactions/${reference}`);
  return response.data;
};

// ============================================================
// OPÉRATEURS
// ============================================================

/**
 * Récupérer la liste de tous les opérateurs supportés
 * @returns {Promise<Object>} - Liste des opérateurs
 */
export const getOperators = async () => {
  const response = await paymentApi.get('/v1/operators');
  return response.data;
};

// ============================================================
// RAPPORTS
// ============================================================

/**
 * Récupérer un résumé financier sur une période
 * @param {Object} params - Paramètres du rapport
 * @param {string} params.from - Date de début (YYYY-MM-DD)
 * @param {string} params.to - Date de fin (YYYY-MM-DD)
 * @param {string} [params.currency] - Devise (XAF, XOF, etc.)
 * @returns {Promise<Object>} - Résumé des transactions
 * 
 * @example
 * getReportSummary({ from: '2026-05-01', to: '2026-05-31', currency: 'XAF' })
 */
export const getReportSummary = async (params) => {
  const { from, to, currency } = params;
  const queryParams = new URLSearchParams();
  queryParams.append('from', from);
  queryParams.append('to', to);
  if (currency) queryParams.append('currency', currency);
  
  const response = await paymentApi.get(`/v1/reports/summary?${queryParams.toString()}`);
  return response.data;
};

/**
 * Exporter les transactions au format CSV
 * @param {Object} params - Paramètres de l'export
 * @param {string} params.from - Date de début (YYYY-MM-DD)
 * @param {string} params.to - Date de fin (YYYY-MM-DD)
 * @param {string} [params.format='csv'] - Format d'export (csv, excel)
 * @returns {Promise<Blob>} - Fichier CSV à télécharger
 * 
 * @example
 * exportTransactions({ from: '2026-05-01', to: '2026-05-31' })
 */
export const exportTransactions = async (params) => {
  const { from, to, format = 'csv' } = params;
  const response = await paymentApi.get(`/v1/reports/export?from=${from}&to=${to}&format=${format}`, {
    responseType: 'blob',
  });
  return response.data;
};