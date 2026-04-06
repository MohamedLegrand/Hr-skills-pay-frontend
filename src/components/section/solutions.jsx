// Solutions.jsx
import React, { memo, useState } from 'react';
import { 
  Code2, CreditCard, Link2, ShieldCheck, ArrowRight, 
  Check, Building2, GraduationCap, ShoppingCart, Terminal
} from 'lucide-react';

// ============================================================================
// 📦 DONNÉES PAR TYPE DE CLIENT
// ============================================================================

const PAYMENT_PROVIDERS = [
  {
    id: 'orange-money',
    name: 'Orange Money',
    region: 'Afrique Francophone',
    processingTime: 'Instantané',
    fee: '2.5%',
    image: '/images/orange.jpg',
    placeholder: 'https://placehold.co/320x120/ff7900/ffffff?text=Orange+Money',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    id: 'mtn-momo',
    name: 'MTN Mobile Money',
    region: 'Afrique Subsaharienne',
    processingTime: '< 3s',
    fee: '2.5%',
    image: '/images/momo.jpg',
    placeholder: 'https://placehold.co/320x120/fbbf24/1e293b?text=MTN+MoMo',
    gradient: 'from-yellow-400 to-amber-500'
  }
];

const SOLUTIONS_BY_PERSONA = [
  {
    id: 'developers',
    icon: Code2,
    emoji: '👨‍💻',
    title: 'Pour les développeurs',
    subtitle: 'Intégrez rapidement avec nos outils techniques',
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      { label: 'API REST documentée', desc: 'Endpoints clairs avec exemples de code' },
      { label: 'Webhooks temps réel', desc: 'Notifications instantanées sur vos événements' },
      { label: 'SDKs & Sandbox', desc: 'Testez sans risque avant la production' },
      { label: 'Documentation OpenAPI', desc: 'Génération automatique de clients' }
    ],
    cta: 'Voir la documentation',
    ctaLink: '/docs/api'
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    emoji: '🛒',
    title: 'Pour les e-commerçants',
    subtitle: 'Encaissez en ligne sans friction',
    gradient: 'from-violet-500 to-indigo-600',
    features: [
      { label: 'Checkout optimisé', desc: 'Conversion mobile-first avec abandon réduit' },
      { label: 'Mobile Money intégré', desc: 'Orange Money & MTN MoMo natifs' },
      { label: 'Gestion des commandes', desc: 'Synchronisation automatique des statuts' },
      { label: 'Plugins WooCommerce', desc: 'Installation en 1 clic' }
    ],
    cta: 'Configurer ma boutique',
    ctaLink: '/onboarding/ecommerce'
  },
  {
    id: 'creators',
    icon: GraduationCap,
    emoji: '🎓',
    title: 'Pour formateurs & créateurs',
    subtitle: 'Vendez vos contenus simplement',
    gradient: 'from-pink-500 to-rose-500',
    features: [
      { label: 'Liens de paiement', desc: 'Créez un lien en 30 secondes, partagez partout' },
      { label: 'Abonnements', desc: 'Revenus récurrents avec gestion du churn' },
      { label: 'Vente de formations', desc: 'Accès automatique après paiement' },
      { label: 'QR Codes dynamiques', desc: 'Paiement en présentiel simplifié' }
    ],
    cta: 'Créer mon premier lien',
    ctaLink: '/payment-links'
  },
  {
    id: 'business',
    icon: Building2,
    emoji: '🏢',
    title: 'Pour les entreprises',
    subtitle: 'Pilotez vos finances en toute sérénité',
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      { label: 'Facturation pro', desc: 'Générez et suivez vos factures automatiquement' },
      { label: 'Paiements récurrents', desc: 'Abonnements clients avec relances intelligentes' },
      { label: 'Dashboard analytics', desc: 'Vision temps réel de votre trésorerie' },
      { label: 'Exports comptables', desc: 'Compatibilité avec vos outils de gestion' }
    ],
    cta: 'Demander une démo',
    ctaLink: '/demo'
  }
];

const SECURITY_PILLARS = [
  { icon: ShieldCheck, label: 'PCI DSS Level 1', desc: 'Certification bancaire' },
  { icon: ShieldCheck, label: 'Chiffrement AES-256', desc: 'Protection end-to-end' },
  { icon: CreditCard, label: '3D Secure 2.0', desc: 'Authentification forte' },
  { icon: Code2, label: 'Détection fraude IA', desc: 'Analyse en temps réel' }
];

// ============================================================================
// 🧩 COMPOSANTS RÉUTILISABLES
// ============================================================================

const StatusBadge = memo(() => (
  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    Actif
  </span>
));
StatusBadge.displayName = 'StatusBadge';

