import React from 'react';
import { 
  Shield, Lock, Key, CreditCard, Eye, EyeOff, 
  CheckCircle, AlertTriangle, FileText, Globe,
  Server, Fingerprint, Clock, HelpCircle, ArrowRight
} from 'lucide-react';

const Securite = () => {
  
  // Certifications et conformités
  const certifications = [ 
    { 
      icon: Shield,
      title: 'PCI DSS Level 1',
      description: 'Certification bancaire internationale pour le traitement sécurisé des cartes.',
      verified: true
    },
    {
      icon: Lock,
      title: 'Chiffrement AES-256',
      description: 'Vos données sont chiffrées de bout en bout avec la norme militaire.',
      verified: true
    },
    {
      icon: Globe,
      title: 'Conforme RGPD',
      description: 'Respect strict de la réglementation européenne sur la protection des données.',
      verified: true
    },
    {
      icon: Server,
      title: 'Hébergement sécurisé',
      description: 'Serveurs certifiés ISO 27001, sauvegardes chiffrées et redondantes.',
      verified: true
    }
  ];

  // Mesures de sécurité par catégorie
  const securityMeasures = [
    {
      category: 'Protection des données',
      icon: Eye,
      items: [
        'Chiffrement AES-256 des données sensibles',
        'Anonymisation des données personnelles',
        'Accès restreint et journalisé aux bases de données',
        'Suppression définitive des données après résiliation'
      ]
    },
    {
      category: 'Sécurité des paiements',
      icon: CreditCard,
      title: 'Paiements',
      items: [
        'Tokenisation des cartes bancaires (aucun stockage de PAN)',
        'Authentification 3D Secure 2.0 obligatoire',
        'Détection de fraude par IA en temps réel',
        'Surveillance 24/7 des transactions suspectes'
      ]
    },
    {
      category: 'Sécurité des comptes',
      icon: Fingerprint,
      items: [
        'Authentification à deux facteurs (2FA) disponible',
        'Alertes de connexion depuis un nouvel appareil',
        'Sessions automatiquement expirées après inactivité',
        'Mots de passe hachés avec bcrypt + salt unique'
      ]
    },
    {
      category: 'Infrastructure',
      icon: Server,
      items: [
        'Pare-feu applicatif (WAF) et protection DDoS',
        'Tests de pénétration trimestriels par des experts indépendants',
        'Mises à jour de sécurité appliquées sous 24h',
        'Plan de reprise d\'activité (PRA) testé semestriellement'
      ]
    }
  ];

  // Bonnes pratiques pour les utilisateurs
  const bestPractices = [
    {
      icon: Key,
      title: 'Mots de passe forts',
      desc: 'Utilisez un mot de passe unique de 12+ caractères avec majuscules, minuscules, chiffres et symboles.'
    },
    {
      icon: Eye,
      title: 'Méfiez-vous du phishing',
      desc: 'Ne cliquez jamais sur des liens suspects. Hr Skills Pay ne demande jamais vos identifiants par email.'
    },
    {
      icon: Clock,
      title: 'Déconnectez-vous',
      desc: 'Toujours vous déconnecter après utilisation sur un appareil partagé ou public.'
    },
    {
      icon: AlertTriangle,
      title: 'Signalez toute anomalie',
      desc: 'Contactez-nous immédiatement à security@hrskillspay.com en cas d\'activité suspecte.'
    }
  ];

  // Contact sécurité
  const securityContact = {
    email: 'security@hrskillspay.com',
    responseTime: '< 1 heure pour les urgences',
    pgpKey: 'Disponible sur demande pour communications chiffrées'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* ========== EN-TÊTE ========== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-4">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">Sécurité</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Votre sécurité,{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              notre priorité absolue
            </span>
          </h1>
          
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Chez Hr Skills Pay, chaque transaction et chaque donnée est protégée 
            par des standards de sécurité bancaires. Découvrez comment nous protégeons votre activité.
          </p>
        </div>

        {/* ========== CERTIFICATIONS ========== */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Certifications & Conformités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    {cert.verified && (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{cert.title}</h3>
                  <p className="text-sm text-slate-600">{cert.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== MESURES DE SÉCURITÉ ========== */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Nos mesures de protection
          </h2>
          <div className="space-y-6">
            {securityMeasures.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="p-5 border-b border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{section.category}</h3>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-3">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========== BONNES PRATIQUES ========== */}
        <section className="mb-16">
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-violet-600" />
              <h2 className="text-xl font-bold text-slate-900">Bonnes pratiques pour votre sécurité</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bestPractices.map((practice, index) => {
                const Icon = practice.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{practice.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{practice.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========== SIGNALEMENT SÉCURITÉ ========== */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            
            {/* Décoratif */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
            
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-4">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-white/90">Urgence sécurité</span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
                Vous avez détecté une vulnérabilité ?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Notre équipe sécurité traite en priorité absolue les signalements 
                de vulnérabilités. Contactez-nous de manière sécurisée.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a 
                  href={`mailto:${securityContact.email}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-emerald-900 rounded-xl font-semibold hover:shadow-lg transition-all group"
                >
                  <span>{securityContact.email}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <span className="text-sm text-white/70">
                  Réponse garantie sous {securityContact.responseTime}
                </span>
              </div>
              
              <p className="text-xs text-white/60">
                {securityContact.pgpKey}
              </p>
            </div>
          </div>
        </section>

        {/* ========== TRANSPARENCE & RAPPORTS ========== */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Transparence et rapports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a 
              href="/security/audit-2024.pdf"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all group text-left"
            >
              <FileText className="w-6 h-6 text-emerald-600 mb-3" />
              <h4 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Rapport d'audit 2024
              </h4>
              <p className="text-sm text-slate-500 mt-1">PDF • 2.4 MB</p>
            </a>
            <a 
              href="/security/bug-bounty"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all group text-left"
            >
              <Shield className="w-6 h-6 text-emerald-600 mb-3" />
              <h4 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Programme Bug Bounty
              </h4>
              <p className="text-sm text-slate-500 mt-1">Récompenses jusqu'à 10 000 €</p>
            </a>
            <a 
              href="/security/status"
              className="p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all group text-left"
            >
              <Clock className="w-6 h-6 text-emerald-600 mb-3" />
              <h4 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Status en temps réel
              </h4>
              <p className="text-sm text-slate-500 mt-1">Uptime : 99.99%</p>
            </a>
          </div>
        </section>

        {/* Footer de confiance */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            Dernière mise à jour de cette page : {new Date().toLocaleDateString('fr-FR')}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Pour toute question sur notre politique de sécurité, contactez{' '}
            <a href={`mailto:${securityContact.email}`} className="text-emerald-600 hover:text-emerald-800">
              {securityContact.email}
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Securite;