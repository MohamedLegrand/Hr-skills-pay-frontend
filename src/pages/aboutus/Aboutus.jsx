import React from 'react';
import { 
  Target, Shield, Users, Globe, Zap, CheckCircle, 
  ArrowRight, Award, Heart, TrendingUp, MapPin, Clock, Mail, Phone
} from 'lucide-react';

// ===== CONFIGURATION - Correction pour Vercel =====
const getEnvVar = (name, defaultValue) => {
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  if (typeof process !== 'undefined' && process.env && process.env[`NEXT_PUBLIC_${name}`]) {
    return process.env[`NEXT_PUBLIC_${name}`];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[`VITE_${name}`]) {
    return import.meta.env[`VITE_${name}`];
  }
  return defaultValue;
};

const APP_CONFIG = {
  contactEmail: getEnvVar('CONTACT_EMAIL', 'contact@hrskillspay.com'),
  salesEmail: getEnvVar('SALES_EMAIL', 'commercial@hrskillspay.com'),
  supportPhone: getEnvVar('SUPPORT_PHONE', '+237677246900'),
  companyName: getEnvVar('COMPANY_NAME', 'Hr Skills Pay'),
  foundedYear: getEnvVar('FOUNDED_YEAR', '2022'),
};

// ============================================================================
// COMPOSANT IMAGE AVEC FALLBACK
// ============================================================================
const TeamImage = ({ src, alt, fallback }) => {
  const [imgError, setImgError] = React.useState(false);
  
  if (imgError || !src) {
    return (
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mx-auto ring-4 ring-slate-100">
        <span className="text-white font-bold text-base sm:text-xl">{fallback}</span>
      </div>
    );
  }
  
  return (
    <img 
      src={src}
      alt={alt}
      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover mx-auto ring-4 ring-slate-100 group-hover:ring-violet-200 transition-all"
      onError={() => setImgError(true)}
    />
  );
};

