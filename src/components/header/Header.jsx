import { useState } from "react";

const NAV_LINKS = [
  { label: "Produits", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Tarifs", href: "#" },
  { label: "Développeurs", href: "#" },
  { label: "Support", href: "#" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-violet-800 text-white sticky top-0 z-50 shadow-md">
        
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
          
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img 
              src="/images/logo.png" 
              alt="Hr Skill Pay Logo" 
              className="h-12 w-auto"
            />
            {/* Le texte du logo devient blanc pour contraster avec le fond violet-800 */}
            <span className="text-2xl font-bold tracking-wide text-white">
              Hr Skills Pay
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center text-lg font-medium">
            {NAV_LINKS.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="hover:text-violet-200 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6 text-lg">
            
            {/* Langue */}
            <select className="bg-violet-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300">
              <option>FR</option>
              <option>EN</option>
            </select>

            {/* Connexion */}
            <button className="hover:text-violet-200 transition font-medium">
              Se connecter
            </button>

            {/* CTA principal */}
            <button className="bg-white text-violet-800 px-6 py-2 rounded-lg font-semibold hover:bg-violet-100 transition shadow-sm">
              S'inscrire
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-3xl text-white hover:text-violet-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-violet-700 p-6 space-y-6 text-lg text-white shadow-lg">
          
          {NAV_LINKS.map((link, index) => (
            <a key={index} href={link.href} className="block hover:text-violet-200 transition">
              {link.label}
            </a>
          ))}

          <hr className="border-violet-500" />

          <button className="block w-full text-left hover:text-violet-200 transition font-medium">
            Se connecter
          </button>

          <button className="block w-full bg-white text-violet-800 px-4 py-3 rounded-lg font-semibold hover:bg-violet-100 transition text-center">
            S'inscrire
          </button>
        </div>
      )}
    </>
  );
}

export default Header;