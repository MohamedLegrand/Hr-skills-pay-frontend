// src/api/endpoints/auth.js
import { dashboardApi, publicApi } from '../client';

// ============================================================
// AUTHENTIFICATION
// ============================================================

/**
 * Inscription d'un nouveau marchand
 * @param {Object} userData - Données du marchand
 * @param {string} userData.email - Email
 * @param {string} userData.password - Mot de passe
 * @param {string} userData.first_name - Prénom
 * @param {string} userData.last_name - Nom
 * @returns {Promise<Object>} - Données de l'utilisateur créé
 */
export const signup = async (userData) => {
  const response = await publicApi.post('/auth/signup', userData);
  return response.data;
};

/**
 * Connexion d'un marchand
 * @param {string} email - Email du marchand
 * @param {string} password - Mot de passe
 * @returns {Promise<Object>} - Tokens JWT et informations marchand
 */
export const login = async (email, password) => {
  const response = await publicApi.post('/auth/login', { email, password });
  
  // Stockage automatique des tokens dans localStorage
  if (response.data.token) {
    localStorage.setItem('jwt_token', response.data.token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    localStorage.setItem('merchant_id', response.data.merchant_id);
  }
  
  return response.data;
};

/**
 * Rafraîchissement du token JWT
 * @param {string} refreshToken - Token de rafraîchissement
 * @returns {Promise<Object>} - Nouveau token
 */
export const refreshToken = async (refreshToken) => {
  const response = await publicApi.post('/auth/refresh', {
    refresh_token: refreshToken,
  });
  
  if (response.data.token) {
    localStorage.setItem('jwt_token', response.data.token);
  }
  
  return response.data;
};

/**
 * Déconnexion du marchand
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await dashboardApi.post('/auth/logout');
  } finally {
    // Nettoyage du localStorage
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('merchant_id');
    localStorage.removeItem('pk_live');
    localStorage.removeItem('sk_live');
  }
};

/**
 * Vérification de l'email par token
 * @param {string} token - Token de vérification reçu par email
 * @returns {Promise<Object>}
 */
export const verifyEmail = async (token) => {
  const response = await publicApi.get(`/auth/verify-email/${token}`);
  return response.data;
};

// ============================================================
// DOUBLE AUTHENTIFICATION (2FA)
// ============================================================

/**
 * Activer l'authentification à deux facteurs
 * @returns {Promise<Object>} - QR code URL ou secret
 */
export const enable2FA = async () => {
  const response = await dashboardApi.post('/auth/2fa/enable');
  return response.data;
};

/**
 * Vérifier le code 2FA
 * @param {string} code - Code à 6 chiffres
 * @returns {Promise<Object>}
 */
export const verify2FA = async (code) => {
  const response = await dashboardApi.post('/auth/2fa/verify', { code });
  return response.data;
};

// ============================================================
// HISTORIQUE
// ============================================================

/**
 * Récupérer l'historique des connexions
 * @returns {Promise<Object>} - Liste des connexions
 */
export const getConnectionHistory = async () => {
  const response = await dashboardApi.get('/v1/history/connections');
  return response.data;
};

// ============================================================
// GESTION DES CLIÉS API
// ============================================================

/**
 * Créer une nouvelle paire de clés API (pk_live / sk_live)
 * @returns {Promise<Object>} - Contient pk_live et sk_live
 */
export const createApiKeys = async () => {
  const response = await dashboardApi.post('/v1/settings/api-keys');
  return response.data;
};

/**
 * Lister toutes les clés API du marchand
 * @returns {Promise<Object>} - Liste des clés
 */
export const listApiKeys = async () => {
  const response = await dashboardApi.get('/v1/settings/api-keys');
  return response.data;
};

/**
 * Régénérer une clé API (créer une nouvelle, invalider l'ancienne)
 * @param {string} keyId - ID de la clé à régénérer
 * @returns {Promise<Object>} - Nouvelle clé
 */
export const regenerateApiKey = async (keyId) => {
  const response = await dashboardApi.put(`/v1/settings/api-keys/${keyId}`);
  return response.data;
};

/**
 * Supprimer une clé API
 * @param {string} keyId - ID de la clé à supprimer
 * @returns {Promise<Object>}
 */
export const deleteApiKey = async (keyId) => {
  const response = await dashboardApi.delete(`/v1/settings/api-keys/${keyId}`);
  return response.data;
};