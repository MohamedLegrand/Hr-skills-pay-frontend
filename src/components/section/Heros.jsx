// Hero.jsx
import React, { useState, useEffect, useCallback, useRef, memo, useMemo } from 'react';

// ============================================================================
// CONFIGURATION & CONSTANTES
// ============================================================================
const CONFIG = {
  SLIDE_DURATION: 8000,
  ANIMATION_DURATION: 500,
  COUNTER_DURATION: 1200,
  PARALLAX_INTENSITY: 3,
  BREAKPOINTS: { mobile: 640, tablet: 1024, desktop: 1280 }
};

const SLIDES = [
  {
    id: 'orange-money',
    title: "Orange Money",
    subtitle: "Paiements mobiles instantanés",
    description: "Intégrez Orange Money en moins de 5 minutes. Vos clients finalisent leurs paiements via USSD ou application mobile, tandis que vous recevez des confirmations en temps réel.",
    features: ["API RESTful documentée", "Webhooks temps réel", "Sandbox de test incluse"],
    image: "/images/orange.jpg",
    placeholder: "https://placehold.co/400x600/ff7900/ffffff?text=Orange+Money",
    icon: "📱",
    theme: {
      primary: "from-orange-500 via-orange-600 to-amber-500",
      accent: "orange",
      glow: "shadow-orange-500/30",
      badge: "bg-orange-50 text-orange-700 border-orange-200"
    }
  },
  {
    id: 'mobile-money',
    title: "Mobile Money",
    subtitle: "Couverture panafricaine",
    description: "Étendez votre présence commerciale avec Mobile Money. Une infrastructure robuste et sécurisée pour encaisser des paiements dans 15+ pays africains.",
    features: ["15+ pays supportés", "Settlement J+1 garanti", "Analytics temps réel"],
    image: "/images/momo.jpg",
    placeholder: "https://placehold.co/400x600/2563eb/ffffff?text=Mobile+Money",
    icon: "🌍",
    theme: {
      primary: "from-blue-600 via-blue-700 to-cyan-500",
      accent: "blue",
      glow: "shadow-blue-500/30",
      badge: "bg-blue-50 text-blue-700 border-blue-200"
    }
  },
  {
    id: 'twilio-notifications',
    title: "Notifications Twilio",
    subtitle: "Communication client automatisée",
    description: "Gardez vos clients informés à chaque étape. Envoyez automatiquement reçus, alertes et rappels via SMS, WhatsApp ou email avec l'API Twilio.",
    features: ["Multi-canaux unifiés", "Templates A/B testables", "Delivery tracking"],
    image: "/images/twillio.jpg",
    placeholder: "https://placehold.co/400x600/e11d48/ffffff?text=Twilio+Notify",
    icon: "✉️",
    theme: {
      primary: "from-rose-500 via-rose-600 to-pink-500",
      accent: "rose",
      glow: "shadow-rose-500/30",
      badge: "bg-rose-50 text-rose-700 border-rose-200"
    }
  },
  {
    id: 'enterprise-security',
    title: "Sécurité Enterprise",
    subtitle: "Protection bancaire de niveau 1",
    description: "Vos transactions bénéficient d'une sécurité de grade bancaire : chiffrement AES-256, conformité PCI DSS Level 1, authentification 3D Secure 2.0.",
    features: ["Certification PCI DSS L1", "Chiffrement end-to-end", "Fraud detection IA"],
    image: "/images/securite.jpg",
    placeholder: "https://placehold.co/400x600/059669/ffffff?text=Enterprise+Security",
    icon: "🔐",
    theme: {
      primary: "from-emerald-500 via-green-600 to-teal-500",
      accent: "emerald",
      glow: "shadow-emerald-500/30",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }
  }
];

const STATS = [
  { id: 'uptime', value: 99.9, suffix: '%', label: 'Disponibilité SLA', icon: '⚡', prefix: '' },
  { id: 'latency', value: 2, suffix: 's', label: 'Latence moyenne', icon: '🚀', prefix: '<', decimal: 1 },
  { id: 'volume', value: 50, suffix: 'K+', label: 'Transactions/jour', icon: '💳', prefix: '', suffix: 'K+' },
  { id: 'support', value: 24, suffix: '/7', label: 'Support expert', icon: '🎧', prefix: '' }
];

