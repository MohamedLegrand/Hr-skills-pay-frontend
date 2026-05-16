// src/api/endpoints/settings.js
import { dashboardApi } from '../client';

// ============================================================
// WEBHOOKS
// ============================================================

/**
 * Enregistrer une URL de webhook
 * @param {Object} data - Données du webhook
 * @param {string} data.url - URL du webhook
 * @param {string} [data.description] - Description
 * @param {string[]} [data.events] - Événements à écouter
 * @returns {Promise<Object>} - Webhook créé
 */
export const createWebhook = async (data) => {
  const response = await dashboardApi.post('/v1/settings/webhooks', data);
  return response.data;
};

/**
 * Lister tous les webhooks configurés
 * @returns {Promise<Object>} - Liste des webhooks
 */
export const getWebhooks = async () => {
  const response = await dashboardApi.get('/v1/settings/webhooks');
  return response.data;
};

/**
 * Mettre à jour un webhook
 * @param {string} id - ID du webhook
 * @param {Object} data - Données à mettre à jour
 * @returns {Promise<Object>} - Webhook mis à jour
 */
export const updateWebhook = async (id, data) => {
  const response = await dashboardApi.put(`/v1/settings/webhooks/${id}`, data);
  return response.data;
};

/**
 * Supprimer un webhook
 * @param {string} id - ID du webhook
 * @returns {Promise<Object>} - Confirmation
 */
export const deleteWebhook = async (id) => {
  const response = await dashboardApi.delete(`/v1/settings/webhooks/${id}`);
  return response.data;
};

/**
 * Tester un webhook (envoi d'un événement test)
 * @param {string} id - ID du webhook
 * @returns {Promise<Object>} - Résultat du test
 */
export const testWebhook = async (id) => {
  const response = await dashboardApi.post(`/v1/settings/webhooks/${id}/test`);
  return response.data;
};

/**
 * Récupérer les logs de livraison d'un webhook
 * @param {string} id - ID du webhook
 * @returns {Promise<Object>} - Logs des tentatives
 */
export const getWebhookLogs = async (id) => {
  const response = await dashboardApi.get(`/v1/settings/webhooks/${id}/logs`);
  return response.data;
};

// ============================================================
// IP WHITELIST (Liste blanche d'IP)
// ============================================================

/**
 * Ajouter une IP autorisée
 * @param {Object} data - Données de l'IP
 * @param {string} data.ip - Adresse IP
 * @param {string} [data.label] - Label descriptif
 * @returns {Promise<Object>} - IP ajoutée
 */
export const addAllowedIP = async (data) => {
  const response = await dashboardApi.post('/v1/settings/ips', data);
  return response.data;
};

/**
 * Lister toutes les IP autorisées
 * @returns {Promise<Object>} - Liste des IPs
 */
export const getAllowedIPs = async () => {
  const response = await dashboardApi.get('/v1/settings/ips');
  return response.data;
};

/**
 * Supprimer une IP autorisée
 * @param {string} id - ID de l'IP
 * @returns {Promise<Object>} - Confirmation
 */
export const deleteAllowedIP = async (id) => {
  const response = await dashboardApi.delete(`/v1/settings/ips/${id}`);
  return response.data;
};

// ============================================================
// PAYS & DEVISES
// ============================================================

/**
 * Lister tous les pays configurés
 * @returns {Promise<Object>} - Liste des pays
 */
export const getCountries = async () => {
  const response = await dashboardApi.get('/v1/settings/countries');
  return response.data;
};

/**
 * Mettre à jour la configuration d'un pays
 * @param {string} countryCode - Code du pays (CM, SN, etc.)
 * @param {Object} data - Configuration
 * @returns {Promise<Object>} - Configuration mise à jour
 */
export const updateCountryConfig = async (countryCode, data) => {
  const response = await dashboardApi.put(`/v1/settings/countries/${countryCode}`, data);
  return response.data;
};

// ============================================================
// PROFIL MARCHAND
// ============================================================

/**
 * Récupérer le profil du marchand
 * @returns {Promise<Object>} - Informations du marchand
 */
export const getMerchantProfile = async () => {
  const response = await dashboardApi.get('/v1/merchant/profile');
  return response.data;
};

/**
 * Mettre à jour le profil du marchand
 * @param {Object} data - Données à mettre à jour
 * @returns {Promise<Object>} - Profil mis à jour
 */
export const updateMerchantProfile = async (data) => {
  const response = await dashboardApi.put('/v1/merchant/profile', data);
  return response.data;
};

// ============================================================
// NOTIFICATIONS
// ============================================================

/**
 * Récupérer les préférences de notification
 * @returns {Promise<Object>} - Préférences
 */
export const getNotificationPreferences = async () => {
  const response = await dashboardApi.get('/v1/settings/notifications');
  return response.data;
};

/**
 * Mettre à jour les préférences de notification
 * @param {Object} data - Préférences
 * @returns {Promise<Object>} - Préférences mises à jour
 */
export const updateNotificationPreferences = async (data) => {
  const response = await dashboardApi.put('/v1/settings/notifications', data);
  return response.data;
};