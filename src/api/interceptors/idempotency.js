// src/api/interceptors/idempotency.js

// ============================================================
// GÉNÉRATION D'UUID
// ============================================================

/**
 * Génère un UUID v4 unique (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
 * Utilisé comme clé d'idempotence pour éviter les transactions en double
 */
export const generateIdempotencyKey = () => {
  // Utilisation de crypto.randomUUID() (natif, supporté par tous les navigateurs modernes)
  return crypto.randomUUID();
};

/**
 * Alternative: génère un ID plus court (timestamp + random)
 * Utile pour le debug ou les logs
 */
export const generateShortIdempotencyKey = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
};


// ============================================================
// STOCKAGE DES CLÉS UTILISÉES (optionnel, pour la session courante)
// ============================================================

// Map pour stocker les clés d'idempotence déjà utilisées dans la session
const usedKeys = new Map();

/**
 * Vérifie si une clé a déjà été utilisée pendant la session courante
 * @param {string} key - La clé d'idempotence à vérifier
 * @returns {boolean} - true si la clé a déjà été utilisée
 */
export const isKeyUsed = (key) => {
  return usedKeys.has(key);
};

/**
 * Enregistre une clé comme utilisée
 * @param {string} key - La clé à enregistrer
 */
export const markKeyAsUsed = (key) => {
  usedKeys.set(key, Date.now());
  
  // Nettoyage automatique des clés de plus de 24h (pour éviter l'accumulation mémoire)
  const now = Date.now();
  for (const [k, timestamp] of usedKeys.entries()) {
    if (now - timestamp > 24 * 60 * 60 * 1000) {
      usedKeys.delete(k);
    }
  }
};

/**
 * Récupère le timestamp d'utilisation d'une clé
 * @param {string} key - La clé à vérifier
 * @returns {number|null} - Timestamp d'utilisation ou null
 */
export const getKeyUsageTime = (key) => {
  return usedKeys.get(key) || null;
};


// ============================================================
// FORMATAGE POUR HEADER HTTP
// ============================================================

/**
 * Formate une clé d'idempotence pour le header HTTP
 * @param {string} key - La clé d'idempotence
 * @returns {Object} - Objet header prêt à être utilisé
 */
export const getIdempotencyHeader = (key) => {
  return {
    'Idempotency-Key': key,
  };
};

/**
 * Génère une clé et retourne directement l'objet header
 * @returns {Object} - Objet header avec une nouvelle clé
 */
export const getNewIdempotencyHeader = () => {
  return {
    'Idempotency-Key': generateIdempotencyKey(),
  };
};


// ============================================================
// CLÉS SPÉCIFIQUES PAR OPÉRATION
// ============================================================

/**
 * Génère une clé d'idempotence pour une opération spécifique
 * @param {string} operation - Type d'opération (ex: 'payment', 'refund', 'withdrawal')
 * @param {string} reference - Référence unique de l'opération (ex: ID commande)
 * @returns {string} - Clé d'idempotence personnalisée
 */
export const generateKeyForOperation = (operation, reference) => {
  const timestamp = Date.now();
  return `${operation}_${reference}_${timestamp}`;
};

/**
 * Génère une clé pour un paiement
 * @param {string} reference - Référence de la commande
 * @returns {string} - Clé d'idempotence
 */
export const generatePaymentKey = (reference) => {
  return `payment_${reference}_${Date.now()}`;
};

/**
 * Génère une clé pour un remboursement
 * @param {string} paymentReference - Référence du paiement original
 * @returns {string} - Clé d'idempotence
 */
export const generateRefundKey = (paymentReference) => {
  return `refund_${paymentReference}_${Date.now()}`;
};

/**
 * Génère une clé pour un retrait
 * @param {string} withdrawalId - Identifiant du retrait
 * @returns {string} - Clé d'idempotence
 */
export const generateWithdrawalKey = (withdrawalId) => {
  return `withdrawal_${withdrawalId}_${Date.now()}`;
};

/**
 * Génère une clé pour un transfert
 * @param {string} transferReference - Référence du transfert
 * @returns {string} - Clé d'idempotence
 */
export const generateTransferKey = (transferReference) => {
  return `transfer_${transferReference}_${Date.now()}`;
};


// ============================================================
// VALIDATION DES CLÉS
// ============================================================

/**
 * Vérifie si une clé d'idempotence a un format valide
 * @param {string} key - La clé à valider
 * @returns {boolean} - true si le format est valide
 */
export const isValidIdempotencyKey = (key) => {
  if (!key || typeof key !== 'string') return false;
  
  // Format UUID (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  // Format personnalisé (operation_reference_timestamp)
  const customRegex = /^[a-z]+_[a-zA-Z0-9\-]+_\d+$/;
  
  return uuidRegex.test(key) || customRegex.test(key);
};

/**
 * Extrait le type d'opération depuis une clé personnalisée
 * @param {string} key - La clé d'idempotence
 * @returns {string|null} - Type d'opération ou null
 */
export const getOperationTypeFromKey = (key) => {
  if (!key) return null;
  
  const parts = key.split('_');
  if (parts.length >= 1) {
    return parts[0];
  }
  return null;
};


// ============================================================
// INTERCEPTEUR POUR AXIOS (à intégrer dans client.js)
// ============================================================

/**
 * Méthodes HTTP qui nécessitent une clé d'idempotence
 */
export const IDEMPOTENT_METHODS = ['post', 'put', 'patch', 'delete'];

/**
 * Middleware pour Axios: ajoute automatiquement une clé d'idempotence
 * si elle n'existe pas déjà
 * @param {Object} config - Configuration Axios
 * @returns {Object} - Configuration modifiée
 */
export const addIdempotencyInterceptor = (config) => {
  const method = config.method?.toLowerCase();
  
  // Si c'est une méthode sensible et qu'aucune clé n'existe
  if (IDEMPOTENT_METHODS.includes(method) && !config.headers['Idempotency-Key']) {
    config.headers['Idempotency-Key'] = generateIdempotencyKey();
  }
  
  return config;
};