import React, {
  useState, useEffect, useCallback, useRef, memo,
} from 'react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const SLIDE_DURATION = 7000;

const SLIDES = [
  {
    id: 'all-in-one',
    badge: 'Plateforme tout-en-un',
    eyebrow: '01',
    title: ['Tous vos paiements,', 'une seule plateforme.'],
    desc: 'Mobile Money, cartes bancaires, virements SEPA — centralisez tout en un tableau de bord intelligent. Gérez, suivez et encaissez sans friction.',
    cta: 'Commencer gratuitement',
    ctaSub: 'Aucune carte requise · Gratuit 30 jours',
    stats: [{ value: '+12 000', label: 'entreprises actives' }, { value: '99,9 %', label: 'disponibilité' }, { value: '< 2 s', label: 'traitement' }],
    image: '/images/heros/dashbord.jpg',
    icon: '📊',
    accent: '#1E40AF', accentBg: '#EFF4FF', accentText: '#1E3A8A',
  },
  {
    id: 'mobile-money',
    badge: 'Mobile Money',
    eyebrow: '02',
    title: ['MTN, Orange, Wave.', 'Acceptez-les tous.'],
    desc: 'Plus de 80 % des transactions en Afrique subsaharienne passent par le Mobile Money. Intégrez-les en quelques clics et ne ratez plus aucune vente.',
    cta: 'Activer Mobile Money',
    ctaSub: 'Intégration en moins de 10 minutes',
    stats: [{ value: '8+', label: 'opérateurs supportés' }, { value: '0 %', label: "frais d'installation" }, { value: '24/7', label: 'collecte automatique' }],
    image: '/images/heros/paiement_mobile.jpg',
    icon: '📱',
    accent: '#0F5B7A', accentBg: '#EAF4F8', accentText: '#0A4A63',
  },
  {
    id: 'secure',
    badge: 'Sécurité & conformité',
    eyebrow: '03',
    title: ['Vos transactions', 'protégées, certifiées.'],
    desc: 'Chiffrement de bout en bout, authentification à deux facteurs et conformité PCI-DSS niveau 1. Vos clients paient en toute sérénité.',
    cta: 'Découvrir la sécurité',
    ctaSub: 'Certifié PCI-DSS · Chiffrement AES-256',
    stats: [{ value: '0', label: 'incident de sécurité' }, { value: 'PCI-DSS', label: 'niveau 1' }, { value: '256-bit', label: 'chiffrement' }],
    image: '/images/heros/security.jpg',
    icon: '🔒',
    accent: '#2D5A4C', accentBg: '#EDF3F0', accentText: '#1E463B',
  },
  {
    id: 'api',
    badge: 'API & Développeurs',
    eyebrow: '04',
    title: ['Une API pensée', 'pour aller vite.'],
    desc: "Documentation claire, SDKs en Node, Python et PHP, webhooks temps réel et sandbox dédié. Vos développeurs vont l'adorer.",
    cta: 'Explorer la documentation',
    ctaSub: 'SDK disponibles · Sandbox gratuit',
    stats: [{ value: '< 5 min', label: 'premier appel' }, { value: '3', label: 'SDKs officiels' }, { value: '99,9 %', label: 'uptime garanti' }],
    image: '/images/heros/developpeur.jpg',
    icon: '⚡',
    accent: '#7A5C2E', accentBg: '#F7F4EF', accentText: '#5E451C',
  },
  {
    id: 'growth',
    badge: 'Croissance business',
    eyebrow: '05',
    title: ['Encaissez plus.', 'Gérez moins.'],
    desc: 'Relances automatiques, rapports en temps réel, liens de paiement partageables et analytics avancé. Hr Skills Pay, le copilote financier de votre croissance.',
    cta: 'Booster mon business',
    ctaSub: 'Essai gratuit · Sans engagement',
    stats: [{ value: '+34 %', label: 'revenus en moyenne' }, { value: '-60 %', label: 'temps administratif' }, { value: '1 seul', label: 'outil pour tout' }],
    image: '/images/heros/business.jpg',
    icon: '📈',
    accent: '#4A5568', accentBg: '#F1F3F5', accentText: '#2D3748',
  },
];