const TRUSTED_BY = [
  { name: 'Orange', logo: '/logos/orange.svg' },
  { name: 'Moov Africa', logo: '/logos/moov.svg' },
  { name: 'Twilio', logo: '/logos/twilio.svg' },
  { name: 'Visa', logo: '/logos/visa.svg' },
  { name: 'Mastercard', logo: '/logos/mastercard.svg' },
  { name: 'PCI SSC', logo: '/logos/pci.svg' }
];

// ============================================================================
// HOOKS PERSONNALISÉS
// ============================================================================

/** Hook : Intersection Observer avec options configurables */
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.3, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

/** Hook : Préférence "réduire les animations" (accessibilité) */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    const handler = (e) => setReduced(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);
  
  return reduced;
};

/** Hook : Gestion du carousel avec keyboard & swipe */
const useCarousel = (itemsCount, config) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStart = useRef(null);
  
  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), config.ANIMATION_DURATION);
  }, [isTransitioning, config.ANIMATION_DURATION]);

  const next = useCallback(() => {
    goTo((currentIndex + 1) % itemsCount);
  }, [currentIndex, itemsCount, goTo]);

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + itemsCount) % itemsCount);
  }, [currentIndex, itemsCount, goTo]);

  // Navigation clavier
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      if (e.key === 'End') { e.preventDefault(); goTo(itemsCount - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, goTo, itemsCount]);

  // Support swipe tactile
  const touchHandlers = useMemo(() => ({
    onTouchStart: (e) => { touchStart.current = e.touches[0].clientX; },
    onTouchEnd: (e) => {
      if (!touchStart.current) return;
      const diff = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
      touchStart.current = null;
    }
  }), [next, prev]);

  return { currentIndex, isTransitioning, goTo, next, prev, touchHandlers };
};

// ============================================================================
// COMPOSANTS OPTIMISÉS (memo)
// ============================================================================

/** Compteur animé avec Intersection Observer */
const AnimatedCounter = memo(({ stat, duration }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, isVisible] = useIntersectionObserver();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const { value, prefix, suffix, decimal = 0, label, icon } = stat;

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      if (prefersReducedMotion) {
        setDisplayValue(value);
        return;
      }
      
      let start = 0;
      const steps = Math.ceil(duration / 16);
      const increment = value / steps;
      
      const animate = () => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
        } else {
          setDisplayValue(start);
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible, hasAnimated, value, duration, prefersReducedMotion]);

  const formatted = useMemo(() => {
    const num = decimal > 0 ? displayValue.toFixed(decimal) : Math.floor(displayValue);
    return `${prefix}${num}${suffix}`;
  }, [displayValue, prefix, suffix, decimal]);

  return (
    <div ref={ref} className="text-center sm:text-left group" role="status">
      <div className="flex items-center justify-center sm:justify-start gap-2.5">
        <span 
          className="text-xl sm:text-2xl text-violet-600 transition-transform duration-300 
                     group-hover:scale-110 group-focus-within:scale-110"
          aria-hidden="true"
        >
          {icon}
        </span>
        <span 
          className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-900 
                     bg-clip-text text-transparent tabular-nums"
          aria-live="polite"
        >
          {formatted}
        </span>
      </div>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
});
AnimatedCounter.displayName = 'AnimatedCounter';

