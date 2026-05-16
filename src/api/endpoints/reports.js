// src/api/endpoints/reports.js
import { paymentApi, dashboardApi } from '../client';

// ============================================================
// RAPPORTS FINANCIERS
// ============================================================

/**
 * Récupérer un résumé financier sur une période
 * @param {Object} params - Paramètres du rapport
 * @param {string} params.from - Date de début (YYYY-MM-DD)
 * @param {string} params.to - Date de fin (YYYY-MM-DD)
 * @param {string} [params.currency] - Devise (XAF, XOF, USD)
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
 * @param {string} [params.format='csv'] - Format: 'csv' ou 'excel'
 * @returns {Promise<Blob>} - Fichier à télécharger
 * 
 * @example
 * exportTransactions({ from: '2026-05-01', to: '2026-05-31', format: 'csv' })
 */
export const exportTransactions = async (params) => {
  const { from, to, format = 'csv' } = params;
  const response = await paymentApi.get(`/v1/reports/export?from=${from}&to=${to}&format=${format}`, {
    responseType: 'blob',
  });
  return response.data;
};

/**
 * Télécharger automatiquement l'export des transactions
 * @param {Object} params - Paramètres de l'export
 * @param {string} params.from - Date de début
 * @param {string} params.to - Date de fin
 * @param {string} [params.format='csv'] - Format
 * @param {string} [params.filename] - Nom personnalisé du fichier
 */
export const downloadTransactionsExport = async (params) => {
  const { from, to, format = 'csv', filename } = params;
  const blob = await exportTransactions({ from, to, format });
  
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `transactions_${from}_${to}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// ============================================================
// STATISTIQUES DASHBOARD
// ============================================================

/**
 * Récupérer les statistiques du dashboard
 * @param {string} [period='today'] - Période: 'today', 'week', 'month', 'year'
 * @returns {Promise<Object>} - Statistiques complètes
 */
export const getDashboardStats = async (period = 'today') => {
  const response = await dashboardApi.get(`/v1/reports/dashboard?period=${period}`);
  return response.data;
};

/**
 * Récupérer les volumes par jour sur une période
 * @param {string} from - Date de début
 * @param {string} to - Date de fin
 * @returns {Promise<Object>} - Volumes journaliers
 */
export const getDailyVolumes = async (from, to) => {
  const response = await dashboardApi.get(`/v1/reports/daily-volumes?from=${from}&to=${to}`);
  return response.data;
};

/**
 * Récupérer la répartition par méthode de paiement
 * @param {string} from - Date de début
 * @param {string} to - Date de fin
 * @returns {Promise<Object>} - Répartition par opérateur
 */
export const getPaymentMethodBreakdown = async (from, to) => {
  const response = await dashboardApi.get(`/v1/reports/payment-methods?from=${from}&to=${to}`);
  return response.data;
};

/**
 * Récupérer les meilleurs jours (volume le plus élevé)
 * @param {string} from - Date de début
 * @param {string} to - Date de fin
 * @param {number} [limit=5] - Nombre de jours
 * @returns {Promise<Object>} - Meilleurs jours
 */
export const getTopDays = async (from, to, limit = 5) => {
  const response = await dashboardApi.get(`/v1/reports/top-days?from=${from}&to=${to}&limit=${limit}`);
  return response.data;
};

// ============================================================
// RAPPORTS DE PERFORMANCE
// ============================================================

/**
 * Taux de succès des transactions
 * @param {string} from - Date de début
 * @param {string} to - Date de fin
 * @returns {Promise<Object>} - Taux de succès
 */
export const getSuccessRate = async (from, to) => {
  const response = await dashboardApi.get(`/v1/reports/success-rate?from=${from}&to=${to}`);
  return response.data;
};

/**
 * Temps moyen de traitement des transactions
 * @param {string} from - Date de début
 * @param {string} to - Date de fin
 * @returns {Promise<Object>} - Temps moyen en secondes
 */
export const getAverageProcessingTime = async (from, to) => {
  const response = await dashboardApi.get(`/v1/reports/processing-time?from=${from}&to=${to}`);
  return response.data;
};

// ============================================================
// RAPPORTS FISCAUX
// ============================================================

/**
 * Récupérer le rapport fiscal (frais payés par période)
 * @param {string} year - Année
 * @param {string} [month] - Mois (optionnel)
 * @returns {Promise<Object>} - Rapport fiscal
 */
export const getTaxReport = async (year, month = null) => {
  let url = `/v1/reports/tax?year=${year}`;
  if (month) url += `&month=${month}`;
  const response = await dashboardApi.get(url);
  return response.data;
};

/**
 * Récupérer le récapitulatif mensuel
 * @param {string} year - Année
 * @returns {Promise<Object>} - Récapitulatif par mois
 */
export const getMonthlySummary = async (year) => {
  const response = await dashboardApi.get(`/v1/reports/monthly-summary?year=${year}`);
  return response.data;
};