import React, { useState } from 'react';
import { 
  Check, Star, Zap, Shield, Users, TrendingUp, 
  ArrowRight, CreditCard, RefreshCw, Lock, Clock,
  Mail, Phone, Award, Globe, Server
} from 'lucide-react';

// ===== CONFIGURATION - Correction pour Vercel =====
const getEnvVar = (name, defaultValue) => {
  if (typeof process !== 'undefined' && process.env && process.env[`NEXT_PUBLIC_${name}`]) {
    return process.env[`NEXT_PUBLIC_${name}`];
  }
  if (typeof process !== 'undefined' && process.env && process.env[`REACT_APP_${name}`]) {
    return process.env[`REACT_APP_${name}`];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[`VITE_${name}`]) {
    return import.meta.env[`VITE_${name}`];
  }
  return defaultValue;
};

const Tarif = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  // Plans d'abonnement
  const plans = [
    {
      id: 'basic',
      name: 'Démarrage',
      price: { monthly: 5000, annual: 50000, currency: 'FCFA' },
      features: [
        '100 transactions/mois',
        'Orange Money + MTN MoMo',
        'Checkout hébergé',
        'Dashboard basique',
        'Support email (48h)'
      ],
      cta: 'Commencer gratuitement',
      popular: false,
      badge: null
    },
    {
      id: 'standard',
      name: 'Business',
      price: { monthly: 15000, annual: 150000, currency: 'FCFA' },
      features: [
        'Transactions illimitées',
        'Orange Money + MTN + Wave',
        'Checkout + API complète',
        'Dashboard analytics',
        'Support email + chat (24h)',
        'Paiements récurrents',
        'Liens de paiement'
      ],
      cta: 'Essai gratuit 14 jours',
      popular: true,
      badge: 'Plus populaire'
    },
    {
      id: 'premium',
      name: 'Enterprise',
      price: { monthly: 35000, annual: 350000, currency: 'FCFA' },
      features: [
        'Tout du plan Business',
        'Volumes négociés',
        'SDK mobiles dédiés',
        'Support dédié 24/7',
        'SLA garanti 99.99%',
        'Dashboard white-label',
        'Onboarding assisté'
      ],
      cta: 'Contacter les ventes',
      popular: false,
      badge: 'Meilleure valeur'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  const handleCtaClick = (plan) => {
    if (plan.id === 'premium') {
      setShowContactModal(true);
    } else {
      window.location.href = `/register?plan=${plan.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full mb-4">
            <Star className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-semibold text-violet-700">Nos Tarifs</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Des prix{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              simples et transparents
            </span>
          </h1>
          
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Choisissez le plan adapté à votre activité. Pas de frais cachés, 
            pas d'engagement, évoluez à votre rythme.
          </p>
        </div>

        {/* Toggle Mensuel/Annuel */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
            Mensuel
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              billingCycle === 'annual' ? 'bg-violet-600' : 'bg-slate-300'
            }`}
            aria-label="Basculer la facturation"
          >
            <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
              billingCycle === 'annual' ? 'left-8' : 'left-1'
            }`} />
          </button>
          <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-500'}`}>
            Annuel <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-1.5 py-0.5 rounded-full ml-1">-2 mois offerts</span>
          </span>
        </div>

        {/* Cartes de prix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.popular
                    ? 'border-violet-500 shadow-xl shadow-violet-500/20 scale-105 z-10'
                    : 'border-slate-200 hover:border-violet-300'
                }`}
                // ✅ Correction: Supprimez tout attribut jsx non standard
              >
                {plan.badge && (
                  <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600">
                    {plan.badge}
                  </div>
                )}

                <div className={`p-6 pb-4 ${plan.badge ? 'pt-10' : ''}`}>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">
                      {formatPrice(price)}
                    </span>
                    <span className="text-slate-500">
                      {billingCycle === 'monthly' ? '/mois' : '/an'}
                    </span>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => handleCtaClick(plan)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 group ${
                      plan.popular
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Tarif;