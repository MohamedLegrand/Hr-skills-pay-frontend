// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authEndpoints from '../api/endpoints/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  
  // États
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [merchantId, setMerchantId] = useState(null);

  // Initialisation : vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Vérifier le statut d'authentification
   */
  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('jwt_token');
    const merchant = localStorage.getItem('merchant_id');
    
    if (token && merchant) {
      setIsAuthenticated(true);
      setMerchantId(merchant);
      // TODO: Charger les informations de l'utilisateur depuis l'API
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setMerchantId(null);
    }
    setLoading(false);
  }, []);

  /**
   * Connexion
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe
   */
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authEndpoints.login(email, password);
      
      // Les tokens sont déjà stockés dans le endpoint
      setIsAuthenticated(true);
      setMerchantId(localStorage.getItem('merchant_id'));
      
      // Redirection vers le dashboard
      navigate('/dashboard');
      
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Inscription
   * @param {Object} userData - Données de l'utilisateur
   * @param {string} userData.email - Email
   * @param {string} userData.password - Mot de passe
   * @param {string} userData.first_name - Prénom
   * @param {string} userData.last_name - Nom
   */
  const signup = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authEndpoints.signup(userData);
      
      // Redirection vers la page de connexion
      navigate('/login');
      
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'inscription");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Déconnexion
   */
  const logout = useCallback(async () => {
    setLoading(true);
    
    try {
      await authEndpoints.logout();
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      // Nettoyage du state
      setIsAuthenticated(false);
      setUser(null);
      setMerchantId(null);
      setError(null);
      setLoading(false);
      
      // Redirection vers la page de connexion
      navigate('/login');
    }
  }, [navigate]);

  /**
   * Rafraîchir le token
   */
  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;
    
    try {
      const response = await authEndpoints.refreshToken(refreshToken);
      return true;
    } catch (err) {
      // Si le refresh échoue, déconnecter l'utilisateur
      await logout();
      return false;
    }
  }, [logout]);

  /**
   * Mettre à jour le profil utilisateur
   * @param {Object} data - Données à mettre à jour
   */
  const updateProfile = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implémenter l'appel API de mise à jour de profil
      // const response = await authEndpoints.updateProfile(data);
      
      // Mettre à jour l'état local
      setUser(prev => ({ ...prev, ...data }));
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de mise à jour');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // États
    user,
    isAuthenticated,
    loading,
    error,
    merchantId,
    
    // Méthodes
    login,
    signup,
    logout,
    refreshToken,
    updateProfile,
    checkAuthStatus,
  };
};