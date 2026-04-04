import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Accueil", href: "#home", id: "home" },
  { label: "Produits", href: "#produits", id: "produits" },
  { label: "Solutions", href: "#solutions", id: "solutions" },
  { label: "Tarifs", href: "#tarifs", id: "tarifs" },
  { label: "Développeurs", href: "#developpeurs", id: "developpeurs" },
  { label: "Support", href: "#support", id: "support" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Fonction de scroll fiable
  const scrollToSection = (id) => {
    // Fermer le menu mobile
    setIsOpen(false);

    if (id === "home") {
      // Scroll vers le haut de la page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll vers la section avec offset pour le header sticky
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80; // Hauteur du header + marge
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  // Détection de la section active au scroll (pour highlight du menu)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset pour déclenchement

      for (const link of NAV_LINKS) {
        const element = document.getElementById(link.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="bg-violet-800 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4 lg:p-6">
          
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
            className="flex items-center space-x-4 cursor-pointer"
          >
            <img 
              src="/images/logo.png" 
              alt="Hr Skill Pay Logo" 
              className="h-10 lg:h-12 w-auto"
              onError={(e) => { e.target.src = "https://placehold.co/48x48/7c3aed/ffffff?text=HSP"; }}
            />
            <span className="text-xl lg:text-2xl font-bold tracking-wide text-white">
              Hr Skills Pay
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8 items-center text-sm lg:text-lg font-medium">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.id} 
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className={`transition cursor-pointer relative pb-1 ${
                  activeSection === link.id 
                    ? "text-white border-b-2 border-white" 
                    : "text-violet-200 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-sm lg:text-lg">
            
            {/* Langue */}
            <select 
              className="bg-violet-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300 cursor-pointer"
              defaultValue="FR"
            >
              <option value="FR">FR</option>
              <option value="EN">EN</option>
            </select>

            {/* Connexion */}
            <button 
              className="hover:text-violet-200 transition font-medium"
              onClick={() => window.location.href = "/login"}
            >
              Se connecter
            </button>

            {/* CTA principal */}
            <button 
              className="bg-white text-violet-800 px-5 lg:px-6 py-2 rounded-lg font-semibold hover:bg-violet-100 transition shadow-sm"
              onClick={() => window.location.href = "/signup"}
            >
              S'inscrire
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-3xl text-white hover:text-violet-200 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-16 left-0 right-0 z-30 bg-violet-800 text-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="p-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.id} 
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
              className={`block py-3 px-4 rounded-lg transition ${
                activeSection === link.id 
                  ? "bg-violet-700 text-white" 
                  : "text-violet-200 hover:bg-violet-700 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}

          <hr className="border-violet-600 my-4" />

          <button 
            className="w-full text-left py-3 px-4 text-violet-200 hover:text-white transition"
            onClick={() => { setIsOpen(false); window.location.href = "/login"; }}
          >
            Se connecter
          </button>

          <button 
            className="w-full bg-white text-violet-800 px-4 py-3 rounded-lg font-semibold hover:bg-violet-100 transition text-center"
            onClick={() => { setIsOpen(false); window.location.href = "/signup"; }}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;