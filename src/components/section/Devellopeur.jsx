import React, { useState } from 'react';
import { 
  Code2, Terminal, BookOpen, Shield, Zap, Globe, 
  Webhook, Key, FileText, ExternalLink, Copy, Check,
  ArrowRight, ChevronDown, ChevronUp, Play, Download,
  Users, MessageSquare, Bug, Rocket, Layers, Clock
} from 'lucide-react'; 

// ============================================================================
// DONNÉES DÉVELOPPEURS
// ============================================================================

// Endpoints API principaux
const apiEndpoints = [
  {
    method: 'POST',
    path: '/v1/payments',
    description: 'Créer un nouveau paiement',
    auth: 'required',
    rateLimit: '1000 req/min'
  },
  {
    method: 'GET',
    path: '/v1/payments/{id}',
    description: 'Récupérer les détails d\'un paiement',
    auth: 'required',
    rateLimit: '2000 req/min'
  },
  {
    method: 'POST',
    path: '/v1/payments/{id}/refund',
    description: 'Rembourser un paiement',
    auth: 'required',
    rateLimit: '100 req/min'
  },
  {
    method: 'GET',
    path: '/v1/transactions',
    description: 'Lister les transactions',
    auth: 'required',
    rateLimit: '500 req/min'
  },
  {
    method: 'POST',
    path: '/v1/webhooks',
    description: 'Créer un webhook',
    auth: 'required',
    rateLimit: '50 req/min'
  },
  {
    method: 'GET',
    path: '/v1/balance',
    description: 'Consulter le solde',
    auth: 'required',
    rateLimit: '1000 req/min'
  }
];

// 🛡️ Exemples de code par langage - CLÉS API SÉCURISÉES
// NOTE: Les clés affichées sont des placeholders. En production, utilisez des variables d'environnement.
const codeExamples = [
  {
    language: 'JavaScript',
    icon: '🟨',
    code: `// 🔐 Bonnes pratiques : utilisez des variables d'environnement
// Créez un fichier .env.local avec : REACT_APP_API_KEY=votre_clé

const HrSkillsPay = require('hrskills-pay');

const client = new HrSkillsPay({
  // ⚠️ Ne jamais committer de vraies clés dans le code
  apiKey: process.env.REACT_APP_API_KEY || 'REMOVEDYOUR_API_KEY_HERE'
});

// Créer un paiement
const payment = await client.payments.create({
  amount: 10000,
  currency: 'XAF',
  method: 'orange_money',
  phone: '+237600000000',
  description: 'Commande #12345',
  metadata: {
    order_id: '12345',
    customer_email: 'client@example.com'
  }
});

console.log(payment);`
  },
  {
    language: 'PHP',
    icon: '🐘',
    code: `<?php
// 🔐 Bonnes pratiques : chargez les variables d'environnement
// require_once __DIR__ . '/vendor/autoload.php';

use HrSkillsPay\\Client;

// ⚠️ Utilisez getenv() ou un package comme vlucas/phpdotenv
$apiKey = getenv('HR_SKILLS_API_KEY') ?: 'REMOVEDYOUR_API_KEY_HERE';
$client = new Client($apiKey);

// Créer un paiement
$payment = $client->payments()->create([
    'amount' => 10000,
    'currency' => 'XAF',
    'method' => 'orange_money',
    'phone' => '+237600000000',
    'description' => 'Commande #12345',
    'metadata' => [
        'order_id' => '12345',
        'customer_email' => 'client@example.com'
    ]
]);

print_r($payment);`
  },
  {
    language: 'Python',
    icon: '🐍',
    code: `import hrskills_pay
import os

# 🔐 Bonnes pratiques : utilisez des variables d'environnement
# Créez un fichier .env avec : HR_SKILLS_API_KEY=votre_clé

api_key = os.getenv('HR_SKILLS_API_KEY', 'REMOVEDYOUR_API_KEY_HERE')
client = hrskills_pay.Client(api_key=api_key)

# Créer un paiement
payment = client.payments.create(
    amount=10000,
    currency='XAF',
    method='orange_money',
    phone='+237600000000',
    description='Commande #12345',
    metadata={
        'order_id': '12345',
        'customer_email': 'client@example.com'
    }
)

print(payment)`
  },
  {
    language: 'cURL',
    icon: '📡',
    code: `# 🔐 Bonnes pratiques : utilisez une variable shell ou un fichier .env
# export HR_SKILLS_API_KEY="REMOVEDYOUR_API_KEY_HERE"

curl -X POST https://api.hrskillspay.com/v1/payments \\
  -u "\${HR_SKILLS_API_KEY}:" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 10000,
    "currency": "XAF",
    "method": "orange_money",
    "phone": "+237600000000",
    "description": "Commande #12345",
    "metadata": {
      "order_id": "12345"
    }
  }'`
  }
];

