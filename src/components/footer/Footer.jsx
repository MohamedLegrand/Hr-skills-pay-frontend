import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-violet-900 text-violet-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
        
        {/* Colonne 1 : Identité */}
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="/images/logo.jpeg"  
              alt="Hr Skill Pay" 
              className="h-12 w-auto transition-transform duration-200 hover:scale-105" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='8' fill='%234C1D95'/%3E%3Ctext x='24' y='32' text-anchor='middle' fill='white' font-size='20' font-weight='bold'%3EH%3C/text%3E%3C/svg%3E";
              }}
            />
            <span className="text-white text-xl font-bold">Hr Skills Pay</span>
          </div>
          <p className="text-sm text-violet-200 leading-relaxed">
            Plateforme sécurisée d'agrégation de paiements pour entreprises et développeurs.
          </p>
          <div className="flex space-x-4 mt-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-violet-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-full p-1"
            >
              <img 
                src="/images/icones/facebook.jpg" 
                alt="Facebook" 
                className="w-6 h-6 rounded-full transition-transform duration-200 hover:scale-110" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/24x24/3B0764/white?text=f";
                }}
              />
            </a>
          </div>
        </div>

        {/* Colonne 2 : Entreprise */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Entreprise</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/aboutus" className="hover:text-white transition-colors duration-200">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Produits & Solutions */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Produits</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/passerelle" className="hover:text-white transition-colors duration-200">Passerelle de paiement</Link></li>
            <li><Link to="/abonnements" className="hover:text-white transition-colors duration-200">Paiement récurrent</Link></li>
          </ul>
        </div>

        {/* Colonne 4 : Ressources */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Ressources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/docs" className="hover:text-white transition-colors duration-200">Documentation API</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors duration-200">FAQ</Link></li>
          </ul>
        </div>

        {/* Colonne 5 : Support & Légal */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/securite" className="hover:text-white transition-colors duration-200">Sécurité</Link></li>
            <li><Link to="/partenaires" className="hover:text-white transition-colors duration-200">Partenaires</Link></li>
            <li><Link to="/mentions" className="hover:text-white transition-colors duration-200">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="hover:text-white transition-colors duration-200">Politique de confidentialité</Link></li>
          </ul>
        </div>

        {/* Colonne 6 : Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-2">
              <svg className="w-4 h-4 mt-0.5 text-violet-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:support@hrskillspay.com" className="hover:text-white transition-colors duration-200 break-all">
                support@hrskillspay.com
              </a>
            </li>
            <li className="flex items-start space-x-2">
              <svg className="w-4 h-4 mt-0.5 text-violet-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+237677246900" className="hover:text-white transition-colors duration-200">
                +237 6 77 24 69 00
              </a>
            </li>
            <li className="flex items-start space-x-2">
              <svg className="w-4 h-4 mt-0.5 text-violet-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Yaoundé, Cameroun</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-violet-800"></div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-violet-200">
        <p>© 2026 Hr Skills Pay. Tous droits réservés.</p>
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <span className="text-xs uppercase tracking-wider">Paiements sécurisés</span>
          <img 
            src="/images/produits/momo.jpg"  
            alt="MTN Mobile Money" 
            className="h-6 w-auto transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/24x24/3B0764/white?text=MTN";
            }}
          />
          <img 
            src="/images/produits/orange.jpg"   
            alt="Orange Money" 
            className="h-6 w-auto transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/24x24/3B0764/white?text=Orange";
            }}
          />
        </div>
      </div>
    </footer>
  );
}