import { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, CheckCircle, Shield, Zap, Users } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// SOUS-COMPOSANTS RÉUTILISABLES RESPONSIVES
// ─────────────────────────────────────────────────────────────

const FormField = ({ label, name, value, onChange, placeholder, type = 'text', error, required, focused, onFocus, onBlur, children }) => {
  const inputClass = useMemo(() => 
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-white text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 ${
      error
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : focused === name
        ? 'border-violet-500 ring-2 ring-violet-200'
        : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
    }`,
    [error, focused, name]   
  );

  return (
    <div>
      <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children ? (
        children({ className: inputClass })
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => onFocus?.(name)}
          onBlur={() => onBlur?.()}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {error && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
};

const PasswordInput = ({ label, name, value, onChange, error, placeholder, show, onToggle, focused, onFocus, onBlur }) => {
  const strength = useMemo(() => {
    if (!value) return 0;
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  }, [value]);

  const strengthConfig = useMemo(() => ({
    0: { color: 'bg-slate-200', text: '', label: '' },
    1: { color: 'bg-red-400', text: 'text-red-500', label: 'Faible' },
    2: { color: 'bg-amber-400', text: 'text-amber-500', label: 'Moyen' },
    3: { color: 'bg-blue-400', text: 'text-blue-500', label: 'Bien' },
    4: { color: 'bg-emerald-400', text: 'text-emerald-500', label: 'Fort' },
  }), []);

  const inputClass = useMemo(() => 
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-white text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 pr-8 sm:pr-10 ${
      error
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : focused === name
        ? 'border-violet-500 ring-2 ring-violet-200'
        : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
    }`,
    [error, focused, name]
  );

  return (
    <div>
      <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => onFocus?.(name)}
          onBlur={() => onBlur?.()}
          placeholder={placeholder}
          className={inputClass}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500 transition-colors"
          aria-label={show ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          {show ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
      </div>
      {error && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1">{error}</p>}
      
      {value && (
        <div className="mt-2">
          <div className="flex gap-1 sm:gap-1.5 mb-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 sm:h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  strength >= i ? strengthConfig[strength].color : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] sm:text-xs text-slate-500">
            Force :{' '}
            <span className={`font-medium ${strengthConfig[strength].text}`}>
              {strengthConfig[strength].label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="pt-1 sm:pt-2">
    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
      <div className="h-px flex-1 bg-gradient-to-r from-violet-200 to-transparent" />
      <span className="text-[10px] sm:text-xs font-bold text-violet-600 uppercase tracking-wider">{title}</span>
      <div className="h-px flex-1 bg-gradient-to-l from-violet-200 to-transparent" />
    </div>
    {children}
  </div>
);

const SuccessScreen = () => {
  const navigate = useNavigate();
  
  return (
    <section id="register-success" className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4 sm:p-6">
      <div className="text-center max-w-md w-full">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-violet-200 animate-bounce">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">Compte créé avec succès !</h2>
        <p className="text-sm sm:text-base text-slate-600 mb-2">
          Bienvenue sur <span className="font-semibold text-violet-600">HR-skills pay</span>.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mt-3 sm:mt-4 text-left">
          <p className="text-xs sm:text-sm text-amber-800 font-medium mb-1">Prochaine étape</p>
          <p className="text-xs sm:text-sm text-amber-700">
            Connectez-vous pour soumettre vos documents KYC et activer votre compte marchand.
          </p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 group"
        >
          <span>Se connecter</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL RESPONSIVE
// ─────────────────────────────────────────────────────────────

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', dateNaissance: '', genre: '',
    telephone: '', pays: '', devise: '', motDePasse: '', confirmerMotDePasse: '',
    nomEntreprise: '', secteur: '', typeStructure: '', cgu: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors(err => ({ ...err, [name]: '' }));
  }, []);

  const validate = useCallback(() => {
    const e = {};
    if (!form.nom.trim()) e.nom = 'Champ requis';
    if (!form.prenom.trim()) e.prenom = 'Champ requis';
    if (!form.email.trim()) e.email = 'Champ requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.dateNaissance) e.dateNaissance = 'Champ requis';
    if (!form.telephone.trim()) e.telephone = 'Champ requis';
    if (!form.pays) e.pays = 'Champ requis';
    if (!form.devise) e.devise = 'Champ requis';
    if (!form.motDePasse) e.motDePasse = 'Champ requis';
    else if (form.motDePasse.length < 8) e.motDePasse = 'Minimum 8 caractères';
    if (form.confirmerMotDePasse !== form.motDePasse) e.confirmerMotDePasse = 'Mots de passe différents';
    if (!form.nomEntreprise.trim()) e.nomEntreprise = 'Champ requis';
    if (!form.secteur) e.secteur = 'Champ requis';
    if (!form.cgu) e.cgu = 'Vous devez accepter les CGU';
    return e;
  }, [form]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }, [validate, form]);

  const handleFocus = useCallback((field) => setFocused(field), []);
  const handleBlur = useCallback(() => setFocused(''), []);

  const africanCountries = [
    { code: "DZ", name: "Algérie", flag: "🇩🇿" }, { code: "AO", name: "Angola", flag: "🇦🇴" },
    { code: "BJ", name: "Bénin", flag: "🇧🇯" }, { code: "BW", name: "Botswana", flag: "🇧🇼" },
    { code: "BF", name: "Burkina Faso", flag: "🇧🇫" }, { code: "BI", name: "Burundi", flag: "🇧🇮" },
    { code: "CM", name: "Cameroun", flag: "🇨🇲" }, { code: "CV", name: "Cap-Vert", flag: "🇨🇻" },
    { code: "CF", name: "République centrafricaine", flag: "🇨🇫" }, { code: "KM", name: "Comores", flag: "🇰🇲" },
    { code: "CG", name: "Congo", flag: "🇨🇬" }, { code: "CD", name: "RDC", flag: "🇨🇩" },
    { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" }, { code: "DJ", name: "Djibouti", flag: "🇩🇯" },
    { code: "EG", name: "Égypte", flag: "🇪🇬" }, { code: "ER", name: "Érythrée", flag: "🇪🇷" },
    { code: "SZ", name: "Eswatini", flag: "🇸🇿" }, { code: "ET", name: "Éthiopie", flag: "🇪🇹" },
    { code: "GA", name: "Gabon", flag: "🇬🇦" }, { code: "GM", name: "Gambie", flag: "🇬🇲" },
    { code: "GH", name: "Ghana", flag: "🇬🇭" }, { code: "GN", name: "Guinée", flag: "🇬🇳" },
    { code: "GW", name: "Guinée-Bissau", flag: "🇬🇼" }, { code: "GQ", name: "Guinée équatoriale", flag: "🇬🇶" },
    { code: "KE", name: "Kenya", flag: "🇰🇪" }, { code: "LS", name: "Lesotho", flag: "🇱🇸" },
    { code: "LR", name: "Libéria", flag: "🇱🇷" }, { code: "LY", name: "Libye", flag: "🇱🇾" },
    { code: "MG", name: "Madagascar", flag: "🇲🇬" }, { code: "MW", name: "Malawi", flag: "🇲🇼" },
    { code: "ML", name: "Mali", flag: "🇲🇱" }, { code: "MA", name: "Maroc", flag: "🇲🇦" },
    { code: "MU", name: "Maurice", flag: "🇲🇺" }, { code: "MR", name: "Mauritanie", flag: "🇲🇷" },
    { code: "MZ", name: "Mozambique", flag: "🇲🇿" }, { code: "NA", name: "Namibie", flag: "🇳🇦" },
    { code: "NE", name: "Niger", flag: "🇳🇪" }, { code: "NG", name: "Nigéria", flag: "🇳🇬" },
    { code: "UG", name: "Ouganda", flag: "🇺🇬" }, { code: "RW", name: "Rwanda", flag: "🇷🇼" },
    { code: "ST", name: "Sao Tomé-et-Principe", flag: "🇸🇹" }, { code: "SN", name: "Sénégal", flag: "🇸🇳" },
    { code: "SC", name: "Seychelles", flag: "🇸🇨" }, { code: "SL", name: "Sierra Leone", flag: "🇸🇱" },
    { code: "SO", name: "Somalie", flag: "🇸🇴" }, { code: "SD", name: "Soudan", flag: "🇸🇩" },
    { code: "SS", name: "Soudan du Sud", flag: "🇸🇸" }, { code: "TZ", name: "Tanzanie", flag: "🇹🇿" },
    { code: "TD", name: "Tchad", flag: "🇹🇩" }, { code: "TG", name: "Togo", flag: "🇹🇬" },
    { code: "TN", name: "Tunisie", flag: "🇹🇳" }, { code: "ZM", name: "Zambie", flag: "🇿🇲" },
    { code: "ZW", name: "Zimbabwe", flag: "🇿🇼" }
  ].sort((a, b) => a.name.localeCompare(b.name));

  if (submitted) {
    return <SuccessScreen />;
  }

  return (
    <section id="register" className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      
      <div className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-violet-200/50 border border-violet-100 overflow-hidden">
        
        {/* Logo responsive */}
        <div className="flex justify-center pt-6 sm:pt-8 pb-1 sm:pb-2">
          <img 
            src="/images/logo.png" 
            alt="HR-skills pay" 
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain drop-shadow-sm"
            loading="eager"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.parentElement) {
                const fallbackSvg = document.createElement('div');
                fallbackSvg.innerHTML = `
                  <svg class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-violet-600 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                `;
                e.currentTarget.parentElement.appendChild(fallbackSvg);
                e.currentTarget.remove();
              }
            }}
          />
        </div>

        {/* En-tête */}
        <div className="px-5 sm:px-6 lg:px-8 pb-3 sm:pb-4 border-b border-slate-100 text-center">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              HR-<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">skills pay</span>
            </h1>
          </div>
          <div className="mt-1 sm:mt-2">
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900">Créer un compte marchand</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
              Remplissez le formulaire ci-dessous pour commencer
            </p>
          </div>
        </div>

        {/* Formulaire responsive avec scroll */}
        <div className="px-5 sm:px-6 lg:px-8 py-5 sm:py-6 overflow-y-auto max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-320px)]">
          <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
            
            <Section title="Informations personnelles">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField label="Nom" name="nom" value={form.nom} onChange={handleChange} placeholder="Dupont" error={errors.nom} required focused={focused} onFocus={handleFocus} onBlur={handleBlur} />
                <FormField label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Jean" error={errors.prenom} required focused={focused} onFocus={handleFocus} onBlur={handleBlur} />
                <FormField label="Email" name="email" value={form.email} onChange={handleChange} placeholder="jean@email.com" type="email" error={errors.email} required focused={focused} onFocus={handleFocus} onBlur={handleBlur} />
                <FormField label="Date de naissance" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} type="date" error={errors.dateNaissance} required focused={focused} onFocus={handleFocus} onBlur={handleBlur} />
                
                <div className="sm:col-span-2">
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">Genre</label>
                  <select 
                    name="genre" 
                    value={form.genre} 
                    onChange={handleChange} 
                    onFocus={() => handleFocus('genre')} 
                    onBlur={handleBlur} 
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-white text-slate-800 outline-none transition-all duration-200 ${errors.genre ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : focused === 'genre' ? 'border-violet-500 ring-2 ring-violet-200' : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'}`}
                  >
                    <option value="">Sélectionner un genre</option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>
            </Section>

            <Section title="Sécurité du compte">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <FormField label="Téléphone" name="telephone" value={form.telephone} onChange={handleChange} placeholder="+237 6XX XXX XXX" type="tel" error={errors.telephone} required focused={focused} onFocus={handleFocus} onBlur={handleBlur} />
                
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">Pays <span className="text-red-500">*</span></label>
                  <select 
                    name="pays" 
                    value={form.pays} 
                    onChange={handleChange} 
                    onFocus={() => handleFocus('pays')} 
                    onBlur={handleBlur} 
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-white text-slate-800 outline-none transition-all duration-200 ${errors.pays ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : focused === 'pays' ? 'border-violet-500 ring-2 ring-violet-200' : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'}`}
                  >
                    <option value="">Sélectionner un pays</option>
                    {africanCountries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.pays && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1">{errors.pays}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">Devise <span className="text-red-500">*</span></label>
                  <select 
                    name="devise" 
                    value={form.devise} 
                    onChange={handleChange} 
                    onFocus={() => handleFocus('devise')} 
                    onBlur={handleBlur} 
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-white text-slate-800 outline-none transition-all duration-200 ${errors.devise ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : focused === 'devise' ? 'border-violet-500 ring-2 ring-violet-200' : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'}`}
                  >
                    <option value="">Sélectionner une devise</option>
                    <option value="XAF">XAF — Franc CFA (CEMAC)</option>
                    <option value="XOF">XOF — Franc CFA (UEMOA)</option>
                    <option value="USD">USD — Dollar américain</option>
                    <option value="EUR">EUR — Euro</option>
                  </select>
                  {errors.devise && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1">{errors.devise}</p>}
                </div>

                <PasswordInput 
                  label="Mot de passe" 
                  name="motDePasse" 
                  value={form.motDePasse} 
                  onChange={handleChange} 
                  error={errors.motDePasse} 
                  placeholder="Min. 8 caractères" 
                  show={showPassword} 
                  onToggle={() => setShowPassword(!showPassword)}
                  focused={focused}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">Confirmer <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      name="confirmerMotDePasse"
                      value={form.confirmerMotDePasse}
                      onChange={handleChange}
                      onFocus={() => handleFocus('confirmerMotDePasse')}
                      onBlur={handleBlur}
                      placeholder="Répéter le mot de passe"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-white text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 pr-8 sm:pr-10 ${errors.confirmerMotDePasse ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : focused === 'confirmerMotDePasse' ? 'border-violet-500 ring-2 ring-violet-200' : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'}`}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirm(!showConfirm)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500 transition-colors"
                      aria-label={showConfirm ? 'Masquer' : 'Afficher'}
                    >
                      {showConfirm ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                    </button>
                  </div>
                  {errors.confirmerMotDePasse && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1">{errors.confirmerMotDePasse}</p>}
                  {form.confirmerMotDePasse && form.confirmerMotDePasse === form.motDePasse && form.motDePasse && (
                    <p className="text-[10px] sm:text-xs text-emerald-600 mt-2 ml-1 flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Mots de passe identiques
                    </p>
                  )}
                </div>
              </div>
            </Section>

            <Section title="Informations professionnelles">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <FormField label="Nom de l'entreprise / activité" name="nomEntreprise" value={form.nomEntreprise} onChange={handleChange} placeholder="Ex : Boutique Kamga SARL" error={errors.nomEntreprise} required focused={focused} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">Secteur d'activité <span className="text-red-500">*</span></label>
                  <select 
                    name="secteur" 
                    value={form.secteur} 
                    onChange={handleChange} 
                    onFocus={() => handleFocus('secteur')} 
                    onBlur={handleBlur} 
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-white text-slate-800 outline-none transition-all duration-200 ${errors.secteur ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : focused === 'secteur' ? 'border-violet-500 ring-2 ring-violet-200' : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'}`}
                  >
                    <option value="">Sélectionner</option>
                    <option value="commerce">🛒 Commerce</option>
                    <option value="restauration">🍽️ Restauration</option>
                    <option value="services">💼 Services</option>
                    <option value="education">🎓 Éducation</option>
                    <option value="sante">🏥 Santé</option>
                    <option value="tech">💻 Technologie</option>
                    <option value="autre">📦 Autre</option>
                  </select>
                  {errors.secteur && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1">{errors.secteur}</p>}
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">Type de structure</label>
                  <select 
                    name="typeStructure" 
                    value={form.typeStructure} 
                    onChange={handleChange} 
                    onFocus={() => handleFocus('typeStructure')} 
                    onBlur={handleBlur} 
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-white text-slate-800 outline-none transition-all duration-200 ${focused === 'typeStructure' ? 'border-violet-500 ring-2 ring-violet-200' : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'}`}
                  >
                    <option value="">Sélectionner</option>
                    <option value="physique">👤 Personne physique</option>
                    <option value="sarl">🏢 SARL</option>
                    <option value="sa">🏛️ SA</option>
                    <option value="ong">🤝 ONG/Association</option>
                    <option value="autre">📋 Autre</option>
                  </select>
                </div>
              </div>
            </Section>

            {/* CGU */}
            <div className="bg-violet-50/80 border border-violet-100 rounded-xl p-3 sm:p-4">
              <label className="flex items-start gap-2 sm:gap-3 cursor-pointer group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input 
                    type="checkbox" 
                    name="cgu" 
                    checked={form.cgu} 
                    onChange={handleChange} 
                    className="sr-only peer" 
                  />
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 border-violet-300 peer-checked:bg-violet-600 peer-checked:border-violet-600 transition-all duration-200 flex items-center justify-center">
                    {form.cgu && <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />}
                  </div>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                  J'accepte les{' '}
                  <Link to="/mentions" className="text-violet-600 hover:text-violet-800 font-medium underline underline-offset-2">
                    conditions générales d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link to="/confidentialite" className="text-violet-600 hover:text-violet-800 font-medium underline underline-offset-2">
                    politique de confidentialité
                  </Link>{' '}
                  <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.cgu && <p className="text-[10px] sm:text-xs text-red-500 mt-2 ml-7 sm:ml-8">{errors.cgu}</p>}
            </div>

            {/* Bouton submit */}
            <button 
              type="submit" 
              className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm sm:text-base transition-all duration-200 shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              <span>Créer mon compte marchand</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 sm:pt-2 pb-0.5">
              {[
                { icon: Shield, text: 'Données sécurisées' },
                { icon: Zap, text: 'Activation rapide' },
                { icon: Users, text: 'Support 24/7' }
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
                  {text}
                </span>
              ))}
            </div>

            {/* Lien connexion */}
            <p className="text-center text-[11px] sm:text-sm text-slate-500 pt-1 sm:pt-2">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-violet-600 hover:text-violet-800 font-semibold transition-colors">
                Se connecter
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;