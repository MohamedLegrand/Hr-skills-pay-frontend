// Produits.jsx
import React, { useMemo, useCallback, memo, useState } from 'react';
import { CreditCard, Code2, ShieldCheck, ArrowRight, Link2, Check } from 'lucide-react';

// ============================================================================
// 📦 DONNÉES CENTRALISÉES
// ============================================================================

const PAYMENT_PROVIDERS = [ 
  {
    id: 'orange-money',
    name: 'Orange Money',
    region: 'Afrique Francophone • 8 pays',
    processingTime: 'Instantané',
    fee: '2.5%',
    features: ['USSD & App mobile', 'API documentée', 'Webhooks temps réel'],
    image: '/images/orange.jpg',
    placeholder: 'https://placehold.co/320x120/ff7900/ffffff?text=Orange+Money',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    id: 'mtn-momo',
    name: 'MTN Mobile Money',
    region: 'Afrique Subsaharienne • 12 pays',
    processingTime: '< 3s',
    fee: '2.5%',
    features: ['Bulk payments', 'Reconciliation auto', 'Multi-pays'],
    image: '/images/momo.jpg',
    placeholder: 'https://placehold.co/320x120/fbbf24/1e293b?text=MTN+MoMo',
    gradient: 'from-yellow-400 to-amber-500'
  }
];

const INTEGRATION_SOLUTIONS = [
  {
    id: 'api-developers',
    title: 'API Développeurs',
    icon: Code2,
    description: 'API REST complète avec webhooks et sandbox de test.',
    features: ['OpenAPI docs', 'SDKs 5 langages', 'Webhooks temps réel'],
    timeToLive: '15 min',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'payment-links',
    title: 'Liens de Paiement',
    icon: Link2,
    description: 'Créez et partagez un lien de paiement en 30 secondes.',
    features: ['QR dynamique', 'Suivi temps réel', 'Aucun code'],
    timeToLive: '30 sec',
    gradient: 'from-orange-400 to-amber-500'
  }
];

const SECURITY_PILLARS = [
  { icon: ShieldCheck, label: 'PCI DSS Level 1', desc: 'Certification bancaire' },
  { icon: Code2, label: 'Chiffrement AES-256', desc: 'Protection end-to-end' },
  { icon: ShieldCheck, label: '3D Secure 2.0', desc: 'Authentification forte' },
  { icon: Code2, label: 'Détection fraude IA', desc: 'Analyse en temps réel' }
];

// ============================================================================
// 🧩 COMPOSANTS RÉUTILISABLES
// ============================================================================

const StatusBadge = memo(() => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    Actif
  </span>
));
StatusBadge.displayName = 'StatusBadge';

const PaymentProviderCard = memo(({ provider, onActivate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article 
      className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden 
                 hover:shadow-lg hover:border-violet-300/50 transition-all duration-300 
                 flex flex-col"
      role="listitem"
    >
      {/* Header avec image */}
      <div className={`relative h-16 bg-gradient-to-r ${provider.gradient} p-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <img
              src={imageError ? provider.placeholder : provider.image}
              alt={provider.name}
              className={`max-h-6 w-auto object-contain transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => { setImageError(true); setImageLoaded(true); }}
            />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm">{provider.name}</h4>
            <p className="text-white/80 text-[10px]">{provider.region}</p>
          </div>
        </div>
        <StatusBadge />
      </div>

      {/* Contenu compact */}
      <div className="p-4 flex-grow flex flex-col">
        <ul className="space-y-1.5 mb-4">
          {provider.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-2 py-2 border-t border-slate-100 mb-3">
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
          onClick={() => onActivate?.(provider.id)}
          className="w-full py-2 text-xs font-medium text-violet-700 hover:text-violet-900 
                     hover:bg-violet-50 rounded-lg transition-colors text-left flex items-center gap-1"
          aria-label={`Activer ${provider.name}`}
        >
          Activer
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
});
PaymentProviderCard.displayName = 'PaymentProviderCard';

const SolutionCard = memo(({ solution, onExplore }) => {
  const Icon = solution.icon;
  
  return (
    <article 
      className="group relative bg-white rounded-xl border border-slate-200 p-4 
                 hover:shadow-lg hover:border-violet-300/50 transition-all duration-300 
                 flex flex-col"
      role="listitem"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${solution.gradient} 
                        flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-4 h-4 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{solution.title}</h3>
          <span className={`text-[10px] font-medium bg-gradient-to-r ${solution.gradient} 
                          bg-clip-text text-transparent`}>
            {solution.timeToLive}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="text-xs text-slate-600 leading-relaxed mb-3">{solution.description}</p>
      
      <ul className="space-y-1 mb-4 flex-grow">
        {solution.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <span className="w-1 h-1 rounded-full bg-violet-400" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <button 
        onClick={() => onExplore?.(solution.id)}
        className="text-xs font-medium text-violet-600 hover:text-violet-800 
                   flex items-center gap-1 self-start"
        aria-label={`En savoir plus sur ${solution.title}`}
      >
        Explorer
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </article>
  );
});
SolutionCard.displayName = 'SolutionCard';

// ============================================================================
// 🎯 COMPOSANT PRINCIPAL
// ============================================================================
export default function Produits() {
  const providers = useMemo(() => PAYMENT_PROVIDERS, []);
  const solutions = useMemo(() => INTEGRATION_SOLUTIONS, []);

  const handleActivate = useCallback((id) => {
    console.log('Activate:', id);
    // window.location.href = `/onboarding?provider=${id}`;
  }, []);

  const handleExplore = useCallback((id) => {
    console.log('Explore:', id);
    // Scroll vers docs ou modal
  }, []);

  return (
    <section 
      id="produits" 
      className="relative py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/30 to-white"
      aria-labelledby="products-heading"
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
          
          <h1 id="products-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Paiements simples,{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              intégration flexible
            </span>
          </h1>
          
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Orange Money, MTN MoMo et outils développeurs pour encaisser partout en Afrique.
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
            <span className="text-xs text-slate-500">2 partenaires</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
            {providers.map((provider) => (
              <PaymentProviderCard 
                key={provider.id} 
                provider={provider} 
                onActivate={handleActivate}
              />
            ))}
          </div>
        </section>

        {/* SOLUTIONS D'INTÉGRATION */}
        <section aria-labelledby="integration-heading" className="mb-14 lg:mb-16">
          <div className="flex items-center gap-2.5 mb-5">
            <Code2 className="w-5 h-5 text-violet-600" aria-hidden="true" />
            <h2 id="integration-heading" className="text-lg font-semibold text-slate-900">
              Intégration
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
            {solutions.map((solution) => (
              <SolutionCard 
                key={solution.id} 
                solution={solution}
                onExplore={handleExplore}
              />
            ))}
          </div>
        </section>

        {/* SÉCURITÉ */}
        <section aria-labelledby="security-heading" className="mb-14 lg:mb-16">
          <div className="bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-900 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <span className="text-xs font-medium text-white/90">Sécurité enterprise</span>
            </div>
            
            <h2 id="security-heading" className="text-lg lg:text-xl font-bold text-white mb-1">
              Transactions protégées
            </h2>
            <p className="text-sm text-white/70 mb-5">Infrastructure certifiée et auditée</p>

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