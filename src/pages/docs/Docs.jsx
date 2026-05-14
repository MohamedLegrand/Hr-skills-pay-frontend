import React, { useState } from 'react';
import { 
  BookOpen, Code2, Shield, Webhook, Terminal, MessageSquare,
  Search, Copy, Check, ChevronRight, ExternalLink, Key, Lock,
  CreditCard, Clock, AlertCircle
} from 'lucide-react';

// ===== CONFIGURATION - Correction pour Vercel =====
// Détection automatique de l'environnement (Next.js, Vite, React)
const getEnvVar = (name, defaultValue) => {
  // Pour Next.js (Vercel) avec préfixe NEXT_PUBLIC_
  if (typeof process !== 'undefined' && process.env && process.env[`NEXT_PUBLIC_${name}`]) {
    return process.env[`NEXT_PUBLIC_${name}`];
  }
  // Pour React (Create React App) avec préfixe REACT_APP_
  if (typeof process !== 'undefined' && process.env && process.env[`REACT_APP_${name}`]) {
    return process.env[`REACT_APP_${name}`];
  }
  // Pour Vite
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[`VITE_${name}`]) {
    return import.meta.env[`VITE_${name}`];
  }
  // Valeur par défaut
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

  // Navigation principale
  const sections = [ 
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    { id: 'api', title: 'API Reference', icon: Code2 },
    { id: 'sdks', title: 'SDKs', icon: Terminal },
    { id: 'webhooks', title: 'Webhooks', icon: Webhook },
    { id: 'security', title: 'Sécurité', icon: Shield },
    { id: 'support', title: 'Support', icon: MessageSquare }
  ];

  // Exemples de code avec variables d'environnement
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
  method: 'orange_money', // or 'mtn_money', 'wave'
  phone: '+237600000000',
  description: 'Commande #12345',
  webhookUrl: '${API_CONFIG.apiUrl}/webhook/payment'
});`,

    webhook: `// Webhook endpoint (exemple Express.js)
