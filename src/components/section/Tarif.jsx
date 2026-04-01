import React, { useState } from 'react';
import { 
  Check, X, HelpCircle, Calculator, ArrowRight, 
  Shield, Zap, Users, CreditCard, Globe, Building2,
  ChevronDown, ChevronUp, Info, Sparkles, TrendingUp, Bell
} from 'lucide-react';

// ============================================================================
// DONNÉES TARIFS & COMMISSIONS
// ============================================================================

// Plans d'abonnement
const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Pour tester et démarrer',
    price: {
      amount: 0,
      currency: 'XAF',
      period: 'mois',
      note: 'Sans engagement'
    },
    description: 'Idéal pour freelances, petites boutiques et projets en phase de test.',
    features: [
      { label: 'Jusqu\'à 50 transactions/mois', included: true },
      { label: 'Orange Money & MTN MoMo', included: true },
      { label: 'Checkout hébergé', included: true },
      { label: 'Liens de paiement', included: true },
      { label: 'Dashboard basique', included: true },
      { label: 'Support email', included: true },
      { label: 'API REST accès', included: false },
      { label: 'Paiements récurrents', included: false },
      { label: 'Split payments', included: false },
      { label: 'Support prioritaire', included: false }
    ],
    cta: 'Commencer gratuitement',
    ctaHref: '#signup-starter',
    popular: false,
    gradient: 'from-slate-500 to-slate-700'
  },
  {
    id: 'pro',
    name: 'Professionnel',
    tagline: 'Pour croître et scaler',
    price: {
      amount: 15000,
      currency: 'XAF',
      period: 'mois',
      note: 'ou 150 000 XAF/an (-17%)'
    },
    description: 'Pour e-commerce établis, applications mobiles et entreprises en croissance.',
    features: [
      { label: 'Transactions illimitées', included: true },
      { label: 'Tous les wallets mobiles', included: true },
      { label: 'Checkout hébergé + API', included: true },
      { label: 'Liens & QR Code', included: true },
      { label: 'Dashboard analytics', included: true },
      { label: 'Support email + chat', included: true },
      { label: 'API REST complète', included: true },
      { label: 'Paiements récurrents', included: true },
      { label: 'Split payments', included: true },
      { label: 'Support prioritaire', included: true }
    ],
    cta: 'Essai gratuit 14 jours',
    ctaHref: '#signup-pro',
    popular: true,
    gradient: 'from-violet-600 to-indigo-600'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Pour les besoins complexes',
    price: {
      amount: null,
      currency: 'XAF',
      period: 'sur devis',
      note: 'Tarifs personnalisés'
    },
    description: 'Pour marketplaces, grandes entreprises et institutions avec besoins spécifiques.',
    features: [
      { label: 'Tout du plan Pro', included: true },
      { label: 'Volumes élevés négociés', included: true },
      { label: 'SDK mobiles dédiés', included: true },
      { label: 'Webhooks avancés', included: true },
      { label: 'Dashboard white-label', included: true },
      { label: 'Support dédié 24/7', included: true },
      { label: 'SLA garanti 99.99%', included: true },
      { label: 'Onboarding assisté', included: true },
      { label: 'Rapports sur-mesure', included: true },
      { label: 'Expert technique dédié', included: true }
    ],
    cta: 'Contacter les ventes',
    ctaHref: '#contact-enterprise',
    popular: false,
    gradient: 'from-slate-800 to-slate-900'
  }
];

