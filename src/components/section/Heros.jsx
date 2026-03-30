import React, { useState, useEffect, useCallback } from 'react';

// ============================================================================
// DONNÉES - Séparées pour une meilleure maintenance
// ============================================================================
const slides = [
  {
    id: 1,
    title: "Orange Money",
    subtitle: "Paiements mobiles instantanés",
    description: "Intégrez Orange Money en moins de 5 minutes. Vos clients finalisent leurs paiements via USSD ou application mobile, tandis que vous recevez des confirmations en temps réel. Augmentez votre taux de conversion de jusqu'à 40%.",
    features: ["Intégration API simplifiée", "Confirmation instantanée", "Support multi-devices"],
    image: "/images/orange.jpg",
    icon: "📱",
    gradient: "from-orange-500 via-orange-600 to-amber-500",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    accentGlow: "shadow-orange-500/25"
  },
  {
    id: 2,
    title: "Mobile Money",
    subtitle: "Couverture panafricaine",
    description: "Étendez votre présence commerciale avec Mobile Money. Une infrastructure robuste et sécurisée pour encaisser des paiements dans 15+ pays africains, avec une disponibilité de 99.9%.",
    features: ["Couverture 15+ pays", "Settlement J+1", "Dashboard analytique"],
    image: "/images/momo.jpg",
    icon: "🌍",
    gradient: "from-blue-600 via-blue-700 to-cyan-500",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    accentGlow: "shadow-blue-500/25"
  },
  {
    id: 3,
    title: "Notifications Twilio",
    subtitle: "Communication client automatisée",
    description: "Gardez vos clients informés à chaque étape du parcours. Envoyez automatiquement reçus, alertes de transaction et rappels personnalisés via SMS, WhatsApp ou email avec l'API Twilio.",
    features: ["Multi-canaux", "Templates personnalisables", "Analytics d'engagement"],
    image: "/images/twillio.jpg",
    icon: "✉️",
    gradient: "from-red-500 via-rose-500 to-pink-500",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    accentGlow: "shadow-rose-500/25"
  },
  {
    id: 4,
    title: "Sécurité Enterprise",
    subtitle: "Protection bancaire de niveau 1",
    description: "Vos transactions bénéficient d'une sécurité de grade bancaire : chiffrement AES-256, conformité PCI DSS Level 1, authentification 3D Secure 2.0 et surveillance 24/7 contre les fraudes.",
    features: ["PCI DSS Level 1", "Chiffrement end-to-end", "Détection de fraude IA"],
    image: "/images/securite.jpg",
    icon: "🔐",
    gradient: "from-emerald-500 via-green-600 to-teal-500",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    accentGlow: "shadow-emerald-500/25"
  }
];

const stats = [
  { value: "99.9%", label: "Disponibilité", icon: "⚡" },
  { value: "<2s", label: "Temps de traitement", icon: "🚀" },
  { value: "50K+", label: "Transactions/jour", icon: "💳" },
  { value: "24/7", label: "Support expert", icon: "🎧" }
];

