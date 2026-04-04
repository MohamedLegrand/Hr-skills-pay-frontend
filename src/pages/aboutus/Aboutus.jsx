import React from 'react';
import { 
  Target, Shield, Users, Globe, Zap, CheckCircle, 
  ArrowRight, Award, Heart, TrendingUp, MapPin, Clock
} from 'lucide-react';

const Aboutus = () => {
  
  // Valeurs de l'entreprise
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

  // Chiffres clés
  const stats = [
    { value: '500+', label: 'Entreprises accompagnées', icon: Users },
    { value: '10M+', label: 'Transactions traitées', icon: TrendingUp },
    { value: '99.9%', label: 'Disponibilité API', icon: Shield },
    { value: '4.9/5', label: 'Satisfaction client', icon: Award }
  ];

  // Équipe dirigeante (placeholders)
  const team = [
    {
      name: 'Jean-Pierre MBALLA',
      role: 'CEO & Co-fondateur',
      bio: '15 ans d\'expérience dans la fintech africaine. Ancien de Orange Money et MTN.',
      image: 'https://placehold.co/200x200/e2e8f0/475569?text=JP'
    },
    {
      name: 'Amina KOUMBA',
      role: 'CTO & Co-fondatrice',
      bio: 'Ingénieure logiciel, experte en architectures distribuées et sécurité des paiements.',
      image: 'https://placehold.co/200x200/e2e8f0/475569?text=AK'
    },
    {
      name: 'Marc TCHUENTE',
      role: 'Head of Partnerships',
      bio: 'Spécialiste des écosystèmes fintech en Afrique Centrale et de l\'Ouest.',
      image: 'https://placehold.co/200x200/e2e8f0/475569?text=MT'
    }
  ];

  // Timeline de l'entreprise
  const milestones = [
    { year: '2022', title: 'Création', desc: 'Lancement de Hr Skills Pay à Douala, avec 3 partenaires de paiement.' },
    { year: '2023', title: 'Croissance', desc: '500+ entreprises nous font confiance. Expansion au Sénégal et Côte d\'Ivoire.' },
    { year: '2024', title: 'Innovation', desc: 'Lancement de l\'API v2, SDK mobiles et fonctionnalités enterprise.' },
    { year: '2025', title: 'Vision', desc: 'Devenir la plateforme de référence pour les paiements en Afrique francophone.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Décoratif */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenu texte */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full">
                <Heart className="w-4 h-4 text-violet-600" />
                <span className="text-xs font-semibold text-violet-700">À propos de nous</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Nous construisons{" "}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  l'avenir des paiements
                </span>{" "}
                en Afrique
              </h1>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Hr Skills Pay est une fintech camerounaise née d'une conviction simple : 
                chaque entreprise, quelle que soit sa taille, mérite d'accéder à des solutions 
                de paiement modernes, sécurisées et abordables.
              </p>
              
              <p className="text-slate-600">
                Depuis 2022, nous accompagnons les entrepreneurs africains dans leur 
                transformation digitale, en leur offrant une infrastructure de paiement 
                unifiée pour Orange Money, MTN MoMo, cartes bancaires et plus encore.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-all group"
                >
                  <span>Nous contacter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#solutions" 
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                >
                  <span>Découvrir nos solutions</span>
                </a>
              </div>
            </div>

            {/* Visuel / Illustration */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                {/* Cercles décoratifs */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-full blur-2xl" />
                <div className="absolute inset-4 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-full blur-xl" />
                
                {/* Carte centrale */}
                <div className="absolute inset-8 bg-white rounded-3xl shadow-2xl shadow-violet-500/20 border border-slate-200 p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mb-4">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Hr Skills Pay</h3>
                  <p className="text-sm text-slate-500 mt-2">Paiements unifiés pour l'Afrique</p>
                  <div className="mt-6 flex items-center gap-2 text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Certifié PCI DSS</span>
                  </div>
                </div>

                {/* Badges flottants */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-slate-200 px-4 py-2 flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  <span className="text-xs font-semibold text-slate-700">15+ pays</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-200 px-4 py-2 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-xs font-semibold text-slate-700">99.9% uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CHIFFRES CLÉS ========== */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-100 mb-4">
                    <Icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== NOS VALEURS ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Nos <span className="text-violet-600">valeurs</span>
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Ce qui nous guide au quotidien et façonne chaque décision que nous prenons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== NOTRE HISTOIRE ========== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Timeline */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Notre parcours</h2>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-violet-600" />
                      {index < milestones.length - 1 && (
                        <div className="w-px h-full bg-slate-300 mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <span className="text-sm font-bold text-violet-600">{milestone.year}</span>
                      <h4 className="font-semibold text-slate-900 mt-1">{milestone.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte / Illustration */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-violet-600" />
                Notre présence en Afrique
              </h3>
              <p className="text-slate-600 mb-6">
                Basés au Cameroun, nous opérons dans toute l'Afrique francophone avec 
                des équipes locales pour un support de proximité.
              </p>
              
              {/* Carte simplifiée */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-600">Carte interactive bientôt disponible</p>
                  </div>
                </div>
                
                {/* Points de présence */}
                <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-violet-600 animate-pulse" title="Douala" />
                <div className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-violet-600 animate-pulse" title="Yaoundé" />
                <div className="absolute top-1/4 left-1/2 w-3 h-3 rounded-full bg-violet-400" title="Dakar" />
                <div className="absolute top-2/5 left-2/3 w-3 h-3 rounded-full bg-violet-400" title="Abidjan" />
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                {['Cameroun', 'Sénégal', 'Côte d\'Ivoire', 'Mali'].map((country) => (
                  <div key={country} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {country}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ÉQUIPE ========== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              L'équipe <span className="text-violet-600">Hr Skills Pay</span>
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Des passionnés de fintech, d'innovation et d'impact social, unis par une même vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group text-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all"
              >
                <div className="relative inline-block mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-2xl object-cover mx-auto ring-4 ring-slate-100 group-hover:ring-violet-200 transition-all"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white" />
                </div>
                <h4 className="font-semibold text-slate-900">{member.name}</h4>
                <p className="text-sm text-violet-600 font-medium mt-1">{member.role}</p>
                <p className="text-sm text-slate-600 mt-3">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            
            {/* Décoratif */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-4">
                Prêt à transformer vos paiements ?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Rejoignez les 500+ entreprises qui font confiance à Hr Skills Pay 
                pour accepter des paiements simples, sécurisés et scalables.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all group"
                >
                  <span>Commencer gratuitement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#solutions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all"
                >
                  <span>Voir nos solutions</span>
                </a>
              </div>
              
              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Sans engagement
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Support 24/7
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Migration assistée
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Aboutus;