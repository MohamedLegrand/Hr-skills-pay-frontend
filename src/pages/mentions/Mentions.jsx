import React from 'react';
import { 
  Building2, Mail, Phone, MapPin, Shield, FileText,
  Cookie, CreditCard, User, Globe, Scale, ExternalLink,
  ChevronDown, ChevronUp, CheckCircle, AlertCircle
} from 'lucide-react';

const Mentions = () => {
  const [openSection, setOpenSection] = React.useState('company');

  // Informations entreprise 
  const company = { 
    name: 'Hr Skills Pay',
    legalName: 'Hr Skills Pay SARL', 
    registration: 'RCCM CM/DOU/2024/B/12345',
    capital: '10 000 000 FCFA',
    address: 'Akwa, Rue des Palmiers, Immeuble Le Prestige, Douala, Cameroun',
    phone: '+237 6XX XXX XXX',
    email: 'contact@hrskillspay.com',
    tva: 'CM24XXXXXXXXX'
  };

  // Hébergement
  const hosting = {
    provider: 'Amazon Web Services (AWS)',
    address: '41 Avenue Montaigne, 75008 Paris, France',
    phone: '+33 1 44 94 50 50',
    website: 'https://aws.amazon.com'
  };

  // Directeur publication
  const director = {
    name: 'Jean-Pierre MBALLA',
    role: 'CEO & Directeur de Publication',
    email: 'direction@hrskillspay.com'
  };

  // Sections des mentions légales
  const sections = [
    {
      id: 'company',
      title: 'Informations sur l\'entreprise',
      icon: Building2,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-violet-50 rounded-xl">
              <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Dénomination sociale</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 break-words">{company.legalName}</p>
            </div>
            <div className="p-3 sm:p-4 bg-violet-50 rounded-xl">
              <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Nom commercial</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900">{company.name}</p>
            </div>
            <div className="p-3 sm:p-4 bg-violet-50 rounded-xl">
              <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Capital social</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900">{company.capital}</p>
            </div>
            <div className="p-3 sm:p-4 bg-violet-50 rounded-xl">
              <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Numéro RCCM</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-900">{company.registration}</p>
            </div>
          </div>
          
          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Siège social</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-600 flex-shrink-0" />
              <span className="break-words">{company.address}</span>
            </p>
          </div>

          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Numéro d'identification fiscale</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">{company.tva}</p>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact & Support',
      icon: Mail,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <a href={`mailto:${company.email}`} className="p-3 sm:p-4 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors group text-center sm:text-left">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 mb-2 group-hover:scale-110 transition-transform mx-auto sm:mx-0" />
              <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Email</p>
              <p className="text-[10px] sm:text-sm font-semibold text-slate-900 break-all">{company.email}</p>
            </a>
            <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="p-3 sm:p-4 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors group text-center sm:text-left">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 mb-2 group-hover:scale-110 transition-transform mx-auto sm:mx-0" />
              <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Téléphone</p>
              <p className="text-[10px] sm:text-sm font-semibold text-slate-900">{company.phone}</p>
            </a>
            <div className="p-3 sm:p-4 bg-violet-50 rounded-xl text-center sm:text-left">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 mb-2 mx-auto sm:mx-0" />
              <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Adresse postale</p>
              <p className="text-[10px] sm:text-sm font-semibold text-slate-900">Douala, Cameroun</p>
            </div>
          </div>
          
          <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-[11px] sm:text-sm text-emerald-800 flex items-center gap-2 justify-center sm:justify-start">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <strong>Temps de réponse moyen :</strong> 4 heures ouvrées
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'hosting',
      title: 'Hébergement',
      icon: Globe,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Fournisseur d'hébergement</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-2 flex-wrap">
              {hosting.provider}
              <a href={hosting.website} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-800">
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
              <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Adresse</p>
              <p className="text-[10px] sm:text-sm font-semibold text-slate-900 break-words">{hosting.address}</p>
            </div>
            <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
              <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Téléphone</p>
              <p className="text-[10px] sm:text-sm font-semibold text-slate-900">{hosting.phone}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'director',
      title: 'Directeur de Publication',
      icon: User,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-violet-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Nom</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">{director.name}</p>
          </div>
          <div className="p-3 sm:p-4 bg-violet-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Fonction</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">{director.role}</p>
          </div>
          <a href={`mailto:${director.email}`} className="p-3 sm:p-4 bg-violet-50 rounded-xl hover:bg-violet-100 transition-colors block">
            <p className="text-[11px] sm:text-sm text-slate-500 mb-1">Email</p>
            <p className="text-[10px] sm:text-sm font-semibold text-slate-900 break-all">{director.email}</p>
          </a>
        </div>
      )
    },
    {
      id: 'property',
      title: 'Propriété Intellectuelle',
      icon: Shield,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-700 leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, logos, icônes, code source, etc.) 
              est la propriété exclusive de <strong>Hr Skills Pay SARL</strong> et est protégé 
              par les lois sur le droit d'auteur et la propriété intellectuelle.
            </p>
          </div>
          
          <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-[11px] sm:text-sm text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Interdiction :</strong> Toute reproduction, représentation, modification 
                ou adaptation totale ou partielle du site est strictement interdite sans autorisation 
                écrite préalable de Hr Skills Pay.
              </span>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'data',
      title: 'Protection des Données (RGPD)',
      icon: Shield,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-violet-50 rounded-xl">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">Collecte des données</h4>
            <p className="text-[11px] sm:text-sm text-slate-700 leading-relaxed">
              Les données personnelles collectées (nom, email, téléphone, etc.) sont nécessaires 
              pour fournir nos services de paiement et sont traitées conformément au RGPD et à la 
              législation camerounaise sur la protection des données.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">Vos droits</h4>
              <ul className="text-[11px] sm:text-sm text-slate-700 space-y-1">
                <li>• Droit d'accès</li>
                <li>• Droit de rectification</li>
                <li>• Droit à l'effacement</li>
                <li>• Droit à la portabilité</li>
              </ul>
            </div>
            <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">Contact DPO</h4>
              <p className="text-[11px] sm:text-sm text-slate-700">
                Pour exercer vos droits, contactez :<br />
                <a href="mailto:dpo@hrskillspay.com" className="text-violet-600 hover:text-violet-800 break-all">
                  dpo@hrskillspay.com
                </a>
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      title: 'Politique de Cookies',
      icon: Cookie,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-700 leading-relaxed">
              Ce site utilise des cookies pour améliorer votre expérience utilisateur, 
              analyser le trafic et personnaliser le contenu. Vous pouvez accepter ou 
              refuser les cookies via le bandeau de consentement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-violet-50 rounded-xl">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">Cookies essentiels</h4>
              <p className="text-[10px] sm:text-xs text-slate-600">Nécessaires au fonctionnement du site (ne peuvent être désactivés)</p>
            </div>
            <div className="p-3 sm:p-4 bg-violet-50 rounded-xl">
              <h4 className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">Cookies analytics</h4>
              <p className="text-[10px] sm:text-xs text-slate-600">Pour analyser l'audience et améliorer le site (optionnels)</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'payment',
      title: 'Sécurité des Paiements',
      icon: CreditCard,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-[11px] sm:text-sm text-emerald-800 flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Certification PCI DSS Level 1 :</strong> Notre plateforme est certifiée 
                pour le traitement sécurisé des données de cartes bancaires.
              </span>
            </p>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] sm:text-sm font-semibold text-slate-900">Chiffrement AES-256</p>
                <p className="text-[10px] sm:text-xs text-slate-600">Toutes les transactions sont chiffrées de bout en bout</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] sm:text-sm font-semibold text-slate-900">3D Secure 2.0</p>
                <p className="text-[10px] sm:text-xs text-slate-600">Authentification forte pour les paiements par carte</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] sm:text-sm font-semibold text-slate-900">Aucun stockage de cartes</p>
                <p className="text-[10px] sm:text-xs text-slate-600">Vos données bancaires ne sont jamais stockées sur nos serveurs</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'terms',
      title: 'Conditions d\'Utilisation',
      icon: FileText,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-700 leading-relaxed">
              L'utilisation de ce site et de nos services implique l'acceptation sans réserve 
              de nos <a href="/conditions" className="text-violet-600 hover:text-violet-800 underline">
                Conditions Générales d'Utilisation (CGU)
              </a> et de nos{' '}
              <a href="/confidentialite" className="text-violet-600 hover:text-violet-800 underline">
                Conditions Générales de Vente (CGV)
              </a>.
            </p>
          </div>
          
          <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-[11px] sm:text-sm text-amber-800">
              <strong>Âge minimum :</strong> Vous devez avoir au moins 18 ans ou être 
              émancipé pour utiliser nos services de paiement.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'liability',
      title: 'Limitation de Responsabilité',
      icon: Scale,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-700 leading-relaxed">
              Hr Skills Pay met tout en œuvre pour assurer l'exactitude des informations 
              publiées sur ce site et la disponibilité des services. Cependant, aucune 
              garantie ne peut être donnée quant à l'exactitude, la complétude ou 
              l'actualité des informations.
            </p>
          </div>
          
          <div className="p-3 sm:p-4 bg-slate-50 rounded-xl">
            <p className="text-[11px] sm:text-sm text-slate-700 leading-relaxed">
              Hr Skills Pay ne saurait être tenu responsable des dommages directs ou 
              indirects résultant de l'utilisation du site ou des services, y compris 
              les pertes de données, les interruptions de service ou les erreurs de 
              traitement.
            </p>
          </div>
        </div>
      )
    }
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <section 
      id="mentions"
      className="min-h-screen bg-gradient-to-b from-white via-violet-50/30 to-white py-12 sm:py-16 px-4"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* ========== EN-TÊTE RESPONSIVE ========== */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-violet-100 rounded-full mb-3 sm:mb-4">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-600" />
            <span className="text-[10px] sm:text-xs font-semibold text-violet-700">Mentions Légales</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight px-2">
            Informations{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent inline-block">
              légales
            </span>
          </h1>
          
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Conformément à la législation en vigueur, retrouvez ici toutes les 
            informations légales relatives à Hr Skills Pay.
          </p>
        </div>

        {/* ========== SECTIONS ACCORDÉON RESPONSIVES ========== */}
        <div className="space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          {sections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSection === section.id;
            
            return (
              <div
                key={section.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-violet-200 overflow-hidden hover:border-violet-400 transition-all"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left hover:bg-violet-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
                      isOpen ? 'bg-violet-600' : 'bg-violet-100'
                    }`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? 'text-white' : 'text-violet-600'}`} />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-slate-900">{section.title}</span>
                  </div>
                  <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                    <div className="ml-8 sm:ml-13 pl-3 sm:pl-4">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========== RÉSUMÉ ENTREPRISE RESPONSIVE ========== */}
        <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden mb-12 sm:mb-16">
          
          <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 sm:w-80 sm:h-80 bg-violet-500/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <h2 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6">
              Résumé des informations légales
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <p className="text-[10px] sm:text-xs text-white/70 mb-1">Entreprise</p>
                <p className="text-xs sm:text-sm text-white font-semibold break-words">{company.legalName}</p>
              </div>
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <p className="text-[10px] sm:text-xs text-white/70 mb-1">RCCM</p>
                <p className="text-xs sm:text-sm text-white font-semibold break-words">{company.registration}</p>
              </div>
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <p className="text-[10px] sm:text-xs text-white/70 mb-1">Email</p>
                <a href={`mailto:${company.email}`} className="text-xs sm:text-sm text-white font-semibold hover:text-violet-200 break-all">{company.email}</a>
              </div>
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <p className="text-[10px] sm:text-xs text-white/70 mb-1">Téléphone</p>
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="text-xs sm:text-sm text-white font-semibold hover:text-violet-200">{company.phone}</a>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a href="/conditions" className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-violet-900 rounded-xl font-semibold text-xs sm:text-sm hover:shadow-lg transition-all">
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                CGU / CGV
              </a>
              <a href="/confidentialite" className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold text-xs sm:text-sm hover:bg-white/20 transition-all">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Confidentialité
              </a>
            </div>
          </div>
        </div>

        {/* ========== FOOTER RESPONSIVE ========== */}
        <div className="text-center pt-6 sm:pt-8 border-t border-slate-200">
          <p className="text-[10px] sm:text-sm text-slate-500 mb-2">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-[9px] sm:text-xs text-slate-400 px-2">
            Ces mentions légales sont conformes à la législation camerounaise et aux 
            standards internationaux de protection des données.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Mentions;