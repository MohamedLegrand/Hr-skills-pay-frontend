import React, { useState } from 'react';
import { 
  BookOpen, Code2, Shield, Webhook, Terminal, MessageSquare,
  Search, Copy, Check, ChevronRight, ExternalLink, Key, Lock,
  CreditCard, Clock, AlertCircle
} from 'lucide-react';

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

  // Exemples de code
  const codeExamples = {
    auth: `const client = new HrSkillsPay({
  apiKey: process.env.HR_SKILLS_API_KEY
});`,

    payment: `const payment = await client.payments.create({
  amount: 10000,
  currency: 'XAF',
  method: 'orange_money',
  phone: '+237600000000',
  description: 'Commande #12345'
});`,

    webhook: `app.post('/webhook', (req, res) => {
  const event = req.body;
  // Traiter payment.succeeded, payment.failed, etc.
  res.send({ received: true });
});`
  };

  // Endpoints API
  const endpoints = [
    { method: 'POST', path: '/v1/payments', desc: 'Créer un paiement' },
    { method: 'GET', path: '/v1/payments/{id}', desc: 'Récupérer un paiement' },
    { method: 'POST', path: '/v1/payments/{id}/refund', desc: 'Rembourser' },
    { method: 'GET', path: '/v1/transactions', desc: 'Lister transactions' }
  ];

  // Copier le code
  const copyCode = async (code, id) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filtrage recherche
  const filteredSections = sections.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Composant Code Block
  const CodeBlock = ({ code, language, id }) => (
    <div className="relative">
      <button
        onClick={() => copyCode(code, id)}
        className="absolute top-3 right-3 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
      >
        {copiedCode === id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
      </button>
      <pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
        <code className="text-sm text-slate-300 font-mono">{code}</code>
      </pre>
    </div>
  );

  // Badge méthode HTTP
  const MethodBadge = ({ method }) => {
    const colors = { GET: 'bg-emerald-100 text-emerald-700', POST: 'bg-blue-100 text-blue-700', PUT: 'bg-amber-100 text-amber-700', DELETE: 'bg-red-100 text-red-700' };
    return <span className={`px-2 py-1 rounded text-xs font-bold font-mono ${colors[method]}`}>{method}</span>;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="flex gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            {/* Recherche */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
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

            {/* Ressources */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3">Ressources</p>
              <div className="space-y-2 text-sm">
                <a href="/api-keys" className="flex items-center gap-2 text-slate-600 hover:text-violet-600">
                  <Key className="w-4 h-4" /> Clés API
                </a>
                <a href="/status" className="flex items-center gap-2 text-slate-600 hover:text-violet-600">
                  <Clock className="w-4 h-4" /> Status API
                </a>
              </div>
            </div>
          </aside>

          {/* Contenu Principal */}
          <main className="flex-1 min-w-0">
            
            {/* Introduction */}
            {activeSection === 'introduction' && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-violet-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Introduction</h1>
                </div>
                
                <p className="text-slate-600 leading-relaxed">
                  Bienvenue dans la documentation de <strong>Hr Skills Pay</strong>. 
                  Notre API vous permet d'intégrer des paiements mobiles et cartes bancaires 
                  en quelques lignes de code.
                </p>

                {/* Démarrage rapide */}
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-3">Démarrage rapide</h3>
                  <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
                    <li>Créez un compte sur le <a href="/dashboard" className="text-violet-600 hover:underline">dashboard</a></li>
                    <li>Récupérez vos clés API</li>
                    <li>Installez le SDK : <code className="px-1.5 py-0.5 bg-slate-200 rounded text-xs font-mono">npm install hrskills-pay</code></li>
                    <li>Effectuez votre premier paiement</li>
                  </ol>
                </div>

                {/* Authentification */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-violet-600" /> Authentification
                  </h3>
                  <CodeBlock code={codeExamples.auth} language="JavaScript" id="auth" />
                  <div className="flex items-start gap-2 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">Ne commitez jamais vos clés API. Utilisez des variables d'environnement.</p>
                  </div>
                </div>
              </section>
            )}

            {/* API Reference */}
            {activeSection === 'api' && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">API Reference</h1>
                </div>

                <p className="text-slate-600">Notre API RESTful retourne du JSON. Toutes les requêtes nécessitent une authentification.</p>

                {/* Endpoints */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Endpoints principaux</h3>
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
                            <td className="p-3 font-mono text-slate-700">{ep.path}</td>
                            <td className="p-3 text-slate-600">{ep.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Exemple paiement */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Créer un paiement</h3>
                  <CodeBlock code={codeExamples.payment} language="JavaScript" id="payment" />
                </div>
              </section>
            )}

            {/* SDKs */}
            {activeSection === 'sdks' && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-amber-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">SDKs</h1>
                </div>

                <p className="text-slate-600">Nos SDK officiels simplifient l'intégration de l'API.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'JavaScript', install: 'npm install hrskills-pay' },
                    { name: 'PHP', install: 'composer require hrskills/pay' },
                    { name: 'Python', install: 'pip install hrskills-pay' },
                    { name: 'iOS/Android', install: 'Voir documentation mobile' }
                  ].map((sdk, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-xl">
                      <h4 className="font-semibold text-slate-900">{sdk.name}</h4>
                      <code className="block mt-2 px-3 py-2 bg-slate-100 rounded text-xs font-mono">{sdk.install}</code>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Webhooks */}
            {activeSection === 'webhooks' && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Webhook className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Webhooks</h1>
                </div>

                <p className="text-slate-600">Recevez des notifications en temps réel sur les événements de votre compte.</p>

                <CodeBlock code={codeExamples.webhook} language="JavaScript" id="webhook" />

                <div className="mt-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Événements disponibles</h4>
                  <div className="flex flex-wrap gap-2">
                    {['payment.succeeded', 'payment.failed', 'payment.pending', 'payout.completed'].map((evt) => (
                      <span key={evt} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono">{evt}</span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Sécurité */}
            {activeSection === 'security' && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Sécurité</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Lock, title: 'AES-256', desc: 'Chiffrement de bout en bout' },
                    { icon: Shield, title: 'PCI DSS', desc: 'Certification Level 1' },
                    { icon: CreditCard, title: '3D Secure', desc: 'Authentification forte' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <item.icon className="w-5 h-5 text-emerald-600 mb-2" />
                      <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Support */}
            {activeSection === 'support' && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-violet-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900">Support</h1>
                </div>

                <div className="space-y-4">
                  <a href="mailto:support@hrskillspay.com" className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-violet-300 transition-colors">
                    <MessageSquare className="w-5 h-5 text-violet-600" />
                    <div>
                      <p className="font-medium text-slate-900">support@hrskillspay.com</p>
                      <p className="text-sm text-slate-500">Réponse sous 4h ouvrées</p>
                    </div>
                  </a>
                  <a href="/status" className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-violet-300 transition-colors">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-slate-900">Status API</p>
                      <p className="text-sm text-slate-500">Uptime : 99.99%</p>
                    </div>
                  </a>
                </div>
              </section>
            )}

            {/* Footer */}
            <div className="pt-8 mt-8 border-t border-slate-200 text-sm text-slate-500 flex items-center justify-between">
              <span>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</span>
              <a href="/github" className="flex items-center gap-1 text-violet-600 hover:text-violet-800">
                <ExternalLink className="w-4 h-4" /> GitHub
              </a>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Docs;