// Commission par méthode de paiement (transparence totale)
const paymentFees = [
  {
    method: 'Orange Money',
    type: 'mobile-money',
    fee: '2.5%',
    fixedFee: '0 XAF',
    description: 'Paiement mobile leader en Afrique francophone',
    icon: '📱',
    color: 'from-orange-500 to-amber-500',
    countries: ['Cameroun', 'Sénégal', 'Côte d\'Ivoire'],
    settlement: 'J+1'
  },
  {
    method: 'MTN Mobile Money',
    type: 'mobile-money',
    fee: '2.5%',
    fixedFee: '0 XAF',
    description: 'Solution mobile money la plus répandue',
    icon: '📲',
    color: 'from-yellow-400 to-amber-500',
    countries: ['Cameroun', 'Ghana', 'Ouganda'],
    settlement: 'J+1'
  },
  {
    method: 'Cartes Bancaires',
    type: 'card',
    fee: '3.4%',
    fixedFee: '150 XAF',
    description: 'Visa, Mastercard, UnionPay internationales',
    icon: '💳',
    color: 'from-slate-600 to-slate-800',
    countries: ['Monde entier'],
    settlement: 'J+2'
  },
  {
    method: 'Maviance',
    type: 'aggregator',
    fee: 'Sur devis',
    fixedFee: '-',
    description: 'Agrégateur local Afrique Centrale',
    icon: '🌍',
    color: 'from-blue-600 to-indigo-600',
    countries: ['Cameroun', 'Gabon', 'RDC'],
    settlement: 'J+1'
  },
  {
    method: 'Afrique Pay',
    type: 'aggregator',
    fee: '2.9%',
    fixedFee: '0 XAF',
    description: 'Solution panafricaine de paiement',
    icon: '🌐',
    color: 'from-emerald-500 to-teal-500',
    countries: ['15+ pays'],
    settlement: 'J+1'
  },
  {
    method: 'Carveto',
    type: 'aggregator',
    fee: '3.2%',
    fixedFee: '0 XAF',
    description: 'Paiements sécurisés e-commerce',
    icon: '🛒',
    color: 'from-violet-600 to-purple-600',
    countries: ['Afrique Centrale'],
    settlement: 'J+1'
  }
];

// Fonctionnalités avancées (add-ons)
const addOns = [
  {
    id: 'sms-notifs',
    name: 'Notifications SMS Twilio',
    description: 'Alertes transaction, reçus et rappels automatisés',
    price: { amount: 5000, currency: 'XAF', period: 'mois' },
    unit: 'ou 25 XAF/SMS',
    icon: Bell
  },
  {
    id: 'fraud-protection',
    name: 'Protection Fraude IA',
    description: 'Détection avancée et règles personnalisées',
    price: { amount: 10000, currency: 'XAF', period: 'mois' },
    unit: 'inclus dans Enterprise',
    icon: Shield
  },
  {
    id: 'multi-currency',
    name: 'Multi-devises',
    description: 'Acceptez XAF, EUR, USD avec conversion auto',
    price: { amount: 7500, currency: 'XAF', period: 'mois' },
    unit: '+0.5% sur conversion',
    icon: Globe
  },
  {
    id: 'payouts',
    name: 'Payouts en masse',
    description: 'Envoyez salaires et commissions en bulk',
    price: { amount: 0, currency: 'XAF', period: 'mois' },
    unit: '25 XAF/transaction',
    icon: Users
  }
];

// FAQ Tarifs
const pricingFaq = [
  {
    q: 'Y a-t-il des frais cachés ou des engagements ?',
    a: 'Non. Nos tarifs sont 100% transparents : vous ne payez que les commissions sur les transactions réussies. Pas de frais d\'installation, pas de frais mensuels sur le plan Starter, pas de frais de résiliation. Vous pouvez changer ou annuler votre plan à tout moment.'
  },
  {
    q: 'Comment sont calculées les commissions ?',
    a: 'Les commissions s\'appliquent uniquement sur le montant de la transaction réussie. Exemple : pour un paiement de 10 000 XAF via Orange Money (2.5%), la commission est de 250 XAF. Vous recevez 9 750 XAF. Aucun frais n\'est appliqué sur les transactions échouées.'
  },
  {
    q: 'Puis-je négocier les tarifs pour de gros volumes ?',
    a: 'Oui. Dès 50 millions XAF de volume mensuel, nos tarifs deviennent dégressifs. Contactez notre équipe commerciale pour un devis personnalisé. Les plans Enterprise bénéficient également de conditions négociées au cas par cas.'
  },
  {
    q: 'Quand reçois-je mes fonds ?',
    a: 'Les paiements Mobile Money sont crédités instantanément sur votre wallet Hr Skills Pay. Les settlements vers votre compte bancaire interviennent en J+1 ouvré. Vous pouvez configurer des transferts automatiques quotidiens, hebdomadaires ou manuels.'
  },
  {
    q: 'Proposez-vous une période d\'essai ?',
    a: 'Oui ! Le plan Professionnel inclut 14 jours d\'essai gratuit sans carte bancaire. Vous accédez à toutes les fonctionnalités Pro. À la fin de l\'essai, vous choisissez de souscrire ou de rester sur le plan Starter gratuit.'
  },
  {
    q: 'Comment puis-je suivre mes commissions ?',
    a: 'Votre dashboard affiche en temps réel : le volume de transactions, les commissions appliquées par méthode de paiement, et le net à recevoir. Vous pouvez exporter des rapports CSV/PDF pour votre comptabilité.'
  }
];