app.post('/webhook/payment', (req, res) => {
  const signature = req.headers['x-hr-skills-signature'];
  const event = req.body;
  
  // Vérification de la signature
  if (!verifyWebhookSignature(signature, event)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  switch (event.type) {
    case 'payment.succeeded':
      // Mettre à jour la commande
      break;
    case 'payment.failed':
      // Notifier le client
      break;
    case 'payment.pending':
      // Vérification en cours
      break;
  }
  
  res.json({ received: true });
});`,

    verification: `// Vérification d'un paiement
const paymentStatus = await client.payments.get(paymentId);
if (paymentStatus.status === 'succeeded') {
  // Paiement réussi - livrer le service
} else if (paymentStatus.status === 'failed') {
  // Paiement échoué - demander un autre moyen
}`,

    refund: `// Remboursement
const refund = await client.payments.refund(paymentId, {
  amount: 10000,
  reason: 'Annulation commande'
});`
  };

  // Endpoints API
  const endpoints = [
    { method: 'POST', path: '/v1/payments', desc: 'Créer un paiement', auth: true },
    { method: 'GET', path: '/v1/payments/{id}', desc: 'Récupérer un paiement', auth: true },
    { method: 'POST', path: '/v1/payments/{id}/refund', desc: 'Rembourser un paiement', auth: true },
    { method: 'GET', path: '/v1/transactions', desc: 'Lister les transactions', auth: true },
    { method: 'GET', path: '/v1/balance', desc: 'Consulter le solde', auth: true },
    { method: 'POST', path: '/v1/webhooks/configure', desc: 'Configurer webhook', auth: true }
  ];

  // Méthodes de paiement supportées
  const paymentMethods = [
    { name: 'Orange Money', code: 'orange_money', countries: ['CM', 'CI', 'SN'], icon: '📱' },
    { name: 'MTN Mobile Money', code: 'mtn_money', countries: ['CM', 'CI', 'UG'], icon: '📱' },
    { name: 'Wave', code: 'wave', countries: ['SN', 'CI'], icon: '🌊' },
    { name: 'Carte bancaire', code: 'card', countries: ['Global'], icon: '💳' }
  ];

  // Copier le code
  const copyCode = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Erreur copie:', err);
    }
  };

  // Filtrage recherche
  const filteredSections = sections.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Composant Code Block
  const CodeBlock = ({ code, language = 'javascript', id, showCopy = true }) => (
    <div className="relative group">
      {showCopy && (
        <button
          onClick={() => copyCode(code, id)}
          className="absolute top-3 right-3 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
        >
          {copiedCode === id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
        </button>
      )}
      <pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
        <code className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
          {code}
        </code>
      </pre>
    </div>
  );

  // Badge méthode HTTP
  const MethodBadge = ({ method }) => {
    const colors = { 
      GET: 'bg-emerald-100 text-emerald-700', 
      POST: 'bg-blue-100 text-blue-700', 
      PUT: 'bg-amber-100 text-amber-700', 
      DELETE: 'bg-red-100 text-red-700' 
    };
    return <span className={`px-2 py-1 rounded text-xs font-bold font-mono ${colors[method] || 'bg-slate-100 text-slate-700'}`}>{method}</span>;
  };

  return (
    <section 
      id="docs"
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="flex gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Recherche */}
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

            {/* Navigation */}
            <nav className="space-y-1">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
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

            {/* Méthodes de paiement */}
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

            {/* Ressources */}
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
          </aside>

          {/* Contenu Principal */}
          <main className="flex-1 min-w-0">
            
            {/* Introduction */}
            {activeSection === 'introduction' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-violet-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Introduction</h1>
                </div>
                
                <p className="text-slate-600 leading-relaxed">
                  Bienvenue dans la documentation de <strong className="text-violet-700">Hr Skills Pay</strong>. 
                  Notre API vous permet d'intégrer des paiements mobiles (Orange Money, MTN Mobile Money, Wave) 
                  et cartes bancaires en quelques lignes de code.
                </p>

                {/* Démarrage rapide */}
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">🚀 Démarrage rapide</h3>
                  <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
                    <li>Créez un compte sur le <a href="/register" className="text-violet-600 hover:underline font-medium">dashboard</a></li>
                    <li>Récupérez vos clés API dans l'espace développeur</li>
                    <li>Installez le SDK : <code className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">npm install hrskills-pay</code></li>
                    <li>Configurez vos variables d'environnement</li>
                    <li>Effectuez votre premier paiement</li>
                  </ol>
                </div>

                {/* Installation */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-violet-600" /> Installation
                  </h3>
                  <CodeBlock code={codeExamples.install} language="bash" id="install" />
                </div>

                {/* Authentification */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-violet-600" /> Authentification
                  </h3>
                  <CodeBlock code={codeExamples.auth} language="javascript" id="auth" />
                  <div className="flex items-start gap-2 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800">
                      <p className="font-medium mb-1">⚠️ Sécurité importante</p>
                      <p>Ne commitez jamais vos clés API. Utilisez un fichier <code className="bg-amber-100 px-1 rounded">.env</code> avec <code className="bg-amber-100 px-1 rounded">.gitignore</code>.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* API Reference */}
            {activeSection === 'api' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">API Reference</h1>
                </div>

                <p className="text-slate-600">Notre API RESTful retourne du JSON. Toutes les requêtes nécessitent une authentification par clé API.</p>

                {/* Endpoints */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">📋 Endpoints principaux</h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left p-3 font-semibold text-slate-600">Méthode</th>
                          <th className="text-left p-3 font-semibold text-slate-600">Endpoint</th>
                          <th className="text-left p-3 font-semibold text-slate-600">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {endpoints.map((ep, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-3"><MethodBadge method={ep.method} /></td>
                            <td className="p-3 font-mono text-slate-700 text-xs">{ep.path}</td>
                            <td className="p-3 text-slate-600">{ep.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Exemple paiement */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">💳 Créer un paiement</h3>
                  <CodeBlock code={codeExamples.payment} language="javascript" id="payment" />
                </div>

                {/* Vérification paiement */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">✅ Vérifier un paiement</h3>
                  <CodeBlock code={codeExamples.verification} language="javascript" id="verification" />
                </div>

                {/* Remboursement */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">↩️ Remboursement</h3>
                  <CodeBlock code={codeExamples.refund} language="javascript" id="refund" />
                </div>
              </div>
            )}

            {/* SDKs */}
            {activeSection === 'sdks' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-amber-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">SDKs</h1>
                </div>

                <p className="text-slate-600">Nos SDK officiels simplifient l'intégration de l'API. Choisissez votre langage :</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'JavaScript / TypeScript', install: 'npm install hrskills-pay', docs: '/docs/js' },
                    { name: 'PHP', install: 'composer require hrskills/pay', docs: '/docs/php' },
                    { name: 'Python', install: 'pip install hrskills-pay', docs: '/docs/python' },
                    { name: 'React Native', install: 'npm install react-native-hrskills-pay', docs: '/docs/react-native' }
                  ].map((sdk, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-xl hover:border-violet-200 transition-colors">
                      <h4 className="font-semibold text-slate-900">{sdk.name}</h4>
                      <code className="block mt-2 px-3 py-2 bg-slate-100 rounded text-xs font-mono">{sdk.install}</code>
                      <a href={sdk.docs} className="inline-flex items-center gap-1 mt-3 text-xs text-violet-600 hover:text-violet-800">
                        Voir la documentation <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">🔧 Configuration requise</h4>
                  <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                    <li>Node.js 14+ pour JavaScript</li>
                    <li>PHP 7.4+ pour PHP</li>
                    <li>Python 3.8+ pour Python</li>
                    <li>Compte développeur actif</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Webhooks */}
            {activeSection === 'webhooks' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Webhook className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Webhooks</h1>
                </div>

                <p className="text-slate-600">Recevez des notifications en temps réel sur les événements de votre compte. Configurez vos webhooks depuis le dashboard.</p>

                <CodeBlock code={codeExamples.webhook} language="javascript" id="webhook" />

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">📡 Événements disponibles</h4>
                  <div className="flex flex-wrap gap-2">
                    {['payment.succeeded', 'payment.failed', 'payment.pending', 'payment.refunded', 'payout.completed'].map((evt) => (
                      <span key={evt} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono">{evt}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800">Les webhooks sont réessayés automatiquement jusqu'à 3 fois en cas d'échec (délai exponentiel).</p>
                </div>
              </div>
            )}

            {/* Sécurité */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Sécurité</h1>
                </div>

                <p className="text-slate-600">Hr Skills Pay respecte les normes de sécurité les plus strictes pour protéger vos transactions.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Lock, title: 'Chiffrement AES-256', desc: 'Données chiffrées de bout en bout', color: 'emerald' },
                    { icon: Shield, title: 'PCI DSS Level 1', desc: 'Certification la plus élevée', color: 'blue' },
                    { icon: CreditCard, title: '3D Secure v2', desc: 'Authentification forte', color: 'violet' }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className={`p-4 bg-${item.color}-50 border border-${item.color}-200 rounded-xl`}>
                        <Icon className={`w-5 h-5 text-${item.color}-600 mb-2`} />
                        <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Support */}
            {activeSection === 'support' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-violet-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Support</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="mailto:support@hrskillspay.com" className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-violet-300 hover:shadow-md transition-all">
                    <MessageSquare className="w-5 h-5 text-violet-600" />
                    <div>
                      <p className="font-medium text-slate-900">support@hrskillspay.com</p>
                      <p className="text-sm text-slate-500">Réponse sous 4h ouvrées</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                  </a>
                  <a href="/status" className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-slate-900">Status API</p>
                      <p className="text-sm text-slate-500">Uptime : 99.99%</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
                  </a>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">📚 Ressources supplémentaires</h4>
                  <div className="flex flex-wrap gap-3">
                    <a href="/faq" className="text-sm text-violet-600 hover:text-violet-800">FAQ</a>
                    <span className="text-slate-300">|</span>
                    <a href="/changelog" className="text-sm text-violet-600 hover:text-violet-800">Changelog</a>
                    <span className="text-slate-300">|</span>
                    <a href="/github" className="text-sm text-violet-600 hover:text-violet-800">GitHub</a>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-8 mt-8 border-t border-slate-200 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>📄 Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</span>
              <span className="text-xs">API Version : v1.0.0</span>
            </div>

          </main>
        </div>
      </div>
    </section>
  );
};

export default Docs;