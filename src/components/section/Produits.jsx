// Produits.jsx - Version responsive
import React, { useMemo, useCallback, memo, useState } from 'react';
import { CreditCard, Code2, ShieldCheck, ArrowRight, Link2, Check } from 'lucide-react';

// ============================================================================
//  DONNÉES CENTRALISÉES
// ============================================================================

const PAYMENT_PROVIDERS = [
  {
    id: 'orange-money',
    name: 'Orange Money',
    region: 'Afrique Francophone • 8 pays',
    processingTime: 'Instantané',
    fee: '2.5%',
    features: ['USSD & App mobile', 'API documentée', 'Webhooks temps réel'],
    image: '/images/produits/orange.jpg',
    placeholder: 'https://placehold.co/640x160/fff7ed/7c3aed?text=Orange+Money',
    logoPlaceholder: 'https://placehold.co/48x48/fff7ed/f97316?text=OM',
    accentColor: '#f97316',
    accentBg: '#fff7ed',
    accentBorder: '#fed7aa',
  },
  {
    id: 'mtn-momo',
    name: 'MTN Mobile Money',
    region: 'Afrique Subsaharienne • 12 pays',
    processingTime: '< 3s',
    fee: '2.5%',
    features: ['Bulk payments', 'Reconciliation auto', 'Multi-pays'],
    image: '/images/produits/momo.jpg',
    placeholder: 'https://placehold.co/640x160/fefce8/7c3aed?text=MTN+MoMo',
    logoPlaceholder: 'https://placehold.co/48x48/fefce8/ca8a04?text=MTN',
    accentColor: '#ca8a04',
    accentBg: '#fefce8',
    accentBorder: '#fde68a',
  },
];

const INTEGRATION_SOLUTIONS = [
  {
    id: 'api-developers',
    title: 'API Développeurs',
    icon: Code2,
    image: '/images/produits/api.jpg',
    placeholder: 'https://placehold.co/640x200/eff6ff/7c3aed?text=API+REST',
    description: 'API REST complète avec webhooks et sandbox de test.',
    features: ['OpenAPI docs', 'SDKs 5 langages', 'Webhooks temps réel'],
    timeToLive: '15 min',
    accentColor: '#2563eb',
    accentBg: '#eff6ff',
    accentBorder: '#bfdbfe',
  },
  {
    id: 'payment-links',
    title: 'Liens de Paiement',
    icon: Link2,
    image: '/images/produits/lien_paiement.jpg',
    placeholder: 'https://placehold.co/640x200/fdf4ff/7c3aed?text=Liens+de+Paiement',
    description: 'Créez et partagez un lien de paiement en 30 secondes.',
    features: ['QR dynamique', 'Suivi temps réel', 'Aucun code'],
    timeToLive: '30 sec',
    accentColor: '#9333ea',
    accentBg: '#fdf4ff',
    accentBorder: '#e9d5ff',
  },
];

const SECURITY_PILLARS = [
  { icon: ShieldCheck, label: 'PCI DSS Level 1', desc: 'Certification bancaire' },
  { icon: Code2, label: 'Chiffrement AES-256', desc: 'Protection end-to-end' },
  { icon: ShieldCheck, label: '3D Secure 2.0', desc: 'Authentification forte' },
  { icon: Code2, label: 'Détection fraude IA', desc: 'Analyse en temps réel' },
];

// ============================================================================
//  COMPOSANTS RÉUTILISABLES RESPONSIVES
// ============================================================================

const StatusBadge = memo(() => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 8px',
      borderRadius: 99,
      fontSize: 'clamp(9px, 3vw, 11px)',
      fontWeight: 600,
      background: '#f0fdf4',
      color: '#15803d',
      border: '1px solid #bbf7d0',
    }}
  >
    <span
      style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: '#22c55e',
        display: 'inline-block',
        animation: 'pulse 2s infinite',
      }}
    />
    Actif
  </span>
));
StatusBadge.displayName = 'StatusBadge';