/** Phone mockup professionnel avec effet 3D optimisé */
const PhoneMockup = memo(({ slide, isHovered, parallaxOffset, reducedMotion }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const transform = useMemo(() => {
    if (reducedMotion) return {};
    return {
      transform: `
        perspective(1200px) 
        rotateY(${parallaxOffset.x * CONFIG.PARALLAX_INTENSITY}deg) 
        rotateX(${-parallaxOffset.y * CONFIG.PARALLAX_INTENSITY}deg)
        translateZ(0)
      `,
      transition: 'transform 0.15s ease-out'
    };
  }, [parallaxOffset, reducedMotion]);

  return (
    <div
      className="relative flex justify-center items-center select-none"
      style={transform}
      aria-hidden="true"
    >
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${slide.theme.primary} opacity-25 blur-3xl rounded-full 
                   transition-opacity duration-700 ${isHovered ? 'opacity-40' : ''}`}
      />
      
      {/* Phone frame */}
      <div className="relative w-72 sm:w-80 lg:w-96 aspect-[9/19] transition-transform duration-500 ease-out hover:scale-[1.02]">
        {/* Outer frame */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 
                        rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl shadow-slate-900/50 
                        border border-slate-700/50">
          
          {/* Screen container */}
          <div className="relative w-full h-full bg-slate-900 rounded-[2rem] overflow-hidden 
                          border-2 border-slate-700/80">
            
            {/* Status bar */}
            <div className="absolute top-0 inset-x-0 h-6 sm:h-7 bg-slate-900/95 flex items-center 
                            justify-between px-4 sm:px-5 text-[10px] sm:text-xs text-slate-300 z-10">
              <time dateTime="09:41">9:41</time>
              <div className="flex items-center gap-1.5">
                {/* Signal */}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="1" y="14" width="3" height="6" rx="0.5" className="opacity-40"/>
                  <rect x="6" y="10" width="3" height="10" rx="0.5" className="opacity-60"/>
                  <rect x="11" y="6" width="3" height="14" rx="0.5" className="opacity-80"/>
                  <rect x="16" y="2" width="3" height="18" rx="0.5"/>
                </svg>
                {/* WiFi */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                     strokeWidth="2" aria-hidden="true">
                  <path d="M5 12.55a11 11 0 0114 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>
                </svg>
                {/* Battery */}
                <div className="flex items-center gap-0.5">
                  <div className="w-5 h-2.5 border border-slate-500 rounded-sm relative">
                    <div className="absolute inset-y-0.5 left-0.5 right-1 bg-emerald-400 rounded-sm 
                                    animate-pulse-slow" style={{ width: '85%' }} />
                  </div>
                  <div className="w-0.5 h-1.5 bg-slate-500 rounded-r-sm" />
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="absolute inset-0 pt-7 pb-14 px-2 sm:px-3">
              <div className="relative w-full h-full rounded-xl overflow-hidden 
                              bg-gradient-to-br from-slate-100 to-slate-200">
                
                {/* Loading skeleton */}
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-4 animate-pulse bg-slate-300 rounded-lg" />
                )}
                
                {/* Main image */}
                <img
                  src={imageError ? slide.placeholder : slide.image}
                  alt={`Interface ${slide.title}`}
                  className={`absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] 
                             object-contain drop-shadow-lg transition-all duration-500
                             ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                             ${reducedMotion ? '' : 'will-change-transform'}`}
                  loading="eager"
                  fetchPriority="high"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => { setImageError(true); setImageLoaded(true); }}
                />
                
                {/* App header overlay */}
                <div className="absolute top-3 left-3 right-3 h-11 sm:h-12 bg-white/90 backdrop-blur-md 
                                rounded-xl flex items-center px-3 shadow-sm border border-slate-200/60">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${slide.theme.primary} 
                                  flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                    {slide.icon}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-800 truncate">{slide.title}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Paiement sécurisé
                    </div>
                  </div>
                </div>
                
                {/* Bottom gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-1 
                            bg-slate-600/70 rounded-full" />
          </div>
        </div>
        
        {/* Certification badge */}
        <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 
                        bg-white/95 backdrop-blur-md rounded-full px-3.5 sm:px-4 py-1.5 
                        shadow-xl border border-slate-200 flex items-center gap-1.5 sm:gap-2
                        animate-float-slow">
          <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-500 flex-shrink-0" 
               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M2.166 4.999A10 10 0 0010 2a10 10 0 007.834 2.999L18 5.5l-1.5 5.5H3.5L2 5.5l.166-.501zM10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] sm:text-xs font-semibold text-slate-700 whitespace-nowrap">
            PCI DSS Level 1
          </span>
        </div>
      </div>
    </div>
  );
});
PhoneMockup.displayName = 'PhoneMockup';

/** Indicateur de progression du carousel */
const ProgressIndicator = memo(({ current, total, onNavigate, reducedMotion }) => {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Navigation des slides">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-controls={`slide-${i + 1}`}
          id={`tab-${i + 1}`}
          onClick={() => onNavigate(i)}
          className={`relative h-1.5 rounded-full transition-all duration-300 focus:outline-none 
                     focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white
                     ${i === current 
                       ? 'w-8 bg-gradient-to-r from-violet-600 to-indigo-600' 
                       : 'w-4 bg-slate-300 hover:bg-slate-400'
                     }`}
        >
          {/* Progress animation */}
          {i === current && !reducedMotion && (
            <span className="absolute inset-0 rounded-full bg-white/30 animate-progress" />
          )}
        </button>
      ))}
    </div>
  );
});
ProgressIndicator.displayName = 'ProgressIndicator';

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
const Hero = () => {
  // États
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs
  const heroRef = useRef(null);
  const autoPlayRef = useRef(null);
  
  // Hooks
  const prefersReducedMotion = usePrefersReducedMotion();
  const { currentIndex, isTransitioning, goTo, next, prev, touchHandlers } = useCarousel(
    SLIDES.length, 
    CONFIG
  );
  
  const currentSlide = useMemo(() => SLIDES[currentIndex], [currentIndex]);

  // Auto-play intelligent
  useEffect(() => {
    if (isPaused || isHoveringPhone || prefersReducedMotion) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }
    
    autoPlayRef.current = setInterval(next, CONFIG.SLIDE_DURATION);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex, isPaused, isHoveringPhone, prefersReducedMotion, next]);

  // Parallax optimisé avec requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    let frameId;
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  // Cleanup auto-play on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  // Handlers
  const handleCTAPrimary = useCallback(() => {
    // Analytics tracking ici
    window.location.href = '/register?source=hero';
  }, []);

  const handleCTASecondary = useCallback(() => {
    // Scroll vers démo ou ouverture modal
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center bg-gradient-to-br 
                 from-slate-50 via-violet-50/40 to-slate-100 overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16"
      aria-labelledby="hero-heading"
      {...touchHandlers}
    >
      {/* ===== ARRIÈRE-PLAN OPTIMISÉ ===== */}
      <BackgroundDecor reducedMotion={prefersReducedMotion} />

      {/* ===== BANDEAU PROMO ===== */}
      <AnnouncementBanner />

      {/* ===== CONTENU PRINCIPAL ===== */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        
        {/* Header textuel */}
        <HeroHeader 
          onPrimaryClick={handleCTAPrimary} 
          onSecondaryClick={handleCTASecondary}
          reducedMotion={prefersReducedMotion}
        />

        {/* Grille principale */}
        <div className="relative mt-8 sm:mt-12 lg:mt-16">
          
          {/* Navigation latérale desktop */}
          <SlideNavigation 
            onPrev={prev} 
            onNext={next} 
            disabled={isTransitioning}
            reducedMotion={prefersReducedMotion}
          />

          {/* Grid contenu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Colonne texte */}
            <SlideContent 
              slide={currentSlide} 
              isTransitioning={isTransitioning}
              reducedMotion={prefersReducedMotion}
            />

            {/* Colonne visuel */}
            <div 
              className="relative flex justify-center"
              onMouseEnter={() => setIsHoveringPhone(true)}
              onMouseLeave={() => setIsHoveringPhone(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              <PhoneMockup 
                slide={currentSlide}
                isHovered={isHoveringPhone}
                parallaxOffset={mousePosition}
                reducedMotion={prefersReducedMotion}
              />
            </div>
          </div>

          {/* Pagination & controls */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center lg:justify-between gap-4">
            <ProgressIndicator 
              current={currentIndex}
              total={SLIDES.length}
              onNavigate={goTo}
              reducedMotion={prefersReducedMotion}
            />
            
            {/* Pause/Play indicator */}
            <button
              onClick={() => setIsPaused(p => !p)}
              className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 
                         hover:text-slate-700 transition-colors focus:outline-none focus:ring-2 
                         focus:ring-violet-500 rounded-full px-3 py-1.5"
              aria-pressed={isPaused}
              aria-label={isPaused ? "Reprendre la lecture automatique" : "Mettre en pause"}
            >
              {isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
                  Lecture
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg>
                  Pause
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bandeau partenaires */}
        <TrustBar brands={TRUSTED_BY} />
      </div>

      {/* Skip link pour accessibilité */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   focus:z-50 focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white 
                   focus:rounded-lg focus:font-medium"
      >
        Aller au contenu principal
      </a>

      {/* Styles CSS optimisés */}
      <style>{`
        @keyframes float-slow { 0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)} }
        @keyframes pulse-slow { 0%,100%{opacity:1}50%{opacity:0.6} }
        @keyframes progress { from{width:0}to{width:100%} }
        
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-progress { animation: progress ${CONFIG.SLIDE_DURATION}ms linear; }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  );
};

