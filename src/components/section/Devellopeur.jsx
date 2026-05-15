import React, { useState } from 'react';
import { 
  Code2, Terminal, BookOpen, Shield, Zap, Globe, 
  Webhook, Key, FileText, ExternalLink, Copy, Check,
  ArrowRight, Play, Download,
  Users, MessageSquare, Rocket, Layers, Clock, Menu, X
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

// ============================================================================
// DONNÉES DÉVELOPPEURS
// ============================================================================

// Endpoints API principaux
const apiEndpoints = [
  { method: 'POST', path: '/v1/payments', description: 'Créer un nouveau paiement', auth: 'required', rateLimit: '1000 req/min' },
  { method: 'GET', path: '/v1/payments/{id}', description: 'Récupérer les détails d\'un paiement', auth: 'required', rateLimit: '2000 req/min' },
  { method: 'POST', path: '/v1/payments/{id}/refund', description: 'Rembourser un paiement', auth: 'required', rateLimit: '100 req/min' },
  { method: 'GET', path: '/v1/transactions', description: 'Lister les transactions', auth: 'required', rateLimit: '500 req/min' },
  { method: 'POST', path: '/v1/webhooks', description: 'Créer un webhook', auth: 'required', rateLimit: '50 req/min' },
  { method: 'GET', path: '/v1/balance', description: 'Consulter le solde', auth: 'required', rateLimit: '1000 req/min' }
];

// Exemples de code par langage
const codeExamples = [
  {
    language: 'JavaScript',
    icon: '🟨',
    code: `// 🔐 Utilisez des variables d'environnement
const HrSkillsPay = require('hrskills-pay');

const client = new HrSkillsPay({
  apiKey: process.env.NEXT_PUBLIC_API_KEY
});

// Créer un paiement
const payment = await client.payments.create({
  amount: 10000,
  currency: 'XAF',
  method: 'orange_money',
  phone: '+237600000000',
  description: 'Commande #12345'
});

console.log(payment);`
  },
  {
    language: 'PHP',
    icon: '🐘',
    code: `<?php
use HrSkillsPay\\Client;

$apiKey = getenv('HR_SKILLS_API_KEY');
$client = new Client($apiKey);

// Créer un paiement
$payment = $client->payments()->create([
    'amount' => 10000,
    'currency' => 'XAF',
    'method' => 'orange_money',
    'phone' => '+237600000000',
    'description' => 'Commande #12345'
]);

print_r($payment);`
  },
  {
    language: 'Python',
    icon: '🐍',
    code: `import hrskills_pay
import os

api_key = os.getenv('HR_SKILLS_API_KEY')
client = hrskills_pay.Client(api_key=api_key)

# Créer un paiement
payment = client.payments.create(
    amount=10000,
    currency='XAF',
    method='orange_money',
    phone='+237600000000',
    description='Commande #12345'
)

print(payment)`
  },
  {
    language: 'cURL',
    icon: '📡',
    code: `curl -X POST https://api.hrskillspay.com/v1/payments \\
  -u "\${HR_SKILLS_API_KEY}:" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 10000,
    "currency": "XAF",
    "method": "orange_money",
    "phone": "+237600000000",
    "description": "Commande #12345"
  }'`
  }
];

// SDK disponibles
const sdks = [
  { name: 'JavaScript/Node.js', version: '2.4.0', downloads: '50K+', repository: 'npm install hrskills-pay', status: 'stable' },
  { name: 'PHP', version: '2.3.1', downloads: '30K+', repository: 'composer require hrskills/pay', status: 'stable' },
  { name: 'Python', version: '2.2.0', downloads: '25K+', repository: 'pip install hrskills-pay', status: 'stable' },
  { name: 'iOS (Swift)', version: '3.1.0', downloads: '15K+', repository: "pod 'HrSkillsPay'", status: 'stable' },
  { name: 'Android (Kotlin)', version: '3.1.0', downloads: '20K+', repository: "implementation 'com.hrskills:pay:3.1.0'", status: 'stable' },
  { name: 'React Native', version: '1.5.0', downloads: '10K+', repository: 'npm install @hrskills/react-native-pay', status: 'beta' }
];

// Webhooks événements
const webhookEvents = [
  { event: 'payment.succeeded', description: 'Un paiement a réussi' },
  { event: 'payment.failed', description: 'Un paiement a échoué' },
  { event: 'payment.refunded', description: 'Un paiement a été remboursé' },
  { event: 'payment.pending', description: 'Un paiement est en attente' },
  { event: 'payout.completed', description: 'Un virement a été effectué' }
];

// Ressources développeurs
const developerResources = [
  { title: 'Documentation API', description: 'Reference complète des endpoints', icon: BookOpen, href: '/docs/api', color: 'from-blue-500 to-cyan-500' },
  { title: "Guides d'intégration", description: 'Tutoriels pas à pas', icon: FileText, href: '/docs/guides', color: 'from-violet-500 to-purple-500' },
  { title: 'Sandbox de test', description: 'Environnement de test', icon: Play, href: '/dashboard/sandbox', color: 'from-emerald-500 to-teal-500' },
  { title: 'Status API', description: 'Uptime et incidents', icon: Zap, href: '/status', color: 'from-amber-500 to-orange-500' },
  { title: 'Communauté', description: 'Forum développeurs', icon: Users, href: 'https://community.hrskillspay.com', color: 'from-pink-500 to-rose-500' },
  { title: 'Support technique', description: 'Tickets prioritaires', icon: MessageSquare, href: '/support', color: 'from-indigo-500 to-violet-500' }
];

// Features API
const apiFeatures = [
  { icon: Shield, title: 'Sécurité enterprise', description: 'Clés API révocables, IP whitelisting' },
  { icon: Clock, title: 'Idempotence', description: 'Évitez les doublons de paiement' },
  { icon: Globe, title: 'Multi-région', description: 'Latence minimale' },
  { icon: Layers, title: 'Versioning', description: 'Rétrocompatibilité garantie' },
  { icon: Webhook, title: 'Webhooks fiables', description: 'Retries automatiques, signature HMAC' },
  { icon: Rocket, title: 'Performance', description: '99.99% uptime, <100ms latency' }
];

// ============================================================================
// COMPOSANTS RÉUTILISABLES
// ============================================================================

const StatusBadge = ({ status }) => {
  const colors = {
    stable: 'bg-emerald-100 text-emerald-700',
    beta: 'bg-amber-100 text-amber-700'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${colors[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  );
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-slate-700 transition-colors" aria-label="Copier le code">
      {copied ? <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />}
    </button>
  );
};

const CodeBlock = ({ code }) => {
  return (
    <div className="relative group">
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} />
      </div>
      <pre className="bg-slate-900 rounded-xl p-3 sm:p-4 overflow-x-auto text-[11px] sm:text-sm">
        <code className="text-slate-300 font-mono whitespace-pre-wrap">{code}</code>
      </pre>
    </div>
  );
};

const EndpointCard = ({ endpoint }) => {
  const methodColors = {
    GET: 'bg-emerald-100 text-emerald-700',
    POST: 'bg-blue-100 text-blue-700',
    PUT: 'bg-amber-100 text-amber-700',
    DELETE: 'bg-red-100 text-red-700'
  };
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 transition-colors">
      <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold font-mono ${methodColors[endpoint.method]}`}>
        {endpoint.method}
      </span>
      <div className="flex-1 min-w-0">
        <code className="text-xs sm:text-sm font-mono text-slate-900 block truncate">{endpoint.path}</code>
        <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{endpoint.description}</p>
      </div>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
        {endpoint.auth === 'required' && <Key className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />}
        <span className="text-[8px] sm:text-[10px] text-slate-400">{endpoint.rateLimit}</span>
      </div>
    </div>
  );
};

const SDKCard = ({ sdk }) => (
  <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all group">
    <div className="flex items-start justify-between mb-2 sm:mb-3">
      <h4 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">{sdk.name}</h4>
      <StatusBadge status={sdk.status} />
    </div>
    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
      <div className="flex items-center justify-between">
        <span className="text-slate-500">Version</span>
        <span className="font-mono text-slate-700">{sdk.version}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-500">Downloads</span>
        <span className="font-semibold text-slate-900">{sdk.downloads}</span>
      </div>
    </div>
    <div className="mt-3 sm:mt-4 p-2 sm:p-2.5 bg-slate-50 rounded-lg">
      <code className="text-[10px] sm:text-xs font-mono text-slate-700 break-all">{sdk.repository}</code>
    </div>
  </div>
);

const WebhookEventCard = ({ event }) => (
  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-xl">
    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-500" />
    <div className="flex-1">
      <code className="text-xs sm:text-sm font-mono text-slate-900">{event.event}</code>
      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{event.description}</p>
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
      className="relative py-12 sm:py-16 lg:py-28 bg-gradient-to-b from-slate-900 via-violet-900 to-slate-900 overflow-hidden"
      aria-labelledby="developers-heading"
    >
      {/* Arrière-plan décoratif - responsive */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========== EN-TÊTE ========== */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-violet-500/20 border border-violet-400/30 rounded-full mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold text-violet-200 uppercase tracking-wide">Développeurs</span>
          </div>
          
          <h2 id="developers-heading" className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight">
            Construit pour les{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              développeurs
            </span>
          </h2>
          
          <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto px-4">
            API RESTful documentée, SDK natifs, webhooks fiables et sandbox de test. 
            Intégrez des paiements en quelques lignes de code.
          </p>
        </div>

        {/* ========== QUICK START ========== */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            
            {/* Colonne gauche */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
                  Quick Start
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6">
                  Suivez ces 3 étapes pour accepter votre premier paiement en moins de 10 minutes.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { step: '01', title: 'Créez votre compte', desc: 'Inscrivez-vous gratuitement et obtenez vos clés API' },
                  { step: '02', title: 'Installez le SDK', desc: 'Choisissez votre langage et installez notre bibliothèque' },
                  { step: '03', title: "Intégrez l'API", desc: 'Suivez nos guides et testez en sandbox' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl">
                    <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-white">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note sécurité */}
              <div className="p-3 sm:p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                  <span className="text-xs sm:text-sm font-semibold text-amber-200">Clés API</span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400">
                  ⚠️ Utilisez des variables d'environnement. Ne commitez jamais vos clés dans Git.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                <a href="/docs/quickstart" className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-xl font-semibold text-xs sm:text-sm hover:shadow-lg transition-all group">
                  <span>Commencer l'intégration</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/dashboard" className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-white/10 border border-white/20 text-white rounded-xl font-semibold text-xs sm:text-sm hover:bg-white/20 transition-all">
                  <span>Accès Dashboard</span>
                </a>
              </div>
            </div>

            {/* Colonne droite - Code */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {codeExamples.map((example) => (
                  <button
                    key={example.language}
                    onClick={() => setActiveLanguage(example.language)}
                    className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-medium transition-all ${
                      activeLanguage === example.language
                        ? 'bg-violet-500 text-white'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    <span className="mr-1 text-xs sm:mr-1.5">{example.icon}</span>
                    <span className="hidden xs:inline">{example.language}</span>
                    <span className="xs:hidden">{example.language.slice(0, 2)}</span>
                  </button>
                ))}
              </div>

              {activeExample && (
                <div>
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="text-[10px] sm:text-xs text-slate-400">Créer un paiement</span>
                    <span className="text-[10px] sm:text-xs text-slate-500">POST /v1/payments</span>
                  </div>
                  <CodeBlock code={activeExample.code} />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-[10px] sm:text-xs text-slate-400">Réponse API</span>
                  <span className="text-[10px] sm:text-xs text-emerald-400">200 OK</span>
                </div>
                <CodeBlock code={`{
  "id": "pay_1234567890",
  "status": "succeeded",
  "amount": 10000,
  "currency": "XAF",
  "method": "orange_money"
}`} />
              </div>
            </div>
          </div>
        </div>

        {/* ========== ENDPOINTS ========== */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
                Endpoints principaux
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Les routes API les plus utilisées</p>
            </div>
            <a href="/docs/api" className="text-xs sm:text-sm font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1">
              Documentation <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {apiEndpoints.map((endpoint) => (
              <EndpointCard key={endpoint.path} endpoint={endpoint} />
            ))}
          </div>
        </div>

        {/* ========== SDKs ========== */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2 sm:gap-3">
              <Download className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
              SDK officiels
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">Bibliothèques maintenues pour vos langages préférés</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {sdks.map((sdk) => (
              <SDKCard key={sdk.name} sdk={sdk} />
            ))}
          </div>
        </div>

        {/* ========== WEBHOOKS ========== */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
              
              <div className="space-y-3 sm:space-y-5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Webhook className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">Webhooks en temps réel</h4>
                    <p className="text-xs sm:text-sm text-slate-400">Soyez notifié de chaque événement</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300">
                  Configurez des webhooks pour recevoir des notifications HTTP en temps réel 
                  lorsque des événements se produisent dans votre compte.
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { label: 'Retries automatiques', value: "Jusqu'à 3 fois" },
                    { label: 'Signature HMAC', value: 'Vérification sécurisée' },
                    { label: 'Dashboard logs', value: 'Historique complet' },
                    { label: 'Latence moyenne', value: '< 500ms' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-2 sm:p-3 bg-white/5 rounded-lg sm:rounded-xl">
                      <p className="text-[9px] sm:text-xs text-slate-400">{item.label}</p>
                      <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h5 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3">Événements disponibles</h5>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {webhookEvents.map((event, idx) => (
                    <WebhookEventCard key={idx} event={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== FEATURES ========== */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
              Conçu pour la performance et la sécurité
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">Tout ce dont vous avez besoin pour construire des applications fiables</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {apiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-3 sm:p-4 lg:p-5 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-2 sm:mb-4">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">{feature.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========== RESSOURCES ========== */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
              Ressources pour aller plus loin
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">Documentation, outils et communauté pour vous accompagner</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {developerResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.href}
                  className="group p-3 sm:p-4 lg:p-5 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl hover:bg-white/10 hover:border-violet-400/30 transition-all"
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {resource.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2">{resource.description}</p>
                </a>
              );
            })}
          </div>
        </div>

        {/* ========== STATS ========== */}
        <div>
          <div className="bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-400/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                { value: '99.99%', label: 'Uptime API', icon: Zap },
                { value: '<100ms', label: 'Latence p95', icon: Clock },
                { value: '10M+', label: 'Requêtes/jour', icon: Globe },
                { value: '5000+', label: 'Développeurs', icon: Users }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-violet-500/20 mb-2 sm:mb-3">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
                    </div>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs lg:text-sm text-slate-400 mt-0.5 sm:mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Developpeurs;