// Comparateur de coûts (calculateur interactif)
const costCalculator = {
  title: 'Estimez vos coûts',
  description: 'Simulez vos commissions mensuelles en fonction de votre volume',
  inputs: [
    { id: 'volume', label: 'Volume mensuel estimé', type: 'range', min: 100000, max: 100000000, step: 100000, unit: 'XAF', default: 5000000 },
    { id: 'method', label: 'Méthode de paiement principale', type: 'select', options: [
      { value: 'orange', label: 'Orange Money (2.5%)' },
      { value: 'mtn', label: 'MTN MoMo (2.5%)' },
      { value: 'cards', label: 'Cartes (3.4% + 150 XAF)' },
      { value: 'mix', label: 'Mixte (moyenne 2.8%)' }
    ], default: 'mix' }
  ]
};

// ============================================================================
// COMPOSANTS RÉUTILISABLES
// ============================================================================

// Badge "Populaire"
const PopularBadge = () => (
  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
    <Sparkles className="w-3 h-3" />
    Plus populaire
  </span>
);

// Icone méthode de paiement
const PaymentMethodIcon = ({ icon, color }) => (
  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
    <span className="text-white text-lg">{icon}</span>
  </div>
);

// Toggle switch pour calculateur
const ToggleSwitch = ({ enabled, onChange, label }) => (
  <button
    type="button"
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
      enabled ? 'bg-violet-600' : 'bg-slate-200'
    }`}
    role="switch"
    aria-checked={enabled}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    <span className="sr-only">{label}</span>
  </button>
);

// Card Plan de Tarification
const PricingCard = ({ plan }) => {
  return (
    <article 
      className={`relative bg-white rounded-3xl border-2 overflow-hidden transition-all duration-400 hover:shadow-2xl hover:shadow-slate-900/10 ${
        plan.popular 
          ? 'border-violet-500 shadow-xl shadow-violet-500/20 scale-105 z-10' 
          : 'border-slate-200/60 hover:border-violet-300/50'
      }`}
    >
      {/* Badge Populaire */}
      {plan.popular && <PopularBadge />}

      {/* Header du plan */}
      <div className={`p-6 pb-4 bg-gradient-to-br ${plan.gradient} bg-opacity-5`}>
        <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
        <p className="text-sm text-slate-500 mt-1">{plan.tagline}</p>
        
        {/* Prix */}
        <div className="mt-4 flex items-baseline gap-1">
          {plan.price.amount !== null ? (
            <>
              <span className="text-4xl font-black text-slate-900">
                {plan.price.amount.toLocaleString('fr-FR')}
              </span>
              <span className="text-slate-500">{plan.price.currency}/{plan.price.period}</span>
            </>
          ) : (
            <span className="text-2xl font-black text-slate-900">{plan.price.period}</span>
          )}
        </div>
        {plan.price.note && (
          <p className="text-xs text-slate-400 mt-1">{plan.price.note}</p>
        )}
      </div>

      {/* Description */}
      <p className="px-6 py-4 text-sm text-slate-600 border-b border-slate-100">
        {plan.description}
      </p>

      {/* Features */}
      <ul className="px-6 py-4 space-y-3">
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

      {/* CTA */}
      <div className="px-6 pb-6 pt-2">
        <a
          href={plan.ctaHref}
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 group ${
            plan.popular
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5'
              : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
          }`}
        >
          <span>{plan.cta}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
};

