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

// ===== SOUS-COMPOSANTS =====

/** Icône de logo de secours quand l'image ne charge pas */
const LogoFallback = () => (
  <div className="w-14 h-14 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white text-base font-medium tracking-wide">
    HSP
  </div>
);

/** Logo */
const Logo = ({ onClick }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <a
      href="#home"
      onClick={(e) => { e.preventDefault(); onClick?.(); scrollToSection("home"); }}
      className="flex items-center gap-2.5 flex-shrink-0 group"
      aria-label="Retour à l'accueil"
    >
      {imgFailed ? (
        <LogoFallback />
      ) : (
        <img
          src="/images/logo.png"
          alt=""
          className="h-14 sm:h-16 w-auto transition-transform group-hover:scale-105"
          loading="eager"
          onError={() => setImgFailed(true)}
        />
      )}
      <span className="text-base sm:text-lg font-medium text-white tracking-tight whitespace-nowrap hidden xs:block">
        Hr Skills <span className="text-white/55">Pay</span>
      </span>
    </a>
  );
};

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
        className={`relative px-3.5 py-2 text-sm rounded-lg transition-all duration-150 ${
          activeId === id
            ? "text-white bg-white/12"
            : "text-white/70 hover:text-white hover:bg-white/8"
        }`}
      >
        {label}
        {activeId === id && (
          <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/70" />
        )}
      </a>
    ))}
  </nav>
);

/** Actions desktop */
const DesktopActions = () => (
  <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
    <button
      className="px-3.5 py-1.5 text-sm text-white/80 hover:text-white hover:bg-white/8
                 rounded-lg transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-white/30"
      onClick={() => (window.location.href = "/login")}
    >
      Connexion
    </button>
    <button
      className="px-4 py-1.5 text-sm font-medium text-violet-900 bg-white
                 hover:bg-violet-50 active:scale-[0.97] rounded-lg transition-all duration-150
                 focus:outline-none focus:ring-2 focus:ring-white/60"
      onClick={() => (window.location.href = "/register")}
    >
      S'inscrire
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
               focus:outline-none focus:ring-1 focus:ring-white/30"
  >
    <span
      className={`block w-5 h-[1.5px] bg-white rounded transition-all duration-200 ${
        isOpen ? "translate-y-[6.5px] rotate-45" : ""
      }`}
    />
    <span
      className={`block w-5 h-[1.5px] bg-white rounded transition-all duration-100 ${
        isOpen ? "opacity-0 scale-x-0" : ""
      }`}
    />
    <span
      className={`block w-5 h-[1.5px] bg-white rounded transition-all duration-200 ${
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
        className="lg:hidden fixed inset-0 top-[84px] z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation mobile"
        className="lg:hidden fixed top-[84px] left-0 right-0 z-50
                   bg-violet-950 border-b border-white/8
                   max-h-[calc(100vh-84px)] overflow-y-auto overscroll-contain"
      >
        <div className="p-4 space-y-1">
          {/* Liens */}
          {NAV_LINKS.map(({ id, href, label }) => (
            <a
              key={id}
              href={href}
              onClick={(e) => { e.preventDefault(); onNavigate(id); }}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[15px] transition-all duration-150
                         border-l-2 ${
                activeId === id
                  ? "bg-white/10 text-white border-white/60"
                  : "text-white/72 hover:text-white hover:bg-white/6 border-transparent"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                activeId === id ? "bg-white" : "bg-white/30"
              }`} />
              {label}
            </a>
          ))}

          {/* Séparateur */}
          <div className="h-px bg-white/10 my-3" />

          {/* Boutons d'action */}
          <div className="grid grid-cols-2 gap-2.5 pb-2">
            <button
              onClick={() => { onClose(); onLogin(); }}
              className="py-3 rounded-xl text-sm text-white/80 bg-white/6
                         border border-white/10 hover:bg-white/10 hover:text-white
                         transition-colors focus:outline-none"
            >
              Connexion
            </button>
            <button
              onClick={() => { onClose(); onRegister(); }}
              className="py-3 rounded-xl text-sm font-medium text-violet-900 bg-white
                         hover:bg-violet-50 active:scale-[0.97] transition-all
                         focus:outline-none"
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

  // Ref pour stocker l'état actuel du menu sans causer de dépendance
  const menuOpenRef = useRef(menuOpen);
  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  const closeMenu    = useCallback(() => setMenuOpen(false), []);
  const handleNav    = useCallback((id) => scrollToSection(id, closeMenu), [closeMenu]);
  const handleLogin  = useCallback(() => { closeMenu(); window.location.href = "/login"; },  [closeMenu]);
  const handleReg    = useCallback(() => { closeMenu(); window.location.href = "/register"; }, [closeMenu]);

  // Fermer le menu si on passe en desktop (sans dépendance à menuOpen)
  useEffect(() => {
    if (isDesktop && menuOpenRef.current) {
      setMenuOpen(false);
    }
  }, [isDesktop]); // Seulement quand isDesktop change

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-violet-900/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-violet-900"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between gap-4 h-[84px]">

          <Logo onClick={closeMenu} />
          <DesktopNav activeId={activeId} onNavigate={handleNav} />
          <DesktopActions />

          {/* Zone droite mobile */}
          <div className="flex lg:hidden items-center gap-1">
            {/* CTA toujours visible sur mobile */}
            <button
              onClick={handleReg}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-violet-900 bg-white
                         rounded-lg hover:bg-violet-50 active:scale-[0.97] transition-all"
            >
              <span className="hidden sm:inline">S'inscrire</span>
              <span className="sm:hidden">+</span>
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