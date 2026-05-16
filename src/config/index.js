// src/config/index.js

// ============================================================
// CONFIGURATION API
// ============================================================

export const API_CONFIG = {
  // URL de base de l'API (à modifier selon environnement)
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080',
  
  // Timeout des requêtes (30 secondes par défaut)
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  
  // Mode sandbox (test)
  sandbox: import.meta.env.VITE_SANDBOX_MODE === 'true',
};


// ============================================================
// MODES D'AUTHENTIFICATION
// ============================================================

export const AUTH_MODES = {
  API_KEY: 'api_transaction',                 // Pour les paiements
  JWT: 'merchant_jwt',                        // Pour le dashboard
  MIXED: 'api_transaction_or_merchant_jwt',   // Les deux
  PUBLIC: 'public',                           // Sans authentification
};


// ============================================================
// STATUTS DES TRANSACTIONS
// ============================================================

export const TRANSACTION_STATUS = {
  SUCCESS: 'SUCCESS',     // Transaction réussie
  PENDING: 'PENDING',     // En attente de confirmation
  FAILED: 'FAILED',       // Échouée
  REFUNDED: 'REFUNDED',   // Remboursée
};


// ============================================================
// TYPES DE TRANSACTIONS
// ============================================================

export const TRANSACTION_TYPES = {
  CASHIN: 'CASHIN',       // Dépôt (client te paie)
  CASHOUT: 'CASHOUT',     // Retrait (tu paies le client)
};


// ============================================================
// DIRECTIONS DE PAIEMENT
// ============================================================

export const PAYMENT_DIRECTIONS = {
  CASHIN: 'cashin',       // Le client te paie
  CASHOUT: 'cashout',     // Tu paies le client
};


// ============================================================
// STATUTS KYC (Vérification d'identité)
// ============================================================

export const KYC_STATUS = {
  PENDING: 'PENDING',         // En attente de soumission
  SUBMITTED: 'SUBMITTED',     // Soumis, en cours de vérification
  APPROVED: 'APPROVED',       // Approuvé, peut faire des paiements
  REJECTED: 'REJECTED',       // Rejeté, doit modifier
};


// ============================================================
// OPÉRATEURS MOBILE MONEY
// ============================================================

export const OPERATORS = [
  'MTN',
  'ORANGE',
  'MOOV',
  'AIRTEL',
  'MPESA',
  'WAVE',
];


// ============================================================
// PAYS SUPPORTÉS
// ============================================================

export const COUNTRIES = [
  { code: 'CM', name: 'Cameroun', flag: '🇨🇲', currency: 'XAF' },
  { code: 'SN', name: 'Sénégal', flag: '🇸🇳', currency: 'XOF' },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', currency: 'XOF' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS' },
  { code: 'NG', name: 'Nigéria', flag: '🇳🇬', currency: 'NGN' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', currency: 'XAF' },
  { code: 'CD', name: 'RDC', flag: '🇨🇩', currency: 'CDF' },
];


// ============================================================
// DEVISES SUPPORTÉES
// ============================================================

export const CURRENCIES = ['XAF', 'XOF', 'USD', 'EUR', 'GHS', 'NGN', 'CDF'];


// ============================================================
// HEADERS REQUIS PAR L'API
// ============================================================

export const HEADERS = {
  IDEMPOTENCY_KEY: 'Idempotency-Key',   // Pour éviter les doublons
  AUTHORIZATION: 'Authorization',        // Bearer token
  API_SECRET: 'X-API-Secret',            // Clé secrète API
};


// ============================================================
// CODES D'ERREUR HTTP
// ============================================================

export const ERROR_CODES = {
  400: 'Requête invalide. Vérifiez les paramètres envoyés.',
  401: 'Non authentifié. Veuillez vous reconnecter.',
  403: 'Accès interdit. Vous n\'avez pas les permissions nécessaires.',
  404: 'Ressource non trouvée.',
  409: 'Conflit. Solde insuffisant ou transaction déjà traitée.',
  429: 'Trop de requêtes. Veuillez patienter.',
  500: 'Erreur serveur. Réessayez plus tard.',
  503: 'Service indisponible. Le provider de paiement ne répond pas.',
};


// ============================================================
// MESSAGES D'ERREUR MÉTIER
// ============================================================

export const BUSINESS_ERRORS = {
  kyc_required: 'Votre compte doit être vérifié avant de pouvoir effectuer des paiements.',
  merchant_inactive: 'Votre compte marchand est désactivé. Contactez le support.',
  vas_not_enabled: 'Les services VAS ne sont pas activés sur votre compte.',
  insufficient_balance: 'Solde insuffisant pour effectuer cette opération.',
  idempotency_conflict: 'Cette transaction a déjà été traitée.',
  rate_limited: 'Trop de requêtes. Veuillez réessayer plus tard.',
  provider_unavailable: 'Le service de paiement est temporairement indisponible.',
};