import React, { useState } from 'react';
import { 
  CreditCard, Link2, Lock, Settings, Bell, RotateCw, 
  Zap, Share2, Code2, Smartphone, Globe, Building2, 
  ShieldCheck, BarChart3, Webhook, Terminal, ArrowRight,
  Users, RefreshCw, SplitSquareHorizontal, FileText
} from 'lucide-react';

// ============================================================================
// CONFIGURATION & DONNÉES RÉELLES
// ============================================================================

// Mapping des icônes Lucide
const iconMap = {
  creditCard: CreditCard, link: Link2, lock: Lock, settings: Settings,
  bell: Bell, rotateCw: RotateCw, zap: Zap, share: Share2,
  code: Code2, smartphone: Smartphone, globe: Globe, building: Building2,
  shield: ShieldCheck, chart: BarChart3, webhook: Webhook, 
  terminal: Terminal, users: Users, refresh: RefreshCw, 
  split: SplitSquareHorizontal, file: FileText, arrow: ArrowRight
};

// 💳 MÉTHODES DE PAIEMENT SUPPORTÉES (Partenaires réels)
const paymentMethods = [
  {
    id: 'orange-money',
    name: 'Orange Money',
    description: 'Paiement mobile leader en Afrique francophone',
    countries: ['Cameroun', 'Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso'],
    type: 'mobile-money',
    color: 'from-orange-500 to-amber-500',
    logo: '/logos/orange-money.svg',
    processingTime: 'Instantané',
    fees: '2.5%',
    status: 'active'
  },
  {
    id: 'mtn-momo',
    name: 'MTN Mobile Money',
    description: 'Solution mobile money la plus répandue en Afrique',
    countries: ['Cameroun', 'Ghana', 'Ouganda', 'Rwanda', 'Zambie'],
    type: 'mobile-money',
    color: 'from-yellow-400 to-amber-500',
    logo: '/logos/mtn-momo.svg',
    processingTime: '< 3s',
    fees: '2.5%',
    status: 'active'
  },
  {
    id: 'maviance',
    name: 'Maviance',
    description: 'Agrégateur local avec expertise terrain Afrique Centrale',
    countries: ['Cameroun', 'Gabon', 'RDC', 'Tchad'],
    type: 'aggregator',
    color: 'from-blue-600 to-indigo-600',
    logo: '/logos/maviance.svg',
    processingTime: '1-2 min',
    fees: 'Sur devis',
    status: 'active'
  },
  {
    id: 'afrique-pay',
    name: 'Afrique Pay',
    description: 'Solution panafricaine de paiement digital',
    countries: ['15+ pays africains'],
    type: 'aggregator',
    color: 'from-emerald-500 to-teal-500',
    logo: '/logos/afrique-pay.svg',
    processingTime: 'Instantané',
    fees: '2.9%',
    status: 'active'
  },
  {
    id: 'carveto',
    name: 'Carveto',
    description: 'Paiements sécurisés pour e-commerce africain',
    countries: ['Cameroun', 'Afrique Centrale'],
    type: 'aggregator',
    color: 'from-violet-600 to-purple-600',
    logo: '/logos/carveto.svg',
    processingTime: '< 5s',
    fees: '3.2%',
    status: 'active'
  },
  {
    id: 'cards',
    name: 'Cartes Bancaires',
    description: 'Visa, Mastercard, UnionPay via processeurs internationaux',
    countries: ['Monde entier'],
    type: 'card',
    color: 'from-slate-600 to-slate-800',
    logo: '/logos/cards.svg',
    processingTime: '2-5s',
    fees: '3.4% + fixe',
    status: 'active'
  }
];

