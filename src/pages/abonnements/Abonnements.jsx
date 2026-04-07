import React, { useState } from 'react';
import { 
  Check, X, Star, Zap, Shield, Users, Clock, 
  ArrowRight, HelpCircle, Award, TrendingUp, 
  CreditCard, RefreshCw, Lock, Info
} from 'lucide-react';

const Abonnements = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly ou annual
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Plans d'abonnement
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      tagline: 'Pour tester et démarrer',
      price: {
        monthly: 5000,
        annual: 50000, // 2 mois gratuits
        currency: 'FCFA'
      },
      description: 'Idéal pour les freelances et petites entreprises qui débutent.',
      features: [
        { label: '100 transactions/mois', included: true },
        { label: 'Orange Money + MTN MoMo', included: true },
        { label: 'Checkout hébergé', included: true },
        { label: 'Dashboard basique', included: true },
        { label: 'Support email', included: true },
        { label: 'API REST', included: false },
        { label: 'Paiements récurrents', included: false },
        { label: 'Support prioritaire', included: false },
        { label: 'White-label', included: false } 
      ],
      cta: 'Commencer gratuitement',
      popular: false,
      gradient: 'from-slate-500 to-slate-700',
      badge: null
    },
    {
      id: 'standard',
      name: 'Standard',
      tagline: 'Pour croître et scaler',
      price: {
        monthly: 10000,
        annual: 100000, // 2 mois gratuits
        currency: 'FCFA'
      },
      description: 'Pour les e-commerce et entreprises en croissance.',
      features: [
        { label: 'Transactions illimitées', included: true },
        { label: 'Tous les wallets mobiles', included: true },
        { label: 'Checkout + API complète', included: true },
        { label: 'Dashboard analytics', included: true },
        { label: 'Support email + chat', included: true },
        { label: 'Paiements récurrents', included: true },
        { label: 'Liens de paiement', included: true },
        { label: 'Support prioritaire', included: true },
        { label: 'White-label', included: false }
      ],
      cta: 'Essai gratuit 14 jours',
      popular: true,
      gradient: 'from-violet-600 to-indigo-600',
      badge: 'Plus populaire'
    },
    {
      id: 'premium',
      name: 'Premium',
      tagline: 'Pour les besoins enterprise',
      price: {
        monthly: 20000,
        annual: 200000, // 2 mois gratuits
        currency: 'FCFA'
      },
      description: 'Pour les grandes entreprises et besoins spécifiques.',
      features: [
        { label: 'Tout du plan Standard', included: true },
        { label: 'Volumes négociés', included: true },
        { label: 'SDK mobiles dédiés', included: true },
        { label: 'Webhooks avancés', included: true },
        { label: 'Dashboard white-label', included: true },
        { label: 'Support dédié 24/7', included: true },
        { label: 'SLA garanti 99.99%', included: true },
        { label: 'Onboarding assisté', included: true },
        { label: 'Expert technique dédié', included: true }
      ],
      cta: 'Contacter les ventes',
      popular: false,
      gradient: 'from-amber-500 to-orange-500',
      badge: 'Meilleure valeur'
    }
  ];

  // FAQ Abonnements
  const faq = [
    {
      q: 'Puis-je changer de plan à tout moment ?',
      a: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre dashboard. Le changement est immédiat et la facturation est ajustée au prorata.'
    },
    {
      q: 'Y a-t-il un engagement minimum ?',
      a: 'Non, tous nos plans sont sans engagement. Vous pouvez résilier à tout moment avec un préavis de 7 jours. Aucun frais caché.'
    },
    {
      q: 'Comment fonctionne l\'essai gratuit ?',
      a: 'Le plan Standard inclut 14 jours d\'essai gratuit sans carte bancaire. Vous accédez à toutes les fonctionnalités. À la fin, vous choisissez de souscrire ou de rester sur le plan Basic.'
    },
    {
      q: 'Les frais de transaction sont-ils inclus ?',
      a: 'Non, l\'abonnement couvre l\'accès à la plateforme. Les frais de transaction (2.5% pour Mobile Money, 3.4% pour les cartes) s\'appliquent en plus sur chaque paiement réussi.'
    },
    {
      q: 'Proposez-vous des tarifs personnalisés ?',
      a: 'Oui, pour les volumes élevés (>50M FCFA/mois), contactez notre équipe commerciale pour des tarifs dégressifs et des conditions enterprise.'
    }
  ];

  // Garanties
  const guarantees = [
    { icon: Lock, label: 'Sans engagement', desc: 'Résiliable à tout moment' },
    { icon: RefreshCw, label: 'Satisfait ou remboursé', desc: '30 jours garantis' },
    { icon: Shield, label: 'Sécurité maximale', desc: 'Certifié PCI DSS' },
    { icon: Clock, label: 'Support 24/7', desc: 'Toujours disponible' }
  ];

  // Formatage du prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  // Calcul de l'économie annuelle
  const getAnnualSavings = (monthlyPrice, annualPrice) => {
    const yearlyMonthly = monthlyPrice * 12;
    const savings = yearlyMonthly - annualPrice;
    return savings;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white py-16 px-4">
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
            Annuel <span className="text-emerald-600 text-xs font-bold">-17%</span>
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
                {/* Badge Populaire */}
                {plan.badge && (
                  <div className={`absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold text-white ${
                    plan.id === 'standard' ? 'bg-gradient-to-r from-violet-600 to-indigo-600' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                {/* Header du plan */}
                <div className={`p-6 pb-4 ${plan.badge ? 'pt-10' : ''}`}>
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{plan.tagline}</p>
                  
                  {/* Prix */}
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

                {/* Features */}
                <div className="px-6 pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
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
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-violet-600" />
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

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Fonctionnalité</th>
                    <th className="text-center p-4 text-sm font-semibold text-slate-700">Basic</th>
                    <th className="text-center p-4 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600">Standard</th>
                    <th className="text-center p-4 text-sm font-semibold text-slate-700">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    { feature: 'Transactions/mois', basic: '100', standard: 'Illimitées', premium: 'Illimitées + volumes' },
                    { feature: 'Mobile Money', basic: '✓', standard: '✓', premium: '✓' },
                    { feature: 'Cartes bancaires', basic: '✓', standard: '✓', premium: '✓' },
                    { feature: 'Checkout hébergé', basic: '✓', standard: '✓', premium: '✓' },
                    { feature: 'API REST', basic: '✕', standard: '✓', premium: '✓' },
                    { feature: 'SDK Mobile', basic: '✕', standard: '✕', premium: '✓' },
                    { feature: 'Paiements récurrents', basic: '✕', standard: '✓', premium: '✓' },
                    { feature: 'Support', basic: 'Email', standard: 'Email + Chat', premium: 'Dédié 24/7' },
                    { feature: 'SLA', basic: 'Best effort', standard: '99.9%', premium: '99.99%' },
                    { feature: 'White-label', basic: '✕', standard: '✕', premium: '✓' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-4 text-sm text-slate-700">{row.feature}</td>
                      <td className="p-4 text-center text-sm text-slate-600">{row.basic}</td>
                      <td className="p-4 text-center text-sm font-medium bg-violet-50">{row.standard}</td>
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

          <div className="max-w-3xl mx-auto space-y-4">
            {faq.map((item, idx) => (
              <FAQItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>

        {/* ========== CTA FINAL ========== */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            
            {/* Décoratif */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
                Toujours hésitant ?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Commencez gratuitement avec le plan Basic. Passez au plan supérieur 
                quand vous êtes prêt. Aucun risque, aucune carte requise.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all group"
                >
                  <span>Parler à un expert</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all"
                >
                  <span>Voir une démo</span>
                </a>
              </div>
              
              {/* Trust badges */}
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
    </div>
  );
};

// Composant FAQ Item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <span className={`w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center transition-transform ${isOpen ? 'rotate-180' : ''}`}>
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

export default Abonnements;