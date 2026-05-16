// src/api/endpoints/vas.js
import { paymentApi } from '../client';

// ============================================================
// SERVICES VAS - AIRTIME (Recharge crédit téléphonique)
// ============================================================

/**
 * Récupérer la liste des opérateurs pour la recharge airtime
 * @returns {Promise<Object>} - Liste des opérateurs disponibles
 */
export const getAirtimeOperators = async () => {
  const response = await paymentApi.get('/v1/airtime/operators');
  return response.data;
};

/**
 * Récupérer les forfaits airtime disponibles par opérateur
 * @param {Object} params - Paramètres
 * @param {string} params.operator - Opérateur (MTN, ORANGE, etc.)
 * @param {string} params.country - Code pays (CM, SN, etc.)
 * @returns {Promise<Object>} - Liste des forfaits disponibles
 */
export const getAirtimePackages = async (params) => {
  const { operator, country } = params;
  const response = await paymentApi.get(`/v1/airtime/packages?operator=${operator}&country=${country}`);
  return response.data;
};

/**
 * Envoyer du crédit téléphonique (recharge airtime)
 * @param {Object} data - Données de la recharge
 * @param {string} data.operator - Opérateur (MTN, ORANGE, etc.)
 * @param {string} data.country - Code pays
 * @param {string} data.phone_number - Numéro de téléphone à recharger
 * @param {number} data.amount - Montant de la recharge
 * @param {string} [data.currency='XAF'] - Devise
 * @returns {Promise<Object>} - Détails de la transaction
 */
export const sendAirtime = async (data) => {
  const response = await paymentApi.post('/v1/airtime/send', data);
  return response.data;
};

// ============================================================
// SERVICES VAS - DATA (Forfaits internet)
// ============================================================

/**
 * Récupérer les forfaits data disponibles par opérateur
 * @param {Object} params - Paramètres
 * @param {string} params.operator - Opérateur
 * @param {string} params.country - Code pays
 * @returns {Promise<Object>} - Liste des forfaits data
 */
export const getDataPackages = async (params) => {
  const { operator, country } = params;
  const response = await paymentApi.get(`/v1/data/packages?operator=${operator}&country=${country}`);
  return response.data;
};

/**
 * Envoyer un forfait data
 * @param {Object} data - Données du forfait
 * @param {string} data.operator - Opérateur
 * @param {string} data.country - Code pays
 * @param {string} data.phone_number - Numéro de téléphone
 * @param {string} data.package_id - ID du forfait
 * @param {string} [data.currency='XAF'] - Devise
 * @returns {Promise<Object>} - Détails de la transaction
 */
export const sendDataPackage = async (data) => {
  const response = await paymentApi.post('/v1/data/send', data);
  return response.data;
};

// ============================================================
// SERVICES VAS - FACTURES (Bills)
// ============================================================

/**
 * Consulter une facture avant paiement (ENEO, eau, etc.)
 * @param {Object} params - Paramètres
 * @param {string} params.biller - Fournisseur (ENEO, CDE, etc.)
 * @param {string} params.account_number - Numéro de compte/client
 * @returns {Promise<Object>} - Détails de la facture
 */
export const lookupBill = async (params) => {
  const { biller, account_number } = params;
  const response = await paymentApi.get(`/v1/bills/lookup?biller=${biller}&account_number=${account_number}`);
  return response.data;
};

/**
 * Payer une facture (ENEO, eau, électricité, etc.)
 * @param {Object} data - Données du paiement
 * @param {string} data.biller - Fournisseur
 * @param {string} data.account_number - Numéro de compte
 * @param {number} data.amount - Montant à payer
 * @param {string} [data.currency='XAF'] - Devise
 * @param {string} [data.reference] - Référence interne
 * @returns {Promise<Object>} - Détails de la transaction
 */
export const payBill = async (data) => {
  const response = await paymentApi.post('/v1/bills/pay', data);
  return response.data;
};

// ============================================================
// CATALOGUE DES SERVICES
// ============================================================

/**
 * Récupérer le catalogue complet des services VAS disponibles
 * @returns {Promise<Object>} - Catalogue des services
 */
export const getServicesCatalogue = async () => {
  const response = await paymentApi.get('/v1/services/catalogue');
  return response.data;
};

// ============================================================
// CONSTANTES POUR LES SERVICES VAS
// ============================================================

/**
 * Types de services VAS disponibles
 */
export const VAS_SERVICES = {
  AIRTIME: 'airtime',
  DATA: 'data',
  BILLS: 'bills',
  TRANSFER: 'transfer',
};

/**
 * Fournisseurs de factures supportés
 */
export const BILLERS = {
  ENEO: 'ENEO',
  CDE: 'CDE',
  CAMWATER: 'CAMWATER',
  ORANGE_BILL: 'ORANGE_BILL',
  MTN_BILL: 'MTN_BILL',
};

/**
 * Labels des fournisseurs pour l'affichage
 */
export const BILLER_LABELS = {
  ENEO: 'Électricité (ENEO)',
  CDE: 'Eau (CDE)',
  CAMWATER: 'Eau (CAMWATER)',
  ORANGE_BILL: 'Facture Orange',
  MTN_BILL: 'Facture MTN',
};