// 🔧 MÉTHODES D'INTÉGRATION (Solutions techniques réelles)
const integrationMethods = [
  {
    id: 'hosted-checkout',
    title: 'Checkout Hébergé',
    icon: 'creditCard',
    description: 'Page de paiement sécurisée et personnalisable, prête à l\'emploi. Aucune compétence technique requise.',
    features: [
      { label: 'Personnalisation marque', icon: 'settings' },
      { label: 'Tous wallets supportés', icon: 'globe' },
      { label: 'Conforme PCI DSS', icon: 'shield' }
    ],
    gradient: 'from-violet-500 to-indigo-600',
    badge: 'Recommandé',
    setupTime: '5 minutes',
    bestFor: 'E-commerce, débutants',
    documentation: '/docs/checkout'
  },
  {
    id: 'rest-api',
    title: 'API REST',
    icon: 'terminal',
    description: 'API documentée avec endpoints pour créer des paiements, vérifier les statuts et gérer les webhooks.',
    features: [
      { label: 'Endpoints RESTful', icon: 'code' },
      { label: 'Webhooks temps réel', icon: 'webhook' },
      { label: 'Sandbox de test', icon: 'rotateCw' }
    ],
    gradient: 'from-blue-500 to-cyan-500',
    badge: 'Développeurs',
    setupTime: '30 minutes',
    bestFor: 'Applications custom, équipes tech',
    documentation: '/docs/api'
  },
  {
    id: 'mobile-sdk',
    title: 'SDK Mobile',
    icon: 'smartphone',
    description: 'SDK natifs iOS et Android pour une expérience de paiement fluide directement dans vos applications.',
    features: [
      { label: 'iOS & Android natifs', icon: 'smartphone' },
      { label: 'Authentification biométrique', icon: 'lock' },
      { label: 'Mode offline intelligent', icon: 'refresh' }
    ],
    gradient: 'from-pink-500 to-rose-500',
    badge: 'Nouveau v2.0',
    setupTime: '1 heure',
    bestFor: 'Apps mobiles natives',
    documentation: '/docs/sdk-mobile'
  },
  {
    id: 'payment-links',
    title: 'Liens de Paiement',
    icon: 'link',
    description: 'Créez et partagez des liens de paiement par WhatsApp, SMS ou email. Aucun site web requis.',
    features: [
      { label: 'Création instantanée', icon: 'zap' },
      { label: 'QR Code dynamique', icon: 'share' },
      { label: 'Suivi des conversions', icon: 'chart' }
    ],
    gradient: 'from-orange-400 to-amber-500',
    badge: 'Sans code',
    setupTime: '30 secondes',
    bestFor: 'Freelances, commerce social',
    documentation: '/docs/payment-links'
  },
  {
    id: 'plugins',
    title: 'Plugins E-commerce',
    icon: 'building',
    description: 'Plugins officiels pour WooCommerce, Shopify, PrestaShop. Installation en 1 clic.',
    features: [
      { label: 'WooCommerce compatible', icon: 'building' },
      { label: 'Shopify App Store', icon: 'building' },
      { label: 'Mise à jour auto', icon: 'refresh' }
    ],
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'Populaire',
    setupTime: '10 minutes',
    bestFor: 'Boutiques en ligne',
    documentation: '/docs/plugins'
  }
];

// 💼 FONCTIONNALITÉS BUSINESS (Vraies features d'agrégateur)
const businessFeatures = [
  {
    id: 'recurring-payments',
    title: 'Paiements Récurrents',
    icon: 'refresh',
    description: 'Gérez les abonnements et factures récurrentes avec dunning intelligent pour réduire les échecs de paiement.',
    features: ['Échéanciers flexibles', 'Relances automatiques', 'Portail client self-service'],
    gradient: 'from-rose-500 to-pink-600',
    metrics: { label: 'Churn réduit', value: '-38%' }
  },
  {
    id: 'payouts',
    title: 'Payouts & Transferts',
    icon: 'users',
    description: 'Envoyez de l\'argent en masse vers mobile money ou comptes bancaires : salaires, commissions, remboursements.',
    features: ['Transferts en masse', 'Multi-devises', 'Settlement J+1'],
    gradient: 'from-emerald-500 to-teal-600',
    metrics: { label: 'Traitement', value: 'Instantané' }
  },
  {
    id: 'split-payments',
    title: 'Split Payments',
    icon: 'split',
    description: 'Divisez automatiquement les paiements entre plusieurs destinataires. Idéal pour marketplaces et affiliés.',
    features: ['Commission auto', 'Escrow intégré', 'Reporting par vendeur'],
    gradient: 'from-indigo-500 to-violet-600',
    metrics: { label: 'Précision', value: '99.99%' }
  },
  {
    id: 'notifications',
    title: 'Notifications Twilio',
    icon: 'bell',
    description: 'Automatisez les confirmations SMS/WhatsApp via Twilio. Reçus, alertes transaction, rappels personnalisés.',
    features: ['Multi-canaux', 'Templates personnalisés', 'Analytics engagement'],
    gradient: 'from-red-500 to-rose-500',
    metrics: { label: 'Ouverture', value: '94%' }
  },
  {
    id: 'dashboard',
    title: 'Dashboard Analytics',
    icon: 'chart',
    description: 'Suivez vos revenus en temps réel. Rapports exportables, alertes personnalisées, insights actionnables.',
    features: ['Temps réel', 'Export CSV/PDF', 'Alertes personnalisées'],
    gradient: 'from-slate-600 to-slate-800',
    metrics: { label: 'Précision', value: '99.99%' }
  },
  {
    id: 'invoicing',
    title: 'Facturation Pro',
    icon: 'file',
    description: 'Créez et envoyez des factures professionnelles avec lien de paiement intégré. Suivi des impayés automatique.',
    features: ['Templates personnalisables', 'Relances auto', 'Archivage légal'],
    gradient: 'from-blue-600 to-indigo-700',
    metrics: { label: 'Recouvrement', value: '+55%' }
  }
];

// 🛡️ SÉCURITÉ & CONFORMITÉ (Éléments réels)
const securityFeatures = [
  { icon: 'shield', label: 'PCI DSS Level 1', desc: 'Certification bancaire internationale' },
  { icon: 'lock', label: 'Chiffrement AES-256', desc: 'Données protégées de bout en bout' },
  { icon: 'creditCard', label: '3D Secure 2.0', desc: 'Authentification forte des paiements carte' },
  { icon: 'zap', label: 'Détection fraude IA', desc: 'Analyse comportementale en temps réel' }
];

