import React, { useState } from 'react';
import { 
  MessageCircle, Mail, Phone, BookOpen, Search, ChevronDown, 
  ChevronUp, Clock, Shield, Zap, Users, ExternalLink, 
  CheckCircle, AlertCircle, HelpCircle, Send, ArrowRight
} from 'lucide-react';

// ============================================================================
// DONNÉES SUPPORT
// ============================================================================

// Canaux de support
const supportChannels = [
  {
    id: 'live-chat',
    title: 'Chat en direct',
    description: 'Discutez avec un expert en temps réel. Réponse moyenne en moins de 2 minutes.',
    icon: MessageCircle,
    color: 'from-emerald-500 to-teal-500',
    availability: '24/7',
    responseTime: '< 2 min',
    cta: 'Démarrer une conversation',
    href: '#chat',
    status: 'online',
    badge: 'Recommandé'
  },
  {
    id: 'email',
    title: 'Support Email',
    description: 'Envoyez-nous votre demande détaillée. Notre équipe vous répond sous 4 heures.',
    icon: Mail,
    color: 'from-blue-500 to-indigo-500',
    availability: 'Lun-Ven 8h-20h',
    responseTime: '< 4h',
    cta: 'support@hrskillspay.com',
    href: 'mailto:support@hrskillspay.com',
    status: 'available',
    badge: null
  },
  {
    id: 'phone',
    title: 'Assistance téléphonique',
    description: 'Parlez directement à un conseiller pour les urgences et questions complexes.',
    icon: Phone,
    color: 'from-violet-500 to-purple-500',
    availability: 'Lun-Ven 9h-18h',
    responseTime: 'Immédiat',
    cta: '+237 6XX XXX XXX',
    href: 'tel:+237600000000',
    status: 'available',
    badge: 'Urgences'
  },
  {
    id: 'docs',
    title: 'Documentation & Guides',
    description: 'Accédez à notre base de connaissances : tutoriels, API reference, best practices.',
    icon: BookOpen,
    color: 'from-orange-500 to-amber-500',
    availability: 'Toujours disponible',
    responseTime: 'Instantané',
    cta: 'Explorer la documentation',
    href: '/docs',
    status: 'online',
    badge: 'Self-service'
  }
];

