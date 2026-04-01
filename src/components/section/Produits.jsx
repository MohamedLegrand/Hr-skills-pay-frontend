import React, { useState } from 'react';
import { 
  CreditCard, Link2, Lock, Settings, Bell, RotateCw, 
  Zap, Share2, Code2, Smartphone, Clock, Radio, 
  Repeat, ArrowRightLeft, Users, Globe, Building2, 
  ShieldCheck, BarChart3, Webhook, Terminal, SmartphoneNfc
} from 'lucide-react';

// ============================================================================
// CONFIGURATION & DONNÉES
// ============================================================================

// Mapping des icônes Lucide
const iconMap = {
  creditCard: CreditCard, link: Link2, lock: Lock, settings: Settings,
  bell: Bell, rotateCw: RotateCw, zap: Zap, share: Share2,
  code: Code2, smartphone: Smartphone, clock: Clock, radio: Radio,
  repeat: Repeat, payouts: ArrowRightLeft, users: Users,
  globe: Globe, building: Building2, shield: ShieldCheck,
  chart: BarChart3, webhook: Webhook, terminal: Terminal, nfc: SmartphoneNfc
};

// 🎯 MÉTHODES DE PAIEMENT SUPPORTÉES (Partenaires)
const paymentProviders = [
  {
    id: 'orange-money',
    name: 'Orange Money',
    logo: '/logos/orange-money.svg',
    description: 'Paiement mobile leader en Afrique francophone',
    countries: ['Cameroun', 'Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina'],
    features: ['USSD', 'App mobile', 'API directe'],
    color: 'from-orange-500 to-amber-500',
    status: 'active',
    processingTime: 'Instantané',
    fees: '2.5%'
  },
  {
    id: 'mtn-momo',
    name: 'MTN Mobile Money',
    logo: '/logos/mtn-momo.svg',
    description: 'Solution mobile money la plus répandue en Afrique',
    countries: ['Cameroun', 'Ghana', 'Ouganda', 'Rwanda', 'Zambie'],
    features: ['USSD', 'App mobile', 'Bulk payments'],
    color: 'from-yellow-400 to-amber-500',
    status: 'active',
    processingTime: '< 3s',
    fees: '2.5%'
  },
  {
    id: 'maviance',
    name: 'Maviance',
    logo: '/logos/maviance.svg',
    description: 'Agrégateur local avec expertise terrain',
    countries: ['Cameroun', 'Gabon', 'RDC'],
    features: ['Multi-wallets', 'Reconciliation', 'Support FR'],
    color: 'from-blue-600 to-indigo-600',
    status: 'active',
    processingTime: '1-2 min',
    fees: 'Sur devis'
  },
  {
    id: 'afrique-pay',
    name: 'Afrique Pay',
    logo: '/logos/afrique-pay.svg',
    description: 'Solution panafricaine de paiement digital',
    countries: ['15+ pays africains'],
    features: ['Cross-border', 'Multi-devises', 'Compliance local'],
    color: 'from-emerald-500 to-teal-500',
    status: 'active',
    processingTime: 'Instantané',
    fees: '2.9%'
  },
  {
    id: 'carveto',
    name: 'Carveto',
    logo: '/logos/carveto.svg',
    description: 'Paiements sécurisés pour e-commerce africain',
    countries: ['Cameroun', 'Afrique Centrale'],
    features: ['Anti-fraud', 'Checkout optimisé', 'Analytics'],
    color: 'from-violet-600 to-purple-600',
    status: 'active',
    processingTime: '< 5s',
    fees: '3.2%'
  },
  {
    id: 'cards',
    name: 'Cartes Bancaires',
    logo: '/logos/cards.svg',
    description: 'Visa, Mastercard, UnionPay via processeurs internationaux',
    countries: ['Monde entier'],
    features: ['3D Secure 2.0', 'Tokenization', 'Chargeback protection'],
    color: 'from-slate-600 to-slate-800',
    status: 'active',
    processingTime: '2-5s',
    fees: '3.4% + fixe'
  }
];