const trustedBy = ["Orange", "Moov", "Twilio", "Visa", "Mastercard", "PCI Security Standards"];

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);

  // Auto-play avec pause au hover
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveringPhone) nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentSlide, isHoveringPhone]);

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const current = slides[currentSlide];

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 via-violet-50/40 to-slate-100 overflow-hidden pt-8 pb-16"
      aria-label="Section principale - Solutions de paiement"
    >
      
      {/* ========== ARRIÈRE-PLAN ANIMÉ PROFESSIONNEL ========== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-violet-200/5 to-transparent rounded-full blur-3xl" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-violet-400/30 rounded-full animate-float"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i}s`
            }}
          />
        ))}
      </div>

      {/* ========== PHRASE D'ACCROCHE PRINCIPALE (STATIQUE) ========== */}
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 pt-8 pb-6 text-center animate-fadeInDown">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-700">Infrastructure financière nouvelle génération</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 leading-tight tracking-tight">
          <span className="block">Une infrastructure financière pour</span>
          <span className="block bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            augmenter vos revenus
          </span>
        </h2>
        
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Acceptez les paiements, proposez des services financiers et mettez en place des modèles de revenus personnalisés —{" "}
          <span className="font-semibold text-slate-800">de votre première transaction à votre premier milliard</span>.
        </p>

        {/* Séparateur décoratif */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-slate-300" />
          <div className="flex items-center gap-1.5 text-slate-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Puissant • Sécurisé • Scalable</span>
          </div>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-slate-300" />
        </div>
      </div>

      {/* ========== CONTENU PRINCIPAL (GRID) ========== */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 flex-1">
        
        {/* ========== COLONNE GAUCHE : CONTENU DYNAMIQUE ========== */}
        <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          
          {/* Badge de catégorie avec animation */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium border ${current.badgeColor} transition-all duration-500`}>
            <span className="text-lg animate-bounce-subtle">{current.icon}</span>
            <span className="hidden sm:inline">Solution de paiement</span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
            <span>{current.subtitle}</span>
          </div>

          {/* Titre principal avec hiérarchie visuelle */}
          <div className="space-y-3">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700">
              Acceptez les paiements avec{" "}
              <span className={`relative inline-block bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}>
                {current.title}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />
              </span>
            </div>
          </div>

          {/* Description avec liste de features */}
          <div className="space-y-4">
            <p className="text-base text-slate-600 leading-relaxed min-h-[80px] transition-opacity duration-400">
              {current.description}
            </p>
            
            {/* Features list */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {current.features.map((feature, idx) => (
                <li 
                  key={idx}
                  className="flex items-center gap-2 text-sm text-slate-600 animate-fadeIn"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Boutons d'action principaux */}
          <div className="flex flex-wrap gap-3 pt-1">
            <button 
              className="group relative bg-gradient-to-r from-violet-700 to-indigo-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2.5 overflow-hidden text-sm"
              aria-label="Commencer l'intégration"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative">Commencer gratuitement</span>
              <span className="relative group-hover:translate-x-1 transition-transform">→</span>
            </button>
            
            <button 
              className="group px-6 py-3.5 rounded-xl font-semibold border-2 border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/50 hover:text-violet-700 transition-all duration-300 flex items-center gap-2 text-sm"
              aria-label="Voir une démonstration"
            >
              <span className="w-4 h-4 rounded-full bg-slate-100 group-hover:bg-violet-100 flex items-center justify-center transition-colors">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </span>
              Voir la démo
            </button>
          </div>

          {/* Statistiques de confiance */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-200/60">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="flex items-center sm:block gap-1 sm:gap-0.5">
                  <span className="text-lg sm:text-xl font-black text-slate-900">{stat.value}</span>
                  <span className="text-[10px] sm:text-xs text-slate-500">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Indicateurs de slide + Navigation */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2" role="tablist" aria-label="Navigation des slides">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  role="tab"
                  aria-selected={idx === currentSlide}
                  aria-controls={`slide-content-${slide.id}`}
                  className={`relative h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
                    idx === currentSlide 
                      ? 'w-10 bg-gradient-to-r from-violet-600 to-indigo-600' 
                      : 'w-6 bg-slate-300 hover:bg-slate-400'
                  }`}
                >
                  {idx === currentSlide && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400 animate-pulse opacity-50" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-violet-300 hover:text-violet-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Slide précédent"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-violet-300 hover:text-violet-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Slide suivant"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* ========== COLONNE DROITE : VISUEL TÉLÉPHONE ========== */}
        <div 
          className="relative flex justify-center items-center"
          onMouseEnter={() => setIsHoveringPhone(true)}
          onMouseLeave={() => setIsHoveringPhone(false)}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${current.gradient} opacity-10 blur-3xl rounded-full transition-all duration-700 ${current.accentGlow}`} />
          
          <div 
            className={`relative w-[290px] sm:w-[330px] h-[580px] sm:h-[660px] transition-transform duration-500 ${
              isHoveringPhone ? 'scale-[1.02] rotate-1' : 'scale-100 rotate-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] p-2.5 shadow-2xl shadow-slate-900/30">
              
              <div className="absolute left-0 top-20 w-0.5 h-6 bg-slate-700 rounded-r" />
              <div className="absolute left-0 top-32 w-0.5 h-10 bg-slate-700 rounded-r" />
              <div className="absolute right-0 top-24 w-0.5 h-5 bg-slate-700 rounded-l" />
              
              <div className="relative w-full h-full bg-slate-900 rounded-[2rem] overflow-hidden border-4 border-slate-700/50">
                
                <div className="absolute top-0 left-0 right-0 h-7 bg-slate-900/90 z-20 flex items-center justify-between px-5 text-[9px] font-medium text-slate-300">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    <span className="w-4 h-2 rounded-sm bg-slate-600 relative">
                      <span className="absolute inset-y-0 left-0 w-3/4 bg-emerald-400 rounded-sm" />
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 pt-7 pb-16 px-3">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-inner">
                    
                    <div className="absolute inset-3 flex items-center justify-center">
                      <img 
                        key={current.id}
                        src={current.image} 
                        alt={`Interface ${current.title}`} 
                        className="w-full h-full object-contain transition-all duration-500 drop-shadow-lg"
                        style={{
                          filter: isAnimating ? 'blur(4px) scale(1.05)' : 'blur(0) scale(1)',
                          opacity: isAnimating ? 0 : 1
                        }}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/300x500/f1f5f9/475569?text=${encodeURIComponent(current.title)}&font=roboto`;
                        }}
                      />
                    </div>

                    <div className="absolute top-3 left-3 right-3 h-10 bg-white/80 backdrop-blur-sm rounded-lg flex items-center px-2.5 shadow-sm border border-slate-200/50">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${current.gradient} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                        {current.icon}
                      </div>
                      <div className="ml-2.5 flex-1 min-w-0">
                        <div className="text-[10px] font-semibold text-slate-800 truncate">{current.title}</div>
                        <div className="text-[9px] text-slate-500">Paiement sécurisé</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-slate-200/80">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span className="text-[9px] font-medium text-slate-700">En ligne</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-600/50 rounded-full" />
              </div>
            </div>

            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
          </div>

          <button 
            onClick={prevSlide}
            className="hidden lg:flex absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 items-center justify-center shadow-lg hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600 transition-all duration-200 z-30 focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label="Solution précédente"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="hidden lg:flex absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 items-center justify-center shadow-lg hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600 transition-all duration-200 z-30 focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label="Solution suivante"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-xl border border-slate-200 flex items-center gap-2.5 z-30 animate-fadeInUp">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold text-slate-800">PCI DSS</span>
            </div>
            <div className="w-px h-3 bg-slate-200" />
            <span className="text-[10px] text-slate-500">AES-256</span>
          </div>
        </div>

      </div>

      {/* ========== BANDEAU PARTENAIRES ========== */}
      <div className="w-full py-5 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm mt-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-[10px] font-medium text-slate-500 mb-3">
            Technologie fiable, utilisée par des leaders du secteur
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-7 opacity-60">
            {trustedBy.map((brand, idx) => (
              <span key={idx} className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========== ANIMATIONS CSS ========== */}
      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .animate-fadeInDown { animation: fadeInDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
        
        html { scroll-behavior: smooth; }
        button:focus-visible {
          outline: 2px solid #7c3aed;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default Hero;