// ============================================================================
// COMPOSANT PRINCIPAL RESPONSIVE
// ============================================================================
const Aboutus = () => {
  
  const values = [ 
    {
      icon: Target,
      title: 'Mission',
      description: 'Rendre les paiements digitaux accessibles à tous en Afrique, sans friction technique ni barrière financière.',
      color: 'from-violet-500 to-indigo-500'
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Chaque transaction est protégée par des standards bancaires : chiffrement AES-256, conformité PCI DSS, surveillance 24/7.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'Proximité',
      description: 'Une équipe locale basée au Cameroun, qui comprend vos défis et vous accompagne pas à pas.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Nous investissons dans la R&D pour anticiper les besoins futurs et offrir des solutions toujours plus performantes.',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const stats = [
    { value: '500+', label: 'Entreprises accompagnées', icon: Users },
    { value: '10M+', label: 'Transactions traitées', icon: TrendingUp },
    { value: '99.9%', label: 'Disponibilité API', icon: Shield },
    { value: '4.9/5', label: 'Satisfaction client', icon: Award }
  ];

  const team = [
    {
      name: 'Jean-Pierre MBALLA',
      role: 'CEO & Co-fondateur',
      bio: '15 ans d\'expérience dans la fintech africaine. Ancien de Orange Money et MTN.',
      image: '/images/team/ceo.jpg',
      fallback: 'JP'
    },
    {
      name: 'Amina KOUMBA',
      role: 'CTO & Co-fondatrice',
      bio: 'Ingénieure logiciel, experte en architectures distribuées et sécurité des paiements.',
      image: '/images/team/cto.jpg',
      fallback: 'AK'
    },
    {
      name: 'Marc TCHUENTE',
      role: 'Head of Partnerships',
      bio: 'Spécialiste des écosystèmes fintech en Afrique Centrale et de l\'Ouest.',
      image: '/images/team/partnerships.jpg',
      fallback: 'MT'
    }
  ];

  const milestones = [
    { year: APP_CONFIG.foundedYear, title: 'Création', desc: `Lancement de ${APP_CONFIG.companyName} à Douala, avec 3 partenaires de paiement.` },
    { year: '2023', title: 'Croissance', desc: '500+ entreprises nous font confiance. Expansion au Sénégal et Côte d\'Ivoire.' },
    { year: '2024', title: 'Innovation', desc: 'Lancement de l\'API v2, SDK mobiles et fonctionnalités enterprise.' },
    { year: '2025', title: 'Vision', desc: 'Devenir la plateforme de référence pour les paiements en Afrique francophone.' }
  ];

  const countries = [
    { name: 'Cameroun', flag: '🇨🇲', active: true },
    { name: 'Sénégal', flag: '🇸🇳', active: true },
    { name: 'Côte d\'Ivoire', flag: '🇨🇮', active: true },
    { name: 'Mali', flag: '🇲🇱', active: true },
    { name: 'Burkina Faso', flag: '🇧🇫', active: false },
    { name: 'Gabon', flag: '🇬🇦', active: false }
  ];

  return (
    <section 
      id="aboutus"
      className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white"
    >
      
      {/* ========== HERO SECTION RESPONSIVE ========== */}
      <div className="relative py-12 sm:py-16 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-violet-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-violet-100 rounded-full mx-auto lg:mx-0">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-600" />
                <span className="text-[10px] sm:text-xs font-semibold text-violet-700">À propos de nous</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight px-2 sm:px-0">
                Nous construisons{" "}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  l'avenir des paiements
                </span>{" "}
                en Afrique
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed px-4 sm:px-0">
                {APP_CONFIG.companyName} est une fintech camerounaise née d'une conviction simple : 
                chaque entreprise, quelle que soit sa taille, mérite d'accéder à des solutions 
                de paiement modernes, sécurisées et abordables.
              </p>
              
              <p className="text-sm sm:text-base text-slate-600 px-4 sm:px-0">
                Depuis {APP_CONFIG.foundedYear}, nous accompagnons les entrepreneurs africains dans leur 
                transformation digitale, en leur offrant une infrastructure de paiement 
                unifiée pour Orange Money, MTN MoMo, cartes bancaires et plus encore.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 px-4 sm:px-0">
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 bg-violet-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-violet-700 transition-all group"
                >
                  <span>Nous contacter</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 border border-slate-300 text-slate-700 rounded-xl font-semibold text-sm sm:text-base hover:bg-slate-50 transition-all"
                >
                  <span>Découvrir nos solutions</span>
                </a>
              </div>
            </div>

            <div className="relative flex justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[280px] sm:max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-full blur-2xl" />
                <div className="absolute inset-4 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-full blur-xl" />
                
                <div className="absolute inset-8 bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-violet-500/20 border border-slate-200 p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mb-3 sm:mb-4">
                    <Globe className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-slate-900">{APP_CONFIG.companyName}</h3>
                  <p className="text-[10px] sm:text-sm text-slate-500 mt-1 sm:mt-2">Paiements unifiés pour l'Afrique</p>
                  <div className="mt-3 sm:mt-6 flex items-center gap-1.5 sm:gap-2 text-emerald-600">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-[10px] sm:text-sm font-medium">Certifié PCI DSS</span>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white rounded-lg sm:rounded-xl shadow-lg border border-slate-200 px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-2xl">🌍</span>
                  <span className="text-[8px] sm:text-xs font-semibold text-slate-700">15+ pays</span>
                </div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-white rounded-lg sm:rounded-xl shadow-lg border border-slate-200 px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-1 sm:gap-2">
                  <span className="text-lg sm:text-2xl">⚡</span>
                  <span className="text-[8px] sm:text-xs font-semibold text-slate-700">99.9% uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== CHIFFRES CLÉS RESPONSIVES ========== */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-violet-100 mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-[10px] sm:text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== NOS VALEURS RESPONSIVES ========== */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Nos <span className="text-violet-600">valeurs</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4">
              Ce qui nous guide au quotidien et façonne chaque décision que nous prenons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="group p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== NOTRE HISTOIRE RESPONSIVE ========== */}
      <section className="py-12 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center lg:text-left">Notre parcours</h2>
              <div className="space-y-4 sm:space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-3 sm:gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-violet-600" />
                      {index < milestones.length - 1 && (
                        <div className="w-px h-full bg-slate-300 mt-2" />
                      )}
                    </div>
                    <div className="pb-4 sm:pb-6">
                      <span className="text-xs sm:text-sm font-bold text-violet-600">{milestone.year}</span>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 mt-1">{milestone.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
                Notre présence en Afrique
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">
                Basés au Cameroun, nous opérons dans toute l'Afrique francophone avec 
                des équipes locales pour un support de proximité.
              </p>
              
              <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-10 h-10 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-2 sm:mb-3" />
                    <p className="text-[10px] sm:text-sm font-medium text-slate-600">Notre couverture s'étend</p>
                  </div>
                </div>
                
                <div className="absolute top-[35%] left-[25%]">
                  <div className="relative">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-violet-600 animate-pulse" />
                    <div className="absolute -top-1 -left-1 w-3 h-3 sm:w-5 sm:h-5 rounded-full bg-violet-400 animate-ping opacity-75" />
                  </div>
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[8px] sm:text-[10px] font-medium text-violet-700 whitespace-nowrap">Douala</span>
                </div>
                <div className="absolute top-[45%] left-[35%] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-500 animate-pulse" />
                <div className="absolute top-[25%] left-[55%] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-400" />
                <div className="absolute top-[40%] left-[70%] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-400" />
              </div>
              
              <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                {countries.filter(c => c.active).map((country) => (
                  <div key={country.name} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm text-slate-600">
                    <span>{country.flag}</span>
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                    <span>{country.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                <p className="text-[10px] sm:text-xs text-slate-500">
                  🌍 Expansion en cours vers d'autres pays d'Afrique de l'Ouest et centrale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ÉQUIPE RESPONSIVE ========== */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              L'équipe <span className="text-violet-600">{APP_CONFIG.companyName}</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4">
              Des passionnés de fintech, d'innovation et d'impact social, unis par une même vision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all"
              >
                <TeamImage 
                  src={member.image} 
                  alt={member.name}
                  fallback={member.fallback}
                />
                <h4 className="text-sm sm:text-base font-semibold text-slate-900 mt-3 sm:mt-4">{member.name}</h4>
                <p className="text-xs sm:text-sm text-violet-600 font-medium mt-1">{member.role}</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 sm:mt-3">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL RESPONSIVE ========== */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 sm:w-80 sm:h-80 bg-violet-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-3 sm:mb-4">
                Prêt à transformer vos paiements ?
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                Rejoignez les 500+ entreprises qui font confiance à {APP_CONFIG.companyName} 
                pour accepter des paiements simples, sécurisés et scalables.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a 
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all group w-full sm:w-auto"
                >
                  <span>Commencer gratuitement</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="mailto:commercial@hrskillspay.com"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border border-white/20 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:bg-white/20 transition-all w-full sm:w-auto"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Contacter les ventes</span>
                </a>
              </div>
              
              <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/70">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" /> Sans engagement
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" /> Support 24/7
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" /> Migration assistée
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </section>
  );
};

export default Aboutus;