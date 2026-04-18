// Header.jsx
import { useState, useEffect, useCallback, useRef } from "react";

// ===== CONSTANTES =====
const NAV_LINKS = [
  { label: "Accueil",      href: "#home",         id: "home" },
  { label: "Produits",     href: "#produits",     id: "produits" },
  { label: "Solutions",    href: "#solutions",    id: "solutions" },
  { label: "Tarifs",       href: "#tarifs",       id: "tarifs" },
  { label: "Développeurs", href: "#developpeurs", id: "developpeurs" },
];

const SCROLL_THRESHOLD = 100;

// ===== HOOKS =====

const useActiveSection = (sectionIds) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const pos = window.scrollY + SCROLL_THRESHOLD;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
            setActiveId(id);
            break;
          }
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return activeId;
};

const useScrolled = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
};

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
};

// ===== UTILITAIRE =====

const scrollToSection = (id, closeMenu) => {
  closeMenu?.();
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const offset = window.innerWidth < 640 ? 72 : window.innerWidth < 1024 ? 80 : 88;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.pageYOffset - offset,
    behavior: "smooth",
  });
};

// ===== LOGO SVG INLINE (fallback propre) =====
/**
 * Logo vectoriel HSP — utilisé quand /images/logo.jpeg ne charge pas.
 * Dessiné avec un monogramme + une typographie soignée.
 */
const LogoMark = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Fond avec légère transparence */}
    <rect width="40" height="40" rx="10" fill="rgba(255,255,255,0.15)" />
    <rect width="40" height="40" rx="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

    {/* Lettre H stylisée */}
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fill="white"
      fontSize="18"
      fontWeight="600"
      fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
      letterSpacing="-0.5"
    >
      H
    </text>

    {/* Accent décoratif — trait en bas à droite */}
    <rect x="24" y="27" width="10" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
  </svg>
);

// ===== SOUS-COMPOSANTS =====

/** Logo principal */
const Logo = ({ onClick }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <a
      href="#home"
      onClick={(e) => { e.preventDefault(); onClick?.(); scrollToSection("home"); }}
      className="flex items-center gap-3 flex-shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl"
      aria-label="Hr Skills Pay — Retour à l'accueil"
    >
      {/* Conteneur image / fallback */}
      <div className="relative flex-shrink-0">
        {imgFailed ? (
          /* Fallback SVG propre */
          <div className="transition-transform duration-200 group-hover:scale-[1.04]">
            <LogoMark />
          </div>
        ) : (
          <img
            src="/images/logo.jpeg"
            alt=""
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl object-cover
                       ring-1 ring-white/20
                       transition-transform duration-200 group-hover:scale-[1.04]"
            loading="eager"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      {/* Wordmark */}
      <div className="hidden xs:flex flex-col leading-none">
        <span className="text-[15px] sm:text-base font-semibold text-white tracking-tight">
          Hr Skills
        </span>
        <span
          className="text-[11px] sm:text-[12px] font-medium tracking-[0.08em] uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Pay
        </span>
      </div>
    </a>
  );
};

/** Séparateur vertical léger */
const Divider = () => (
  <div className="hidden lg:block h-5 w-px bg-white/15 mx-1 flex-shrink-0" aria-hidden="true" />
);

/** Navigation desktop */
const DesktopNav = ({ activeId, onNavigate }) => (
  <nav
    className="hidden lg:flex items-center gap-0.5"
    role="navigation"
    aria-label="Navigation principale"
  >
    {NAV_LINKS.map(({ id, href, label }) => (
      <a
        key={id}
        href={href}
        onClick={(e) => { e.preventDefault(); onNavigate(id); }}
        aria-current={activeId === id ? "page" : undefined}
        className={`relative px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-150
          focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 ${
          activeId === id
            ? "text-white bg-white/12"
            : "text-white/65 hover:text-white hover:bg-white/8"
        }`}
      >
        {label}
        {activeId === id && (
          <span
            className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[18px] h-[2px] rounded-full"
            style={{ background: "rgba(255,255,255,0.6)" }}
          />
        )}
      </a>
    ))}
  </nav>
);

/** Actions desktop */
const DesktopActions = () => (
  <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
    <button
      className="px-4 py-2 text-[13px] font-medium text-white/75 hover:text-white
                 hover:bg-white/8 rounded-lg transition-all duration-150
                 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
      onClick={() => (window.location.href = "/login")}
    >
      Connexion
    </button>

    {/* CTA principal */}
    <button
      className="relative px-4 py-2 text-[13px] font-semibold rounded-lg
                 transition-all duration-150 active:scale-[0.97]
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                 overflow-hidden group"
      style={{
        background: "rgba(255,255,255,1)",
        color: "#4C1D95", /* violet-900 */
      }}
      onClick={() => (window.location.href = "/register")}
    >
      {/* Shimmer au hover */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "rgba(237,233,254,1)" }}
        aria-hidden="true"
      />
      <span className="relative">S'inscrire</span>
    </button>
  </div>
);