// SDK disponibles
const sdks = [
  {
    name: 'JavaScript/Node.js',
    version: '2.4.0',
    downloads: '50K+',
    repository: 'npm install hrskills-pay',
    documentation: '/docs/sdk/javascript',
    status: 'stable'
  },
  {
    name: 'PHP',
    version: '2.3.1',
    downloads: '30K+',
    repository: 'composer require hrskills/pay',
    documentation: '/docs/sdk/php',
    status: 'stable'
  },
  {
    name: 'Python',
    version: '2.2.0',
    downloads: '25K+',
    repository: 'pip install hrskills-pay',
    documentation: '/docs/sdk/python',
    status: 'stable'
  },
  {
    name: 'iOS (Swift)',
    version: '3.1.0',
    downloads: '15K+',
    repository: 'pod \'HrSkillsPay\'',
    documentation: '/docs/sdk/ios',
    status: 'stable'
  },
  {
    name: 'Android (Kotlin)',
    version: '3.1.0',
    downloads: '20K+',
    repository: 'implementation \'com.hrskills:pay:3.1.0\'',
    documentation: '/docs/sdk/android',
    status: 'stable'
  },
  {
    name: 'React Native',
    version: '1.5.0',
    downloads: '10K+',
    repository: 'npm install @hrskills/react-native-pay',
    documentation: '/docs/sdk/react-native',
    status: 'beta'
  }
];

// Webhooks événements
const webhookEvents = [
  { event: 'payment.succeeded', description: 'Un paiement a réussi' },
  { event: 'payment.failed', description: 'Un paiement a échoué' },
  { event: 'payment.refunded', description: 'Un paiement a été remboursé' },
  { event: 'payment.pending', description: 'Un paiement est en attente' },
  { event: 'payout.completed', description: 'Un virement a été effectué' },
  { event: 'dispute.created', description: 'Un litige a été ouvert' },
  { event: 'customer.created', description: 'Un nouveau client a été créé' },
  { event: 'subscription.updated', description: 'Un abonnement a été modifié' }
];

// Ressources développeurs
const developerResources = [
  {
    title: 'Documentation API',
    description: 'Reference complète des endpoints, paramètres et réponses',
    icon: BookOpen,
    href: '/docs/api',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Guides d\'intégration',
    description: 'Tutoriels pas à pas pour chaque cas d\'usage',
    icon: FileText,
    href: '/docs/guides',
    color: 'from-violet-500 to-purple-500'
  },
  {
    title: 'Sandbox de test',
    description: 'Environnement de test avec données factices',
    icon: Play,
    href: '/dashboard/sandbox',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Status API',
    description: 'Uptime, incidents et maintenance en temps réel',
    icon: Zap,
    href: '/status',
    color: 'from-amber-500 to-orange-500'
  },
  {
    title: 'Communauté',
    description: 'Forum développeurs, Q&A et partage d\'expérience',
    icon: Users,
    href: 'https://community.hrskillspay.com',
    color: 'from-pink-500 to-rose-500'
  },
  {
    title: 'Support technique',
    description: 'Tickets prioritaires pour les problèmes techniques',
    icon: MessageSquare,
    href: '/support',
    color: 'from-indigo-500 to-violet-500'
  }
];

// Features API
const apiFeatures = [
  {
    icon: Shield,
    title: 'Sécurité enterprise',
    description: 'Clés API révocables, IP whitelisting, OAuth 2.0'
  },
  {
    icon: Clock,
    title: 'Idempotence',
    description: 'Clés d\'idempotence pour éviter les doublons de paiement'
  },
  {
    icon: Globe,
    title: 'Multi-région',
    description: 'Endpoints optimisés par région pour une latence minimale'
  },
  {
    icon: Layers,
    title: 'Versioning',
    description: 'API versionnée avec rétrocompatibilité garantie'
  },
  {
    icon: Webhook,
    title: 'Webhooks fiables',
    description: 'Retries automatiques, signature HMAC, dashboard de logs'
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: '99.99% uptime, <100ms latency p95, rate limiting généreux'
  }
];

// ============================================================================
// COMPOSANTS RÉUTILISABLES
// ============================================================================

