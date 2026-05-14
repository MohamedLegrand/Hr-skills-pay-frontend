import React, { useState } from 'react';
import { 
  Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone,
  HelpCircle, CheckCircle, ArrowRight, ExternalLink, BookOpen,
  CreditCard, Shield, Users, Clock, Zap, Package, Star
} from 'lucide-react';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestions, setOpenQuestions] = useState({});

  // Catégories de FAQ  
  const categories = [
    { id: 'all', label: 'Toutes', icon: HelpCircle },
    { id: 'payments', label: 'Paiements', icon: CreditCard },
    { id: 'subscriptions', label: 'Abonnements', icon: Star },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'marketplace', label: 'Marketplace', icon: Package },
    { id: 'support', label: 'Support', icon: MessageCircle }
  ];

  // Questions FAQ organisées par catégorie
  const faqData = [
    {
      id: 1,
      category: 'payments',
      question: 'Comment acheter un produit ?',
      answer: 'Parcourez la marketplace, sélectionnez le produit désiré et cliquez sur "Acheter". Vous serez redirigé vers notre passerelle de paiement sécurisée où vous pourrez choisir votre moyen de paiement préféré (Mobile Money, Orange Money, ou carte bancaire). Une fois le paiement confirmé, vous recevrez un email de confirmation avec les détails de votre commande.',
      popular: true
    },
    {
      id: 2,
      category: 'payments',
      question: 'Quels moyens de paiement sont acceptés ?',
      answer: 'Nous acceptons plusieurs moyens de paiement pour votre commodité : Orange Money, MTN Mobile Money, Maviance, Afrique Pay, Carveto, et les cartes bancaires internationales (Visa, Mastercard, UnionPay). Tous les paiements sont sécurisés et chiffrés.',
      popular: true
    },
    {
      id: 3,
      category: 'payments',
      question: 'Le paiement est-il sécurisé ?',
      answer: 'Absolument. Nous utilisons une infrastructure de paiement certifiée PCI DSS Level 1 avec chiffrement AES-256 de bout en bout. Toutes les transactions sont protégées par 3D Secure et surveillées 24/7 pour détecter toute activité frauduleuse.',
      popular: true
    },
    {
      id: 4,
      category: 'payments',
      question: 'Puis-je obtenir un remboursement ?',
      answer: 'Oui, les remboursements sont possibles selon les conditions du vendeur. Contactez-nous dans les 30 jours suivant votre achat avec votre numéro de commande. Les remboursements sont traités sous 5-10 jours ouvrés.',
      popular: false
    },
    {
      id: 5,
      category: 'subscriptions',
      question: 'Comment s\'abonner ?',
      answer: 'Rendez-vous sur la page Abonnements, comparez nos trois plans (Basic, Standard, Premium) et cliquez sur "S\'abonner" pour le plan de votre choix. Vous pourrez commencer votre essai gratuit de 14 jours sans carte bancaire pour le plan Standard.',
      popular: true
    },
    {
      id: 6,
      category: 'subscriptions',
      question: 'Puis-je changer de plan à tout moment ?',
      answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre dashboard. Le changement est immédiat et la facturation est ajustée au prorata. Aucun frais de changement n\'est appliqué.',
      popular: false
    },
    {
      id: 7,
      category: 'subscriptions',
      question: 'Y a-t-il un engagement minimum ?',
      answer: 'Non, tous nos abonnements sont sans engagement. Vous pouvez résilier à tout moment avec un préavis de 7 jours. Aucun frais caché, aucune surprise.',
      popular: false
    },
    {
      id: 8,
      category: 'subscriptions',
      question: 'Comment fonctionne l\'essai gratuit ?',
      answer: 'Le plan Standard inclut 14 jours d\'essai gratuit sans carte bancaire. Vous accédez à toutes les fonctionnalités du plan. À la fin de l\'essai, vous choisissez de souscrire ou de rester sur le plan Basic gratuit.',
      popular: false
    },
    {
      id: 9,
      category: 'security',
      question: 'Mes données sont-elles protégées ?',
      answer: 'Oui, la protection de vos données est notre priorité. Nous sommes conformes RGPD et utilisons des standards de sécurité bancaires. Vos données personnelles ne sont jamais vendues à des tiers.',
      popular: true
    },
    {
      id: 10,
      category: 'security',
      question: 'Qu\'est-ce que la certification PCI DSS ?',
      answer: 'PCI DSS (Payment Card Industry Data Security Standard) est la norme de sécurité la plus élevée pour les transactions par carte. Notre certification Level 1 garantit que vos paiements sont traités selon les standards bancaires internationaux.',
      popular: false
    },
    {
      id: 11,
      category: 'marketplace',
      question: 'Comment vendre sur la marketplace ?',
      answer: 'Créez un compte vendeur, complétez votre profil et soumettez vos produits pour validation. Une fois approuvés, vos produits seront visibles par des milliers d\'acheteurs. Nous prenons une commission de 5% sur chaque vente.',
      popular: false
    },
    {
      id: 12,
      category: 'marketplace',
      question: 'Quels produits sont autorisés ?',
      answer: 'Nous acceptons les produits et services légaux conformes à nos conditions d\'utilisation. Les produits contrefaits, illégaux ou dangereux sont strictement interdits et entraîneront la suspension de votre compte.',
      popular: false
    },
    {
      id: 13,
      category: 'support',
      question: 'Comment contacter le support ?',
      answer: 'Plusieurs options s\'offrent à vous : email (support@hrskillspay.com), téléphone (+237 6XX XXX XXX), chat en direct 24/7 depuis votre dashboard, ou formulaire de contact sur notre site. Nous répondons sous 4 heures ouvrées.',
      popular: true
    },
    {
      id: 14,
      category: 'support',
      question: 'Quels sont les horaires du support ?',
      answer: 'Notre support est disponible 24/7 pour les urgences techniques. Pour les questions générales, nos équipes sont disponibles du Lundi au Vendredi, 8h-20h WAT. Temps de réponse moyen : 4 heures.',
      popular: false
    },
    {
      id: 15,
      category: 'support',
      question: 'Proposez-vous un support en anglais ?',
      answer: 'Oui, notre équipe support est bilingue français/anglais. Précisez votre langue préférée dans votre premier message et nous vous répondrons dans la même langue.',
      popular: false
    }
  ];

  // Filtrage des questions
  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle question
  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Questions populaires
  const popularFAQs = faqData.filter(faq => faq.popular).slice(0, 3);

  return (
    <section 
      id="faq"
      className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white py-16 px-4"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* ========== EN-TÊTE ========== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-semibold text-violet-700">FAQ</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Foire Aux{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses aux questions les plus courantes sur 
            Hr Skills Pay, nos services et fonctionnalités.
          </p>
        </div>

        {/* ========== BARRE DE RECHERCHE ========== */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-all"
            />
          </div>
          <p className="text-center text-xs text-slate-500 mt-2">
            Essayez : "paiement", "abonnement", "sécurité", "remboursement"
          </p>
        </div>

        {/* ========== CATÉGORIES ========== */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========== QUESTIONS POPULAIRES ========== */}
        {searchQuery === '' && activeCategory === 'all' && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-slate-900">Questions populaires</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popularFAQs.map((faq) => (
                <div
                  key={faq.id}
                  onClick={() => toggleQuestion(faq.id)}
                  className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-slate-900 text-sm">{faq.question}</h3>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openQuestions[faq.id] ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== LISTE DES QUESTIONS ========== */}
        <div className="space-y-4 mb-16">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-violet-300 transition-all"
              >
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={openQuestions[faq.id]}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {faq.popular && (
                      <Star className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    )}
                    <span className="font-semibold text-slate-900">{faq.question}</span>
                  </div>
                  <span className={`w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openQuestions[faq.id] ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${openQuestions[faq.id] ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-6 pb-5 pt-0">
                    <div className="ml-7 pl-4 border-l-2 border-violet-200">
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune question trouvée</h3>
              <p className="text-slate-500 mb-4">Essayez de modifier votre recherche ou vos filtres.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-sm font-medium text-violet-600 hover:text-violet-800"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* ========== TOUJOURS DES QUESTIONS ? ========== */}
        <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          
          {/* Décoratif */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
          
          <div className="relative text-center">
            <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
              Toujours des questions ?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Notre équipe support est disponible 24/7 pour vous aider. 
              Choisissez le canal qui vous convient le mieux.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <a
                href="mailto:support@hrskillspay.com"
                className="flex items-center justify-center gap-3 p-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all group"
              >
                <Mail className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">Email</span>
              </a>
              <a
                href="tel:+237600000000"
                className="flex items-center justify-center gap-3 p-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all group"
              >
                <Phone className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-white font-medium">Téléphone</span>
              </a>
              <a
                href="#chat"
                className="flex items-center justify-center gap-3 p-4 bg-white text-slate-900 rounded-xl hover:shadow-lg transition-all group"
              >
                <MessageCircle className="w-5 h-5 text-violet-600 group-hover:scale-110 transition-transform" />
                <span className="text-slate-900 font-medium">Chat en direct</span>
              </a>
            </div>
            
            {/* Garanties */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Réponse sous 4h
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Support bilingue FR/EN
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Disponible 24/7
              </span>
            </div>
          </div>
        </div>

        {/* ========== LIENS UTILES ========== */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/docs" className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">Documentation</p>
              <p className="text-xs text-slate-500">Guides et tutoriels</p>
            </div>
          </a>
          
          <a href="/status" className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">Status API</p>
              <p className="text-xs text-slate-500">Uptime en temps réel</p>
            </div>
          </a>
          
          <a href="/contact" className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all group">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">Contact</p>
              <p className="text-xs text-slate-500">Formulaire de contact</p>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;