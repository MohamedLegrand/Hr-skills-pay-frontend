// Tarif.jsx - Page des tarifs et abonnements
import React, { useState } from 'react';
import { 
  Check, Star, Zap, Shield, Users, TrendingUp, 
  ArrowRight, CreditCard, RefreshCw, Lock, Clock,
  Mail, Phone, Award, Globe, Server, X
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

const APP_CONFIG = {
  salesEmail: getEnvVar('SALES_EMAIL', 'commercial@hrskillspay.com'),
  supportPhone: getEnvVar('SUPPORT_PHONE', '+237 677 246 900'),
};

// ============================================================================
// COMPOSANT MODAL DE CONTACT
// ============================================================================
const ContactModal = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fadeInUp" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900">Contactez notre équipe</h3>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <p className="text-sm text-slate-600 mb-6">
          Notre équipe commerciale vous répondra sous 24h pour discuter de vos besoins spécifiques.
        </p>
        
        <div className="space-y-4">
          <a 
            href={`mailto:${APP_CONFIG.salesEmail}`}
            className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:border-violet-300 hover:bg-violet-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
              <Mail className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">{APP_CONFIG.salesEmail}</p>
              <p className="text-xs text-slate-500">Réponse sous 24h</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href={`tel:${APP_CONFIG.supportPhone.replace(/\s/g, '')}`}
            className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:border-violet-300 hover:bg-violet-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
              <Phone className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">{APP_CONFIG.supportPhone}</p>
              <p className="text-xs text-slate-500">Lun-Ven, 9h-18h</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
const Tarif = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showContactModal, setShowContactModal] = useState(false);

  // Plans d'abonnement
  const plans = [
    {
      id: 'basic',
      name: 'Démarrage',
      tagline: 'Pour tester et démarrer',
      price: { monthly: 5000, annual: 50000, currency: 'FCFA' },
      description: 'Idéal pour les freelances et petites entreprises qui débutent.',
      features: [
        '100 transactions/mois',
        'Orange Money + MTN MoMo',
        'Checkout hébergé',
        'Dashboard basique',
        'Support email (48h)'
      ],
      cta: 'Commencer gratuitement',
      popular: false,
      badge: null,
      link: '/register?plan=basic'
    },
    {
      id: 'standard',
      name: 'Business',
      tagline: 'Pour croître et scaler',
      price: { monthly: 15000, annual: 150000, currency: 'FCFA' },
      description: 'Pour les e-commerce et entreprises en croissance.',
      features: [
        'Transactions illimitées',
        'Orange Money + MTN + Wave',
        'Checkout + API complète',
        'Dashboard analytics avancé',
        'Support email + chat (24h)',
        'Paiements récurrents',
        'Liens de paiement personnalisés'
      ],
      cta: 'Essai gratuit 14 jours',
      popular: true,
      badge: 'Plus populaire',
      link: '/register?plan=standard'
    },
    {
      id: 'premium',
      name: 'Enterprise',
      tagline: 'Pour les besoins sur mesure',
      price: { monthly: 35000, annual: 350000, currency: 'FCFA' },
      description: 'Pour les grandes entreprises et besoins spécifiques.',
      features: [
        'Tout du plan Business',
        'Volumes négociés',
        'SDK mobiles dédiés',
        'Support dédié 24/7 (1h)',
        'SLA garanti 99.99%',
        'Dashboard white-label',
        'Onboarding assisté'
      ],
      cta: 'Contacter les ventes',
      popular: false,
      badge: 'Meilleure valeur',
      link: '#contact'
    }
  ];

  // FAQ
  const faq = [
    {
      q: 'Puis-je changer de plan à tout moment ?',
      a: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre dashboard. Le changement est immédiat et la facturation est ajustée au prorata.'
    },
    {
      q: 'Y a-t-il un engagement minimum ?',
      a: 'Non, tous nos plans sont sans engagement. Vous pouvez résilier à tout moment. Aucun frais caché.'
    },
    {
      q: 'Comment fonctionne l\'essai gratuit ?',
      a: 'Le plan Business inclut 14 jours d\'essai gratuit sans carte bancaire. Vous accédez à toutes les fonctionnalités.'
    },
    {
      q: 'Les frais de transaction sont-ils inclus ?',
      a: 'Non, l\'abonnement couvre l\'accès à la plateforme. Les frais de transaction (2.5% pour Mobile Money, 3.4% pour les cartes) s\'appliquent en plus.'
    }
  ];

  // Garanties
  const guarantees = [
    { icon: Lock, label: 'Sans engagement', desc: 'Résiliable à tout moment', color: 'violet' },
    { icon: RefreshCw, label: 'Satisfait ou remboursé', desc: '30 jours garantis', color: 'emerald' },
    { icon: Shield, label: 'Sécurité maximale', desc: 'Certifié PCI DSS', color: 'blue' },
    { icon: Clock, label: 'Support 24/7', desc: 'Toujours disponible', color: 'amber' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  const getAnnualSavings = (monthlyPrice, annualPrice) => {
    const yearlyMonthly = monthlyPrice * 12;
    const savings = yearlyMonthly - annualPrice;
    return savings;
  };

  const handleCtaClick = (plan) => {
    if (plan.id === 'premium') {
      setShowContactModal(true);
    } else if (plan.link && plan.link !== '#contact') {
      window.location.href = plan.link;
    }
  };

  // Composant FAQ Item
  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all hover:border-violet-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors"
        >
          <span className="font-semibold text-slate-900">{question}</span>
          <span className={`w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <p className="px-6 pb-4 text-sm text-slate-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="tarif"
      className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ========== EN-TÊTE ========== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full mb-4">
            <Star className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-semibold text-violet-700">Nos Abonnements</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Des tarifs{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              simples et transparents
            </span>
          </h1>
          
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Choisissez le plan adapté à votre activité. Pas de frais cachés, 
            pas d'engagement, évoluez à votre rythme.
          </p>
        </div>

        {/* ========== TOGGLE MENSUEL/ANNUEL ========== */}
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

        {/* ========== CARTES DE PRIX ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {plans.map((plan) => {
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;
            const savings = billingCycle === 'annual' ? getAnnualSavings(plan.price.monthly, plan.price.annual) : 0;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl border-2 overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.popular
                    ? 'border-violet-500 shadow-xl shadow-violet-500/20 scale-105 z-10'
                    : 'border-slate-200 hover:border-violet-300'
                }`}
              >
                {plan.badge && (
                  <div className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600">
                    {plan.badge}
                  </div>
                )}

                <div className={`p-6 pb-4 ${plan.badge ? 'pt-10' : ''}`}>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{plan.tagline}</p>
                  
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">
                      {formatPrice(price)}
                    </span>
                    <span className="text-slate-500">
                      {billingCycle === 'monthly' ? '/mois' : '/an'}
                    </span>
                  </div>
                  
                  {savings > 0 && (
                    <p className="text-xs text-emerald-600 font-medium mt-1">
                      Économisez {formatPrice(savings)} FCFA/an
                    </p>
                  )}
                  
                  <p className="text-xs text-slate-400 mt-2">{plan.description}</p>
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

        {/* ========== GARANTIES ========== */}
        <div className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {guarantees.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-200 transition-colors">
                  <div className={`w-10 h-10 rounded-lg bg-${item.color}-100 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 text-${item.color}-600`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========== COMPARAISON DÉTAILLÉE ========== */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Comparaison détaillée
            </h2>
            <p className="text-slate-600">Visualisez toutes les fonctionnalités incluses dans chaque plan</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Fonctionnalité</th>
                    <th className="text-center p-4 text-sm font-semibold text-slate-700">Démarrage</th>
                    <th className="text-center p-4 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600">Business</th>
                    <th className="text-center p-4 text-sm font-semibold text-slate-700">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    { feature: 'Transactions/mois', basic: '100', standard: 'Illimitées', premium: 'Illimitées + volumes' },
                    { feature: 'Orange Money', basic: '✓', standard: '✓', premium: '✓' },
                    { feature: 'MTN Mobile Money', basic: '✓', standard: '✓', premium: '✓' },
                    { feature: 'Wave', basic: '✕', standard: '✓', premium: '✓' },
                    { feature: 'Cartes bancaires', basic: '✕', standard: '✓', premium: '✓' },
                    { feature: 'Checkout hébergé', basic: '✓', standard: '✓', premium: '✓' },
                    { feature: 'API REST', basic: '✕', standard: '✓', premium: '✓' },
                    { feature: 'SDK Mobile', basic: '✕', standard: '✕', premium: '✓' },
                    { feature: 'Paiements récurrents', basic: '✕', standard: '✓', premium: '✓' },
                    { feature: 'Support', basic: 'Email 48h', standard: 'Email + Chat 24h', premium: 'Dédié 24/7 1h' },
                    { feature: 'SLA garanti', basic: 'Best effort', standard: '99.9%', premium: '99.99%' },
                    { feature: 'White-label', basic: '✕', standard: '✕', premium: '✓' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-slate-700">{row.feature}</td>
                      <td className="p-4 text-center text-sm text-slate-600">{row.basic}</td>
                      <td className="p-4 text-center text-sm font-medium bg-violet-50/50">{row.standard}</td>
                      <td className="p-4 text-center text-sm text-slate-600">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========== FAQ ========== */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Questions fréquentes
            </h2>
            <p className="text-slate-600">Tout ce que vous devez savoir sur nos abonnements</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faq.map((item, idx) => (
              <FAQItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>

        {/* ========== CTA FINAL ========== */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
                Prêt à faire évoluer votre activité ?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Commencez gratuitement avec le plan Démarrage. Passez au plan supérieur 
                quand vous êtes prêt. Aucun risque, aucune carte requise.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all group"
                >
                  <span>Commencer maintenant</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="mailto:commercial@hrskillspay.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contacter les ventes</span>
                </a>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> 14 jours d'essai gratuit
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Sans engagement
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" /> Support 24/7
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ========== MODAL DE CONTACT ========== */}
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
      
      {/* ========== ANIMATIONS ========== */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Tarif;