// Badge de statut
const StatusBadge = ({ status }) => {
  const colors = {
    stable: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    beta: 'bg-amber-100 text-amber-700 border-amber-200',
    deprecated: 'bg-red-100 text-red-700 border-red-200'
  };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[status]}`}>
      {status}
    </span>
  );
};

// Bouton copier
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
      aria-label="Copier le code"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4 text-slate-400" />
      )}
    </button>
  );
};

// Block de code avec syntax highlighting simulé
const CodeBlock = ({ code }) => {
  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} />
      </div>
      <pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-sm">
        <code className="text-slate-300 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
};

// Card Endpoint API
const EndpointCard = ({ endpoint }) => {
  const methodColors = {
    GET: 'bg-emerald-100 text-emerald-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700'
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200/60 hover:border-violet-300 transition-colors">
      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono ${methodColors[endpoint.method]}`}>
        {endpoint.method}
      </span>
      
      <div className="flex-1 min-w-0">
        <code className="text-sm font-mono text-slate-900 block truncate">{endpoint.path}</code>
        <p className="text-xs text-slate-500 mt-0.5">{endpoint.description}</p>
      </div>
      
      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-2">
          {endpoint.auth === 'required' && (
            <Key className="w-3.5 h-3.5 text-amber-500" />
          )}
          <span className="text-[10px] text-slate-400">{endpoint.rateLimit}</span>
        </div>
      </div>
    </div>
  );
};

// Card SDK
const SDKCard = ({ sdk }) => (
  <div className="p-4 bg-white rounded-xl border border-slate-200/60 hover:border-violet-300 hover:shadow-lg transition-all group">
    <div className="flex items-start justify-between mb-3">
      <h4 className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
        {sdk.name}
      </h4>
      <StatusBadge status={sdk.status} />
    </div>
    
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-slate-500">Version</span>
        <span className="font-mono text-slate-700">{sdk.version}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-500">Downloads</span>
        <span className="font-semibold text-slate-900">{sdk.downloads}</span>
      </div>
    </div>
    
    <div className="mt-4 p-2.5 bg-slate-50 rounded-lg">
      <code className="text-xs font-mono text-slate-700">{sdk.repository}</code>
    </div>
    
    <a 
      href={sdk.documentation}
      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors"
    >
      Documentation <ArrowRight className="w-3 h-3" />
    </a>
  </div>
);

