// src/api/endpoints/kyc.js
import { dashboardApi } from '../client';

// ============================================================
// KYC - PARTICULIER / FREELANCE
// ============================================================

/**
 * Soumettre un dossier KYC pour un compte particulier/freelance
 * @param {Object} data - Données du KYC
 * @param {string} data.full_name - Nom complet
 * @param {string} data.national_id - Numéro de CNI ou passeport
 * @param {string} data.phone - Numéro de téléphone
 * @param {string} data.address - Adresse complète
 * @returns {Promise<Object>} - Confirmation de soumission
 */
export const submitKYCFreelance = async (data) => {
  const response = await dashboardApi.post('/v1/kyc/freelance/submit', data);
  return response.data;
};

// ============================================================
// KYC - ENTREPRISE
// ============================================================

/**
 * Soumettre un dossier KYC pour une entreprise
 * @param {Object} data - Données du KYC entreprise
 * @param {string} data.business_name - Nom de l'entreprise
 * @param {string} data.registration_number - Numéro RCCM
 * @param {string} data.tax_id - Numéro d'identification fiscale
 * @param {string} data.address - Adresse de l'entreprise
 * @param {string} data.representative_name - Nom du représentant légal
 * @returns {Promise<Object>} - Confirmation de soumission
 */
export const submitKYCEnterprise = async (data) => {
  const response = await dashboardApi.post('/v1/kyc/enterprise/submit', data);
  return response.data;
};

// ============================================================
// DOCUMENTS KYC
// ============================================================

/**
 * Uploader un document KYC (CNI, RCCM, etc.)
 * @param {string} documentType - Type de document (national_id, rccm, tax_id, proof_of_address)
 * @param {string} fileBase64 - Fichier encodé en base64
 * @returns {Promise<Object>} - Confirmation d'upload
 */
export const uploadKYCDocument = async (documentType, fileBase64) => {
  const response = await dashboardApi.post('/v1/kyc/upload', {
    document_type: documentType,
    file_base64: fileBase64,
  });
  return response.data;
};

/**
 * Uploader un document avec un File object (convertit automatiquement en base64)
 * @param {string} documentType - Type de document
 * @param {File} file - Fichier à uploader
 * @returns {Promise<Object>} - Confirmation d'upload
 */
export const uploadKYCDocumentFile = async (documentType, file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64String = reader.result;
        const result = await uploadKYCDocument(documentType, base64String);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// ============================================================
// STATUT KYC
// ============================================================

/**
 * Consulter le statut du dossier KYC
 * @returns {Promise<Object>} - Statut du KYC
 */
export const getKYCStatus = async () => {
  const response = await dashboardApi.get('/v1/kyc/status');
  return response.data;
};

/**
 * Vérifier si le KYC est approuvé
 * @returns {Promise<boolean>} - true si approuvé
 */
export const isKYCApproved = async () => {
  const status = await getKYCStatus();
  return status?.kyc_status === 'APPROVED';
};

/**
 * Vérifier si le KYC est en attente de validation
 * @returns {Promise<boolean>} - true si en attente
 */
export const isKYCPending = async () => {
  const status = await getKYCStatus();
  return status?.kyc_status === 'PENDING' || status?.kyc_status === 'SUBMITTED';
};

/**
 * Vérifier si le KYC a été rejeté
 * @returns {Promise<boolean>} - true si rejeté
 */
export const isKYCRejected = async () => {
  const status = await getKYCStatus();
  return status?.kyc_status === 'REJECTED';
};

// ============================================================
// TYPES DE DOCUMENTS DISPONIBLES
// ============================================================

/**
 * Liste des types de documents acceptés
 */
export const KYC_DOCUMENT_TYPES = {
  NATIONAL_ID: 'national_id',
  RCCM: 'rccm',
  TAX_ID: 'tax_id',
  PROOF_OF_ADDRESS: 'proof_of_address',
  STATUTES: 'statutes',
};

/**
 * Labels des types de documents pour l'affichage
 */
export const KYC_DOCUMENT_LABELS = {
  national_id: 'Carte d\'identité nationale / Passeport',
  rccm: 'Registre de commerce (RCCM)',
  tax_id: 'Numéro d\'identification fiscale',
  proof_of_address: 'Justificatif de domicile',
  statutes: 'Statuts de l\'entreprise',
};