/** Bouton hamburger */
const HamburgerButton = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    aria-expanded={isOpen}
    aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
    className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]
               rounded-lg hover:bg-white/8 active:scale-95 transition-all flex-shrink-0
               focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
  >
    <span
      className={`block w-[18px] h-[1.5px] bg-white rounded-full transition-all duration-200 origin-center ${
        isOpen ? "translate-y-[6.5px] rotate-45" : ""
      }`}
    />
    <span
      className={`block w-[18px] h-[1.5px] bg-white rounded-full transition-all duration-150 ${
        isOpen ? "opacity-0 scale-x-0" : ""
      }`}
    />
    <span
      className={`block w-[18px] h-[1.5px] bg-white rounded-full transition-all duration-200 origin-center ${
        isOpen ? "-translate-y-[6.5px] -rotate-45" : ""
      }`}
    />
  </button>
);

/** Menu mobile */
const MobileMenu = ({ isOpen, activeId, onNavigate, onClose, onLogin, onRegister }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="lg:hidden fixed inset-0 top-[72px] z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation mobile"
        className="lg:hidden fixed top-[72px] left-0 right-0 z-50
                   border-b border-white/10
                   max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain"
        style={{ background: "#3B0764" /* violet-950 proche */ }}
      >
        <div className="p-3 space-y-0.5">

          {/* Liens */}
          {NAV_LINKS.map(({ id, href, label }) => (
            <a
              key={id}
              href={href}
              onClick={(e) => { e.preventDefault(); onNavigate(id); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium
                         transition-all duration-150 ${
                activeId === id
                  ? "bg-white/12 text-white"
                  : "text-white/65 hover:text-white hover:bg-white/6"
              }`}
            >
              {/* Indicateur actif */}
              <span
                className={`w-1 h-1 rounded-full flex-shrink-0 transition-all ${
                  activeId === id ? "bg-white scale-125" : "bg-white/25"
                }`}
              />
              {label}
            </a>
          ))}

          {/* Séparateur */}
          <div className="h-px bg-white/10 !my-3 mx-1" />

          {/* Boutons */}
          <div className="grid grid-cols-2 gap-2 pb-3 px-1">
            <button
              onClick={() => { onClose(); onLogin(); }}
              className="py-3 rounded-xl text-[13px] font-medium text-white/70
                         border border-white/15 hover:bg-white/8 hover:text-white
                         transition-colors focus:outline-none"
            >
              Connexion
            </button>
            <button
              onClick={() => { onClose(); onRegister(); }}
              className="py-3 rounded-xl text-[13px] font-semibold active:scale-[0.97]
                         transition-all focus:outline-none"
              style={{ background: "white", color: "#4C1D95" }}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// ===== COMPOSANT PRINCIPAL =====

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop  = useMediaQuery("(min-width: 1024px)");
  const isScrolled = useScrolled();
  const sectionIds = NAV_LINKS.map((l) => l.id);
  const activeId   = useActiveSection(sectionIds);

  const menuOpenRef = useRef(menuOpen);
  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const handleNav = useCallback((id) => scrollToSection(id, closeMenu), [closeMenu]);
  const handleLogin  = useCallback(() => { closeMenu(); window.location.href = "/login"; },    [closeMenu]);
  const handleReg    = useCallback(() => { closeMenu(); window.location.href = "/register"; }, [closeMenu]);

  useEffect(() => {
    if (isDesktop && menuOpenRef.current) setMenuOpen(false);
  }, [isDesktop]);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "shadow-[0_1px_0_0_rgba(255,255,255,0.07),0_4px_24px_0_rgba(0,0,0,0.25)]"
          : ""
      }`}
      style={{
        background: isScrolled
          ? "rgba(76,29,149,0.97)" /* violet-900 avec légère transparence */
          : "#4C1D95",             /* violet-900 plein */
        backdropFilter: isScrolled ? "blur(12px)" : "none",
      }}
    >
      {/* Ligne décorative subtile en haut */}
      {isScrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)" }}
          aria-hidden="true"
        />
      )}

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-[72px]">

          <Logo onClick={closeMenu} />

          <DesktopNav activeId={activeId} onNavigate={handleNav} />

          <div className="hidden lg:flex items-center gap-1">
            <Divider />
            <DesktopActions />
          </div>

          {/* Zone droite mobile */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={handleReg}
              className="px-3 py-1.5 text-[12px] sm:text-[13px] font-semibold rounded-lg
                         active:scale-[0.97] transition-all"
              style={{ background: "white", color: "#4C1D95" }}
            >
              <span className="hidden sm:inline">S'inscrire</span>
              <span className="sm:hidden">S'inscrire</span>
            </button>
            <HamburgerButton isOpen={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
          </div>

        </div>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        activeId={activeId}
        onNavigate={handleNav}
        onClose={closeMenu}
        onLogin={handleLogin}
        onRegister={handleReg}
      />
    </header>
  );
};

export default Header;