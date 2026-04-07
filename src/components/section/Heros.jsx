// Hero.jsx
import React, { useState, useEffect, useCallback, useRef, memo } from 'react';

// ============================================================================
// CONFIGURATION & CONSTANTES
// ============================================================================
const SLIDE_DURATION = 6000;

const SLIDES = [
  {
    id: 'all-in-one',
    badge: 'Plateforme tout-en-un',
    title: 'Tous vos paiements, une seule plateforme.',
    description:
      'Mobile Money, cartes bancaires, virements SEPA — centralisez tout en un tableau de bord intelligent. Gérez, suivez et encaissez sans friction.',
    cta: 'Commencer gratuitement',
    ctaSub: 'Aucune carte requise · Gratuit 30 jours',
    stats: [
      { value: '+12 000', label: 'entreprises actives' },
      { value: '99,9 %', label: 'disponibilité' },
      { value: '< 2 s', label: 'temps de traitement' },
    ],
    image: '/images/heros/dashbord.jpg',
  },
  {
    id: 'mobile-money',
    badge: 'Mobile Money',
    title: 'MTN, Orange, Wave. Acceptez-les tous.',
    description:
      'Plus de 80 % des transactions en Afrique subsaharienne passent par le Mobile Money. Intégrez-les en quelques clics et ne ratez plus aucune vente.',
    cta: 'Activer Mobile Money',
    ctaSub: 'Intégration en moins de 10 minutes',
    stats: [
      { value: '8+', label: 'opérateurs supportés' },
      { value: '0 %', label: "frais d'installation" },
      { value: '24/7', label: 'collecte automatique' },
    ],
    image: '/images/heros/paiement_mobile.jpg',
  },
  {
    id: 'secure',
    badge: 'Sécurité & conformité',
    title: 'Vos transactions protégées, certifiées.',
    description:
      'Chiffrement de bout en bout, authentification à deux facteurs et conformité PCI-DSS niveau 1. Vos clients paient en toute sérénité.',
    cta: 'Découvrir la sécurité',
    ctaSub: 'Certifié PCI-DSS · Chiffrement AES-256',
    stats: [
      { value: '0', label: 'incident de sécurité' },
      { value: 'PCI-DSS', label: 'niveau 1' },
      { value: '256-bit', label: 'chiffrement' },
    ],
    image: '/images/heros/security.jpg',
  },
  {
    id: 'api',
    badge: 'API & Développeurs',
    title: 'Une API pensée pour aller vite.',
    description:
      'Documentation claire, SDKs en Node, Python et PHP, webhooks temps réel et sandbox dédié. Vos développeurs vont l\'adorer.',
    cta: 'Explorer la documentation',
    ctaSub: 'SDK disponibles · Sandbox gratuit',
    stats: [
      { value: '< 5 min', label: 'premier appel' },
      { value: '3', label: 'SDKs officiels' },
      { value: '99,9 %', label: 'uptime garanti' },
    ],
    image: '/images/heros/developpeur.jpg',
  },
  {
    id: 'growth',
    badge: 'Croissance business',
    title: 'Encaissez plus. Gérez moins.',
    description:
      'Relances automatiques, rapports en temps réel, liens de paiement partageables et analytics avancé. Hr Skills Pay, le copilote financier de votre croissance.',
    cta: 'Booster mon business',
    ctaSub: 'Essai gratuit · Sans engagement',
    stats: [
      { value: '+34 %', label: 'revenus en moyenne' },
      { value: '-60 %', label: 'temps administratif' },
      { value: '1 seul', label: 'outil pour tout gérer' },
    ],
    image: '/images/heros/business.jpg',
  },
];

// ============================================================================
// HOOK CARROUSEL
// ============================================================================
const useCarousel = (count) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const goTo = useCallback((idx) => {
    const next = ((idx % count) + count) % count;
    setCurrent(next);
  }, [count]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const back = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer.current);
  }, [paused, next]);

  return { current, goTo, next, back, setPaused };
};

// ============================================================================
// SOUS-COMPOSANTS
// ============================================================================

