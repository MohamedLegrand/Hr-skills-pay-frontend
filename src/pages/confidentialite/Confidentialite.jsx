import React, { useState } from 'react';
import { 
  Shield, Lock, Eye, User, Mail, Phone, 
  CheckCircle, AlertCircle, Cookie, Database,
  Globe, Clock, FileText, ExternalLink, Key,
  ChevronDown, ChevronUp, Download, Scale
} from 'lucide-react';

const Confidentialite = () => {
  const [openSection, setOpenSection] = useState('collection');

  // Informations de contact DPO 
  const dpo = {
    email: 'dpo@hrskillspay.com',
    phone: '+237 6XX XXX XXX',
    address: 'Akwa, Rue des Palmiers, Immeuble Le Prestige, Douala, Cameroun',
    responseTime: '72 heures maximum'
  };

  // Sections de la politique
  const sections = [
    {
      id: 'collection',
      title: 'Données collectées',
      icon: Database,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Nous collectons uniquement les données nécessaires à la fourniture de nos services 
            de paiement et à la conformité réglementaire.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-violet-600" />
                Données personnelles
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Nom et prénom</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Adresse email</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Numéro de téléphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Adresse postale</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <CreditCardIcon className="w-4 h-4 text-violet-600" />
                Données de paiement
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Numéro de wallet mobile money</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Historique des transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Token de carte (jamais le PAN complet)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-amber-700">Les numéros de carte complets ne sont jamais stockés</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-xl">
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-violet-600" />
              Données techniques
            </h4>
            <p className="text-sm text-slate-700">
              Adresse IP, type de navigateur, appareil utilisé, logs de connexion, cookies 
              (voir notre <a href="#cookies" className="text-violet-600 hover:text-violet-800 underline">politique de cookies</a>).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'usage',
      title: 'Utilisation des données',
      icon: Eye,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Vos données sont utilisées exclusivement pour les finalités suivantes :
          </p>
          
          <div className="space-y-3">
            {[
              { title: 'Fourniture des services', desc: 'Traitement des paiements, gestion des comptes, envoi de confirmations' },
              { title: 'Conformité légale', desc: 'Lutte contre la fraude, blanchiment d\'argent, obligations réglementaires (COBAC, RGPD)' },
              { title: 'Sécurité', desc: 'Protection des comptes, détection d\'activités suspectes, authentification' },
              { title: 'Amélioration continue', desc: 'Analytics anonymisés, optimisation de l\'expérience utilisateur' },
              { title: 'Communication', desc: 'Notifications de transaction, mises à jour importantes, support client' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-violet-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-sm text-emerald-800 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Engagement :</strong> Nous ne vendons jamais vos données personnelles 
                à des tiers. Vos données ne sont partagées qu'avec vos partenaires de paiement 
                nécessaires à la transaction.
              </span>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sharing',
      title: 'Partage des données',
      icon: Globe,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Vos données peuvent être partagées uniquement dans les cas suivants :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
              <h4 className="font-semibold text-slate-900 mb-3">Partenaires autorisés</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Opérateurs Mobile Money (Orange, MTN)</li>
                <li>• Processeurs de cartes bancaires</li>
                <li>• Fournisseurs d'infrastructure (AWS)</li>
                <li>• Services de notification (Twilio)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
              <h4 className="font-semibold text-slate-900 mb-3">Obligations légales</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Autorités réglementaires (COBAC)</li>
                <li>• Enquêtes judiciaires</li>
                <li>• Prévention de la fraude</li>
                <li>• Protection des droits légaux</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Important :</strong> Tous nos partenaires sont soumis à des accords 
                de confidentialité stricts et doivent respecter les mêmes standards de 
                protection des données que nous.
              </span>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'retention',
      title: 'Durée de conservation',
      icon: Clock,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Nous conservons vos données uniquement pendant la durée nécessaire aux finalités 
            pour lesquelles elles ont été collectées.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-violet-100">
                <tr>
                  <th className="text-left p-3 font-semibold text-slate-700">Type de données</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Durée</th>
                  <th className="text-left p-3 font-semibold text-slate-700">Base légale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 text-slate-700">Données de compte</td>
                  <td className="p-3 text-slate-700">Durée de vie du compte + 5 ans</td>
                  <td className="p-3 text-slate-500 text-xs">Exécution du contrat</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 text-slate-700">Historique des transactions</td>
                  <td className="p-3 text-slate-700">10 ans</td>
                  <td className="p-3 text-slate-500 text-xs">Obligation légale (COBAC)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 text-slate-700">Logs de connexion</td>
                  <td className="p-3 text-slate-700">1 an</td>
                  <td className="p-3 text-slate-500 text-xs">Sécurité</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 text-slate-700">Cookies analytics</td>
                  <td className="p-3 text-slate-700">13 mois</td>
                  <td className="p-3 text-slate-500 text-xs">Consentement</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 text-slate-700">Données supprimées</td>
                  <td className="p-3 text-slate-700">Destruction immédiate</td>
                  <td className="p-3 text-slate-500 text-xs">Droit à l'effacement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'rights',
      title: 'Vos droits (RGPD)',
      icon: Key,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Conformément au RGPD et à la législation camerounaise, vous disposez des droits suivants :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Droit d\'accès', desc: 'Consulter toutes vos données personnelles', icon: Eye },
              { title: 'Droit de rectification', desc: 'Corriger des données inexactes ou incomplètes', icon: FileText },
              { title: 'Droit à l\'effacement', desc: 'Demander la suppression de vos données', icon: Lock },
              { title: 'Droit à la portabilité', desc: 'Récupérer vos données dans un format structuré', icon: Database },
              { title: 'Droit d\'opposition', desc: 'Vous opposer au traitement de vos données', icon: Shield },
              { title: 'Droit de limitation', desc: 'Limiter le traitement de vos données', icon: Scale }
            ].map((right, idx) => {
              const Icon = right.icon;
              return (
                <div key={idx} className="flex items-start gap-3 p-4 bg-violet-50 rounded-xl">
                  <Icon className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{right.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{right.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <h4 className="font-semibold text-emerald-900 mb-2">Comment exercer vos droits ?</h4>
            <p className="text-sm text-emerald-800 mb-3">
              Contactez notre DPO (Délégué à la Protection des Données) :
            </p>
            <div className="space-y-2 text-sm text-emerald-800">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${dpo.email}`} className="underline hover:text-emerald-900">{dpo.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${dpo.phone.replace(/\s/g, '')}`} className="underline hover:text-emerald-900">{dpo.phone}</a>
              </p>
              <p className="text-xs text-emerald-700 mt-2">
                Délai de réponse : {dpo.responseTime} • Pièce d'identité requise pour vérification
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Sécurité des données',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles 
            pour protéger vos données contre tout accès non autorisé, perte ou divulgation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Mesures techniques
              </h4>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• Chiffrement AES-256 des données sensibles</li>
                <li>• Chiffrement TLS 1.3 des communications</li>
                <li>• Authentification à deux facteurs (2FA)</li>
                <li>• Surveillance 24/7 des accès</li>
                <li>• Sauvegardes chiffrées et redondantes</li>
              </ul>
            </div>
            
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Mesures organisationnelles
              </h4>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• Accès restreint au personnel autorisé</li>
                <li>• Formation régulière à la sécurité</li>
                <li>• Accords de confidentialité signés</li>
                <li>• Audits de sécurité trimestriels</li>
                <li>• Certification PCI DSS Level 1</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
            <p className="text-sm text-violet-800 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>En cas de violation :</strong> Nous vous informerons dans les 72 heures 
                conformément au RGPD, ainsi que les autorités compétentes si nécessaire.
              </span>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'cookies',
      title: 'Politique de Cookies',
      icon: Cookie,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Notre site utilise des cookies pour améliorer votre expérience, analyser le trafic 
            et personnaliser le contenu.
          </p>
          
          <div className="space-y-3">
            {[
              { 
                type: 'Cookies essentiels', 
                purpose: 'Nécessaires au fonctionnement du site (authentification, panier, sécurité)',
                duration: 'Session',
                required: true
              },
              { 
                type: 'Cookies de préférence', 
                purpose: 'Mémoriser vos paramètres (langue, devise, thème)',
                duration: '1 an',
                required: false
              },
              { 
                type: 'Cookies analytics', 
                purpose: 'Analyser l\'audience et améliorer le site (Google Analytics)',
                duration: '13 mois',
                required: false
              },
              { 
                type: 'Cookies marketing', 
                purpose: 'Personnaliser les publicités et le contenu',
                duration: '6 mois',
                required: false
              }
            ].map((cookie, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                    {cookie.type}
                    {cookie.required && (
                      <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded text-xs">Obligatoire</span>
                    )}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">{cookie.purpose}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Clock className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-500">{cookie.duration}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
            <p className="text-sm text-violet-800">
              <strong>Gestion des cookies :</strong> Vous pouvez accepter ou refuser les cookies 
              non essentiels via le bandeau de consentement ou modifier vos paramètres à tout 
              moment dans votre navigateur.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'updates',
      title: 'Modifications de la politique',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 leading-relaxed">
            Cette politique de confidentialité peut être mise à jour pour refléter les 
            évolutions légales, réglementaires ou de nos services.
          </p>
          
          <div className="p-4 bg-slate-50 rounded-xl">
            <h4 className="font-semibold text-slate-900 mb-3">Dernières mises à jour</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                <div>
                  <p className="font-medium text-slate-900 text-sm">Version 2.0</p>
                  <p className="text-xs text-slate-500">Ajout des détails sur les cookies analytics</p>
                </div>
                <span className="text-sm text-slate-600">{new Date().toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                <div>
                  <p className="font-medium text-slate-900 text-sm">Version 1.0</p>
                  <p className="text-xs text-slate-500">Version initiale</p>
                </div>
                <span className="text-sm text-slate-500">01/01/2024</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Notification :</strong> En cas de modification significative, nous vous 
                informerons par email et/ou via une notification sur notre site au moins 30 jours 
                avant l'entrée en vigueur.
              </span>
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
    <div className="min-h-screen bg-gradient-to-b from-white via-violet-50/30 to-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* ========== EN-TÊTE ========== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full mb-4">
            <Shield className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-semibold text-violet-700">Confidentialité</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Politique de{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              confidentialité
            </span>
          </h1>
          
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Nous prenons la protection de vos données très au sérieux. 
            Découvrez comment nous collectons, utilisons et protégeons vos informations personnelles.
          </p>
        </div>

        {/* ========== RÉSUMÉ RAPIDE ========== */}
        <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Lock className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <p className="text-2xl font-black text-white">100%</p>
              <p className="text-sm text-white/80 mt-1">Données chiffrées</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Shield className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <p className="text-2xl font-black text-white">PCI DSS</p>
              <p className="text-sm text-white/80 mt-1">Certification Level 1</p>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Clock className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <p className="text-2xl font-black text-white">72h</p>
              <p className="text-sm text-white/80 mt-1">Réponse DPO max</p>
            </div>
          </div>
        </div>

        {/* ========== SECTIONS ACCORDÉON ========== */}
        <div className="space-y-4 mb-16">
          {sections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSection === section.id;
            
            return (
              <div
                key={section.id}
                className="bg-white rounded-2xl border border-violet-200 overflow-hidden hover:border-violet-400 transition-all"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-violet-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isOpen ? 'bg-violet-600' : 'bg-violet-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-violet-600'}`} />
                    </div>
                    <span className="font-semibold text-slate-900">{section.title}</span>
                  </div>
                  <span className={`w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pt-0">
                    <div className="ml-13 pl-4">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========== CONTACT DPO ========== */}
        <div className="bg-white rounded-3xl border-2 border-violet-300 p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 mb-4">
              <Mail className="w-8 h-8 text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Des questions sur vos données ?
            </h2>
            <p className="text-slate-600">
              Notre Délégué à la Protection des Données (DPO) est à votre disposition
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <a href={`mailto:${dpo.email}`} className="p-6 bg-violet-50 rounded-2xl hover:bg-violet-100 transition-all group text-center">
              <Mail className="w-6 h-6 text-violet-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm text-slate-500 mb-1">Email</p>
              <p className="font-semibold text-slate-900">{dpo.email}</p>
            </a>
            <a href={`tel:${dpo.phone.replace(/\s/g, '')}`} className="p-6 bg-violet-50 rounded-2xl hover:bg-violet-100 transition-all group text-center">
              <Phone className="w-6 h-6 text-violet-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-sm text-slate-500 mb-1">Téléphone</p>
              <p className="font-semibold text-slate-900">{dpo.phone}</p>
            </a>
            <div className="p-6 bg-violet-50 rounded-2xl text-center">
              <Clock className="w-6 h-6 text-violet-600 mx-auto mb-3" />
              <p className="text-sm text-slate-500 mb-1">Temps de réponse</p>
              <p className="font-semibold text-slate-900">{dpo.responseTime}</p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="/docs/droit-donnees.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-all"
            >
              <Download className="w-4 h-4" />
              Télécharger le guide de vos droits
            </a>
          </div>
        </div>

        {/* ========== FOOTER ========== */}
        <div className="text-center pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-2">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-xs text-slate-400">
            Cette politique est conforme au RGPD (Règlement Général sur la Protection des Données) 
            et à la législation camerounaise sur la protection des données personnelles.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a href="/mentions" className="text-sm text-violet-600 hover:text-violet-800">
              Mentions légales
            </a>
            <span className="text-slate-300">•</span>
            <a href="/conditions" className="text-sm text-violet-600 hover:text-violet-800">
              CGU / CGV
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

// Icône CreditCard personnalisée
const CreditCardIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

export default Confidentialite;