// ============================================================================
// SOUS-COMPOSANTS EXTRAIT (pour lisibilité)
// ============================================================================

const BackgroundDecor = memo(({ reducedMotion }) => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Gradients radiaux */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_15%,rgba(139,92,246,0.08),transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_75%,rgba(59,130,246,0.06),transparent_65%)]" />
    
    {/* Grid subtil */}
    <div 
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), 
                          linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}
    />
    
    {/* Particules flottantes (désactivées si reduced motion) */}
    {!reducedMotion && [...Array(15)].map((_, i) => (
      <div
        key={`particle-${i}`}
        className="absolute rounded-full bg-violet-400/20"
        style={{
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${15 + Math.random() * 20}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 10}s`
        }}
      />
    ))}
  </div>
));
BackgroundDecor.displayName = 'BackgroundDecor';

const AnnouncementBanner = memo(() => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 animate-fadeInDown">
    <div className="flex justify-center">
      <a 
        href="/changelog/v3" 
        className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-sm 
                   border border-violet-200 rounded-full shadow-sm hover:shadow-md 
                   hover:border-violet-300 transition-all duration-200 group"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
                           bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-slate-700 group-hover:text-violet-700 transition-colors">
          🚀 API v3 disponible : +32% de conversion
        </span>
        <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-500 transition-colors" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
));
AnnouncementBanner.displayName = 'AnnouncementBanner';

const HeroHeader = memo(({ onPrimaryClick, onSecondaryClick, reducedMotion }) => (
  <div className="text-center max-w-4xl mx-auto">
    <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
      <span className="block text-slate-900">Une infrastructure financière pour</span>
      <span className="block bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 
                       bg-clip-text text-transparent animate-gradient-slow">
        augmenter vos revenus
      </span>
    </h1>
    
    <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto 
                  leading-relaxed">
      Acceptez les paiements, proposez des services financiers et développez des modèles de revenus 
      personnalisés — <span className="font-semibold text-slate-800">de votre première transaction 
      à votre premier milliard</span>.
    </p>
    
    <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
      <button
        onClick={onPrimaryClick}
        className="group relative w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 
                   bg-gradient-to-r from-violet-700 to-indigo-700 text-white rounded-xl 
                   font-semibold shadow-lg shadow-violet-500/25 hover:shadow-xl 
                   hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0 
                   transition-all duration-200 flex items-center justify-center gap-2 
                   text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-violet-500 
                   focus:ring-offset-2 focus:ring-offset-white"
      >
        <span>Commencer gratuitement</span>
        <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
      
      <button
        onClick={onSecondaryClick}
        className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-white/80 backdrop-blur-sm 
                   border-2 border-slate-200 text-slate-700 rounded-xl font-semibold 
                   hover:border-violet-300 hover:bg-violet-50/60 hover:text-violet-700 
                   transition-all duration-200 flex items-center justify-center gap-2 
                   text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-violet-500 
                   focus:ring-offset-2 focus:ring-offset-white"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
        Voir la démo interactive
      </button>
    </div>
  </div>
));
HeroHeader.displayName = 'HeroHeader';

const SlideNavigation = memo(({ onPrev, onNext, disabled, reducedMotion }) => (
  <>
    <button
      onClick={onPrev}
      disabled={disabled}
      className={`absolute left-0 sm:-left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-10 
                 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-sm 
                 border border-slate-200 flex items-center justify-center text-slate-600 
                 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600 
                 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white 
                 transition-all duration-200 shadow-md hover:shadow-lg 
                 focus:outline-none focus:ring-2 focus:ring-violet-500
                 ${reducedMotion ? '' : 'hover:-translate-x-0.5'}`}
      aria-label="Slide précédent (flèche gauche)"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button
      onClick={onNext}
      disabled={disabled}
      className={`absolute right-0 sm:-right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-10 
                 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-sm 
                 border border-slate-200 flex items-center justify-center text-slate-600 
                 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-600 
                 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white 
                 transition-all duration-200 shadow-md hover:shadow-lg 
                 focus:outline-none focus:ring-2 focus:ring-violet-500
                 ${reducedMotion ? '' : 'hover:translate-x-0.5'}`}
      aria-label="Slide suivant (flèche droite)"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </>
));
SlideNavigation.displayName = 'SlideNavigation';

const SlideContent = memo(({ slide, isTransitioning, reducedMotion }) => (
  <div 
    className={`space-y-5 sm:space-y-6 transition-opacity duration-300 
               ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
    id={`slide-${SLIDES.findIndex(s => s.id === slide.id) + 1}`}
    role="tabpanel"
    aria-labelledby={`tab-${SLIDES.findIndex(s => s.id === slide.id) + 1}`}
  >
    {/* Badge */}
    <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border 
                    ${slide.theme.badge} bg-white/70 backdrop-blur-sm shadow-sm 
                    transition-all duration-500`}>
      <span className="text-xl animate-bounce-subtle" aria-hidden="true">{slide.icon}</span>
      <span className="text-sm font-semibold">{slide.subtitle}</span>
    </div>
    
    {/* Titre */}
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
      Acceptez les paiements avec{' '}
      <span className={`relative inline-block bg-gradient-to-r ${slide.theme.primary} 
                       bg-clip-text text-transparent`}>
        {slide.title}
        <span className="absolute -bottom-1.5 left-0 w-full h-0.5 
                         bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
      </span>
    </h2>
    
    {/* Description */}
    <p className="text-slate-600 leading-relaxed text-base sm:text-lg min-h-[80px] sm:min-h-[90px]">
      {slide.description}
    </p>
    
    {/* Features */}
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
      {slide.features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
          <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 
                           text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5">
            ✓
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    {/* Stats */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-200/70">
      {STATS.map((stat) => (
        <AnimatedCounter key={stat.id} stat={stat} duration={CONFIG.COUNTER_DURATION} />
      ))}
    </div>
  </div>
));
SlideContent.displayName = 'SlideContent';

const TrustBar = memo(({ brands }) => (
  <div className="mt-12 sm:mt-16 py-5 sm:py-6 bg-white/60 backdrop-blur-sm border-y border-slate-200/60">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
        Reconnu par les leaders du secteur
      </p>
      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 
                      opacity-70 hover:opacity-100 transition-opacity duration-500">
        {brands.map((brand) => (
          <span 
            key={brand.name}
            className="text-sm sm:text-base font-bold text-slate-400 hover:text-slate-700 
                       transition-colors cursor-default select-none"
            aria-label={`Partenaire: ${brand.name}`}
          >
            {brand.name}
          </span>
        ))}
      </div>
    </div>
  </div>
));
TrustBar.displayName = 'TrustBar';

export default memo(Hero);