const PaymentProviderCard = memo(({ provider, onActivate }) => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgError, setBgError] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <article
      style={{
        background: '#ffffff',
        border: '1px solid #ede9fe',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow .25s, border-color .25s, transform .2s',
        boxShadow: '0 1px 4px rgba(109,40,217,.06)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(109,40,217,.14)';
        e.currentTarget.style.borderColor = '#c4b5fd';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(109,40,217,.06)';
        e.currentTarget.style.borderColor = '#ede9fe';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      role="listitem"
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(80px, 15vw, 110px)',
          overflow: 'hidden',
          flexShrink: 0,
          background: provider.accentBg,
        }}
      >
        <img
          src={bgError ? provider.placeholder : provider.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onLoad={() => setBgLoaded(true)}
          onError={() => { setBgError(true); setBgLoaded(true); }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: bgLoaded ? 0.18 : 0,
            transition: 'opacity .3s',
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${provider.accentBg}ee 0%, ${provider.accentBg}99 100%)`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(8px, 3vw, 12px) clamp(12px, 4vw, 16px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 3vw, 12px)' }}>
            <div
              style={{
                width: 'clamp(36px, 8vw, 48px)',
                height: 'clamp(36px, 8vw, 48px)',
                borderRadius: 12,
                background: '#ffffff',
                border: `1px solid ${provider.accentBorder}`,
                overflow: 'hidden',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={logoError ? provider.logoPlaceholder : provider.image}
                alt={`Logo ${provider.name}`}
                loading="lazy"
                onLoad={() => setLogoLoaded(true)}
                onError={() => { setLogoError(true); setLogoLoaded(true); }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: 4,
                  opacity: logoLoaded ? 1 : 0,
                  transition: 'opacity .3s',
                }}
              />
            </div>

            <div>
              <h4
                style={{
                  margin: 0,
                  fontSize: 'clamp(13px, 4vw, 15px)',
                  fontWeight: 700,
                  color: '#3b0764',
                  lineHeight: 1.2,
                }}
              >
                {provider.name}
              </h4>
              <p
                style={{
                  margin: '2px 0 0',
                  fontSize: 'clamp(9px, 3vw, 11px)',
                  color: '#7c3aed',
                }}
              >
                {provider.region}
              </p>
            </div>
          </div>

          <StatusBadge />
        </div>
      </div>

      <div
        style={{
          padding: 'clamp(12px, 4vw, 16px)',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          {provider.features.map((feature, idx) => (
            <li
              key={idx}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'clamp(11px, 3.5vw, 13px)', color: '#5b21b6' }}
            >
              <Check
                size={12}
                aria-hidden="true"
                style={{ color: '#7c3aed', flexShrink: 0 }}
              />
              {feature}
            </li>
          ))}
        </ul>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
            padding: 'clamp(8px, 3vw, 12px) 0',
            borderTop: '1px solid #ede9fe',
            borderBottom: '1px solid #ede9fe',
            marginBottom: 12,
          }}
        >
          <div>
            <span style={{ fontSize: 'clamp(8px, 2.5vw, 10px)', color: '#a78bfa', display: 'block', marginBottom: 2 }}>
              Traitement
            </span>
            <p style={{ margin: 0, fontSize: 'clamp(12px, 4vw, 14px)', fontWeight: 700, color: '#4c1d95' }}>
              {provider.processingTime}
            </p>
          </div>
          <div>
            <span style={{ fontSize: 'clamp(8px, 2.5vw, 10px)', color: '#a78bfa', display: 'block', marginBottom: 2 }}>
              Commission
            </span>
            <p style={{ margin: 0, fontSize: 'clamp(12px, 4vw, 14px)', fontWeight: 700, color: '#4c1d95' }}>
              {provider.fee}
            </p>
          </div>
        </div>

        <button
          onClick={() => onActivate?.(provider.id)}
          aria-label={`Activer ${provider.name}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            fontSize: 'clamp(11px, 3.5vw, 13px)',
            fontWeight: 600,
            color: '#7c3aed',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 0',
            width: '100%',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#5b21b6'; e.currentTarget.style.background = '#f5f3ff'; e.currentTarget.style.borderRadius = '8px'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#7c3aed'; e.currentTarget.style.background = 'transparent'; }}
        >
          Activer
          <ArrowRight size={12} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
});
PaymentProviderCard.displayName = 'PaymentProviderCard';