// ─────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────
const ProgressBar = memo(({ active, duration, paused, accent }) => {
  const [width, setWidth] = useState(0);
  const raf = useRef(null);
  const startRef = useRef(null);
  const elapsed = useRef(0);
  const pausedRef = useRef(paused);

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    if (!active) { setWidth(0); elapsed.current = 0; return; }
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      if (!pausedRef.current) {
        elapsed.current = ts - startRef.current;
        setWidth(Math.min(elapsed.current / duration, 1) * 100);
        if (elapsed.current < duration) raf.current = requestAnimationFrame(tick);
      } else {
        startRef.current = ts - elapsed.current;
        raf.current = requestAnimationFrame(tick);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf.current); startRef.current = null; elapsed.current = 0; };
  }, [active, duration]);

  return (
    <div style={{ height: 2, width: 24, borderRadius: 2, background: '#E5E7EB', overflow: 'hidden' }}>
      {active && (
        <div style={{ height: '100%', width: `${width}%`, background: accent, borderRadius: 2, transition: 'none' }} />
      )}
    </div>
  );
});

// ─────────────────────────────────────────────
// ANIMATED TITLE
// ─────────────────────────────────────────────
const AnimatedTitle = memo(({ lines, slideKey }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [slideKey]);

  return (
    <h1 style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: 'clamp(26px, 4.5vw, 48px)',
      fontWeight: 700,
      lineHeight: 1.18,
      letterSpacing: '-0.02em',
      color: '#0F172A',
      margin: 0,
    }}>
      {lines.map((line, i) => (
        <span key={`${slideKey}-${i}`} style={{ display: 'block', overflow: 'hidden' }}>
          <span style={{
            display: 'block',
            transform: visible ? 'translateY(0)' : 'translateY(110%)',
            opacity: visible ? 1 : 0,
            transition: `transform 0.72s cubic-bezier(0.22,1,0.36,1) ${i * 90}ms, opacity 0.5s ease ${i * 90}ms`,
          }}>
            {i === 1
              ? <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#4B5563' }}>{line}</em>
              : line}
          </span>
        </span>
      ))}
    </h1>
  );
});

