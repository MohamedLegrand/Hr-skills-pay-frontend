export default function Footer() {
  return (
    <footer className="bg-violet-900 text-violet-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
        
        {/* Colonne 1 : Identité */}
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <img src="/images/logo.png" alt="Hr Skill Pay" className="h-10 w-auto" />
            <span className="text-white text-xl font-bold">Hr Skills Pay</span>
          </div>
          <p className="text-sm text-violet-200 leading-relaxed">
            Plateforme sécurisée d’agrégation de paiements pour entreprises et développeurs.
          </p>
          <div className="flex space-x-4 mt-6">
            {/* Réseaux sociaux : ombre au survol */}
            <a href="#" className="text-violet-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-full p-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="#" className="text-violet-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-full p-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.674-11.51c0-.21-.005-.42-.014-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="text-violet-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-full p-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/></svg>
            </a>
          </div>
        </div>

        {/* Colonne 2 : Entreprise */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Entreprise</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/a-propos" className="hover:text-white transition">À propos</a></li>
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            <li><a href="/carrieres" className="hover:text-white transition">Carrières</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Colonne 3 : Produits & Solutions */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Produits</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/passerelle" className="hover:text-white transition">Passerelle de paiement</a></li>
            <li><a href="/abonnements" className="hover:text-white transition">Paiement récurrent</a></li>
            <li><a href="/facturation" className="hover:text-white transition">Facturation électronique</a></li>
            <li><a href="/marketplace" className="hover:text-white transition">Marketplace</a></li>
          </ul>
        </div>

        {/* Colonne 4 : Ressources */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Ressources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/docs" className="hover:text-white transition">Documentation API</a></li>
            <li><a href="/statut" className="hover:text-white transition">Statut du service</a></li>
            <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
            <li><a href="/telechargement" className="hover:text-white transition">Télécharger l'application</a></li>
          </ul>
        </div>

        {/* Colonne 5 : Support & Légal */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/centre-aide" className="hover:text-white transition">Centre d'aide</a></li>
            <li><a href="/securite" className="hover:text-white transition">Sécurité</a></li>
            <li><a href="/partenaires" className="hover:text-white transition">Partenaires</a></li>
            <li><a href="/legal/mentions-legales" className="hover:text-white transition">Mentions légales</a></li>
            <li><a href="/legal/cgv" className="hover:text-white transition">CGV</a></li>
            <li><a href="/legal/confidentialite" className="hover:text-white transition">Politique de confidentialité</a></li>
          </ul>
        </div>

        {/* Colonne 6 : Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-2">
              <svg className="w-4 h-4 mt-0.5 text-violet-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>support@hrskillspay.com</span>
            </li>
            <li className="flex items-start space-x-2">
              <svg className="w-4 h-4 mt-0.5 text-violet-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span>+237 6 77 24 69 00</span> 
            </li>
            <li className="flex items-start space-x-2">
              <svg className="w-4 h-4 mt-0.5 text-violet-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Yaounde, Cameroun</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-violet-800"></div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-violet-200">
        <p>© 2026 Hr Skill Pay. Tous droits réservés.</p>
        <div className="flex flex-wrap justify-center gap-4 items-center">
          <span className="text-xs uppercase tracking-wider">Paiements sécurisés</span>
          {/* Ombre au survol sur chaque icône de paiement */}
          <img src="/icons/visa.svg" alt="Visa" className="h-5 w-auto transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-md" />
          <img src="/icons/mastercard.svg" alt="Mastercard" className="h-5 w-auto transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-md" />
          <img src="/icons/mtn.png" alt="MTN" className="h-5 w-auto transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-md" />
          <img src="/icons/orange.png" alt="Orange" className="h-5 w-auto transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-md" />
          <img src="/icons/ssl.png" alt="SSL" className="h-5 w-auto transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/30 rounded-md" />
        </div>
      </div>
    </footer>
  );
}