/** Badge violet */
const Badge = ({ label }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-200 bg-violet-50 mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
    <span className="text-xs font-semibold text-violet-800 uppercase tracking-wide">{label}</span>
  </div>
);

/** Statistiques (valeurs en violet) */
const Stats = ({ stats }) => (
  <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6 pt-4 border-t border-gray-100">
    {stats.map((s, i) => (
      <div key={i} className="flex flex-col">
        <span className="text-2xl font-bold text-violet-700 leading-none">{s.value}</span>
        <span className="text-xs text-gray-500 mt-0.5">{s.label}</span>
      </div>
    ))}
  </div>
);

/** Slide */
const Slide = ({ slide, isActive }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!isActive) return null;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Texte à gauche */}
        <div>
          <Badge label={slide.badge} />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-violet-800 leading-tight tracking-tight">
            {slide.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => (window.location.href = '/register')}
              className="px-6 py-3 bg-violet-700 text-white font-semibold rounded-lg
                         hover:bg-violet-800 transition-colors text-sm shadow-sm"
            >
              {slide.cta}
            </button>
            <button
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-violet-300 text-violet-700 font-medium rounded-lg
                         hover:bg-violet-50 transition-colors text-sm"
            >
              Voir la démo →
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-400">{slide.ctaSub}</p>
          <Stats stats={slide.stats} />
        </div>

        {/* Image à droite */}
        <div className="relative hidden lg:flex justify-end">
          <div className="relative w-full max-w-md">
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gray-100 rounded-xl animate-pulse" />
            )}
            <img
              src={slide.image}
              alt={slide.title}
              className="relative rounded-xl shadow-lg object-cover w-full"
              style={{ maxHeight: '420px' }}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/** Navigation flèches (violet au hover) */
const NavButton = ({ dir, onClick }) => (
  <button
    onClick={onClick}
    aria-label={dir === 'left' ? 'Précédent' : 'Suivant'}
    className="absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full
               bg-white border border-gray-200 shadow-sm flex items-center justify-center
               text-gray-600 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200
               transition-colors focus:outline-none focus:ring-1 focus:ring-violet-400
               ${dir === 'left' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);

/** Dots de navigation (violet pour l'actif) */
const Dots = ({ total, current, onClick }) => (
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onClick(i)}
        aria-label={`Slide ${i + 1}`}
        className={`rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-violet-400
          ${i === current
            ? 'w-8 h-1.5 bg-violet-700'
            : 'w-2 h-1.5 bg-gray-300 hover:bg-violet-400'
          }`}
      />
    ))}
  </div>
);

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
const Hero = () => {
  const { current, goTo, next, back, setPaused } = useCarousel(SLIDES.length);
  const [touchStart, setTouchStart] = useState(null);

  return (
    <section
      id="home"
      className="relative bg-white overflow-hidden"
      style={{ minHeight: '100vh', maxHeight: '900px', height: '100vh' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (!touchStart) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : back();
        setTouchStart(null);
      }}
      aria-label="Carrousel principal"
    >
      {/* Conteneur des slides */}
      <div className="relative h-full flex items-center">
        {SLIDES.map((slide, i) => (
          <Slide key={slide.id} slide={slide} isActive={i === current} />
        ))}
      </div>

      {/* Navigation */}
      <NavButton dir="left" onClick={back} />
      <NavButton dir="right" onClick={next} />
      <Dots total={SLIDES.length} current={current} onClick={goTo} />

      {/* Bandeau d'accroche statique (en haut) avec texte violet */}
      <div className="absolute top-8 left-0 right-0 z-20 text-center">
        <p className="text-gray-600 text-sm sm:text-base font-medium max-w-2xl mx-auto px-4">
          Infrastructure financière pour augmenter vos revenus. Acceptez les paiements, proposez des services financiers
          et créez des modèles de revenus personnalisés — <span className="text-violet-700 font-semibold">de votre première transaction à votre milliardième</span>.
        </p>
      </div>
    </section>
  );
};

export default memo(Hero);