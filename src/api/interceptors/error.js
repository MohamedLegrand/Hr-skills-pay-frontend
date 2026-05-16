// src/api/interceptors/error.js

// ============================================================
// CODES D'ERREUR HTTP (traduits en français)
// ============================================================

export const ERROR_CODES = {
  // 4xx - Erreurs client
  400: 'Requête invalide. Vérifiez les informations envoyées.',
  401: 'Non authentifié. Veuillez vous reconnecter.',
  403: 'Accès interdit. Vous n\'avez pas les permissions nécessaires.',
  404: 'Ressource non trouvée.',
  409: 'Conflit. Transaction déjà traitée ou solde insuffisant.',
  422: 'Données invalides. Vérifiez le format des informations.',
  429: 'Trop de requêtes. Veuillez patienter avant de réessayer.',
  
  // 5xx - Erreurs serveur
  500: 'Erreur interne du serveur. Réessayez plus tard.',
  502: 'Mauvaise passerelle. Le service est temporairement indisponible.',
  503: 'Service indisponible. Le provider de paiement ne répond pas.',
  504: 'Délai d\'attente dépassé. Le serveur met trop de temps à répondre.',
};


// ============================================================
// ERREURS MÉTIER SPÉCIFIQUES À L'API
// ============================================================

export const BUSINESS_ERRORS = {
  // KYC (vérification d'identité)
  kyc_required: 'Votre compte doit être vérifié avant de pouvoir effectuer des paiements. Veuillez compléter votre dossier KYC.',
  kyc_pending: 'Votre dossier KYC est en cours de vérification. Vous serez notifié une fois approuvé.',
  kyc_rejected: 'Votre dossier KYC a été rejeté. Veuillez modifier les informations et soumettre à nouveau.',
  
  // Compte marchand
  merchant_inactive: 'Votre compte marchand est désactivé. Contactez le support client.',
  merchant_blocked: 'Votre compte a été bloqué pour des raisons de sécurité. Contactez le support.',
  merchant_not_found: 'Compte marchand introuvable. Veuillez vérifier vos identifiants.',
  
  // Paiements
  insufficient_balance: 'Solde insuffisant pour effectuer cette opération.',
  invalid_amount: 'Le montant est invalide. Vérifiez les limites minimum et maximum.',
  invalid_phone: 'Le numéro de téléphone est invalide. Format attendu: +237XXXXXXXXX.',
  invalid_operator: 'L\'opérateur sélectionné n\'est pas disponible dans ce pays.',
  provider_unavailable: 'Le service de paiement est temporairement indisponible. Réessayez plus tard.',
  
  // Idempotence
  idempotency_conflict: 'Cette transaction a déjà été traitée. Une confirmation a été envoyée par email.',
  
  // Rate limiting
  rate_limited: 'Trop de requêtes. Veuillez patienter 1 minute avant de réessayer.',
  
  // Services VAS
  vas_not_enabled: 'Les services VAS ne sont pas activés sur votre compte. Contactez le support.',
  invalid_package: 'Le forfait sélectionné n\'est pas disponible.',
  
  // Webhooks
  webhook_invalid_url: 'L\'URL du webhook est invalide.',
  webhook_verification_failed: 'La vérification du webhook a échoué.',
  
  // Clés API
  invalid_api_key: 'La clé API est invalide ou a expiré.',
  api_key_not_found: 'Clé API introuvable.',
  
  // Limites
  daily_limit_exceeded: 'Vous avez dépassé votre limite quotidienne.',
  monthly_limit_exceeded: 'Vous avez dépassé votre limite mensuelle.',
  min_amount_exceeded: 'Le montant est inférieur au minimum requis.',
  max_amount_exceeded: 'Le montant dépasse le maximum autorisé.',
  
  // Général
  internal_error: 'Une erreur interne est survenue. Veuillez réessayer.',
  bad_request: 'La requête est mal formée. Vérifiez les paramètres.',
  not_found: 'La ressource demandée est introuvable.',
};


// ============================================================
// FONCTION PRINCIPALE DE GESTION DES ERREURS
// ============================================================

/**
 * Gère les erreurs retournées par l'API
 * @param {Error} error - L'erreur capturée par Axios
 * @returns {Object} - Objet normalisé contenant le message et les détails
 */
export const handleApiError = (error) => {
  // Vérifie si la réponse existe (erreur HTTP)
  const response = error.response;
  const status = response?.status;
  const data = response?.data;
  const businessCode = data?.code;
  
  // ============================================================
  // 1. ERREUR RÉSEAU (pas de réponse du serveur)
  // ============================================================
  if (!response) {
    console.error('Erreur réseau:', error);
    return {
      message: 'Impossible de contacter le serveur. Vérifiez votre connexion internet.',
      technical: error.message,
      isNetworkError: true,
      code: 'NETWORK_ERROR',
    };
  }
  
  // ============================================================
  // 2. ERREUR MÉTIER (code spécifique retourné par l'API)
  // ============================================================
  if (businessCode && BUSINESS_ERRORS[businessCode]) {
    return {
      message: BUSINESS_ERRORS[businessCode],
      code: businessCode,
      status,
      data,
      isBusinessError: true,
    };
  }
  
  // ============================================================
  // 3. ERREUR HTTP STANDARD (400, 401, 403, 404, 500...)
  // ============================================================
  if (status && ERROR_CODES[status]) {
    return {
      message: ERROR_CODES[status],
      status,
      data,
      isHttpError: true,
    };
  }
  
  // ============================================================
  // 4. ERREUR INCONNUE (fallback)
  // ============================================================
  return {
    message: data?.message || 'Une erreur inattendue est survenue. Veuillez réessayer.',
    status,
    data,
    isUnknownError: true,
  };
};


// ============================================================
// FONCTIONS UTILITAIRES POUR LES COMPOSANTS
// ============================================================

/**
 * Vérifie si une erreur est due à l'absence de KYC
 */
export const isKycError = (error) => {
  const handled = handleApiError(error);
  return handled.code === 'kyc_required' || handled.code === 'kyc_pending' || handled.code === 'kyc_rejected';
};

/**
 * Vérifie si une erreur est due à un solde insuffisant
 */
export const isInsufficientBalanceError = (error) => {
  const handled = handleApiError(error);
  return handled.code === 'insufficient_balance';
};

/**
 * Vérifie si une erreur est due à une limite dépassée
 */
export const isLimitError = (error) => {
  const handled = handleApiError(error);
  return handled.code === 'daily_limit_exceeded' || handled.code === 'monthly_limit_exceeded';
};

/**
 * Vérifie si une erreur est due à un problème d'authentification
 */
export const isAuthError = (error) => {
  const handled = handleApiError(error);
  return handled.status === 401 || handled.code === 'invalid_api_key';
};

/**
 * Vérifie si une erreur est due à un problème réseau
 */
export const isNetworkError = (error) => {
  const handled = handleApiError(error);
  return handled.isNetworkError === true;
};

/**
 * Vérifie si une erreur est due à un conflit d'idempotence (transaction déjà traitée)
 */
export const isIdempotencyError = (error) => {
  const handled = handleApiError(error);
  return handled.code === 'idempotency_conflict';
};