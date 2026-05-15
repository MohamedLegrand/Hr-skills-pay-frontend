// Header.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// ===== CONSTANTES =====
const NAV_LINKS = [
  { label: "Accueil",      href: "/",              id: "home", isAnchor: true },
  { label: "Produits",     href: "/#produits",     id: "produits", isAnchor: true },
  { label: "Solutions",    href: "/#solutions",    id: "solutions", isAnchor: true },
  { label: "Tarif",        href: "/#tarif",        id: "tarif", isAnchor: true },
  { label: "Développeurs", href: "/#developpeurs", id: "developpeurs", isAnchor: true }, 
];

const SCROLL_THRESHOLD = 100;

// ===== HOOKS =====

const useActiveSection = (sectionIds) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  useEffect(() => {
    // Si on n'est pas sur la page d'accueil, pas de suivi des sections
    if (!isHomePage) return;

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
  }, [sectionIds, isHomePage]);

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
  
  // Si on est sur la page d'accueil, on scroll directement
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

// ===== LOGO SVG INLINE =====
const LogoMark = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
      </linearGradient>
    </defs>
    
    <rect width="52" height="52" rx="12" fill="url(#logoGrad)" />
    <rect width="52" height="52" rx="12" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />

    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fill="white"
      fontSize="24"
      fontWeight="700"
      fontFamily="'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
      letterSpacing="-0.5"
    >
      H
    </text>

    <rect x="31" y="35" width="12" height="2.5" rx="1.25" fill="rgba(255,255,255,0.5)" />
    <rect x="31" y="40" width="8" height="2.5" rx="1.25" fill="rgba(255,255,255,0.3)" />
  </svg>
);

// ===== SOUS-COMPOSANTS =====