// ─────────────────────────────────────────────
// IMAGE PANEL (right side)
// ─────────────────────────────────────────────
const ImagePanel = memo(({ slide, slideKey }) => {
  const [entered, setEntered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setEntered(false); setLoaded(false); setImgError(false);
    const t = setTimeout(() => setEntered(true), 90);
    return () => clearTimeout(t);
  }, [slideKey]);

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        transform: entered ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
        opacity: entered ? 1 : 0,
        transition: 'transform 0.82s cubic-bezier(0.22,1,0.36,1), opacity 0.62s ease',
      }}>
        {/* Accent bg halo */}
        <div style={{
          position: 'absolute',
          inset: '-10px -10px -20px -10px',
          borderRadius: 28,
          background: slide.accentBg,
          zIndex: 0,
          transition: 'background 0.7s ease',
        }} />

        {/* Image frame */}
        <div style={{
          position: 'relative', zIndex: 1,
          borderRadius: 20, overflow: 'hidden',
          aspectRatio: '4/3',
          background: '#F3F4F6',
          boxShadow: '0 32px 64px -16px rgba(0,0,0,0.14), 0 2px 4px rgba(0,0,0,0.04)',
        }}>
          {!loaded && !imgError && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg,#F3F4F6 25%,#E9EAEC 50%,#F3F4F6 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.6s infinite',
            }} />
          )}

          {!imgError ? (
            <img
              key={slideKey}
              src={slide.image}
              alt={slide.badge}
              onLoad={() => setLoaded(true)}
              onError={() => setImgError(true)}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.5s ease',
                animation: loaded ? 'kenBurns 8s ease-out forwards' : 'none',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(135deg, ${slide.accent}DD 0%, ${slide.accent}99 100%)`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 12,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'rgba(255,255,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26,
              }}>{slide.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'white', opacity: 0.9 }}>{slide.badge}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Image en cours de chargement</div>
            </div>
          )}

          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(to top,rgba(0,0,0,0.1),transparent)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Bottom-right info badge */}
        <div style={{
          position: 'absolute', bottom: -14, right: -14, zIndex: 3,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px',
          background: 'white', borderRadius: 14,
          boxShadow: '0 8px 24px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.04)',
          border: '1px solid #F3F4F6',
          transform: entered ? 'translateY(0)' : 'translateY(16px)',
          opacity: entered ? 1 : 0,
          transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.28s, opacity 0.55s ease 0.28s',
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
            background: slide.accentBg, color: slide.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.5s',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>{slide.badge}</div>
            <div style={{ fontSize: 9, color: '#9CA3AF', marginTop: 1 }}>{slide.ctaSub}</div>
          </div>
        </div>

        {/* Top-left eyebrow pill */}
        <div style={{
          position: 'absolute', top: -10, left: -10, zIndex: 3,
          padding: '5px 12px', borderRadius: 99,
          background: slide.accent,
          fontSize: 10, fontWeight: 800, color: 'white',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          boxShadow: `0 4px 12px ${slide.accent}50`,
          transform: entered ? 'translateY(0) rotate(2deg)' : 'translateY(-14px) rotate(2deg)',
          opacity: entered ? 1 : 0,
          transition: 'transform 0.68s cubic-bezier(0.22,1,0.36,1) 0.18s, opacity 0.5s ease 0.18s',
        }}>
          {slide.eyebrow} / 05
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// TEXT CONTENT (left side)
// ─────────────────────────────────────────────
const SlideContent = memo(({ slide, slideKey }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [slideKey]);

  const fade = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Eyebrow */}
      <div style={fade(0)}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: '#9CA3AF', textTransform: 'uppercase' }}>
          {slide.eyebrow} / 05
        </span>
      </div>

      {/* Badge */}
      <div style={fade(40)}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '5px 14px', borderRadius: 99,
          background: slide.accentBg,
          border: `1px solid ${slide.accent}22`,
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.09em', textTransform: 'uppercase',
          color: slide.accentText,
          transition: 'all 0.5s ease',
        }}>
          <span style={{
            display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
            background: slide.accent,
            animation: 'pulseDot 2s infinite',
          }} />
          {slide.badge}
        </span>
      </div>

      {/* Title */}
      <AnimatedTitle lines={slide.title} slideKey={slideKey} />

      {/* Description */}
      <p style={{
        ...fade(200),
        fontSize: 'clamp(13px, 1.6vw, 15px)',
        lineHeight: 1.72,
        color: '#4B5563',
        maxWidth: 460,
        margin: 0,
      }}>
        {slide.desc}
      </p>

      {/* CTAs */}
      <div style={{ ...fade(280), display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={() => (window.location.href = '/register')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '12px 22px',
            background: slide.accent, color: 'white',
            border: 'none', borderRadius: 12,
            fontSize: 'clamp(12px, 1.4vw, 14px)', fontWeight: 700,
            fontFamily: 'inherit', cursor: 'pointer',
            boxShadow: `0 4px 16px ${slide.accent}35`,
            transition: 'filter 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = ''; e.currentTarget.style.transform = ''; }}
        >
          {slide.cta}
          <svg width="13" height="13" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12" />
          </svg>
        </button>

        <button
          onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '12px 20px',
            background: 'white', color: '#374151',
            border: '1.5px solid #E5E7EB', borderRadius: 12,
            fontSize: 'clamp(12px, 1.4vw, 14px)', fontWeight: 600,
            fontFamily: 'inherit', cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = slide.accent;
            e.currentTarget.style.color = slide.accent;
            e.currentTarget.style.background = slide.accentBg;
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.color = '#374151';
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.transform = '';
          }}
        >
          Voir la démo
          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <p style={{ ...fade(330), fontSize: 10, color: '#9CA3AF', fontWeight: 500, margin: 0 }}>{slide.ctaSub}</p>

      {/* Stats */}
      <div style={{
        ...fade(400),
        display: 'flex', flexWrap: 'wrap', gap: '12px 28px',
        paddingTop: 20, borderTop: '1px solid #EEECE8',
      }}>
        {slide.stats.map((s, i) => (
          <div key={i}>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(20px, 3vw, 26px)',
              fontWeight: 700, color: slide.accent, lineHeight: 1,
              transition: 'color 0.5s ease',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────
// NAV ARROW
// ─────────────────────────────────────────────
const NavArrow = memo(({ dir, onClick, accent }) => (
  <button
    onClick={onClick}
    aria-label={dir === 'left' ? 'Précédent' : 'Suivant'}
    style={{
      position: 'absolute',
      top: '50%',
      [dir === 'left' ? 'left' : 'right']: 12,
      transform: 'translateY(-50%)',
      zIndex: 30,
      width: 38, height: 38, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'white', border: '1px solid #E5E7EB',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      color: '#6B7280', cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = accent;
      e.currentTarget.style.color = accent;
      e.currentTarget.style.transform = 'translateY(-50%) scale(1.07)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = '#E5E7EB';
      e.currentTarget.style.color = '#6B7280';
      e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
    }}
  >
    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
));

// ─────────────────────────────────────────────
// MAIN HERO
// ─────────────────────────────────────────────
const Hero = () => {
  const count = SLIDES.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prevRef = useRef(0);
  const touchRef = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent(((idx % count) + count) % count);
  }, [count]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const back = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(t);
  }, [paused, next]);

  useEffect(() => {
    if (prevRef.current !== current) {
      setSlideKey(k => k + 1);
      prevRef.current = current;
    }
  }, [current]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const slide = SLIDES[current];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" />
      <style>{`
        @keyframes pulseDot  { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes kenBurns  { 0%{transform:scale(1.07)} 100%{transform:scale(1)} }
      `}</style>

      <section
        id="home"
        style={{
          position: 'relative',
          background: '#F8F7F4',
          overflow: 'hidden',
          minHeight: '100vh',
          fontFamily: "'Sora', system-ui, sans-serif",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={e => { touchRef.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchRef.current === null) return;
          const diff = touchRef.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) diff > 0 ? next() : back();
          touchRef.current = null;
        }}
        aria-label="Carrousel principal"
      >
        {/* Ambient blobs */}
        <div aria-hidden="true" style={{
          position: 'absolute', width: 480, height: 480, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,64,175,0.07) 0%, transparent 70%)',
          top: -120, left: -80, pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,91,122,0.06) 0%, transparent 70%)',
          bottom: -60, right: 200, pointerEvents: 'none',
        }} />

        {/* ── Grid: TEXT LEFT — IMAGE RIGHT ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          maxWidth: 1200, margin: '0 auto',
          padding: isMobile ? '40px 20px 80px' : '72px 48px 96px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 36 : 56,
          alignItems: 'center',
          minHeight: isMobile ? 'auto' : '100vh',
        }}>
          {/* On mobile: image goes on top */}
          {isMobile && <ImagePanel slide={slide} slideKey={slideKey} />}

          {/* Text — always left on desktop */}
          <SlideContent slide={slide} slideKey={slideKey} />

          {/* Image — right on desktop only */}
          {!isMobile && <ImagePanel slide={slide} slideKey={slideKey} />}
        </div>

        {/* Arrow nav */}
        <NavArrow dir="left" onClick={back} accent={slide.accent} />
        <NavArrow dir="right" onClick={next} accent={slide.accent} />

        {/* Bottom progress nav */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20,
          padding: '14px 0',
          borderTop: '1px solid #EEECE8',
          background: 'rgba(248,247,244,0.92)',
          backdropFilter: 'blur(8px)',
          zIndex: 20,
        }}>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1} — ${s.badge}`}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px',
              }}
            >
              <span style={{
                fontSize: 8, fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: i === current ? '#111827' : '#D1D5DB',
                transition: 'color 0.2s',
              }}>
                {s.eyebrow}
              </span>
              <ProgressBar
                active={i === current}
                duration={SLIDE_DURATION}
                paused={paused}
                accent={s.accent}
              />
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default memo(Hero);