// 🔧 SOLUTIONS D'INTÉGRATION & OUTILS
const integrationSolutions = [
  {
    id: 'hosted-checkout',
    title: 'Checkout Hébergé',
    category: 'integration',
    icon: 'creditCard',
    shortDesc: 'Page de paiement prête à l\'emploi',
    description: 'Redirigez vos clients vers une page de paiement sécurisée, personnalisable à votre image. Aucune compétence technique requise.',
    features: [
      { label: 'Personnalisation marque', icon: 'settings' },
      { label: 'Tous les wallets supportés', icon: 'globe' },
      { label: 'Conforme PCI DSS', icon: 'shield' }
    ],
    gradient: 'from-violet-500 to-indigo-600',
    badge: { text: 'Recommandé', variant: 'violet' },
    stats: { value: '+40%', label: 'Conversion' },
    cta: 'Tester gratuitement',
    setupTime: '5 minutes'
  },
  {
    id: 'api-sdk',
    title: 'API & SDK Développeurs',
    category: 'integration',
    icon: 'terminal',
    shortDesc: 'Intégration technique puissante',
    description: 'API REST documentée, SDK natifs iOS/Android, webhooks en temps réel. Pour les équipes techniques qui veulent un contrôle total.',
    features: [
      { label: 'REST API + Webhooks', icon: 'webhook' },
      { label: 'SDK Android & iOS', icon: 'smartphone' },
      { label: 'Sandbox de test', icon: 'rotateCw' }
    ],
    gradient: 'from-blue-500 to-cyan-500',
    badge: { text: 'Développeurs', variant: 'blue' },
    stats: { value: '< 15 min', label: 'Intégration' },
    cta: 'Voir la documentation',
    setupTime: '15 minutes'
  },
  {
    id: 'payment-links',
    title: 'Liens & QR Code',
    category: 'integration',
    icon: 'link',
    shortDesc: 'Paiement sans site web',
    description: 'Créez un lien ou QR code en 30 secondes. Partagez par WhatsApp, SMS, email ou réseaux sociaux. Idéal pour freelances et commerce informel.',
    features: [
      { label: 'Création instantanée', icon: 'zap' },
      { label: 'QR dynamique', icon: 'radio' },
      { label: 'Aucun code requis', icon: 'code' }
    ],
    gradient: 'from-orange-400 to-amber-500',
    badge: { text: 'Sans code', variant: 'orange' },
    stats: { value: '30s', label: 'Pour créer' },
    cta: 'Créer un lien',
    setupTime: '30 secondes'
  },
  {
    id: 'mobile-sdk',
    title: 'SDK Mobile Natif',
    category: 'integration',
    icon: 'nfc',
    shortDesc: 'Expérience in-app fluide',
    description: 'Intégrez le paiement directement dans vos applications iOS et Android. UI native, gestion offline, biométrie supportée.',
    features: [
      { label: 'iOS & Android natifs', icon: 'smartphone' },
      { label: 'Authentification biométrique', icon: 'lock' },
      { label: 'Mode offline intelligent', icon: 'clock' }
    ],
    gradient: 'from-pink-500 to-rose-500',
    badge: { text: 'Nouveau v2.0', variant: 'pink' },
    stats: { value: '99.2%', label: 'Succès' },
    cta: 'Télécharger le SDK',
    setupTime: '1 heure'
  }
];

// 💼 FONCTIONNALITÉS BUSINESS
const businessFeatures = [
  {
    id: 'recurring',
    title: 'Abonnements & Facturation',
    category: 'business',
    icon: 'repeat',
    shortDesc: 'Gérez vos clients fidèles',
    description: 'Gérez les paiements récurrents, abonnements SaaS, frais de scolarité. Dunning intelligent pour réduire le churn.',
    features: [
      { label: 'Échéanciers flexibles', icon: 'clock' },
      { label: 'Relances automatiques', icon: 'bell' },
      { label: 'Portail client', icon: 'globe' }
    ],
    gradient: 'from-rose-500 to-pink-600',
    badge: { text: 'Essenticiel', variant: 'pink' },
    stats: { value: '-38%', label: 'Churn réduit' }
  },
  {
    id: 'payouts',
    title: 'Payouts & Transferts',
    category: 'business',
    icon: 'payouts',
    shortDesc: 'Distribuez le paiement',
    description: 'Envoyez de l\'argent en masse : salaires, commissions, remboursements. Multi-destinataires, multi-wallets.',
    features: [
      { label: 'Transferts en masse', icon: 'share' },
      { label: 'Multi-devises', icon: 'globe' },
      { label: 'Settlement J+1', icon: 'clock' }
    ],
    gradient: 'from-emerald-500 to-teal-600',
    badge: { text: 'Pro', variant: 'green' },
    stats: { value: 'Instantané', label: 'Traitement' }
  },
  {
    id: 'notifications',
    title: 'Notifications Twilio',
    category: 'business',
    icon: 'bell',
    shortDesc: 'Automatisez les alertes',
    description: 'Automatisez les confirmations SMS/WhatsApp via Twilio. Reçus, alertes transaction, rappels personnalisés.',
    features: [
      { label: 'Multi-canaux', icon: 'share' },
      { label: 'Templates custom', icon: 'settings' },
      { label: 'Analytics', icon: 'chart' }
    ],
    gradient: 'from-red-500 to-rose-500',
    badge: { text: 'Engagement', variant: 'pink' },
    stats: { value: '94%', label: 'Taux ouverture' }
  },
  {
    id: 'analytics',
    title: 'Dashboard & Analytics',
    category: 'business',
    icon: 'chart',
    shortDesc: 'Analysez vos revenus',
    description: 'Suivez vos revenus en temps réel. Rapports personnalisés, export comptable, insights actionnables.',
    features: [
      { label: 'Temps réel', icon: 'zap' },
      { label: 'Export PDF/CSV', icon: 'share' },
      { label: 'Alertes custom', icon: 'bell' }
    ],
    gradient: 'from-indigo-500 to-violet-600',
    badge: { text: 'Business', variant: 'violet' },
    stats: { value: '99.99%', label: 'Précision' }
  }
];

