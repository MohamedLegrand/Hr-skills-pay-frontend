// src/hooks/useKYC.js
import { useState, useCallback, useEffect } from 'react';
import * as kycEndpoints from '../api/endpoints/kyc';

export const useKYC = () => {
  // États
  const [status, setStatus] = useState(null);
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  /**
   * Vérifier si le KYC est approuvé
   */
  const isApproved = status?.kyc_status === 'APPROVED';
  
  /**
   * Vérifier si le KYC est en attente
   */
  const isPending = status?.kyc_status === 'PENDING' || status?.kyc_status === 'SUBMITTED';
  
  /**
   * Vérifier si le KYC est rejeté
   */
  const isRejected = status?.kyc_status === 'REJECTED';
  
  /**
   * Vérifier si aucun KYC n'a été soumis
   */
  const isNotSubmitted = !status?.kyc_status || status?.kyc_status === 'PENDING';

  /**
   * Récupérer le statut KYC
   */
  const getStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await kycEndpoints.getKYCStatus();
      setStatus(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement du statut KYC');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Soumettre un dossier KYC pour particulier/freelance
   * @param {Object} data - Données du KYC
   * @param {string} data.full_name - Nom complet
   * @param {string} data.national_id - Numéro CNI
   * @param {string} data.phone - Téléphone
   * @param {string} data.address - Adresse
   */
  const submitFreelance = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await kycEndpoints.submitKYCFreelance(data);
      setSubmitted(true);
      setKycData(data);
      // Rafraîchir le statut après soumission
      await getStatus();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la soumission du dossier KYC");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getStatus]);

  /**
   * Soumettre un dossier KYC pour entreprise
   * @param {Object} data - Données du KYC entreprise
   * @param {string} data.business_name - Nom de l'entreprise
   * @param {string} data.registration_number - Numéro RCCM
   * @param {string} data.tax_id - Numéro fiscal
   * @param {string} data.address - Adresse
   * @param {string} data.representative_name - Nom du représentant
   */
  const submitEnterprise = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await kycEndpoints.submitKYCEnterprise(data);
      setSubmitted(true);
      setKycData(data);
      // Rafraîchir le statut après soumission
      await getStatus();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la soumission du dossier KYC");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getStatus]);

  /**
   * Uploader un document KYC
   * @param {string} documentType - Type de document
   * @param {File} file - Fichier à uploader
   */
  const uploadDocument = useCallback(async (documentType, file) => {
    setUploading(true);
    setError(null);
    
    try {
      const response = await kycEndpoints.uploadKYCDocumentFile(documentType, file);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'upload du document");
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  /**
   * Vérifier si le KYC est obligatoire pour les paiements
   */
  const isKYCRequired = useCallback(() => {
    return !isApproved;
  }, [isApproved]);

  /**
   * Obtenir le message d'erreur selon le statut KYC
   */
  const getKYCErrorMessage = useCallback(() => {
    if (isRejected) {
      return "Votre dossier KYC a été rejeté. Veuillez modifier les informations et soumettre à nouveau.";
    }
    if (isPending) {
      return "Votre dossier KYC est en cours de vérification. Vous serez notifié une fois approuvé.";
    }
    if (isNotSubmitted) {
      return "Vous devez compléter votre dossier KYC pour effectuer des paiements.";
    }
    return null;
  }, [isRejected, isPending, isNotSubmitted]);

  /**
   * Réinitialiser l'état
   */
  const reset = useCallback(() => {
    setStatus(null);
    setKycData(null);
    setError(null);
    setSubmitted(false);
  }, []);

  // Chargement initial du statut
  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return {
    // États
    status,
    kycData,
    loading,
    uploading,
    error,
    submitted,
    
    // Statuts calculés
    isApproved,
    isPending,
    isRejected,
    isNotSubmitted,
    isKYCRequired: isKYCRequired(),
    
    // Méthodes
    getStatus,
    submitFreelance,
    submitEnterprise,
    uploadDocument,
    getKYCErrorMessage,
    reset,
  };
};