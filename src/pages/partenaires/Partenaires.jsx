import React from 'react';
import { 
  Globe, Shield, Zap, Users, ArrowRight, ExternalLink,
  CheckCircle, Star, TrendingUp, MessageSquare
} from 'lucide-react';

const Partenaires = () => {
  
  // Partenaires officiels avec logos et détails
  const partners = [
    { 
      id: 'orange-money',
      name: 'Orange Money', 
      logo: '📱',
      color: 'from-orange-500 to-amber-500',
      description: 'Leader du mobile money en Afrique francophone. Plus de 50 millions d\'utilisateurs actifs.',
      category: 'Mobile Money',
      countries: ['Cameroun', 'Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina'],
      since: '2022',
      link: 'https://orangemoney.com'
    },
    {
      id: 'mtn-momo',
      name: 'MTN Mobile Money',
      logo: '📲',
      color: 'from-yellow-400 to-amber-500',
      description: 'Solution de paiement mobile la plus répandue en Afrique subsaharienne.',
      category: 'Mobile Money',
      countries: ['Cameroun', 'Ghana', 'Ouganda', 'Rwanda', 'Zambie'],
      since: '2022',
      link: 'https://momo.mtn.com'
    },
    {
      id: 'maviance',
      name: 'Maviance',
      logo: '🌍',
      color: 'from-blue-600 to-indigo-600',
      description: 'Agrégateur de paiement local avec expertise terrain en Afrique Centrale.',
      category: 'Agrégateur',
      countries: ['Cameroun', 'Gabon', 'RDC', 'Tchad'],
      since: '2023',
      link: 'https://maviance.com'
    },
    {
      id: 'afrique-pay',
      name: 'Afrique Pay',
      logo: '🌐',
      color: 'from-emerald-500 to-teal-500',
      description: 'Solution panafricaine de paiement digital avec couverture dans 15+ pays.',
      category: 'Agrégateur',
      countries: ['15+ pays africains'],
      since: '2023',
      link: 'https://afriquepay.com'
    },
    {
      id: 'twilio',
      name: 'Twilio',
      logo: '✉️',
      color: 'from-red-500 to-rose-500',
      description: 'Plateforme de communication cloud pour SMS, WhatsApp et notifications automatisées.',
      category: 'Communication',
      countries: ['Monde entier'],
      since: '2024',
      link: 'https://twilio.com'
    }
  ];

  // Catégories de partenaires pour filtrage
  const categories = [
    { id: 'all', label: 'Tous', count: partners.length },
    { id: 'mobile-money', label: 'Mobile Money', count: partners.filter(p => p.category === 'Mobile Money').length },
    { id: 'aggregator', label: 'Agrégateurs', count: partners.filter(p => p.category === 'Agrégateur').length },
    { id: 'communication', label: 'Communication', count: partners.filter(p => p.category === 'Communication').length }
  ];

  // Avantages du partenariat
  const benefits = [
    {
      icon: Shield,
      title: 'Sécurité garantie',
      desc: 'Tous nos partenaires sont certifiés et audités régulièrement pour garantir la sécurité de vos transactions.'
    },
    {
      icon: Zap,
      title: 'Performance optimale',
      desc: 'Intégrations optimisées pour des temps de réponse < 2 secondes et une disponibilité de 99.9%.'
    },
    {
      icon: Globe,
      title: 'Couverture étendue',
      desc: 'Accédez à plus de 15 pays africains et des millions d\'utilisateurs via notre réseau de partenaires.'
    },
    {
      icon: Users,
      title: 'Support unifié',
      desc: 'Un seul point de contact pour tous vos partenaires. Notre équipe gère la coordination pour vous.'
    }
  ];

  // Stats du réseau
  const stats = [
    { value: '5+', label: 'Partenaires officiels', icon: Star },
    { value: '15+', label: 'Pays couverts', icon: Globe },
    { value: '50M+', label: 'Utilisateurs atteints', icon: Users },
    { value: '99.9%', label: 'Disponibilité réseau', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-violet-50/30 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* ========== EN-TÊTE ========== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full mb-4">
            <Globe className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-semibold text-violet-700">Nos Partenaires</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Un écosystème{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              puissant et fiable
            </span>
          </h1>
          
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Nous collaborons avec les leaders du paiement et de la communication en Afrique 
            pour vous offrir une expérience fluide, sécurisée et sans frontières.
          </p>
        </div>

        {/* ========== STATS ========== */}
        <section className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl border border-violet-200 p-5 text-center hover:border-violet-400 transition-all">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-100 mb-3">
                    <Icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== FILTRES CATÉGORIES ========== */}
        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  cat.id === 'all'
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white text-slate-600 border border-violet-200 hover:border-violet-400 hover:text-violet-700'
                }`}
              >
                {cat.label} <span className="text-xs opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>
        </section>

        {/* ========== LISTE DES PARTENAIRES ========== */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="group bg-white rounded-2xl border border-violet-200 overflow-hidden hover:border-violet-400 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
              >
                {/* Header avec gradient */}
                <div className={`h-2 bg-gradient-to-r ${partner.color}`} />
                
                <div className="p-6">
                  {/* Logo + Nom */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${partner.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl">{partner.logo}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-slate-500">{partner.category} • Depuis {partner.since}</p>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {partner.description}
                  </p>
                  
                  {/* Pays couverts */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {partner.countries.slice(0, 3).map((country, idx) => (
                      <span key={idx} className="px-2 py-1 bg-violet-50 text-violet-700 rounded-lg text-xs font-medium">
                        {country}
                      </span>
                    ))}
                    {partner.countries.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs">
                        +{partner.countries.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Lien + Badge vérifié */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <a 
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-800 transition-colors"
                    >
                      Voir le partenaire
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Vérifié
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========== AVANTAGES DU RÉSEAU ========== */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Pourquoi travailler avec notre réseau ?
            </h2>
            <p className="text-slate-600">Des avantages concrets pour votre activité</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="p-5 bg-white rounded-2xl border border-violet-200 hover:border-violet-400 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-slate-600">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== CTA DEVENIR PARTENAIRE ========== */}
        <section>
          <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            
            {/* Décoratif */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Contenu */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-white/90">Partenariats stratégiques</span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight">
                  Vous souhaitez devenir partenaire ?
                </h2>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  Nous sommes toujours à la recherche de nouveaux partenaires innovants 
                  pour enrichir notre écosystème et offrir encore plus de valeur à nos clients.
                </p>

                {/* Critères */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm">Expertise dans le paiement ou la communication</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm">Présence en Afrique francophone</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm">Engagement sur la sécurité et la conformité</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <a
                  href="/contact?subject=partenariat"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-violet-900 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span>Nous contacter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/docs/partners"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  <span>Documentation partenaires</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer de confiance */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Tous nos partenaires sont soumis à un processus de validation rigoureux 
            et à des audits de sécurité réguliers.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Partenaires;