// Styles des badges
const badgeVariants = {
  violet: 'bg-violet-100 text-violet-800 border border-violet-200',
  blue: 'bg-blue-100 text-blue-800 border border-blue-200',
  orange: 'bg-orange-100 text-orange-800 border border-orange-200',
  pink: 'bg-rose-100 text-rose-800 border border-rose-200',
  green: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  slate: 'bg-slate-100 text-slate-800 border border-slate-200'
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
const PaymentMethodCard = ({ method }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <article
      className={`group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-400 hover:shadow-xl hover:shadow-slate-900/5 hover:border-violet-300/50 ${
        isHovered ? 'z-10 scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header avec gradient */}
      <div className={`relative h-16 bg-gradient-to-r ${method.color} p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-bold text-xs">
              {method.name.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">{method.name}</h4>
            <p className="text-white/80 text-[10px]">{method.countries[0]}</p>
          </div>
        </div>
        <StatusBadge status={method.status} text="Actif" />
      </div>

      {/* Contenu */}
      <div className="p-4 space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">{method.description}</p>
        
        {/* Tags pays */}
        <div className="flex flex-wrap gap-1">
          {method.countries.slice(0, 3).map((country, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600">
              {country}
            </span>
          ))}
          {method.countries.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-500">
              +{method.countries.length - 3}
            </span>
          )}
        </div>

        {/* Métriques */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Traitement</span>
            <p className="text-sm font-semibold text-slate-900">{method.processingTime}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Commission</span>
            <p className="text-sm font-semibold text-slate-900">{method.fees}</p>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-2 text-xs font-semibold text-violet-700 hover:text-violet-900 hover:bg-violet-50 rounded-lg transition-colors flex items-center justify-center gap-1">
          Activer {method.name}
          <ArrowRight className="w-3 h-3" />
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
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${badgeVariants[solution.gradient?.includes('violet') ? 'violet' : solution.gradient?.includes('blue') ? 'blue' : solution.gradient?.includes('orange') ? 'orange' : solution.gradient?.includes('pink') ? 'pink' : solution.gradient?.includes('emerald') ? 'green' : 'slate']}`}>
          {solution.badge}
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
      </div>

      {/* Contenu */}
      <div className="px-5 pb-5 space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          {isExpanded ? solution.description : `${solution.description.slice(0, 100)}...`}
        </p>
        {solution.description?.length > 100 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-violet-600 hover:text-violet-800"
          >
            {isExpanded ? 'Voir moins' : 'Voir plus'}
          </button>
        )}

        {/* Features */}
        {solution.features && (
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
        )}

        {/* Stats & CTA */}
        <div className="pt-3 border-t border-slate-100">
          {solution.metrics && (
            <div className="mb-3">
              <span className={`text-lg font-black bg-gradient-to-r ${solution.gradient} bg-clip-text text-transparent`}>
                {solution.metrics.value}
              </span>
              <span className="text-[10px] text-slate-500 ml-1">{solution.metrics.label}</span>
            </div>
          )}
          
          {solution.bestFor && (
            <p className="text-[10px] text-slate-500 mb-3">
              Idéal pour : <span className="font-medium text-slate-700">{solution.bestFor}</span>
            </p>
          )}
          
          <a 
            href={solution.documentation || '#'}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-700 hover:text-violet-900 transition-colors group/link"
          >
            <span>{solution.setupTime ? `Setup : ${solution.setupTime}` : 'En savoir plus'}</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  );
};

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
function Solutions() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'Tout voir' },
    { id: 'payments', label: 'Méthodes de paiement' },
    { id: 'integration', label: 'Intégration' },
    { id: 'features', label: 'Fonctionnalités' }
  ];

  // Filtrage
  const showPayments = activeTab === 'all' || activeTab === 'payments';
  const showIntegration = activeTab === 'all' || activeTab === 'integration';
  const showFeatures = activeTab === 'all' || activeTab === 'features';

  return (
    <section 
      id="solutions" 
      className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden"
      aria-labelledby="solutions-heading"
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
          
          <h2 id="solutions-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-700'
              }`}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {paymentMethods.map((method) => (
                <PaymentMethodCard key={method.id} method={method} />
              ))}
            </div>
          </div>
        )}

        {/* ========== SECTION : MÉTHODES D'INTÉGRATION ========== */}
        {showIntegration && (
          <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-violet-600" />
                  Méthodes d'intégration
                </h3>
                <p className="text-slate-500 mt-1 text-sm">Du no-code à l'API complète, choisissez votre niveau de contrôle</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {integrationMethods.map((solution, index) => (
                <div key={solution.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 80}ms` }}>
                  <SolutionCard solution={solution} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== SECTION : FONCTIONNALITÉS BUSINESS ========== */}
        {showFeatures && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessFeatures.map((feature, index) => (
                <div key={feature.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 80}ms` }}>
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
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

export default Solutions;