// src/api/client.js
import axios from 'axios';
import { API_CONFIG } from '../config';

// ============================================================
// CRÉATION DES CLIENTS AXIOS
// ============================================================

// Client pour le Dashboard (utilise JWT)
export const dashboardApi = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Client pour les Paiements (utilise API Key)
export const paymentApi = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Client pour les appes publics (sans authentification)
export const publicApi = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});


// ============================================================
// INTERCEPTEURS POUR DASHBOARD API (JWT)
// ============================================================

// 1. Ajoute automatiquement le token JWT dans les headers
dashboardApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Gère l'expiration du token (refresh automatique)
dashboardApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si erreur 401 (non authentifié) et qu'on n'a pas déjà essayé de rafraîchir
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // Appel au endpoint refresh
          const response = await axios.post(`${API_CONFIG.baseURL}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          
          const { token } = response.data;
          
          // Sauvegarde du nouveau token
          localStorage.setItem('jwt_token', token);
          
          // Met à jour le header de la requête originale
          originalRequest.headers.Authorization = `Bearer ${token}`;
          
          // Rejoue la requête originale
          return dashboardApi(originalRequest);
        } catch (refreshError) {
          // Si le refresh échoue, on déconnecte l'utilisateur
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('merchant_id');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);


// ============================================================
// INTERCEPTEURS POUR PAYMENT API (API KEY)
// ============================================================

// 1. Ajoute automatiquement les clés API (pk_live et sk_live)
paymentApi.interceptors.request.use(
  (config) => {
    const publicKey = localStorage.getItem('pk_live');
    const secretKey = localStorage.getItem('sk_live');
    
    if (publicKey && secretKey) {
      config.headers.Authorization = `Bearer ${publicKey}`;
      config.headers['X-API-Secret'] = secretKey;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Génère automatiquement un Idempotency-Key pour les méthodes sensibles
const IDEMPOTENT_METHODS = ['post', 'put', 'patch', 'delete'];

paymentApi.interceptors.request.use(
  (config) => {
    const method = config.method?.toLowerCase();
    // Si c'est une méthode qui modifie des données et qu'aucune clé d'idempotence n'existe
    if (IDEMPOTENT_METHODS.includes(method) && !config.headers['Idempotency-Key']) {
      // Génère un UUID v4 unique
      config.headers['Idempotency-Key'] = crypto.randomUUID();
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// ============================================================
// FONCTIONS UTILITAIRES
// ============================================================

// Pour stocker les clés API après création
export const setApiKeys = (publicKey, secretKey) => {
  localStorage.setItem('pk_live', publicKey);
  localStorage.setItem('sk_live', secretKey);
};

// Pour supprimer les clés API (déconnexion)
export const clearApiKeys = () => {
  localStorage.removeItem('pk_live');
  localStorage.removeItem('sk_live');
};

// Pour stocker les tokens JWT
export const setAuthTokens = (token, refreshToken, merchantId) => {
  localStorage.setItem('jwt_token', token);
  localStorage.setItem('refresh_token', refreshToken);
  localStorage.setItem('merchant_id', merchantId);
};

// Pour supprimer les tokens JWT
export const clearAuthTokens = () => {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('merchant_id');
};