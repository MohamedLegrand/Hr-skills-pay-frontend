import React, { useState } from 'react';
import { 
  Shield, Lock, CheckCircle, AlertCircle, CreditCard, 
  Smartphone, Mail, Phone, User, Loader2, ArrowRight,
  Info, Clock, RefreshCw, HelpCircle, ExternalLink
} from 'lucide-react';

const Passerelle = () => {
  // État du formulaire
  const [paymentMethod, setPaymentMethod] = useState('orange-money');
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    name: '', 
    promoCode: ''  
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(600);

  // Détails de la commande
  const orderDetails = {
    productId: 'PREM-001',
    productName: 'Abonnement Premium',
    description: 'Accès illimité à toutes les fonctionnalités pendant 1 mois',
    amount: 10000,
    currency: 'FCFA',
    fees: 250,
    total: 10250,
    merchant: 'Hr Skills Pay',
    orderId: `CMD-${Date.now().toString().slice(-8)}`,
    dueDate: new Date(Date.now() + 10 * 60 * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  };

  // Méthodes de paiement disponibles
  const paymentMethods = [
    { id: 'orange-money', name: 'Orange Money', icon: '📱', color: 'from-orange-500 to-amber-500', fee: '2.5%', processingTime: 'Instantané', available: true },
    { id: 'mtn-momo', name: 'MTN Mobile Money', icon: '📲', color: 'from-yellow-400 to-amber-500', fee: '2.5%', processingTime: 'Instantané', available: true },
    { id: 'card', name: 'Carte Bancaire', icon: '💳', color: 'from-slate-600 to-slate-800', fee: '3.4% + 150 FCFA', processingTime: '2-5 secondes', available: true },
    { id: 'maviance', name: 'Maviance', icon: '🌍', color: 'from-blue-600 to-indigo-600', fee: 'Sur devis', processingTime: '1-2 minutes', available: true }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^(\+237|6)[0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Format de numéro invalide (ex: +237600000000)';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus('processing');
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const formatAmount = (amount) => new Intl.NumberFormat('fr-FR').format(amount);

  React.useEffect(() => {
    if (status === 'idle' && countdown > 0) {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [status, countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ========== ÉTAT DE SUCCÈS RESPONSIVE ==========
  if (status === 'success') {
    return (
      <section id="passerelle" className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-emerald-200">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Paiement réussi !</h1>
          <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">Votre transaction a été traitée avec succès.</p>
          
          <div className="bg-slate-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-[11px] sm:text-sm text-slate-500">Référence</span>
              <span className="text-[11px] sm:text-sm font-mono font-semibold">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[11px] sm:text-sm text-slate-500">Montant</span>
              <span className="text-[11px] sm:text-sm font-semibold">{formatAmount(orderDetails.total)} {orderDetails.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] sm:text-sm text-slate-500">Méthode</span>
              <span className="text-[11px] sm:text-sm font-semibold capitalize">{paymentMethod.replace('-', ' ')}</span>
            </div>
          </div>
          
          <p className="text-[11px] sm:text-xs text-slate-500 mb-4 sm:mb-6">
            Un reçu a été envoyé à <span className="font-medium">{formData.email}</span>
          </p>
          
          <div className="space-y-2 sm:space-y-3">
            <button className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-emerald-700 transition-all">
              Télécharger le reçu
            </button>
            <a href="/" className="block w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold text-sm sm:text-base hover:bg-slate-50 transition-all text-center">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ========== ÉTAT D'ERREUR RESPONSIVE ==========
  if (status === 'error') {
    return (
      <section id="passerelle" className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-center border border-red-200">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Échec du paiement</h1>
          <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">Une erreur est survenue lors du traitement de votre paiement.</p>
          
          <div className="bg-red-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-left">
            <p className="text-[11px] sm:text-sm text-red-700">
              <strong>Cause possible :</strong> Solde insuffisant, numéro incorrect, ou problème réseau.
            </p>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <button 
              onClick={() => setStatus('idle')}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-violet-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-violet-700 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Réessayer
            </button>
            <a href="#support" className="block w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold text-sm sm:text-base hover:bg-slate-50 transition-all text-center">
              Contacter le support
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ========== FORMULAIRE DE PAIEMENT RESPONSIVE ==========
  return (
    <section id="passerelle" className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* En-tête de sécurité responsive */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
          <span className="text-[11px] sm:text-sm text-emerald-700 font-medium">Paiement 100% sécurisé et chiffré</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          
          {/* ========== COLONNE GAUCHE : Formulaire ========== */}
          <div className="lg:flex-1 space-y-4 sm:space-y-6">
            
            {/* Résumé de la commande responsive */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Résumé de la commande</h2>
                <div className="flex items-center gap-1.5 sm:gap-2 text-amber-600">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-medium">{formatTime(countdown)}</span>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-slate-600">{orderDetails.productName}</span>
                  <span className="text-xs sm:text-sm font-medium">{formatAmount(orderDetails.amount)} {orderDetails.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-slate-600">Frais de transaction</span>
                  <span className="text-xs sm:text-sm font-medium">{formatAmount(orderDetails.fees)} {orderDetails.currency}</span>
                </div>
                <div className="flex justify-between pt-2 sm:pt-3 border-t border-slate-200">
                  <span className="text-sm sm:text-base font-semibold text-slate-900">Total à payer</span>
                  <span className="text-base sm:text-lg font-black text-violet-600">{formatAmount(orderDetails.total)} {orderDetails.currency}</span>
                </div>
              </div>
              
              <div className="mt-3 sm:mt-4 flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500">
                <Info className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
                <p>Votre commande sera automatiquement annulée si le paiement n'est pas complété avant la fin du compte à rebours.</p>
              </div>
            </div>

            {/* Méthodes de paiement responsive */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Choisissez votre moyen de paiement</h2>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-slate-200 hover:border-violet-300'
                    } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                      disabled={!method.available}
                    />
                    
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-base sm:text-lg">{method.icon}</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">{method.name}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500">{method.processingTime}</p>
                    </div>
                    
                    {paymentMethod === method.id && (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 flex-shrink-0" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Informations client responsive */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Vos informations</h2>
              
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-slate-200'
                      }`}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-[10px] sm:text-xs text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5">
                    Numéro de téléphone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm ${
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-200'
                      }`}
                      placeholder="+237 600 000 000"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-[10px] sm:text-xs text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5">
                    Adresse email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'
                      }`}
                      placeholder="vous@exemple.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-[10px] sm:text-xs text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-sm font-medium text-slate-700 mb-1 sm:mb-1.5">Code promo (optionnel)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleChange}
                      className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                      placeholder="CODEPROMO"
                    />
                    <button
                      type="button"
                      className="px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-200 text-slate-700 rounded-xl font-medium text-xs sm:text-sm hover:bg-slate-300 transition-all"
                    >
                      Appliquer
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                  <span className="text-[11px] sm:text-sm text-slate-600">
                    J'accepte les{' '}
                    <a href="/terms" className="text-violet-600 hover:text-violet-800 underline">conditions générales d'utilisation</a>{' '}
                    et la{' '}
                    <a href="/privacy" className="text-violet-600 hover:text-violet-800 underline">politique de confidentialité</a>.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status === 'processing'}
                  className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-70 disabled:cursor-not-allowed transition-all group"
                >
                  {status === 'processing' ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>Traitement en cours...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Payer {formatAmount(orderDetails.total)} {orderDetails.currency}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[10px] sm:text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                  <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  Vos données sont protégées par chiffrement AES-256
                </p>
              </form>
            </div>
          </div>

          {/* ========== COLONNE DROITE : Informations RESPONSIVE ========== */}
          <div className="lg:w-80 space-y-4 sm:space-y-6">
            
            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">HSP</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">{orderDetails.merchant}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">Commerçant vérifié</p>
                </div>
              </div>
              
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Commande</span>
                  <span className="font-mono text-slate-700 text-[10px] sm:text-xs">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Produit</span>
                  <span className="text-slate-700 text-[10px] sm:text-xs">{orderDetails.productId}</span>
                </div>
              </div>
            </div>

            <div className="bg-violet-50 rounded-xl sm:rounded-2xl border border-violet-200 p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-600" />
                Besoin d'aide ?
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-600 mb-3 sm:mb-4">
                Notre équipe support est disponible 24/7 pour vous assister.
              </p>
              <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-sm">
                <a href="tel:+237600000000" className="flex items-center gap-1.5 sm:gap-2 text-violet-700 hover:text-violet-900">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  +237 6XX XXX XXX
                </a>
                <a href="mailto:support@hrskillspay.com" className="flex items-center gap-1.5 sm:gap-2 text-violet-700 hover:text-violet-900">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  support@hrskillspay.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-3 sm:mb-4">Paiement sécurisé par</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span className="text-[11px] sm:text-sm text-slate-700">Certifié PCI DSS Level 1</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span className="text-[11px] sm:text-sm text-slate-700">Chiffrement AES-256</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span className="text-[11px] sm:text-sm text-slate-700">3D Secure activé</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-3 sm:mb-4">Moyens de paiement acceptés</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['Orange Money', 'MTN MoMo', 'Visa', 'Mastercard', 'UnionPay'].map((method) => (
                  <span key={method} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-100 rounded-lg text-[9px] sm:text-xs font-medium text-slate-700">
                    {method}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer de confiance responsive */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-[9px] sm:text-xs text-slate-500">
            © 2024 Hr Skills Pay. Tous droits réservés. •{' '}
            <a href="/privacy" className="text-violet-600 hover:text-violet-800">Confidentialité</a> •{' '}
            <a href="/terms" className="text-violet-600 hover:text-violet-800">Conditions</a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Passerelle;