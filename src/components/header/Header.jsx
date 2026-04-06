// Header.jsx
import { useState, useEffect, useCallback } from "react";

// ===== CONSTANTES =====
const NAV_LINKS = [
  { label: "Accueil", href: "#home", id: "home" },
  { label: "Produits", href: "#produits", id: "produits" },
  { label: "Solutions", href: "#solutions", id: "solutions" },
  { label: "Tarifs", href: "#tarifs", id: "tarifs" },
  { label: "Développeurs", href: "#developpeurs", id: "developpeurs" },
 
];

const HEADER_HEIGHT = { mobile: 64, tablet: 72, desktop: 80 };
const SCROLL_THRESHOLD = 100;

// ===== HOOK : Détection de section active =====
const useActiveSection = (sectionIds, threshold = SCROLL_THRESHOLD) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + threshold;
          
          for (const id of sectionIds) {
            const element = document.getElementById(id);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveId(id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, threshold]);

  return activeId;
};

// ===== HOOK : Gestion de la taille d'écran =====
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

// ===== FONCTION DE SCROLL =====
const scrollToSection = (id, closeMenuCallback) => {
  if (closeMenuCallback) closeMenuCallback();

  const getHeaderOffset = () => {
    if (window.innerWidth < 640) return HEADER_HEIGHT.mobile + 8;
    if (window.innerWidth < 1024) return HEADER_HEIGHT.tablet + 8;
    return HEADER_HEIGHT.desktop + 8;
  };

  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - getHeaderOffset();
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
};

// ===== SOUS-COMPOSANTS =====

// 🎯 Logo
const Logo = ({ onClick }) => (
  <a
    href="#home"
    onClick={(e) => {
      e.preventDefault();
      onClick?.();
      scrollToSection("home");
    }}
    className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0"
    aria-label="Retour à l'accueil"
  >
    <div className="relative">
      <img
        src="/images/logo.png"
        alt="Hr Skill Pay Logo"
        className="h-8 sm:h-10 lg:h-12 w-auto transition-transform group-hover:scale-105"
        loading="eager"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling?.classList.remove('hidden');
        }}
      />
      <div className="hidden absolute inset-0 bg-gradient-to-br from-violet-600 to-violet-800 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">
        HSP
      </div>
    </div>
    <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white whitespace-nowrap">
      Hr Skills Pay
    </span>
  </a>
);

