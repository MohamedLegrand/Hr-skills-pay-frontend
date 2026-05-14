// Hero.jsx — version professionnelle avec gestion des erreurs d'images
import React, {
  useState, useEffect, useCallback, useRef, memo,
} from 'react';

const SLIDE_DURATION = 7000;

const SLIDES = [
  {
    id: 'all-in-one',
    badge: 'Plateforme tout-en-un',
    eyebrow: '01',
    title: ['Tous vos paiements,', 'une seule plateforme.'],
    description: 'Mobile Money, cartes bancaires, virements SEPA — centralisez tout en un tableau de bord intelligent. Gérez, suivez et encaissez sans friction.',
    cta: 'Commencer gratuitement',
    ctaSub: 'Aucune carte requise · Gratuit 30 jours',
    stats: [{ value: '+12 000', label: 'entreprises actives' }, { value: '99,9 %', label: 'disponibilité' }, { value: '< 2 s', label: 'traitement' }],
    image: '/images/heros/dashbord.jpg',
    fallbackColor: '#1E40AF',
    accent: '#1E40AF',
    accentBg: '#F0F4FF',
    accentText: '#1E3A8A',
  },
  {
    id: 'mobile-money',
    badge: 'Mobile Money',
    eyebrow: '02',
    title: ['MTN, Orange, Wave.', 'Acceptez-les tous.'],
    description: 'Plus de 80 % des transactions en Afrique subsaharienne passent par le Mobile Money. Intégrez-les en quelques clics et ne ratez plus aucune vente.',
    cta: 'Activer Mobile Money',
    ctaSub: 'Intégration en moins de 10 minutes',
    stats: [{ value: '8+', label: 'opérateurs supportés' }, { value: '0 %', label: "frais d'installation" }, { value: '24/7', label: 'collecte automatique' }],
    image: '/images/heros/paiement_mobile.jpg',
    fallbackColor: '#0F5B7A',
    accent: '#0F5B7A',
    accentBg: '#EAF4F8',
    accentText: '#0A4A63',
  },
  {
    id: 'secure',
    badge: 'Sécurité & conformité',
    eyebrow: '03',
    title: ['Vos transactions', 'protégées, certifiées.'],
    description: 'Chiffrement de bout en bout, authentification à deux facteurs et conformité PCI-DSS niveau 1. Vos clients paient en toute sérénité.',
    cta: 'Découvrir la sécurité',
    ctaSub: 'Certifié PCI-DSS · Chiffrement AES-256',
    stats: [{ value: '0', label: 'incident de sécurité' }, { value: 'PCI-DSS', label: 'niveau 1' }, { value: '256-bit', label: 'chiffrement' }],
    image: '/images/heros/security.jpg',
    fallbackColor: '#2D5A4C',
    accent: '#2D5A4C',
    accentBg: '#EDF3F0',
    accentText: '#1E463B',
  },
  {
    id: 'api',
    badge: 'API & Développeurs',
    eyebrow: '04',
    title: ["Une API pensée", "pour aller vite."],
    description: "Documentation claire, SDKs en Node, Python et PHP, webhooks temps réel et sandbox dédié. Vos développeurs vont l'adorer.",
    cta: 'Explorer la documentation',
    ctaSub: 'SDK disponibles · Sandbox gratuit',
    stats: [{ value: '< 5 min', label: 'premier appel' }, { value: '3', label: 'SDKs officiels' }, { value: '99,9 %', label: 'uptime garanti' }],
    image: '/images/heros/developpeur.jpg',
    fallbackColor: '#7A5C2E',
    accent: '#7A5C2E',
    accentBg: '#F7F4EF',
    accentText: '#5E451C',
  },
  {
    id: 'growth',
    badge: 'Croissance business',
    eyebrow: '05',
    title: ['Encaissez plus.', 'Gérez moins.'],
    description: 'Relances automatiques, rapports en temps réel, liens de paiement partageables et analytics avancé. Hr Skills Pay, le copilote financier de votre croissance.',
    cta: 'Booster mon business',
    ctaSub: 'Essai gratuit · Sans engagement',
    stats: [{ value: '+34 %', label: 'revenus en moyenne' }, { value: '-60 %', label: 'temps administratif' }, { value: '1 seul', label: 'outil pour tout' }],
    image: '/images/heros/business.jpg',
    fallbackColor: '#4A5568',
    accent: '#4A5568',
    accentBg: '#F1F3F5',
    accentText: '#2D3748',
  },
];