/** Logo principal */
const Logo = ({ onClick }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();
    
    if (pathname === '/') {
      // Déjà sur l'accueil, on scroll en haut
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Sur une autre page, on navigue vers l'accueil
      navigate('/');
      // On scroll après la navigation
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  return (
    <Link
      to="/"
      onClick={handleClick}
      className="flex items-center gap-3 flex-shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl"
      aria-label="Hr Skills Pay — Retour à l'accueil"
    >
      <div className="relative flex-shrink-0">
        {imgFailed ? (
          <div className="transition-transform duration-200 group-hover:scale-[1.04]">
            <LogoMark />
          </div>
        ) : (
          <img
            src="/images/logo.jpeg"
            alt=""
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover
                       ring-1 ring-white/20 shadow-lg
                       transition-transform duration-200 group-hover:scale-[1.04]"
            loading="eager"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-[17px] sm:text-xl font-bold text-white tracking-tight">
          Hr Skills
        </span>
        <span
          className="text-[12px] sm:text-[14px] font-semibold tracking-[0.1em] uppercase"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Pay
        </span>
      </div>
    </Link>
  );
};

/** Navigation desktop */
const DesktopNav = ({ activeId, onNavigate }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  const handleNavigation = (id, href) => {
    onNavigate?.(id);
    
    if (href === '/') {
      // Lien Accueil
      if (isHomePage) {
        scrollToSection('home', () => {});
      } else {
        navigate('/');
        setTimeout(() => scrollToSection('home', () => {}), 100);
      }
    } else {
      // Lien vers une section (#produits, #solutions, etc.)
      const sectionId = href.replace('/#', '');
      
      if (isHomePage) {
        // Déjà sur l'accueil, on scroll directement
        scrollToSection(sectionId, () => {});
      } else {
        // Sur une autre page, on navigue vers l'accueil puis on scroll
        navigate('/');
        setTimeout(() => scrollToSection(sectionId, () => {}), 100);
      }
    }
  };

  return (
    <nav
      className="hidden lg:flex items-center gap-0.5"
      role="navigation"
      aria-label="Navigation principale"
    >
      {NAV_LINKS.map(({ id, href, label }) => (
        <button
          key={id}
          onClick={() => handleNavigation(id, href)}
          aria-current={activeId === id && isHomePage ? "page" : undefined}
          className={`relative px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-150
            focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 ${
            activeId === id && isHomePage
              ? "text-white bg-white/12"
              : "text-white/65 hover:text-white hover:bg-white/8"
          }`}
        >
          {label}
          {activeId === id && isHomePage && (
            <span
              className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[18px] h-[2px] rounded-full"
              style={{ background: "rgba(255,255,255,0.6)" }}
            />
          )}
        </button>
      ))}
    </nav>
  );
};

/** Actions desktop */
const DesktopActions = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
      <button
        className="px-4 py-2 text-[13px] font-medium text-white/75 hover:text-white
                   hover:bg-white/8 rounded-lg transition-all duration-150
                   focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
        onClick={() => navigate("/login")}
      >
        Connexion
      </button>

      <button
        className="relative px-4 py-2 text-[13px] font-semibold rounded-lg
                   transition-all duration-150 active:scale-[0.97]
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                   overflow-hidden group"
        style={{
          background: "rgba(255,255,255,1)",
          color: "#4C1D95",
        }}
        onClick={() => navigate("/register")}
      >
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "rgba(237,233,254,1)" }}
          aria-hidden="true"
        />
        <span className="relative">S'inscrire</span>
      </button>
    </div>
  );
};

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavigation = (id, href) => {
    onClose();
    
    if (href === '/') {
      // Lien Accueil
      if (isHomePage) {
        scrollToSection('home', () => {});
      } else {
        navigate('/');
        setTimeout(() => scrollToSection('home', () => {}), 100);
      }
    } else {
      // Lien vers une section
      const sectionId = href.replace('/#', '');
      
      if (isHomePage) {
        scrollToSection(sectionId, () => {});
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(sectionId, () => {}), 100);
      }
    }
    onNavigate?.(id);
  };

  const handleLoginClick = () => {
    onClose();
    navigate('/login');
    onLogin?.();
  };

  const handleRegisterClick = () => {
    onClose();
    navigate('/register');
    onRegister?.();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="lg:hidden fixed inset-0 top-[72px] z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation mobile"
        className="lg:hidden fixed top-[72px] left-0 right-0 z-50
                   border-b border-white/10
                   max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain"
        style={{ background: "#3B0764" }}
      >
        <div className="p-3 space-y-0.5">

          {NAV_LINKS.map(({ id, href, label }) => (
            <button
              key={id}
              onClick={() => handleNavigation(id, href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium
                         transition-all duration-150 text-left ${
                activeId === id && isHomePage
                  ? "bg-white/12 text-white"
                  : "text-white/65 hover:text-white hover:bg-white/6"
              }`}
            >
              <span
                className={`w-1 h-1 rounded-full flex-shrink-0 transition-all ${
                  activeId === id && isHomePage ? "bg-white scale-125" : "bg-white/25"
                }`}
              />
              {label}
            </button>
          ))}

          <div className="h-px bg-white/10 !my-3 mx-1" />

          <div className="grid grid-cols-2 gap-2 pb-3 px-1">
            <button
              onClick={handleLoginClick}
              className="py-3 rounded-xl text-[13px] font-medium text-white/70
                         border border-white/15 hover:bg-white/8 hover:text-white
                         transition-colors focus:outline-none"
            >
              Connexion
            </button>
            <button
              onClick={handleRegisterClick}
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

/** Séparateur */
const Divider = () => (
  <div className="hidden lg:block h-5 w-px bg-white/15 mx-1 flex-shrink-0" aria-hidden="true" />
);

// ===== COMPOSANT PRINCIPAL =====

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isScrolled = useScrolled();
  const sectionIds = NAV_LINKS.map((l) => l.id);
  const activeId = useActiveSection(sectionIds);
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  const menuOpenRef = useRef(menuOpen);
  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

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
          ? "rgba(76,29,149,0.97)"
          : "#4C1D95",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
      }}
    >
      {isScrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)" }}
          aria-hidden="true"
        />
      )}

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-[80px]">

          <Logo onClick={closeMenu} />

          <DesktopNav activeId={activeId} onNavigate={closeMenu} />

          <div className="hidden lg:flex items-center gap-1">
            <Divider />
            <DesktopActions />
          </div>

          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={() => { closeMenu(); window.location.href = "/register"; }}
              className="px-3 py-1.5 text-[12px] sm:text-[13px] font-semibold rounded-lg
                         active:scale-[0.97] transition-all whitespace-nowrap"
              style={{ background: "white", color: "#4C1D95" }}
            >
              S'inscrire
            </button>
            <HamburgerButton isOpen={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
          </div>

        </div>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        activeId={activeId}
        onNavigate={closeMenu}
        onClose={closeMenu}
        onLogin={closeMenu}
        onRegister={closeMenu}
      />
    </header>
  );
};

export default Header;