const SolutionCard = memo(({ solution, onExplore }) => {
  const Icon = solution.icon;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <article
      style={{
        background: '#ffffff',
        border: '1px solid #ede9fe',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow .25s, border-color .25s, transform .2s',
        boxShadow: '0 1px 4px rgba(109,40,217,.06)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(109,40,217,.14)';
        e.currentTarget.style.borderColor = '#c4b5fd';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(109,40,217,.06)';
        e.currentTarget.style.borderColor = '#ede9fe';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      role="listitem"
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 5',
          overflow: 'hidden',
          flexShrink: 0,
          background: solution.accentBg,
        }}
      >
        <img
          src={imgError ? solution.placeholder : solution.image}
          alt={`Illustration ${solution.title}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: imgLoaded ? 0.22 : 0,
            transition: 'opacity .3s',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${solution.accentBg}cc, ${solution.accentBg}88)`,
          }}
        >
          <div
            style={{
              width: 'clamp(36px, 8vw, 44px)',
              height: 'clamp(36px, 8vw, 44px)',
              borderRadius: 12,
              background: '#ffffff',
              border: `1px solid ${solution.accentBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${solution.accentColor}22`,
            }}
          >
            <Icon
              size={18}
              aria-hidden="true"
              style={{ color: solution.accentColor }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          padding: 'clamp(12px, 4vw, 16px)',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <h3
            style={{
              margin: 0,
              fontSize: 'clamp(13px, 4vw, 15px)',
              fontWeight: 700,
              color: '#3b0764',
            }}
          >
            {solution.title}
          </h3>
          <span
            style={{
              fontSize: 'clamp(9px, 3vw, 11px)',
              fontWeight: 600,
              color: '#7c3aed',
              marginTop: 2,
              display: 'block',
            }}
          >
            ⚡ {solution.timeToLive}
          </span>
        </div>

        <p
          style={{
            margin: '0 0 10px',
            fontSize: 'clamp(11px, 3.5vw, 13px)',
            color: '#5b21b6',
            lineHeight: 1.5,
          }}
        >
          {solution.description}
        </p>

        <ul
          style={{
            listStyle: 'none',
            margin: '0 0 12px',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            flexGrow: 1,
          }}
        >
          {solution.features.map((feature, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 'clamp(10px, 3vw, 12px)',
                color: '#7c3aed',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#a78bfa',
                  flexShrink: 0,
                }}
              />
              {feature}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onExplore?.(solution.id)}
          aria-label={`En savoir plus sur ${solution.title}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            fontSize: 'clamp(11px, 3.5vw, 13px)',
            fontWeight: 600,
            color: '#7c3aed',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px 0',
            width: '100%',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#5b21b6'; e.currentTarget.style.background = '#f5f3ff'; e.currentTarget.style.borderRadius = '8px'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#7c3aed'; e.currentTarget.style.background = 'transparent'; }}
        >
          Explorer
          <ArrowRight size={12} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
});
SolutionCard.displayName = 'SolutionCard';

const SectionHeading = memo(({ id, icon: Icon, label, aside }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 20,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div
        style={{
          width: 'clamp(30px, 6vw, 34px)',
          height: 'clamp(30px, 6vw, 34px)',
          borderRadius: 10,
          background: '#f5f3ff',
          border: '1px solid #ede9fe',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={14} aria-hidden="true" style={{ color: '#7c3aed' }} />
      </div>
      <h2
        id={id}
        style={{ margin: 0, fontSize: 'clamp(16px, 4.5vw, 18px)', fontWeight: 700, color: '#3b0764' }}
      >
        {label}
      </h2>
    </div>
    {aside && (
      <span style={{ fontSize: 'clamp(10px, 3vw, 12px)', color: '#a78bfa' }}>{aside}</span>
    )}
  </div>
));
SectionHeading.displayName = 'SectionHeading';

// ============================================================================
//  COMPOSANT PRINCIPAL RESPONSIVE
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
    // window.location.href = `/docs/${id}`;
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: .35; }
        }
      `}</style>

      <section
        id="produits"
        aria-labelledby="products-heading"
        style={{
          position: 'relative',
          padding: 'clamp(40px, 10vw, 72px) 0',
          background: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 'clamp(200px, 40vw, 400px)',
            height: 'clamp(200px, 40vw, 400px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ede9fe 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 'clamp(150px, 30vw, 300px)',
            height: 'clamp(150px, 30vw, 300px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #f5f3ff 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 clamp(16px, 5vw, 24px)',
            position: 'relative',
            zIndex: 1,
          }}
        >

          {/* ========== EN-TÊTE ========== */}
          <header style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 64px)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                background: '#f5f3ff',
                border: '1px solid #ddd6fe',
                borderRadius: 99,
                marginBottom: 16,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#7c3aed',
                  display: 'inline-block',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span style={{ fontSize: 'clamp(10px, 3vw, 12px)', fontWeight: 600, color: '#7c3aed', letterSpacing: '.04em' }}>
                Solutions de paiement
              </span>
            </div>

            <h1
              id="products-heading"
              style={{
                margin: '0 0 12px',
                fontSize: 'clamp(24px, 6vw, 42px)',
                fontWeight: 800,
                color: '#3b0764',
                lineHeight: 1.2,
              }}
            >
              Paiements simples,{' '}
              <span style={{ color: '#7c3aed', display: 'inline-block' }}>
                intégration flexible
              </span>
            </h1>

            <p
              style={{
                margin: '0 auto',
                maxWidth: 560,
                fontSize: 'clamp(13px, 4vw, 16px)',
                color: '#6d28d9',
                lineHeight: 1.6,
                padding: '0 12px',
              }}
            >
              Orange Money, MTN MoMo et outils développeurs pour encaisser partout en Afrique.
            </p>
          </header>

          {/* ========== MÉTHODES DE PAIEMENT ========== */}
          <section aria-labelledby="payments-heading" style={{ marginBottom: 'clamp(32px, 8vw, 56px)' }}>
            <SectionHeading
              id="payments-heading"
              icon={CreditCard}
              label="Méthodes de paiement"
              aside="2 partenaires"
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'clamp(16px, 4vw, 20px)',
              }}
              role="list"
            >
              {providers.map((provider) => (
                <PaymentProviderCard
                  key={provider.id}
                  provider={provider}
                  onActivate={handleActivate}
                />
              ))}
            </div>
          </section>

          {/* ========== INTÉGRATION ========== */}
          <section aria-labelledby="integration-heading" style={{ marginBottom: 'clamp(32px, 8vw, 56px)' }}>
            <SectionHeading
              id="integration-heading"
              icon={Code2}
              label="Intégration"
            />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'clamp(16px, 4vw, 20px)',
              }}
              role="list"
            >
              {solutions.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  onExplore={handleExplore}
                />
              ))}
            </div>
          </section>

          {/* ========== SÉCURITÉ ========== */}
          <section aria-labelledby="security-heading" style={{ marginBottom: 'clamp(32px, 8vw, 56px)' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #3b0764 0%, #4c1d95 50%, #1e1b4b 100%)',
                borderRadius: 'clamp(16px, 4vw, 20px)',
                padding: 'clamp(20px, 5vw, 32px) clamp(20px, 5vw, 36px)',
                border: '1px solid #5b21b6',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 6,
                  flexWrap: 'wrap',
                }}
              >
                <ShieldCheck size={18} aria-hidden="true" style={{ color: '#a78bfa' }} />
                <span
                  style={{
                    fontSize: 'clamp(10px, 3vw, 12px)',
                    fontWeight: 600,
                    color: '#c4b5fd',
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  Sécurité enterprise
                </span>
              </div>

              <h2
                id="security-heading"
                style={{
                  margin: '0 0 4px',
                  fontSize: 'clamp(18px, 5vw, 22px)',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                Transactions protégées
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: 'clamp(11px, 3.5vw, 13px)', color: '#a78bfa' }}>
                Infrastructure certifiée et auditée
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'clamp(12px, 3vw, 16px)',
                }}
              >
                {SECURITY_PILLARS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        padding: 'clamp(10px, 3vw, 14px) clamp(12px, 4vw, 16px)',
                        background: 'rgba(255,255,255,.06)',
                        border: '1px solid rgba(167,139,250,.2)',
                        borderRadius: 12,
                      }}
                    >
                      <Icon
                        size={14}
                        aria-hidden="true"
                        style={{ color: '#a78bfa', flexShrink: 0, marginTop: 2 }}
                      />
                      <div>
                        <p style={{ margin: 0, fontSize: 'clamp(11px, 3.5vw, 13px)', fontWeight: 600, color: '#fff' }}>
                          {item.label}
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: 'clamp(9px, 2.5vw, 11px)', color: '#7c6cce' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ========== CTA FINAL ========== */}
          <section style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <a
                  href="/register"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: 'clamp(10px, 3vw, 13px) clamp(20px, 5vw, 28px)',
                    background: '#7c3aed',
                    color: '#ffffff',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 'clamp(12px, 3.5vw, 14px)',
                    textDecoration: 'none',
                    boxShadow: '0 4px 18px rgba(124,58,237,.35)',
                    transition: 'all .2s',
                    flex: '1 0 auto',
                    minWidth: '200px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#6d28d9';
                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,58,237,.45)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#7c3aed';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(124,58,237,.35)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Commencer gratuitement
                  <ArrowRight size={13} aria-hidden="true" />
                </a>

                <a
                  href="/demo"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: 'clamp(10px, 3vw, 13px) clamp(20px, 5vw, 28px)',
                    background: '#ffffff',
                    color: '#5b21b6',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 'clamp(12px, 3.5vw, 14px)',
                    textDecoration: 'none',
                    border: '1.5px solid #ddd6fe',
                    transition: 'all .2s',
                    flex: '1 0 auto',
                    minWidth: '160px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#a78bfa';
                    e.currentTarget.style.background = '#f5f3ff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#ddd6fe';
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Voir la démo
                </a>
              </div>

              <p
                style={{
                  margin: '8px 0 0',
                  fontSize: 'clamp(10px, 3vw, 12px)',
                  color: '#a78bfa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <ShieldCheck size={11} aria-hidden="true" style={{ color: '#7c3aed' }} />
                  PCI DSS
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Check size={11} aria-hidden="true" style={{ color: '#7c3aed' }} />
                  Sans carte requise
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Code2 size={11} aria-hidden="true" style={{ color: '#7c3aed' }} />
                  API docs
                </span>
              </p>
            </div>
          </section>

        </div>
      </section>
    </>
  );
}