const PaymentProviderCard = memo(({ provider }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <article className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-violet-300/50 transition-all duration-300">
      {/* Header */}
      <div className={`h-14 bg-gradient-to-r ${provider.gradient} px-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center">
            <img
              src={error ? provider.placeholder : provider.image}
              alt={provider.name}
              className={`max-h-5 w-auto object-contain transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => { setError(true); setLoaded(true); }}
            />
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs">{provider.name}</h4>
            <p className="text-white/80 text-[10px]">{provider.region}</p>
          </div>
        </div>
        <StatusBadge />
      </div>

      {/* Content */}
      <div className="p-3.5">
        <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400">Traitement</span>
            <p className="text-sm font-semibold text-slate-900">{provider.processingTime}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400">Commission</span>
            <p className="text-sm font-semibold text-slate-900">{provider.fee}</p>
          </div>
        </div>
        <button 
          className="w-full py-1.5 text-[10px] font-medium text-violet-700 hover:text-violet-900 hover:bg-violet-50 rounded transition-colors flex items-center justify-center gap-1"
          aria-label={`Activer ${provider.name}`}
        >
          Activer
          <ArrowRight className="w-2.5 h-2.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
});
PaymentProviderCard.displayName = 'PaymentProviderCard';

const PersonaCard = memo(({ persona }) => {
  const Icon = persona.icon;
  
  return (
    <article className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg hover:border-violet-300/50 transition-all duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${persona.gradient} flex items-center justify-center flex-shrink-0`}>
          <span className="text-lg mr-0.5" aria-hidden="true">{persona.emoji}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{persona.title}</h3>
          <p className="text-[10px] text-slate-500">{persona.subtitle}</p>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-4 flex-grow">
        {persona.features.map((feature, idx) => (
          <li key={idx} className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-xs font-medium text-slate-700">{feature.label}</span>
            </div>
            <span className="text-[10px] text-slate-400 ml-5.5">{feature.desc}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a 
        href={persona.ctaLink}
        className={`inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-white rounded-lg bg-gradient-to-r ${persona.gradient} hover:opacity-90 transition-opacity`}
      >
        {persona.cta}
        <ArrowRight className="w-3 h-3" aria-hidden="true" />
      </a>
    </article>
  );
});
PersonaCard.displayName = 'PersonaCard';

// ============================================================================
// 🎯 COMPOSANT PRINCIPAL
// ============================================================================
export default function Solutions() {
  return (
    <section 
      id="solutions" 
      className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/30 to-white"
      aria-labelledby="solutions-heading"
    >
      {/* Background subtil */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-violet-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* HEADER */}
        <header className="text-center mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-violet-100/70 border border-violet-200 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-medium text-violet-800">Solutions</span>
          </div>
          
          <h1 id="solutions-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Des solutions adaptées{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              à votre profil
            </span>
          </h1>
          
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Que vous soyez développeur, e-commerçant ou entreprise, trouvez l'outil parfait pour encaisser.
          </p>
        </header>

        {/* MÉTHODES DE PAIEMENT */}
        <section aria-labelledby="payments-heading" className="mb-14 lg:mb-16">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-violet-600" aria-hidden="true" />
              <h2 id="payments-heading" className="text-lg font-semibold text-slate-900">
                Méthodes de paiement
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
            {PAYMENT_PROVIDERS.map((provider) => (
              <PaymentProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </section>

        {/* SOLUTIONS PAR PERSONA */}
        <section aria-labelledby="personas-heading" className="mb-14 lg:mb-16">
          <h2 id="personas-heading" className="sr-only">Solutions par type de client</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
            {SOLUTIONS_BY_PERSONA.map((persona) => (
              <PersonaCard key={persona.id} persona={persona} />
            ))}
          </div>
        </section>

        {/* SÉCURITÉ */}
        <section aria-labelledby="security-heading" className="mb-14 lg:mb-16">
          <div className="bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <span className="text-xs font-medium text-white/90">Sécurité enterprise</span>
            </div>
            
            <h2 id="security-heading" className="text-lg font-bold text-white mb-1">
              Transactions protégées
            </h2>
            <p className="text-sm text-white/70 mb-4">Infrastructure certifiée et auditée</p>

            <div className="grid grid-cols-2 gap-3">
              {SECURITY_PILLARS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-2">
                    {Icon && <Icon className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />}
                    <div>
                      <p className="text-xs font-medium text-white">{item.label}</p>
                      <p className="text-[10px] text-white/60">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              Commencer gratuitement
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-medium text-sm border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all duration-200"
            >
              Voir la démo
            </a>
          </div>
          
          <p className="mt-5 text-xs text-slate-500 flex items-center justify-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" /> PCI DSS
            </span>
            <span className="inline-flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-violet-500" aria-hidden="true" /> Sans carte
            </span>
            <span className="inline-flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" /> API docs
            </span>
          </p>
        </section>

      </div>
    </section>
  );
}