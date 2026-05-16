// src/api/endpoints/wallets.js
import { paymentApi, dashboardApi } from '../client';

// ============================================================
// WALLET & BALANCE
// ============================================================

/**
 * Consulter le solde du wallet
 * @param {string} [currency] - Devise (XAF, XOF, USD, etc.)
 * @returns {Promise<Object>} - Solde disponible, en hold, limites
 * 
 * @example
 * // Sans paramètre (devise par défaut du compte)
 * getBalance()
 * 
 * // Avec devise spécifique
 * getBalance('USD')
 */
export const getBalance = async (currency = null) => {
  const params = currency ? { currency } : {};
  const response = await paymentApi.get('/v1/balance', { params });
  return response.data;
};

/**
 * Récupérer l'historique des mouvements du wallet (ledger)
 * @param {Object} params - Paramètres de filtrage
 * @param {number} [params.page=1] - Numéro de la page
 * @param {number} [params.limit=20] - Éléments par page (max 100)
 * @param {string} [params.type] - 'CREDIT' ou 'DEBIT'
 * @param {string} [params.from] - Date de début (ISO 8601)
 * @param {string} [params.to] - Date de fin (ISO 8601)
 * @returns {Promise<Object>} - Liste des mouvements
 * 
 * @example
 * getWalletMovements({ page: 1, limit: 20, type: 'CREDIT' })
 */
export const getWalletMovements = async (params = {}) => {
  const { page = 1, limit = 20, type, from, to } = params;
  
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', Math.min(limit, 100));
  if (type) queryParams.append('type', type);
  if (from) queryParams.append('from', from);
  if (to) queryParams.append('to', to);
  
  const response = await dashboardApi.get(`/v1/wallet/movements?${queryParams.toString()}`);
  return response.data;
};

/**
 * Récupérer uniquement les limites du wallet
 * @returns {Promise<Object>} - Limites quotidiennes et mensuelles
 */
export const getWalletLimits = async () => {
  const balance = await getBalance();
  return balance?.limits || null;
};

/**
 * Récupérer les montants en attente (hold)
 * @returns {Promise<Array>} - Liste des fonds en attente
 */
export const getWalletHolds = async () => {
  const balance = await getBalance();
  return balance?.holds || [];
};

// ============================================================
// RETRAITS (WITHDRAWALS)
// ============================================================

/**
 * Créer une demande de retrait
 * @param {number} amount - Montant à retirer
 * @param {string} [currency='XAF'] - Devise
 * @returns {Promise<Object>} - Détails du retrait
 * 
 * @example
 * createWithdrawal(25000)
 * createWithdrawal(50000, 'USD')
 */
export const createWithdrawal = async (amount, currency = 'XAF') => {
  const response = await paymentApi.post('/v1/withdrawals', { amount, currency });
  return response.data;
};

/**
 * Lister toutes les demandes de retrait
 * @param {Object} params - Paramètres de pagination
 * @param {number} [params.page=1] - Page
 * @param {number} [params.limit=20] - Éléments par page
 * @returns {Promise<Object>} - Liste des retraits
 * 
 * @example
 * getWithdrawals({ page: 1, limit: 20 })
 */
export const getWithdrawals = async (params = {}) => {
  const { page = 1, limit = 20 } = params;
  const response = await paymentApi.get(`/v1/withdrawals?page=${page}&limit=${limit}`);
  return response.data;
};

/**
 * Récupérer le détail d'un retrait spécifique
 * @param {string} id - ID du retrait
 * @returns {Promise<Object>} - Détails du retrait
 * 
 * @example
 * getWithdrawal('wd_123456789')
 */
export const getWithdrawal = async (id) => {
  const response = await paymentApi.get(`/v1/withdrawals/${id}`);
  return response.data;
};

// ============================================================
// STATISTIQUES DU WALLET
// ============================================================

/**
 * Récupérer les statistiques du jour
 * @returns {Promise<Object>} - Volume et nombre de transactions du jour
 */
export const getTodayStats = async () => {
  const balance = await getBalance();
  return balance?.stats_today || { cashin_count: 0, cashin_volume: 0, cashout_count: 0, cashout_volume: 0 };
};

/**
 * Vérifier si le wallet a assez de solde pour un montant donné
 * @param {number} amount - Montant à vérifier
 * @returns {Promise<boolean>} - true si solde suffisant
 */
export const hasSufficientBalance = async (amount) => {
  const balance = await getBalance();
  return (balance?.balance?.available || 0) >= amount;
};