// Card Webhook Event
const WebhookEventCard = ({ event }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
    <div className="w-2 h-2 rounded-full bg-violet-500" />
    <div className="flex-1">
      <code className="text-sm font-mono text-slate-900">{event.event}</code>
      <p className="text-xs text-slate-500 mt-0.5">{event.description}</p>
    </div>
  </div>
);

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================
function Developpeurs() {
  const [activeLanguage, setActiveLanguage] = useState('JavaScript');

  const activeExample = codeExamples.find(ex => ex.language === activeLanguage);

  return (
    <section 
      id="developpeurs" 
      className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-900 via-violet-900 to-slate-900 overflow-hidden"
      aria-labelledby="developers-heading"
    >
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* ========== EN-TÊTE DE SECTION ========== */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16 animate-fadeInDown">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 border border-violet-400/30 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-violet-200 uppercase tracking-wide">Développeurs</span>
          </div>
          
          <h2 id="developers-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Construit pour les{" "}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                développeurs
              </span>
            </span>
          </h2>
          
          <p className="mt-5 text-lg text-slate-300 max-w-2xl mx-auto">
            API RESTful documentée, SDK natifs, webhooks fiables et sandbox de test. 
            Intégrez des paiements en quelques lignes de code.
          </p>
        </div>

        {/* ========== API QUICK START ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Colonne gauche : Instructions */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-violet-400" />
                  Quick Start
                </h3>
                <p className="text-slate-300 mb-6">
                  Suivez ces 3 étapes pour accepter votre premier paiement en moins de 10 minutes.
                </p>
              </div>

              {/* Étapes */}
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Créez votre compte', desc: 'Inscrivez-vous gratuitement et obtenez vos clés API en 2 minutes' },
                  { step: '02', title: 'Installez le SDK', desc: 'Choisissez votre langage et installez notre bibliothèque officielle' },
                  { step: '03', title: 'Intégrez l\'API', desc: 'Suivez nos guides et testez en sandbox avant de passer en production' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 🔐 Clés API - Placeholder sécurisé */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-200">Clés API de test</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    {/* ✅ Placeholder sécurisé qui ne trigger pas GitHub Secret Scanning */}
                    <code className="text-xs text-slate-300 font-mono">
                      REMOVEDYOUR_API_KEY_HERE
                    </code>
                    <CopyButton text="REMOVEDYOUR_API_KEY_HERE" />
                  </div>
                  <p className="text-xs text-slate-400">
                    ⚠️ Générez vos clés dans le dashboard • Utilisez des variables d'environnement
                  </p>
                </div>
              </div>

              {/* 🛡️ Note sécurité */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-200">Bonnes pratiques sécurité</p>
                    <ul className="text-xs text-slate-400 mt-1 space-y-1 list-disc list-inside">
                      <li>Ne commitez jamais de clés réelles dans Git</li>
                      <li>Utilisez <code className="bg-slate-800 px-1 rounded">.env.local</code> pour les variables</li>
                      <li>Révoquez immédiatement toute clé exposée par erreur</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="/docs/quickstart"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all group"
                >
                  <span>Commencer l'intégration</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                >
                  <span>Accès Dashboard</span>
                </a>
              </div>
            </div>

            {/* Colonne droite : Exemple de code */}
            <div className="space-y-4">
              {/* Tabs de langage */}
              <div className="flex flex-wrap gap-2">
                {codeExamples.map((example) => (
                  <button
                    key={example.language}
                    onClick={() => setActiveLanguage(example.language)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeLanguage === example.language
                        ? 'bg-violet-500 text-white'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    <span className="mr-1.5">{example.icon}</span>
                    {example.language}
                  </button>
                ))}
              </div>

              {/* Code example */}
              {activeExample && (
                <div className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Créer un paiement</span>
                    <span className="text-xs text-slate-500">POST /v1/payments</span>
                  </div>
                  <CodeBlock code={activeExample.code} />
                </div>
              )}

              {/* Response example */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Réponse API</span>
                  <span className="text-xs text-emerald-400">200 OK</span>
                </div>
                <CodeBlock code={`{
  "id": "pay_1234567890",
  "object": "payment",
  "amount": 10000,
  "currency": "XAF",
  "status": "succeeded",
  "method": "orange_money",
  "created": 1703001234,
  "metadata": {
    "order_id": "12345"
  }
}`} />
              </div>
            </div>
          </div>
        </div>

        {/* ========== ENDPOINTS API ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
                <Code2 className="w-6 h-6 text-violet-400" />
                Endpoints principaux
              </h3>
              <p className="text-slate-400 mt-1 text-sm">Les routes API les plus utilisées</p>
            </div>
            <a 
              href="/docs/api" 
              className="text-sm font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
            >
              Voir toute la documentation <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiEndpoints.map((endpoint, index) => (
              <div 
                key={endpoint.path}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <EndpointCard endpoint={endpoint} />
              </div>
            ))}
          </div>
        </div>

        {/* ========== SDK DISPONIBLES ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <Download className="w-6 h-6 text-violet-400" />
              SDK officiels
            </h3>
            <p className="text-slate-400">Bibliothèques maintenues pour vos langages préférés</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sdks.map((sdk, index) => (
              <div 
                key={sdk.name}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <SDKCard sdk={sdk} />
              </div>
            ))}
          </div>
        </div>

        {/* ========== WEBHOOKS ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* Contenu gauche */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Webhook className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Webhooks en temps réel</h4>
                    <p className="text-sm text-slate-400">Soyez notifié de chaque événement</p>
                  </div>
                </div>

                <p className="text-slate-300">
                  Configurez des webhooks pour recevoir des notifications HTTP en temps réel 
                  lorsque des événements se produisent dans votre compte. Idéal pour mettre 
                  à jour vos bases de données, envoyer des emails, ou déclencher des workflows.
                </p>

                {/* Features webhooks */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Retries automatiques', value: 'Jusqu\'à 3 fois' },
                    { label: 'Signature HMAC', value: 'Vérification sécurisée' },
                    { label: 'Dashboard logs', value: 'Historique complet' },
                    { label: 'Latence moyenne', value: '< 500ms' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-white/5 rounded-xl">
                      <p className="text-xs text-slate-400">{item.label}</p>
                      <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>

                <a 
                  href="/docs/webhooks"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Documentation webhooks <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Événements disponibles */}
              <div className="space-y-3">
                <h5 className="text-sm font-semibold text-slate-300 mb-3">Événements disponibles</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {webhookEvents.map((event, idx) => (
                    <WebhookEventCard key={idx} event={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== FEATURES API ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
              Conçu pour la performance et la sécurité
            </h3>
            <p className="text-slate-400">Tout ce dont vous avez besoin pour construire des applications fiables</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========== RESSOURCES DÉVELOPPEURS ========== */}
        <div className="mb-16 lg:mb-20 animate-fadeInUp" style={{ animationDelay: '600ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
              Ressources pour aller plus loin
            </h3>
            <p className="text-slate-400">Documentation, outils et communauté pour vous accompagner</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {developerResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.href}
                  className="group p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-violet-400/30 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-slate-400 mt-2">{resource.description}</p>
                </a>
              );
            })}
          </div>
        </div>

        {/* ========== STATS API ========== */}
        <div className="animate-fadeInUp" style={{ animationDelay: '700ms' }}>
          <div className="bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-400/20 rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { value: '99.99%', label: 'Uptime API', icon: Zap },
                { value: '<100ms', label: 'Latence p95', icon: Clock },
                { value: '10M+', label: 'Requêtes/jour', icon: Globe },
                { value: '5000+', label: 'Développeurs', icon: Users }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/20 mb-3">
                      <Icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                  </div>
                );
              })}
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeInDown { animation: fadeInDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        
        :focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}

export default Developpeurs;