// 🛡️ SÉCURITÉ & CONFORMITÉ
const securityFeatures = [
  { icon: 'shield', label: 'Chiffrement AES-256', desc: 'Données protégées de bout en bout' },
  { icon: 'lock', label: 'PCI DSS Level 1', desc: 'Certification bancaire internationale' },
  { icon: 'building', label: '3D Secure 2.0', desc: 'Authentification forte des paiements carte' },
  { icon: 'zap', label: 'Détection fraude IA', desc: 'Analyse comportementale en temps réel' }
];

// Styles des badges
const badgeVariants = {
  violet: 'bg-violet-100 text-violet-800 border-violet-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  pink: 'bg-rose-100 text-rose-800 border-rose-200',
  green: 'bg-emerald-100 text-emerald-800 border-emerald-200'
};

// ============================================================================
// COMPOSANTS RÉUTILISABLES
// ============================================================================

// Badge de statut
const StatusBadge = ({ status, text }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
    status === 'active' 
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
      : 'bg-amber-50 text-amber-700 border-amber-200'
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
    {text}
  </span>
);

// Card Méthode de Paiement
const PaymentProviderCard = ({ provider }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <article
      className={`group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-400 hover:shadow-xl hover:shadow-slate-900/5 hover:border-violet-300/50 ${
        isHovered ? 'z-10 scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header avec gradient et logo */}
      <div className={`relative h-20 bg-gradient-to-r ${provider.color} p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {provider.name.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">{provider.name}</h4>
            <p className="text-white/80 text-[10px]">{provider.countries[0]}</p>
          </div>
        </div>
        <StatusBadge status={provider.status} text="Actif" />
      </div>

      {/* Contenu */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">{provider.description}</p>
        
        {/* Features tags */}
        <div className="flex flex-wrap gap-1.5">
          {provider.features.map((feature, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded-md text-[10px] font-medium text-slate-600">
              {feature}
            </span>
          ))}
        </div>

        {/* Métriques */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-500">Traitement</span>
            <p className="text-sm font-semibold text-slate-900">{provider.processingTime}</p>
          </div>
          <div>
            <span className="text-xs text-slate-500">Commission</span>
            <p className="text-sm font-semibold text-slate-900">{provider.fees}</p>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-2 text-xs font-semibold text-violet-700 hover:text-violet-900 hover:bg-violet-50 rounded-lg transition-colors">
          Activer {provider.name}
        </button>
      </div>
    </article>
  );
};

// Card Solution/Feature
const SolutionCard = ({ solution }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = iconMap[solution.icon];

  return (
    <article className="group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-xl hover:shadow-slate-900/5 hover:border-violet-300/50 transition-all duration-400">
      {/* Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-sm ${badgeVariants[solution.badge.variant]}`}>
          {solution.badge.text}
        </span>
      </div>

      {/* Header avec icône et gradient */}
      <div className={`p-5 pb-3 bg-gradient-to-br ${solution.gradient} bg-opacity-5`}>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center shadow-lg mb-4`}>
          {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
          {solution.title}
        </h3>
        <p className="text-sm font-medium text-slate-500 mt-0.5">{solution.shortDesc}</p>
      </div>

      {/* Contenu */}
      <div className="px-5 pb-5 space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          {isExpanded ? solution.description : `${solution.description.slice(0, 100)}...`}
        </p>
        {solution.description.length > 100 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-violet-600 hover:text-violet-800"
          >
            {isExpanded ? 'Voir moins' : 'Voir plus'}
          </button>
        )}

        {/* Features */}
        <ul className="space-y-2">
          {solution.features.map((feature, idx) => {
            const FeatureIcon = iconMap[feature.icon];
            return (
              <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                {FeatureIcon && <FeatureIcon className="w-4 h-4 text-violet-500" />}
                <span className="font-medium">{feature.label}</span>
              </li>
            );
          })}
        </ul>

        {/* Stats & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className={`text-lg font-black bg-gradient-to-r ${solution.gradient} bg-clip-text text-transparent`}>
              {solution.stats.value}
            </span>
            <span className="text-[10px] text-slate-500 ml-1">{solution.stats.label}</span>
          </div>
          <button className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-1 group/btn">
            {solution.cta}
            <ArrowRightLeft className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
};

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
export default function Produits() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Tout voir', icon: Globe },
    { id: 'payments', label: 'Méthodes de paiement', icon: CreditCard },
    { id: 'integration', label: 'Intégration', icon: Code2 },
    { id: 'business', label: 'Fonctionnalités', icon: Building2 }
  ];

  // Filtrage
  const filteredIntegration = activeTab === 'all' || activeTab === 'integration' 
    ? integrationSolutions 
    : [];
  const filteredBusiness = activeTab === 'all' || activeTab === 'business' 
    ? businessFeatures 
    : [];
  const showPayments = activeTab === 'all' || activeTab === 'payments';

  return (
    <section 
      id="produits" 
      className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden"
      aria-labelledby="products-heading"
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
            <span className="text-xs font-semibold text-violet-800 uppercase tracking-wide">Solutions</span>
          </div>
          
          <h2 id="products-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Une plateforme de paiement{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                complète et flexible
              </span>
            </span>
          </h2>
          
          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
            Acceptez Orange Money, MTN MoMo, cartes et plus encore. Intégrez en quelques lignes de code ou utilisez nos outils no-code.
          </p>
        </div>

        {/* ========== TABS DE NAVIGATION ========== */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-14">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                  activeTab === tab.id
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-700'
                }`}
                aria-pressed={activeTab === tab.id}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========== SECTION : MÉTHODES DE PAIEMENT ========== */}
        {showPayments && (
          <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-violet-600" />
                  Méthodes de paiement supportées
                </h3>
                <p className="text-slate-500 mt-1 text-sm">6+ partenaires, 15+ pays africains, cartes internationales</p>
              </div>
              <a href="#tous-les-paiements" className="text-sm font-semibold text-violet-600 hover:text-violet-800 flex items-center gap-1">
                Voir tout <ArrowRightLeft className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {paymentProviders.map((provider) => (
                <PaymentProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </div>
        )}

        {/* ========== SECTION : SOLUTIONS D'INTÉGRATION ========== */}
        {filteredIntegration.length > 0 && (
          <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-violet-600" />
                  Solutions d'intégration
                </h3>
                <p className="text-slate-500 mt-1 text-sm">Du no-code à l'API complète, choisissez votre niveau de contrôle</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredIntegration.map((solution, index) => (
                <div key={solution.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                  <SolutionCard solution={solution} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== SECTION : FONCTIONNALITÉS BUSINESS ========== */}
        {filteredBusiness.length > 0 && (
          <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-violet-600" />
                  Fonctionnalités business
                </h3>
                <p className="text-slate-500 mt-1 text-sm">Outils pour gérer, analyser et optimiser vos revenus</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBusiness.map((feature, index) => (
                <div key={feature.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                  <SolutionCard solution={feature} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== BANDEAU SÉCURITÉ & CONFORMITÉ ========== */}
        <div className="mb-16 lg:mb-20">
          <div className="bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900 rounded-3xl p-8 lg:p-10 overflow-hidden relative">
            {/* Décoratif */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Contenu */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-white/90">Sécurité de niveau bancaire</span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight">
                  Vos transactions,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                    protégées par défaut
                  </span>
                </h3>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  Chaque paiement bénéficie de notre infrastructure sécurisée, certifiée et auditée en permanence.
                </p>

                {/* Features sécurité */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {securityFeatures.map((item, idx) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        {Icon && <Icon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
                        <div>
                          <p className="text-sm font-semibold text-white">{item.label}</p>
                          <p className="text-xs text-white/60">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Visual certification */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">Certifié PCI DSS</p>
                      <p className="text-white/70 text-sm">Level 1 • Audit trimestriel</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Chiffrement</span>
                      <span className="text-white font-semibold">AES-256</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">3D Secure</span>
                      <span className="text-white font-semibold">2.0 activé</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Détection fraude</span>
                      <span className="text-white font-semibold">IA en temps réel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== CTA FINAL ========== */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#commencer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl shadow-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span>Commencer gratuitement</span>
              <ArrowRightLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all duration-300"
            >
              <span>Voir une démo personnalisée</span>
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            ✓ Aucune carte requise • ✓ Support 24/7 • ✓ Migration assistée gratuite
          </p>
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