// Card Commission par Méthode
const FeeCard = ({ fee }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200/60 hover:border-violet-300 transition-colors">
    <PaymentMethodIcon icon={fee.icon} color={fee.color} />
    
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-slate-900">{fee.method}</h4>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
          fee.type === 'mobile-money' ? 'bg-emerald-100 text-emerald-700' :
          fee.type === 'card' ? 'bg-slate-100 text-slate-700' :
          'bg-violet-100 text-violet-700'
        }`}>
          {fee.type}
        </span>
      </div>
      <p className="text-xs text-slate-500 mt-0.5 truncate">{fee.description}</p>
      
      <div className="flex items-center gap-4 mt-2">
        <span className="text-sm font-bold text-slate-900">{fee.fee}</span>
        {fee.fixedFee !== '-' && (
          <span className="text-xs text-slate-500">+ {fee.fixedFee}</span>
        )}
        <span className="text-[10px] text-slate-400">• Settlement {fee.settlement}</span>
      </div>
    </div>
    
    <button className="text-xs font-medium text-violet-600 hover:text-violet-800 flex-shrink-0">
      Activer
    </button>
  </div>
);

// Item FAQ
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-slate-200 last:border-0">
    <button
      onClick={onToggle}
      className="w-full py-4 flex items-start justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded-lg"
      aria-expanded={isOpen}
    >
      <span className="text-sm font-semibold text-slate-900 pr-4">{question}</span>
      <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </span>
    </button>
    
    <div 
      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
      aria-hidden={!isOpen}
    >
      <p className="text-sm text-slate-600 leading-relaxed">{answer}</p>
    </div>
  </div>
);

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
function Tarifs() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // État pour le calculateur
  const [calculatorValues, setCalculatorValues] = useState({
    volume: 5000000,
    method: 'mix'
  });

  // Calcul des commissions estimées
  const calculateFees = () => {
    const { volume, method } = calculatorValues;
    let rate = 0.028; // default mix
    let fixed = 0;
    
    if (method === 'orange' || method === 'mtn') {
      rate = 0.025;
    } else if (method === 'cards') {
      rate = 0.034;
      fixed = 150;
    }
    
    const variableFee = volume * rate;
    const transactionsEstimate = volume / 10000; // estimation: ticket moyen 10k XAF
    const totalFixed = transactionsEstimate * fixed;
    
    return {
      variable: Math.round(variableFee),
      fixed: Math.round(totalFixed),
      total: Math.round(variableFee + totalFixed),
      net: Math.round(volume - variableFee - totalFixed)
    };
  };

  const fees = calculateFees();

  return (
    <section 
      id="tarifs" 
      className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(124,58,237,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* ========== EN-TÊTE DE SECTION ========== */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16 animate-fadeInDown">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100/80 border border-violet-200 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs font-semibold text-violet-800 uppercase tracking-wide">Tarifs</span>
          </div>
          
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Des prix{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                simples et transparents
              </span>
            </span>
          </h2>
          
          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
            Payez uniquement pour ce que vous utilisez. Pas de frais cachés, pas d'engagement. Commencez gratuitement et évoluez à votre rythme.
          </p>
        </div>

        {/* ========== TOGGLE FACTURATION ========== */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
            Mensuel
          </span>
          <ToggleSwitch 
            enabled={billingCycle === 'annual'} 
            onChange={(val) => setBillingCycle(val ? 'annual' : 'monthly')}
            label="Basculer vers la facturation annuelle"
          />
          <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-500'}`}>
            Annuel <span className="text-emerald-600 text-xs font-bold">-17%</span>
          </span>
        </div>

        {/* ========== CARTES DE TARIFICATION ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.id} 
              className="animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>

        {/* ========== COMPARAISON DES COMMISSIONS ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-3">
              <CreditCard className="w-6 h-6 text-violet-600" />
              Commissions par méthode de paiement
            </h3>
            <p className="text-slate-500">Transparence totale : vous savez exactement ce que vous payez</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentFees.map((fee, index) => (
              <div 
                key={fee.method}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <FeeCard fee={fee} />
              </div>
            ))}
          </div>

          {/* Note de transparence */}
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-800">
              <strong>Aucun frais caché :</strong> Les commissions ne s'appliquent que sur les transactions réussies. 
              Pas de frais d'installation, pas de frais mensuels sur Starter, pas de frais de résiliation.
            </p>
          </div>
        </div>

        {/* ========== CALCULATEUR DE COÛTS ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="bg-white rounded-3xl border border-slate-200/60 p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{costCalculator.title}</h4>
                  <p className="text-sm text-slate-500">{costCalculator.description}</p>
                </div>
              </div>
            </div>

            {/* Inputs du calculateur */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Volume slider */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Volume mensuel estimé
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={costCalculator.inputs[0].min}
                    max={costCalculator.inputs[0].max}
                    step={costCalculator.inputs[0].step}
                    value={calculatorValues.volume}
                    onChange={(e) => setCalculatorValues(prev => ({ ...prev, volume: Number(e.target.value) }))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{(costCalculator.inputs[0].min / 1000000).toFixed(1)}M XAF</span>
                    <span className="font-bold text-slate-900">
                      {(calculatorValues.volume / 1000000).toFixed(1)}M XAF
                    </span>
                    <span className="text-slate-500">{(costCalculator.inputs[0].max / 1000000).toFixed(0)}M XAF</span>
                  </div>
                </div>
              </div>

              {/* Méthode select */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  {costCalculator.inputs[1].label}
                </label>
                <select
                  value={calculatorValues.method}
                  onChange={(e) => setCalculatorValues(prev => ({ ...prev, method: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                >
                  {costCalculator.inputs[1].options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Résultats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Commissions variables</p>
                <p className="text-lg font-black text-slate-900 mt-1">
                  {fees.variable.toLocaleString('fr-FR')} XAF
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Frais fixes</p>
                <p className="text-lg font-black text-slate-900 mt-1">
                  {fees.fixed.toLocaleString('fr-FR')} XAF
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Total commissions</p>
                <p className="text-lg font-black text-violet-600 mt-1">
                  {fees.total.toLocaleString('fr-FR')} XAF
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Net à recevoir</p>
                <p className="text-lg font-black text-emerald-600 mt-1">
                  {fees.net.toLocaleString('fr-FR')} XAF
                </p>
              </div>
            </div>

            {/* CTA calculateur */}
            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500">
                Estimation indicative. Les commissions réelles peuvent varier selon le mix de paiement.
              </p>
              <a 
                href="#contact-sales"
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
              >
                Obtenir un devis personnalisé
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ========== ADD-ONS & OPTIONS ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">
              Options et fonctionnalités avancées
            </h3>
            <p className="text-slate-500">Ajoutez des services selon vos besoins, sans changer de plan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((addon) => {
              const Icon = addon.icon;
              return (
                <div 
                  key={addon.id}
                  className="p-4 bg-white rounded-xl border border-slate-200/60 hover:border-violet-300 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-200 transition-colors">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-slate-900">{addon.name}</h5>
                      <p className="text-xs text-slate-500 mt-0.5">{addon.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {addon.price.amount === 0 ? 'Gratuit' : `${addon.price.amount.toLocaleString('fr-FR')} ${addon.price.currency}/${addon.price.period}`}
                        </span>
                        <span className="text-[10px] text-slate-400">{addon.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========== FAQ TARIFS ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">
              Questions fréquentes sur les tarifs
            </h3>
            <p className="text-slate-500">Tout ce que vous devez savoir avant de commencer</p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="space-y-1">
              {pricingFaq.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaqIndex === idx}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========== BANDEAU CONFIANCE ========== */}
        <div className="animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-8 lg:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full mb-5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-800">Garantie satisfaction</span>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4">
              Essayez sans risque, payez seulement si ça marche
            </h3>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Commencez gratuitement sur le plan Starter. Passez au plan Pro quand vous êtes prêt. 
              Aucune carte bancaire requise, résiliation à tout moment.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Aucun frais d'installation</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Pas d'engagement minimum</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Commissions uniquement sur succès</span>
              </div>
            </div>

            {/* CTA final */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#signup-starter"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl shadow-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact-sales"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all duration-300"
              >
                <span>Parler à un expert tarifs</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ========== ANIMATIONS CSS ========== */}
      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeInDown { animation: fadeInDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        :focus-visible {
          outline: 2px solid #7c3aed;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}

export default Tarifs;