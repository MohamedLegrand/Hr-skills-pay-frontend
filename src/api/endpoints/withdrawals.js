// src/api/endpoints/withdrawals.js
import { paymentApi } from '../client';

// ============================================================
// RETRAITS (WITHDRAWALS)
// ============================================================

/**
 * Créer une demande de retrait
 * @param {Object} data - Données du retrait
 * @param {number} data.amount - Montant à retirer
 * @param {string} [data.currency='XAF'] - Devise (XAF, XOF, USD, EUR)
 * @param {string} [data.bank_account_id] - ID du compte bancaire (optionnel)
 * @param {string} [data.mobile_number] - Numéro Mobile Money (optionnel)
 * @returns {Promise<Object>} - Détails du retrait créé
 * 
 * @example
 * // Retrait simple vers le moyen par défaut
 * createWithdrawal({ amount: 25000 })
 * 
 * // Retrait vers un compte bancaire spécifique
 * createWithdrawal({ 
 *   amount: 50000, 
 *   currency: 'XAF',
 *   bank_account_id: 'bank_123456'
 * })
 */
export const createWithdrawal = async (data) => {
  const response = await paymentApi.post('/v1/withdrawals', data);
  return response.data;
};

/**
 * Lister toutes les demandes de retrait
 * @param {Object} params - Paramètres de pagination et filtres
 * @param {number} [params.page=1] - Numéro de la page
 * @param {number} [params.limit=20] - Nombre d'éléments par page (max 100)
 * @param {string} [params.status] - Statut: PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED
 * @param {string} [params.start_date] - Date de début (YYYY-MM-DD)
 * @param {string} [params.end_date] - Date de fin (YYYY-MM-DD)
 * @returns {Promise<Object>} - Liste paginée des retraits
 * 
 * @example
 * getWithdrawals({ page: 1, limit: 20, status: 'COMPLETED' })
 */
export const getWithdrawals = async (params = {}) => {
  const { page = 1, limit = 20, status, start_date, end_date } = params;
  
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', Math.min(limit, 100));
  if (status) queryParams.append('status', status);
  if (start_date) queryParams.append('from', start_date);
  if (end_date) queryParams.append('to', end_date);
  
  const response = await paymentApi.get(`/v1/withdrawals?${queryParams.toString()}`);
  return response.data;
};

/**
 * Récupérer le détail d'un retrait spécifique
 * @param {string} id - ID du retrait
 * @returns {Promise<Object>} - Détails complets du retrait
 * 
 * @example
 * getWithdrawal('wd_123456789')
 */
export const getWithdrawal = async (id) => {
  const response = await paymentApi.get(`/v1/withdrawals/${id}`);
  return response.data;
};

/**
 * Annuler une demande de retrait (seulement si encore en PENDING)
 * @param {string} id - ID du retrait à annuler
 * @returns {Promise<Object>} - Confirmation d'annulation
 * 
 * @example
 * cancelWithdrawal('wd_123456789')
 */
export const cancelWithdrawal = async (id) => {
  const response = await paymentApi.post(`/v1/withdrawals/${id}/cancel`);
  return response.data;
};

// ============================================================
// COMPTES BANCAIRES
// ============================================================

/**
 * Ajouter un compte bancaire pour les retraits
 * @param {Object} data - Données du compte bancaire
 * @param {string} data.bank_name - Nom de la banque
 * @param {string} data.account_name - Nom du titulaire du compte
 * @param {string} data.account_number - Numéro de compte
 * @param {string} [data.iban] - IBAN (pour les virements internationaux)
 * @param {string} [data.swift_code] - Code SWIFT/BIC
 * @param {string} [data.country] - Pays de la banque
 * @returns {Promise<Object>} - Compte bancaire créé
 * 
 * @example
 * addBankAccount({
 *   bank_name: 'Société Générale',
 *   account_name: 'Jean Dupont',
 *   account_number: '12345678901',
 *   country: 'CM'
 * })
 */
export const addBankAccount = async (data) => {
  const response = await paymentApi.post('/v1/bank-accounts', data);
  return response.data;
};

/**
 * Lister les comptes bancaires du marchand
 * @returns {Promise<Object>} - Liste des comptes bancaires
 */
export const getBankAccounts = async () => {
  const response = await paymentApi.get('/v1/bank-accounts');
  return response.data;
};

/**
 * Supprimer un compte bancaire
 * @param {string} id - ID du compte bancaire
 * @returns {Promise<Object>} - Confirmation de suppression
 */
export const deleteBankAccount = async (id) => {
  const response = await paymentApi.delete(`/v1/bank-accounts/${id}`);
  return response.data;
};

/**
 * Définir un compte bancaire par défaut
 * @param {string} id - ID du compte bancaire
 * @returns {Promise<Object>} - Confirmation
 */
export const setDefaultBankAccount = async (id) => {
  const response = await paymentApi.put(`/v1/bank-accounts/${id}/default`);
  return response.data;
};

// ============================================================
// STATUTS ET INFORMATIONS
// ============================================================

/**
 * Vérifier si l'utilisateur peut faire un retrait
 * @param {number} amount - Montant du retrait souhaité
 * @returns {Promise<Object>} - { can_withdraw: boolean, reason: string, available_balance: number }
 */
export const checkWithdrawalEligibility = async (amount) => {
  const response = await paymentApi.get(`/v1/withdrawals/eligibility?amount=${amount}`);
  return response.data;
};

/**
 * Obtenir les frais de retrait
 * @param {number} amount - Montant du retrait
 * @param {string} [method='bank'] - Méthode: 'bank', 'mobile_money'
 * @returns {Promise<Object>} - { fee: number, net_amount: number, currency: string }
 */
export const getWithdrawalFees = async (amount, method = 'bank') => {
  const response = await paymentApi.get(`/v1/withdrawals/fees?amount=${amount}&method=${method}`);
  return response.data;
};

/**
 * Récupérer le solde minimum requis pour un retrait
 * @returns {Promise<Object>} - { min_withdrawal: number, max_withdrawal: number }
 */
export const getWithdrawalLimits = async () => {
  const response = await paymentApi.get('/v1/withdrawals/limits');
  return response.data;
};

// ============================================================
// STATISTIQUES DES RETRAITS
// ============================================================

/**
 * Récupérer les statistiques des retraits
 * @param {string} [period='month'] - Période: 'day', 'week', 'month', 'year'
 * @returns {Promise<Object>} - Statistiques des retraits
 * 
 * @example
 * getWithdrawalStats('month')
 */
export const getWithdrawalStats = async (period = 'month') => {
  const response = await paymentApi.get(`/v1/withdrawals/stats?period=${period}`);
  return response.data;
};

/**
 * Récupérer le total des retraits sur une période
 * @param {string} startDate - Date de début (YYYY-MM-DD)
 * @param {string} endDate - Date de fin (YYYY-MM-DD)
 * @returns {Promise<Object>} - { total_amount: number, total_count: number, total_fees: number }
 */
export const getWithdrawalTotal = async (startDate, endDate) => {
  const response = await paymentApi.get(`/v1/withdrawals/total?from=${startDate}&to=${endDate}`);
  return response.data;
};