// ── Progress bar ──────────────────────────────────────────────────────────────
const ProgressBar = memo(({ active, duration, paused }) => {
  const [width, setWidth] = useState(0);
  const raf = useRef(null);
  const startRef = useRef(null);
  const pausedRef = useRef(paused);
  const elapsed = useRef(0);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => {
    if (!active) { setWidth(0); elapsed.current = 0; return; }
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      if (!pausedRef.current) {
        elapsed.current = ts - startRef.current;
        const p = Math.min(elapsed.current / duration, 1);
        setWidth(p * 100);
        if (p < 1) raf.current = requestAnimationFrame(tick);
      } else {
        startRef.current = ts - elapsed.current;
        raf.current = requestAnimationFrame(tick);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf.current); startRef.current = null; elapsed.current = 0; };
  }, [active, duration]);
  return (
    <div style={{ height: 2, width: 28, borderRadius: 2, background: '#E5E7EB', overflow: 'hidden' }}>
      {active && <div style={{ height: '100%', width: `${width}%`, background: '#1E40AF', borderRadius: 2, transition: 'none' }} />}
    </div>
  );
});

// ── Animated title ─────────────────────────────────────────────────────────────
const AnimatedTitle = memo(({ lines, slideKey }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [slideKey]);
  return (
    <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#111827' }}>
      {lines.map((line, li) => (
        <span key={`${slideKey}-${li}`} style={{ display: 'block', overflow: 'hidden' }}>
          <span style={{ display: 'block', transform: visible ? 'translateY(0)' : 'translateY(110%)', opacity: visible ? 1 : 0, transition: `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${li * 90}ms, opacity 0.5s ease ${li * 90}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
});

// ── Image panel avec gestion d'erreur ──────────────────────────────────────────
const ImagePanel = memo(({ slide, slideKey }) => {
  const [entered, setEntered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  useEffect(() => {
    setEntered(false); 
    setLoaded(false);
    setImgError(false);
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, [slideKey]);
  
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end' }}>
      <style>{`
        @keyframes kenBurns { 0% { transform: scale(1.07) translate(0.5%,0.5%); } 100% { transform: scale(1) translate(0,0); } }
        @keyframes shimmer  { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:.4; } }
      `}</style>

      <div style={{ position: 'relative', width: '100%', maxWidth: 500, transform: entered ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)', opacity: entered ? 1 : 0, transition: 'transform 0.85s cubic-bezier(0.22,1,0.36,1), opacity 0.65s ease' }}>

        <div style={{ position: 'absolute', inset: '-8px -8px -20px -8px', borderRadius: 28, background: slide.accentBg, zIndex: 0, transition: 'background 0.8s ease' }} />

        <div style={{ position: 'relative', zIndex: 1, borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.05)', background: '#F3F4F6' }}>
          {!loaded && !imgError && (
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#F3F4F6 25%,#E9EAEC 50%,#F3F4F6 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.6s infinite' }} />
          )}
          
          {!imgError ? (
            <img
              key={slideKey}
              src={slide.image}
              alt={slide.badge}
              onLoad={() => setLoaded(true)}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease', animation: loaded ? 'kenBurns 8s ease-out forwards' : 'none' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: slide.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{slide.badge}</div>
                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '8px' }}>Image en cours de chargement</div>
              </div>
            </div>
          )}
          
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top,rgba(0,0,0,0.12) 0%,transparent 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '60%', height: '50%', background: `radial-gradient(ellipse at top left,${slide.accent}12 0%,transparent 70%)`, pointerEvents: 'none', transition: 'background 0.8s ease' }} />
        </div>

        <div style={{ position: 'absolute', bottom: -16, left: -16, zIndex: 2, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'white', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.08),0 1px 4px rgba(0,0,0,0.04)', border: `1px solid ${slide.accentBg}`, transform: entered ? 'translateY(0)' : 'translateY(16px)', opacity: entered ? 1 : 0, transition: 'transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.3s,opacity 0.6s ease 0.3s' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: slide.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.6s ease' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={slide.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>{slide.badge}</div>
            <div style={{ fontSize: 10, color: '#6B7280', marginTop: 1 }}>{slide.ctaSub}</div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: -12, right: -12, zIndex: 2, padding: '5px 12px', background: slide.accent, borderRadius: 999, fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: `0 4px 12px ${slide.accent}40`, transform: entered ? 'translateY(0) rotate(-2deg)' : 'translateY(-12px) rotate(-2deg)', opacity: entered ? 1 : 0, transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s,opacity 0.5s ease 0.2s' }}>
          {slide.eyebrow} / 05
        </div>
      </div>
    </div>
  );
});

// ── Slide content ───────────────────────────────────────────────────────────────
const SlideContent = memo(({ slide, slideKey }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(false); const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, [slideKey]);
  const fade = (delay) => ({ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(14px)', transition: `opacity 0.65s ease ${delay}ms,transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms` });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 520 }}>
      <div style={{ ...fade(0), marginBottom: 20 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px 5px 8px', background: slide.accentBg, border: `1px solid ${slide.accent}20`, borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: slide.accentText, transition: 'all 0.5s ease' }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: slide.accent, animation: 'pulse 2s infinite' }} />
          {slide.badge}
        </span>
      </div>

      <AnimatedTitle lines={slide.title} slideKey={slideKey} />

      <p style={{ ...fade(200), marginTop: 18, fontSize: 15, lineHeight: 1.75, color: '#4B5563', maxWidth: 430 }}>
        {slide.description}
      </p>

      <div style={{ ...fade(280), display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
        <button
          onClick={() => (window.location.href = '/register')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: slide.accent, color: 'white', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: `0 2px 8px ${slide.accent}30`, transition: 'all 0.2s ease' }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.05)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 6px 16px ${slide.accent}40`; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 2px 8px ${slide.accent}30`; }}
        >
          {slide.cta}
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12" /></svg>
        </button>
        <button
          onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', background: 'white', color: '#374151', border: '1.5px solid #E5E7EB', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = slide.accent; e.currentTarget.style.color = slide.accent; e.currentTarget.style.backgroundColor = slide.accentBg; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.backgroundColor = 'white'; }}
        >
          Voir la démo
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
      </div>

      <p style={{ ...fade(340), marginTop: 10, fontSize: 11, color: '#6B7280' }}>{slide.ctaSub}</p>

      <div style={{ ...fade(400), display: 'flex', flexWrap: 'wrap', gap: '16px 32px', marginTop: 28, paddingTop: 24, borderTop: '1px solid #F0F2F5' }}>
        {slide.stats.map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: "'DM Serif Display',Georgia,serif", fontSize: 26, color: slide.accent, lineHeight: 1, transition: 'color 0.5s ease' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

// ── Hero Banner (PHRASE D'ACCROCHE AVANT LE CARROUSEL) ─────────────────────────
const HeroBanner = memo(() => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 25,
        maxWidth: 1280,
        margin: '0 auto',
        padding: '40px 80px 0 80px',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1E40AF 0%, #4C1D95 50%, #0F5B7A 100%)',
          borderRadius: 32,
          padding: '32px 48px',
          textAlign: 'center',
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.98)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease',
          boxShadow: '0 20px 40px -12px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(4px)',
            padding: '4px 16px',
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 16,
          }}
        >
          ✨ L'agrégateur de paiement nouvelle génération
        </span>

        <h2
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 400,
            lineHeight: 1.3,
            color: 'white',
            maxWidth: 800,
            margin: '0 auto',
          }}
        >
          Centralisez toutes vos transactions — Mobile Money, cartes, virements — 
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.9)', marginTop: 8 }}>
            et <strong style={{ color: '#FCD34D' }}>doublez votre chiffre d'affaires</strong> grâce à une expérience de paiement fluide.
          </span>
        </h2>

        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            marginTop: 24,
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => (window.location.href = '/register')}
            style={{
              padding: '12px 28px',
              background: 'white',
              color: '#1E40AF',
              border: 'none',
              borderRadius: 40,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            Commencer maintenant
            <span style={{ marginLeft: 8 }}>→</span>
          </button>
          <button
            onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '12px 28px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 40,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Découvrir les solutions
          </button>
        </div>
      </div>
    </div>
  );
});

// ── Arrow button ──────────────────────────────────────────────────────────────
const NavArrow = memo(({ dir, onClick, accent }) => (
  <button
    onClick={onClick}
    aria-label={dir === 'left' ? 'Précédent' : 'Suivant'}
    style={{ position: 'absolute', top: '50%', [dir === 'left' ? 'left' : 'right']: 24, transform: 'translateY(-50%)', zIndex: 30, width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', color: '#6B7280', cursor: 'pointer', transition: 'all 0.2s ease' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; e.currentTarget.style.boxShadow = `0 4px 12px ${accent}20`; e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
  >
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
));

// ── Main ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { current, goTo, next, back, setPaused, paused } = (() => {
    const count = SLIDES.length;
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const timer = useRef(null);
    const goTo = useCallback((idx) => setCurrent(((idx % count) + count) % count), [count]);
    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const back = useCallback(() => goTo(current - 1), [current, goTo]);
    useEffect(() => { if (paused) return; timer.current = setInterval(next, SLIDE_DURATION); return () => clearInterval(timer.current); }, [paused, next]);
    return { current, goTo, next, back, setPaused, paused };
  })();

  const [slideKey, setSlideKey] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const prevRef = useRef(current);
  useEffect(() => { if (prevRef.current !== current) { setSlideKey(k => k + 1); prevRef.current = current; } }, [current]);

  const slide = SLIDES[current];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=DM+Serif+Display&display=swap" />
      <section
        id="home"
        style={{ position: 'relative', background: 'white', overflow: 'hidden', minHeight: '100svh', fontFamily: "'DM Sans',system-ui,sans-serif" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => { if (!touchStart) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) diff > 0 ? next() : back(); setTouchStart(null); }}
        aria-label="Carrousel principal"
      >
        {/* BANNIÈRE TITRE - PHRASE D'ACCROCHE EN HAUT */}
        <HeroBanner />

        {/* Subtle bg gradient — right side */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: `radial-gradient(ellipse at 100% 50%, ${slide.accentBg} 0%, transparent 70%)`, opacity: 0.6, transition: 'background 0.8s ease', pointerEvents: 'none' }} aria-hidden="true" />

        {/* Content grid */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '40px 80px 60px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', minHeight: 'calc(100svh - 240px)' }}>
          <SlideContent slide={slide} slideKey={slideKey} />
          <ImagePanel slide={slide} slideKey={slideKey} />
        </div>

        {/* Arrows */}
        <NavArrow dir="left"  onClick={back} accent={slide.accent} />
        <NavArrow dir="right" onClick={next} accent={slide.accent} />

        {/* Bottom indicator bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '20px 0', borderTop: '1px solid #F0F2F5', background: 'white', zIndex: 20 }}>
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} aria-label={`Slide ${i + 1} — ${s.badge}`}
              style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: i === current ? '#111827' : '#D1D5DB', transition: 'color 0.2s' }}>
                {s.eyebrow}
              </span>
              <ProgressBar active={i === current} duration={SLIDE_DURATION} paused={paused} />
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default memo(Hero);