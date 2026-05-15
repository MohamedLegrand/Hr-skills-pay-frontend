import React, { useState } from 'react';
import { 
  BookOpen, Code2, Shield, Webhook, Terminal, MessageSquare,
  Search, Copy, Check, ChevronRight, ExternalLink, Key, Lock,
  CreditCard, Clock, AlertCircle, Menu, X
} from 'lucide-react';

// ===== CONFIGURATION - Correction pour Vercel =====
const getEnvVar = (name, defaultValue) => {
  if (typeof process !== 'undefined' && process.env && process.env[`NEXT_PUBLIC_${name}`]) {
    return process.env[`NEXT_PUBLIC_${name}`];
  }
  if (typeof process !== 'undefined' && process.env && process.env[`REACT_APP_${name}`]) {
    return process.env[`REACT_APP_${name}`];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[`VITE_${name}`]) {
    return import.meta.env[`VITE_${name}`];
  }
  return defaultValue;
};

const API_CONFIG = {
  apiKey: getEnvVar('HR_SKILLS_API_KEY', 'your-api-key'),
  apiUrl: getEnvVar('API_URL', 'https://api.hrskillspay.com'),
  environment: typeof process !== 'undefined' && process.env && process.env.NODE_ENV || 'development',
};

const Docs = () => { 
  const [activeSection, setActiveSection] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [ 
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    { id: 'api', title: 'API Reference', icon: Code2 },
    { id: 'sdks', title: 'SDKs', icon: Terminal },
    { id: 'webhooks', title: 'Webhooks', icon: Webhook },
    { id: 'security', title: 'Sécurité', icon: Shield },
    { id: 'support', title: 'Support', icon: MessageSquare }
  ];

  const codeExamples = {
    install: `npm install hrskills-pay

# Configuration des variables d'environnement
# Créez un fichier .env à la racine:
NEXT_PUBLIC_HR_SKILLS_API_KEY=votre_clé_api
NEXT_PUBLIC_API_URL=https://api.hrskillspay.com`,

    auth: `// Import du SDK
import HrSkillsPay from 'hrskills-pay';

// Initialisation avec variables d'environnement
const client = new HrSkillsPay({
  apiKey: process.env.NEXT_PUBLIC_HR_SKILLS_API_KEY,
  environment: 'production'
});`,

    payment: `// Création d'un paiement Mobile Money
const payment = await client.payments.create({
  amount: 10000,
  currency: 'XAF',
  method: 'orange_money',
  phone: '+237600000000',
  description: 'Commande #12345',
  webhookUrl: '${API_CONFIG.apiUrl}/webhook/payment'
});`,

    webhook: `// Webhook endpoint (exemple Express.js)
app.post('/webhook/payment', (req, res) => {
  const signature = req.headers['x-hr-skills-signature'];
  const event = req.body;
  
  if (!verifyWebhookSignature(signature, event)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  switch (event.type) {
    case 'payment.succeeded':
      break;
    case 'payment.failed':
      break;
    case 'payment.pending':
      break;
  }
  
  res.json({ received: true });
});`,

    verification: `// Vérification d'un paiement
const paymentStatus = await client.payments.get(paymentId);
if (paymentStatus.status === 'succeeded') {
  // Paiement réussi
} else if (paymentStatus.status === 'failed') {
  // Paiement échoué
}`,

    refund: `// Remboursement
const refund = await client.payments.refund(paymentId, {
  amount: 10000,
  reason: 'Annulation commande'
});`
  };

  const endpoints = [
    { method: 'POST', path: '/v1/payments', desc: 'Créer un paiement', auth: true },
    { method: 'GET', path: '/v1/payments/{id}', desc: 'Récupérer un paiement', auth: true },
    { method: 'POST', path: '/v1/payments/{id}/refund', desc: 'Rembourser un paiement', auth: true },
    { method: 'GET', path: '/v1/transactions', desc: 'Lister les transactions', auth: true },
    { method: 'GET', path: '/v1/balance', desc: 'Consulter le solde', auth: true },
    { method: 'POST', path: '/v1/webhooks/configure', desc: 'Configurer webhook', auth: true }
  ];

  const paymentMethods = [
    { name: 'Orange Money', code: 'orange_money', countries: ['CM', 'CI', 'SN'], icon: '📱' },
    { name: 'MTN Mobile Money', code: 'mtn_money', countries: ['CM', 'CI', 'UG'], icon: '📱' },
    { name: 'Wave', code: 'wave', countries: ['SN', 'CI'], icon: '🌊' },
    { name: 'Carte bancaire', code: 'card', countries: ['Global'], icon: '💳' }
  ];

  const copyCode = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Erreur copie:', err);
    }
  };

  const filteredSections = sections.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CodeBlock = ({ code, id }) => (
    <div className="relative group">
      <button
        onClick={() => copyCode(code, id)}
        className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
      >
        {copiedCode === id ? <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />}
      </button>
      <pre className="bg-slate-900 rounded-xl p-3 sm:p-4 overflow-x-auto text-[11px] sm:text-sm">
        <code className="text-slate-300 font-mono whitespace-pre-wrap">{code}</code>
      </pre>
    </div>
  );

  const MethodBadge = ({ method }) => {
    const colors = { 
      GET: 'bg-emerald-100 text-emerald-700', 
      POST: 'bg-blue-100 text-blue-700', 
      PUT: 'bg-amber-100 text-amber-700', 
      DELETE: 'bg-red-100 text-red-700' 
    };
    return <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-xs font-bold font-mono ${colors[method] || 'bg-slate-100 text-slate-700'}`}>{method}</span>;
  };

  // Sidebar component reusable
  const SidebarContent = () => (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <nav className="space-y-1">
        {filteredSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => { setActiveSection(section.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-violet-50 text-violet-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.title}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Méthodes supportées</p>
        <div className="space-y-2">
          {paymentMethods.map((method, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
              <span>{method.icon}</span>
              <span>{method.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Ressources</p>
        <div className="space-y-2 text-sm">
          <a href="/dashboard/api-keys" className="flex items-center gap-2 text-slate-600 hover:text-violet-600">
            <Key className="w-4 h-4" /> Clés API
          </a>
          <a href="/status" className="flex items-center gap-2 text-slate-600 hover:text-violet-600">
            <Clock className="w-4 h-4" /> Status API
          </a>
          <a href="/github" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-violet-600">
            <ExternalLink className="w-4 h-4" /> GitHub
          </a>
        </div>
      </div>
    </>
  );

  // Section content renderer
  const renderContent = () => {
    switch(activeSection) {
      case 'introduction':
        return (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Introduction</h1>
            </div>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Bienvenue dans la documentation de <strong className="text-violet-700">Hr Skills Pay</strong>. 
              Notre API vous permet d'intégrer des paiements mobiles (Orange Money, MTN Mobile Money, Wave) 
              et cartes bancaires en quelques lignes de code.
            </p>

            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3">🚀 Démarrage rapide</h3>
              <ol className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-700 list-decimal list-inside">
                <li>Créez un compte sur le <a href="/register" className="text-violet-600 hover:underline font-medium">dashboard</a></li>
                <li>Récupérez vos clés API dans l'espace développeur</li>
                <li>Installez le SDK : <code className="px-1.5 py-0.5 bg-slate-200 rounded text-[10px] sm:text-xs font-mono">npm install hrskills-pay</code></li>
                <li>Configurez vos variables d'environnement</li>
                <li>Effectuez votre premier paiement</li>
              </ol>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-violet-600" /> Installation
              </h3>
              <CodeBlock code={codeExamples.install} id="install" />
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-violet-600" /> Authentification
              </h3>
              <CodeBlock code={codeExamples.auth} id="auth" />
              <div className="flex items-start gap-2 mt-3 p-2.5 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-[10px] sm:text-xs text-amber-800">
                  <p className="font-medium mb-0.5 sm:mb-1">⚠️ Sécurité importante</p>
                  <p>Ne commitez jamais vos clés API. Utilisez un fichier <code className="bg-amber-100 px-1 rounded">.env</code> avec <code className="bg-amber-100 px-1 rounded">.gitignore</code>.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">API Reference</h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600">Notre API RESTful retourne du JSON. Toutes les requêtes nécessitent une authentification par clé API.</p>

            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3">📋 Endpoints principaux</h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[500px] text-xs sm:text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left p-2 sm:p-3 font-semibold text-slate-600">Méthode</th>
                      <th className="text-left p-2 sm:p-3 font-semibold text-slate-600">Endpoint</th>
                      <th className="text-left p-2 sm:p-3 font-semibold text-slate-600">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {endpoints.map((ep, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2 sm:p-3"><MethodBadge method={ep.method} /></td>
                        <td className="p-2 sm:p-3 font-mono text-slate-700 text-[10px] sm:text-xs">{ep.path}</td>
                        <td className="p-2 sm:p-3 text-slate-600">{ep.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3">💳 Créer un paiement</h3>
              <CodeBlock code={codeExamples.payment} id="payment" />
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3">✅ Vérifier un paiement</h3>
              <CodeBlock code={codeExamples.verification} id="verification" />
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-3">↩️ Remboursement</h3>
              <CodeBlock code={codeExamples.refund} id="refund" />
            </div>
          </div>
        );
      case 'sdks':
        return (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">SDKs</h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600">Nos SDK officiels simplifient l'intégration de l'API. Choisissez votre langage :</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { name: 'JavaScript / TypeScript', install: 'npm install hrskills-pay', docs: '/docs/js' },
                { name: 'PHP', install: 'composer require hrskills/pay', docs: '/docs/php' },
                { name: 'Python', install: 'pip install hrskills-pay', docs: '/docs/python' },
                { name: 'React Native', install: 'npm install react-native-hrskills-pay', docs: '/docs/react-native' }
              ].map((sdk, idx) => (
                <div key={idx} className="p-3 sm:p-4 border border-slate-200 rounded-xl hover:border-violet-200 transition-colors">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900">{sdk.name}</h4>
                  <code className="block mt-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-100 rounded text-[10px] sm:text-xs font-mono break-all">{sdk.install}</code>
                  <a href={sdk.docs} className="inline-flex items-center gap-1 mt-3 text-[10px] sm:text-xs text-violet-600 hover:text-violet-800">
                    Voir la documentation <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
              <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">🔧 Configuration requise</h4>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc list-inside">
                <li>Node.js 14+ pour JavaScript</li>
                <li>PHP 7.4+ pour PHP</li>
                <li>Python 3.8+ pour Python</li>
                <li>Compte développeur actif</li>
              </ul>
            </div>
          </div>
        );
      case 'webhooks':
        return (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Webhook className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Webhooks</h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600">Recevez des notifications en temps réel sur les événements de votre compte. Configurez vos webhooks depuis le dashboard.</p>

            <CodeBlock code={codeExamples.webhook} id="webhook" />

            <div>
              <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 sm:mb-3">📡 Événements disponibles</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['payment.succeeded', 'payment.failed', 'payment.pending', 'payment.refunded', 'payout.completed'].map((evt) => (
                  <span key={evt} className="px-2 sm:px-3 py-1 bg-slate-100 rounded-lg text-[10px] sm:text-xs font-mono">{evt}</span>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 p-2.5 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] sm:text-xs text-blue-800">Les webhooks sont réessayés automatiquement jusqu'à 3 fois en cas d'échec (délai exponentiel).</p>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Sécurité</h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600">Hr Skills Pay respecte les normes de sécurité les plus strictes pour protéger vos transactions.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: Lock, title: 'Chiffrement AES-256', desc: 'Données chiffrées de bout en bout', color: 'emerald' },
                { icon: Shield, title: 'PCI DSS Level 1', desc: 'Certification la plus élevée', color: 'blue' },
                { icon: CreditCard, title: '3D Secure v2', desc: 'Authentification forte', color: 'violet' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mb-2" />
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-600 mt-1">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Support</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <a href="mailto:support@hrskillspay.com" className="flex items-center gap-3 p-3 sm:p-4 border border-slate-200 rounded-xl hover:border-violet-300 hover:shadow-md transition-all">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-900">support@hrskillspay.com</p>
                  <p className="text-[10px] sm:text-sm text-slate-500">Réponse sous 4h ouvrées</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 ml-auto" />
              </a>
              <a href="/status" className="flex items-center gap-3 p-3 sm:p-4 border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-slate-900">Status API</p>
                  <p className="text-[10px] sm:text-sm text-slate-500">Uptime : 99.99%</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 ml-auto" />
              </a>
            </div>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">📚 Ressources supplémentaires</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                <a href="/faq" className="text-violet-600 hover:text-violet-800">FAQ</a>
                <span className="text-slate-300">|</span>
                <a href="/changelog" className="text-violet-600 hover:text-violet-800">Changelog</a>
                <span className="text-slate-300">|</span>
                <a href="/github" className="text-violet-600 hover:text-violet-800">GitHub</a>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="docs" className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Menu</span>
          </button>
        </div>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-sm overflow-y-auto p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mt-12">
              <SidebarContent />
            </div>
          </div>
        )}

        <div className="flex gap-6 lg:gap-8">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto">
            <SidebarContent />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderContent()}
            
            {/* Footer */}
            <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-200 text-[10px] sm:text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
              <span>📄 Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</span>
              <span className="text-[9px] sm:text-xs">API Version : v1.0.0</span>
            </div>
          </main>

        </div>
      </div>
    </section>
  );
};

export default Docs;