// 🖥️ Navigation Desktop
const DesktopNav = ({ activeId, onNavigate }) => (
  <nav className="hidden lg:flex items-center gap-1 xl:gap-2" role="navigation" aria-label="Navigation principale">
    {NAV_LINKS.map((link) => (
      <a
        key={link.id}
        href={link.href}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(link.id);
        }}
        className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
          activeId === link.id
            ? "text-white bg-violet-700/50"
            : "text-violet-100 hover:text-white hover:bg-violet-700/30"
        }`}
        aria-current={activeId === link.id ? "page" : undefined}
      >
        {link.label}
        {activeId === link.id && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
        )}
      </a>
    ))}
  </nav>
);

// 🎛️ Actions Desktop (lg+)
const DesktopActions = () => (
  <div className="hidden lg:flex items-center gap-3 xl:gap-4" role="group" aria-label="Actions utilisateur">
    <div className="relative">
      <select
        className="appearance-none bg-violet-700/50 text-white px-3 py-2 pr-8 rounded-lg text-sm font-medium 
                   focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-violet-800 
                   cursor-pointer hover:bg-violet-700 transition"
        defaultValue="FR"
        aria-label="Changer de langue"
      >
        <option value="FR" className="bg-violet-800">FR</option>
        <option value="EN" className="bg-violet-800">EN</option>
      </select>
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-violet-200 pointer-events-none text-xs">
        ▾
      </span>
    </div>

    <span className="w-px h-6 bg-violet-600/50" aria-hidden="true" />

    <button
      className="text-sm font-medium text-violet-100 hover:text-white transition-colors px-3 py-2 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-violet-300"
      onClick={() => (window.location.href = "/login")}
      aria-label="Se connecter"
    >
      Connexion
    </button>

    <button
      className="bg-white text-violet-900 px-4 py-2 rounded-lg font-semibold text-sm 
                 hover:bg-violet-50 active:scale-95 transition-all duration-150 
                 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-800
                 shadow-sm hover:shadow"
      onClick={() => (window.location.href = "/register")}
      aria-label="Créer un compte"
    >
      S'inscrire
    </button>
  </div>
);

// 📱 Actions Mobile (toujours visibles)
const MobileActions = ({ onLogin, onRegister }) => (
  <div className="flex lg:hidden items-center gap-2" role="group" aria-label="Actions utilisateur">
    {/* Bouton Connexion - version compacte */}
    <button
      className="hidden xs:block px-3 py-2 text-sm font-medium text-violet-100 hover:text-white 
                 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
      onClick={onLogin}
      aria-label="Se connecter"
    >
      Connexion
    </button>
    
    {/* Bouton S'inscrire - toujours visible, priorité CTA */}
    <button
      className="bg-white text-violet-900 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm
                 hover:bg-violet-50 active:scale-95 transition-all duration-150
                 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-800
                 shadow-sm whitespace-nowrap"
      onClick={onRegister}
      aria-label="Créer un compte"
    >
      <span className="hidden sm:inline">S'inscrire</span>
      <span className="sm:hidden">+</span>
    </button>
  </div>
);

// 📱 Navigation Mobile/Tablette (overlay menu)
const MobileNav = ({ isOpen, activeId, onNavigate, onClose, onLogin, onRegister }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        className="lg:hidden fixed top-[64px] left-0 right-0 z-30 bg-violet-800 
                   max-h-[calc(100vh-64px)] overflow-y-auto overscroll-contain"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <div className="p-4 sm:p-6 space-y-2">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.id);
              }}
              className={`flex items-center gap-3 py-3.5 px-4 rounded-xl text-base font-medium transition-all duration-150
                         ${activeId === link.id
                           ? "bg-white/10 text-white border-l-4 border-white"
                           : "text-violet-100 hover:bg-white/5 hover:text-white border-l-4 border-transparent"
                         }`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <span className={`w-2 h-2 rounded-full ${activeId === link.id ? 'bg-white' : 'bg-violet-400/50'}`} />
              {link.label}
            </a>
          ))}

          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent my-4" />

          {/* Sélecteur de langue mobile */}
          <div className="px-2 py-3">
            <label className="block text-xs font-medium text-violet-300 mb-2 uppercase tracking-wider">
              Langue
            </label>
            <select
              className="w-full bg-violet-700/50 text-white px-4 py-3 rounded-xl text-base font-medium
                         focus:outline-none focus:ring-2 focus:ring-violet-300"
              defaultValue="FR"
              aria-label="Changer de langue"
            >
              <option value="FR" className="bg-violet-800">🇫🇷 Français</option>
              <option value="EN" className="bg-violet-800">🇬🇧 English</option>
            </select>
          </div>

          {/* Boutons d'action dans le menu (redondants mais pratiques) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              className="py-3 px-4 rounded-xl font-medium text-violet-100 bg-white/5 
                         hover:bg-white/10 hover:text-white transition-colors
                         focus:outline-none focus:ring-2 focus:ring-violet-300"
              onClick={() => { onClose(); onLogin(); }}
            >
              Connexion
            </button>
            <button
              className="py-3 px-4 rounded-xl font-semibold bg-white text-violet-900
                         hover:bg-violet-50 active:scale-95 transition-all
                         focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => { onClose(); onRegister(); }}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// 🍔 Bouton menu hamburger
const MobileMenuButton = ({ isOpen, onClick }) => (
  <button
    className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg 
               text-white hover:bg-violet-700/50 active:scale-95 transition-all
               focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-violet-800
               flex-shrink-0"
    onClick={onClick}
    aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
  >
    <span className="sr-only">{isOpen ? "Fermer" : "Ouvrir"} le menu</span>
    <div className="relative w-5 h-4">
      <span className={`absolute left-0 w-5 h-0.5 bg-current rounded transition-all duration-200 ${isOpen ? 'top-2 rotate-45' : 'top-0'}`} />
      <span className={`absolute left-0 top-1.5 w-5 h-0.5 bg-current rounded transition-opacity duration-100 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
      <span className={`absolute left-0 w-5 h-0.5 bg-current rounded transition-all duration-200 ${isOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
    </div>
  </button>
);

// ===== COMPOSANT PRINCIPAL =====
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  const sectionIds = NAV_LINKS.map((link) => link.id);
  const activeSection = useActiveSection(sectionIds);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  
  const handleNavigate = useCallback((sectionId) => {
    scrollToSection(sectionId, closeMobileMenu);
  }, [closeMobileMenu]);

  const handleLogin = useCallback(() => {
    closeMobileMenu();
    window.location.href = "/login";
  }, [closeMobileMenu]);

  const handleRegister = useCallback(() => {
    closeMobileMenu();
    window.location.href = "/register";
  }, [closeMobileMenu]);

  // Fermer le menu au redimensionnement vers desktop
  useEffect(() => {
    if (isDesktop && isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, [isDesktop, isMobileMenuOpen, closeMobileMenu]);

  // Gestion du scroll pour effet de header
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 
                 ${isScrolled 
                   ? 'bg-violet-900/95 backdrop-blur-md shadow-lg shadow-violet-900/20' 
                   : 'bg-violet-800 shadow-md'
                 }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          
          {/* Logo - gauche */}
          <Logo onClick={closeMobileMenu} />

          {/* Navigation Desktop - centre */}
          <DesktopNav activeId={activeSection} onNavigate={handleNavigate} />
          
          {/* Actions Desktop - droite */}
          <DesktopActions />

          {/* Zone droite mobile : Actions + Menu */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2">
            <MobileActions onLogin={handleLogin} onRegister={handleRegister} />
            <MobileMenuButton 
              isOpen={isMobileMenuOpen} 
              onClick={() => setIsMobileMenuOpen(prev => !prev)} 
            />
          </div>
        </div>
      </div>

      {/* Menu Mobile/Tablette */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        activeId={activeSection}
        onNavigate={handleNavigate}
        onClose={closeMobileMenu}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </header>
  );
};

export default Header;