// FAQ - Questions fréquentes
const faqCategories = [
  {
    id: 'getting-started',
    title: 'Premiers pas',
    icon: Zap,
    questions: [
      {
        q: 'Comment commencer avec Hr Skills Pay ?',
        a: 'Créez un compte gratuit en 2 minutes, vérifiez votre email, puis accédez à votre dashboard. Vous pourrez activer vos premières méthodes de paiement (Orange Money, MTN MoMo) en quelques clics. Notre guide de démarrage rapide vous accompagne pas à pas.'
      },
      {
        q: 'Faut-il des compétences techniques pour intégrer ?',
        a: 'Non ! Avec notre Checkout Hébergé, vous pouvez accepter des paiements sans écrire une ligne de code. Pour les développeurs, notre API REST documentée et nos SDK mobiles offrent un contrôle total avec des exemples prêts à l\'emploi.'
      },
      {
        q: 'Quels documents sont nécessaires pour l\'activation ?',
        a: 'Pour les professionnels : pièce d\'identité, registre de commerce, et RIB. Pour les entreprises : statuts, pièce du dirigeant, et justificatif de domicile. La validation prend généralement 24-48h ouvrées.'
      }
    ]
  },
  {
    id: 'payments',
    title: 'Paiements & Transactions',
    icon: Shield,
    questions: [
      {
        q: 'Quelles sont les commissions appliquées ?',
        a: 'Nos tarifs sont transparents : 2.5% pour Mobile Money, 3.4% + 150 XAF pour les cartes. Aucun frais caché, pas de frais mensuels. Les volumes élevés bénéficient de tarifs dégressifs — contactez-nous pour un devis personnalisé.'
      },
      {
        q: 'Quand reçois-je mes fonds ?',
        a: 'Les paiements Mobile Money sont crédités sur votre wallet Hr Skills Pay instantanément. Les settlements vers votre compte bancaire interviennent en J+1 ouvré. Vous pouvez configurer des transferts automatiques ou manuels selon vos besoins.'
      },
      {
        q: 'Que se passe-t-il en cas d\'échec de paiement ?',
        a: 'Notre système détecte automatiquement les échecs et notifie le client. Vous recevez une alerte dans votre dashboard. Pour les cartes, le 3D Secure 2.0 réduit les faux positifs. Notre équipe support peut investiguer tout incident sous 4 heures.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Sécurité & Conformité',
    icon: Shield,
    questions: [
      {
        q: 'Mes données et celles de mes clients sont-elles protégées ?',
        a: 'Absolument. Nous sommes certifiés PCI DSS Level 1, utilisons un chiffrement AES-256 de bout en bout, et ne stockons jamais les données sensibles de cartes. Conformité RGPD et audits de sécurité trimestriels garantissent la protection de vos informations.'
      },
      {
        q: 'Comment fonctionne la détection de fraude ?',
        a: 'Notre moteur IA analyse en temps réel plus de 50 signaux : comportement de navigation, historique de l\'appareil, géolocalisation, montant atypique. Les transactions suspectes sont flaggées pour review manuelle, sans impacter l\'expérience des clients légitimes.'
      },
      {
        q: 'Puis-je personnaliser les règles de sécurité ?',
        a: 'Oui. Dans votre dashboard, définissez des seuils de montant, des listes blanches/noires d\'IP, des restrictions géographiques, et des règles métier personnalisées. Les entreprises enterprise bénéficient d\'un expert dédié pour configurer des politiques avancées.'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Intégration Technique',
    icon: HelpCircle,
    questions: [
      {
        q: 'Où trouver la documentation API ?',
        a: 'Notre documentation complète est disponible sur docs.hrskillspay.com. Elle inclut : reference des endpoints, exemples de code (cURL, Node.js, PHP, Python), guides d\'intégration, et un playground interactif pour tester vos requêtes en sandbox.'
      },
      {
        q: 'Proposez-vous des SDK pour mobile ?',
        a: 'Oui, nos SDK natifs iOS (Swift) et Android (Kotlin/Java) sont disponibles via CocoaPods et Maven. Ils gèrent l\'UI de paiement, la biométrie, le mode offline, et se synchronisent automatiquement avec notre backend. Documentation et exemples inclus.'
      },
      {
        q: 'Comment tester en environnement de développement ?',
        a: 'Chaque compte dispose d\'un mode Sandbox avec des cartes et wallets de test. Utilisez les clés API de test pour simuler des paiements succès/échec sans mouvement d\'argent réel. Basculez en production en remplaçant simplement vos clés API.'
      }
    ]
  }
];

// Ressources complémentaires
const resources = [
  {
    title: 'Guide d\'intégration rapide',
    description: 'Acceptez votre premier paiement en 15 minutes',
    icon: Zap,
    href: '/docs/quickstart',
    type: 'guide'
  },
  {
    title: 'Reference API',
    description: 'Documentation complète des endpoints REST',
    icon: BookOpen,
    href: '/docs/api',
    type: 'reference'
  },
  {
    title: 'Tutoriels vidéo',
    description: 'Apprenez en regardant nos démos pas à pas',
    icon: ExternalLink,
    href: '/tutorials',
    type: 'video'
  },
  {
    title: 'Communauté développeurs',
    description: 'Posez vos questions et partagez vos solutions',
    icon: Users,
    href: 'https://community.hrskillspay.com',
    type: 'community'
  }
];

// Statut du système
const systemStatus = {
  overall: 'operational',
  lastUpdated: 'Il y a 2 minutes',
  services: [
    { name: 'API de paiement', status: 'operational', uptime: '99.99%' },
    { name: 'Checkout hébergé', status: 'operational', uptime: '99.98%' },
    { name: 'Orange Money', status: 'operational', uptime: '99.95%' },
    { name: 'MTN Mobile Money', status: 'operational', uptime: '99.97%' },
    { name: 'Notifications SMS', status: 'degraded', uptime: '98.2%', note: 'Latence élevée occasionnelle' },
    { name: 'Dashboard', status: 'operational', uptime: '99.99%' }
  ]
};

const statusColors = {
  operational: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  degraded: 'bg-amber-100 text-amber-700 border-amber-200',
  outage: 'bg-red-100 text-red-700 border-red-200'
};

const statusLabels = {
  operational: 'Opérationnel',
  degraded: 'Performance réduite',
  outage: 'Interruption'
};

// ============================================================================
// COMPOSANTS RÉUTILISABLES
// ============================================================================

// Badge de statut
const StatusBadge = ({ status, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses} rounded-full font-medium border ${statusColors[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'operational' ? 'bg-emerald-500' : status === 'degraded' ? 'bg-amber-500' : 'bg-red-500'} ${status === 'operational' ? 'animate-pulse' : ''}`} />
      {statusLabels[status]}
    </span>
  );
};

// Card Canal de Support
const SupportChannelCard = ({ channel }) => {
  const Icon = channel.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`group relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden transition-all duration-400 hover:shadow-xl hover:shadow-slate-900/5 hover:border-violet-300/50 ${
        isHovered ? 'scale-[1.02] z-10' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {channel.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 bg-violet-100 text-violet-800 rounded-full text-[10px] font-semibold border border-violet-200">
            {channel.badge}
          </span>
        </div>
      )}

      {/* Header avec icône */}
      <div className={`p-5 pb-3 bg-gradient-to-br ${channel.color} bg-opacity-5`}>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center shadow-lg mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{channel.title}</h3>
      </div>

      {/* Contenu */}
      <div className="px-5 pb-5 space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">{channel.description}</p>

        {/* Infos disponibilité */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Disponibilité</span>
            <p className="text-sm font-semibold text-slate-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-violet-500" />
              {channel.availability}
            </p>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Réponse</span>
            <p className="text-sm font-semibold text-slate-900">{channel.responseTime}</p>
          </div>
        </div>

        {/* Statut en direct */}
        <div className="flex items-center justify-between">
          <StatusBadge status={channel.status} />
          <a
            href={channel.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors group/link"
          >
            {channel.cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  );
};

// Item FAQ avec accordéon
const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-start justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-slate-900 pr-4">{question}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-sm text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// Section FAQ par catégorie
const FAQSection = ({ category }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const Icon = category.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-violet-600" />
        </div>
        <h4 className="text-lg font-bold text-slate-900">{category.title}</h4>
      </div>
      
      <div className="space-y-1">
        {category.questions.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </div>
  );
};

// Resource Card
const ResourceCard = ({ resource }) => {
  const Icon = resource.icon;
  
  return (
    <a
      href={resource.href}
      className="group flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200/60 hover:border-violet-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 transition-colors">
        <Icon className="w-5 h-5 text-slate-600 group-hover:text-violet-600 transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
          {resource.title}
        </h5>
        <p className="text-xs text-slate-500 mt-0.5">{resource.description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition-colors flex-shrink-0 mt-1" />
    </a>
  );
};

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState('all');

  // Filtrage FAQ par recherche
  const filteredFaqs = faqCategories
    .map(cat => ({
      ...cat,
      questions: cat.questions.filter(q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(cat => 
      (activeFaqCategory === 'all' || cat.id === activeFaqCategory) && 
      cat.questions.length > 0
    );

  return (
    <section 
      id="support" 
      className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden"
      aria-labelledby="support-heading"
    >
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(124,58,237,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* ========== EN-TÊTE DE SECTION ========== */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 animate-fadeInDown">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100/80 border border-violet-200 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs font-semibold text-violet-800 uppercase tracking-wide">Support</span>
          </div>
          
          <h2 id="support-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Une équipe dédiée,{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                à vos côtés
              </span>
            </span>
          </h2>
          
          <p className="mt-5 text-lg text-slate-600">
            Questions techniques, aide à l'intégration, ou simple curiosité : nous sommes là pour vous aider à réussir.
          </p>
        </div>

        {/* ========== BARRE DE RECHERCHE ========== */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide, la documentation, les FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-all"
              aria-label="Rechercher dans l'aide"
            />
          </div>
          <p className="text-center text-xs text-slate-500 mt-3">
            Essayez : "intégration API", "commissions", "remboursement", "webhook"
          </p>
        </div>

        {/* ========== CANAUX DE SUPPORT ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">
              Comment pouvons-nous vous aider ?
            </h3>
            <p className="text-slate-500">Choisissez le canal qui vous convient le mieux</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <div 
                key={channel.id} 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SupportChannelCard channel={channel} />
              </div>
            ))}
          </div>
        </div>

        {/* ========== STATUT DU SYSTÈME ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Statut des services</h4>
                  <p className="text-sm text-slate-500">Mis à jour {systemStatus.lastUpdated}</p>
                </div>
              </div>
              <StatusBadge status={systemStatus.overall} size="md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemStatus.services.map((service, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{service.name}</p>
                    {service.note && (
                      <p className="text-[10px] text-amber-600 mt-0.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {service.note}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <StatusBadge status={service.status} />
                    <p className="text-[10px] text-slate-500 mt-1">Uptime: {service.uptime}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <a 
                href="/status" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
              >
                Voir l'historique complet des incidents
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ========== FAQ ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900">
                Questions fréquentes
              </h3>
              <p className="text-slate-500 mt-1">Trouvez rapidement les réponses aux questions les plus courantes</p>
            </div>
            
            {/* Filtres catégories FAQ */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFaqCategory('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFaqCategory === 'all'
                    ? 'bg-violet-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300'
                }`}
              >
                Toutes
              </button>
              {faqCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFaqCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      activeFaqCategory === cat.id
                        ? 'bg-violet-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFaqs.map((category) => (
                <FAQSection key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/60">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Aucune question trouvée pour "{searchQuery}"</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveFaqCategory('all'); }}
                className="mt-4 text-sm font-medium text-violet-600 hover:text-violet-800"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>

        {/* ========== RESSOURCES COMPLÉMENTAIRES ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">
              Ressources pour aller plus loin
            </h3>
            <p className="text-slate-500">Documentation, tutoriels et communauté pour maîtriser Hr Skills Pay</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <div 
                key={index}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
        </div>

        {/* ========== FORMULAIRE DE CONTACT DIRECT ========== */}
        <div className="animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-3xl p-8 lg:p-12 overflow-hidden relative">
            {/* Décoratif */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* Contenu gauche */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full">
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-white/90">Réponse sous 4h</span>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight">
                  Vous ne trouvez pas votre réponse ?
                </h3>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  Envoyez-nous un message détaillé. Notre équipe support vous répondra personnellement dans les plus brefs délais.
                </p>

                {/* Points de réassurance */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Réponse personnalisée par un expert</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Suivi de ticket avec historique complet</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm">Escalation possible vers l'équipe technique</span>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-white/80 mb-1.5">Nom complet</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-white/80 mb-1.5">Email professionnel</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm"
                      placeholder="vous@entreprise.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-white/80 mb-1.5">Sujet</label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="" className="bg-slate-800">Sélectionnez un sujet</option>
                    <option value="integration" className="bg-slate-800">Problème d'intégration</option>
                    <option value="payment" className="bg-slate-800">Question sur un paiement</option>
                    <option value="billing" className="bg-slate-800">Facturation & tarifs</option>
                    <option value="security" className="bg-slate-800">Sécurité & conformité</option>
                    <option value="other" className="bg-slate-800">Autre demande</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-white/80 mb-1.5">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm resize-none"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-violet-900 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span>Envoyer ma demande</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-xs text-white/60 text-center">
                  En soumettant ce formulaire, vous acceptez notre <a href="/privacy" className="text-white/80 hover:text-white underline">politique de confidentialité</a>.
                </p>
              </form>
            </div>
          </div>
        </div>

      </div>

      {/* ========== ANIMATIONS CSS ========== */}
      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeInDown { animation: fadeInDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        :focus-visible {
          outline: 2px solid #7c3aed;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}

export default Support;