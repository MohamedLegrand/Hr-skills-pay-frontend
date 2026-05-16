import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, CheckCircle, Shield, Mail, Lock, AlertCircle, LogIn } from 'lucide-react';

// ============================================================
// COMPOSANT POUR CHAMP DE FORMULAIRE AVEC VALIDATION
// ============================================================
const FormField = ({ label, name, value, onChange, placeholder, type = 'text', error, required, icon: Icon, focused, onFocus, onBlur, success }) => {
  const inputClass = useMemo(() => 
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-9 sm:pl-10 text-sm rounded-xl border bg-white text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 ${
      error
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : success
        ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
        : focused === name
        ? 'border-violet-500 ring-2 ring-violet-200'
        : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
    }`,
    [error, focused, name, success]
  ); 
 
  return ( 
    <div className="animate-slideIn">
      <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200">
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        )}
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
        {value && !error && !success && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
        )}
        {value && !error && success && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 animate-scaleIn" />
        )}
        {error && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 animate-shake" />
        )}
      </div>
      {error && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1 flex items-center gap-1 animate-fadeIn">{error}</p>}
    </div>
  );
};

// ============================================================
// COMPOSANT POUR MOT DE PASSE AVEC INDICATEUR DE FORCE
// ============================================================
const PasswordInput = ({ label, name, value, onChange, error, placeholder, show, onToggle, focused, onFocus, onBlur }) => {
  const [capsLock, setCapsLock] = useState(false);

  const handleKeyUp = (e) => {
    setCapsLock(e.getModifierState && e.getModifierState('CapsLock'));
  };

  const inputClass = useMemo(() => 
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-9 sm:pl-10 text-sm rounded-xl border bg-white text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 pr-8 sm:pr-10 ${
      error
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : focused === name
        ? 'border-violet-500 ring-2 ring-violet-200'
        : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
    }`,
    [error, focused, name]
  );

  const success = value && !error;

  return (
    <div className="animate-slideIn" style={{ animationDelay: '100ms' }}>
      <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => onFocus?.(name)}
          onBlur={() => onBlur?.()}
          onKeyUp={handleKeyUp}
          placeholder={placeholder}
          className={inputClass}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500 transition-all duration-200 hover:scale-110"
          aria-label={show ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          {show ? <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>
        {success && (
          <CheckCircle className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 animate-scaleIn" />
        )}
      </div>
      {capsLock && (
        <p className="text-[10px] text-amber-600 mt-1 ml-1 flex items-center gap-1 animate-fadeIn">
          <AlertCircle className="w-3 h-3" /> Verrouillage majuscule activé
        </p>
      )}
      {error && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1 flex items-center gap-1 animate-fadeIn">{error}</p>}
    </div>
  );
};

// ============================================================
// COMPOSANT DE CHARGEMENT
// ============================================================
const LoadingSpinner = () => (
  <div className="flex items-center justify-center gap-2">
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <span className="text-xs sm:text-sm">Connexion en cours...</span>
  </div>
);

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', motDePasse: '', remember: false });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  // Validation en temps réel
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email requis';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email invalide';
        return '';
      case 'motDePasse':
        if (!value) return 'Mot de passe requis';
        if (value.length < 6) return 'Minimum 6 caractères';
        return '';
      default:
        return '';
    }
  }, []);

  // Validation temps réel
  useEffect(() => {
    const newErrors = {};
    Object.keys(touched).forEach(field => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
  }, [form, touched, validateField]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setTouched(t => ({ ...t, [name]: true }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((field) => {
    setTouched(t => ({ ...t, [field]: true }));
    setFocused('');
  }, []);

  const handleFocus = useCallback((field) => setFocused(field), []);

  const validate = useCallback(() => {
    const e = {};
    if (!form.email.trim()) {
      e.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Email invalide';
    }
    if (!form.motDePasse) {
      e.motDePasse = 'Mot de passe requis';
    } else if (form.motDePasse.length < 6) {
      e.motDePasse = 'Minimum 6 caractères';
    }
    return e;
  }, [form]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Marquer tous les champs comme touchés
    setTouched({ email: true, motDePasse: true });
    
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    
    setLoading(true);
    try {
      // 🔹 Appel API à intégrer ici
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: 'Email ou mot de passe incorrect' });
    } finally {
      setLoading(false);
    }
  }, [validate, form, navigate]);

  const isFormValid = form.email && form.motDePasse && !errors.email && !errors.motDePasse;

  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Carte de connexion responsive */}
      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-violet-200/50 border border-violet-100 overflow-hidden animate-fadeIn">
        
        {/* Logo responsive avec fallback et animation */}
        <div className="flex justify-center pt-6 sm:pt-8 pb-1 sm:pb-2">
          <div className="animate-scaleIn">
            <img 
              src="/images/logo.jpeg" 
              alt="HR-skills pay" 
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain drop-shadow-sm rounded-xl transition-all duration-300 hover:scale-105"
              loading="eager"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const svg = document.createElement('div');
                  svg.className = "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg";
                  svg.innerHTML = `
                    <svg class="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  `;
                  parent.appendChild(svg);
                  e.currentTarget.remove();
                }
              }}
            />
          </div>
        </div>

        {/* En-tête avec animation */}
        <div className="px-5 sm:px-6 lg:px-8 pb-3 sm:pb-4 border-b border-slate-100 text-center animate-slideDown">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
              HR-<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">skills pay</span>
            </h1>
          </div>
          <div className="mt-1 sm:mt-2">
            <p className="text-xs sm:text-sm text-slate-500">Connectez-vous à votre espace marchand</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="px-5 sm:px-6 lg:px-8 py-5 sm:py-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            
            {/* Email avec validation temps réel */}
            <FormField 
              label="Email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="jean@email.com" 
              type="email" 
              error={touched.email && errors.email} 
              required 
              icon={Mail}
              focused={focused}
              onFocus={handleFocus}
              onBlur={() => handleBlur('email')}
              success={touched.email && form.email && !errors.email}
            />

            {/* Mot de passe avec indicateur Caps Lock */}
            <PasswordInput 
              label="Mot de passe" 
              name="motDePasse" 
              value={form.motDePasse} 
              onChange={handleChange} 
              error={touched.motDePasse && errors.motDePasse} 
              placeholder="Votre mot de passe" 
              show={showPassword} 
              onToggle={() => setShowPassword(!showPassword)}
              focused={focused}
              onFocus={handleFocus}
              onBlur={() => handleBlur('motDePasse')}
            />

            {/* Options avec animation */}
            <div className="flex items-center justify-between text-xs sm:text-sm animate-slideIn" style={{ animationDelay: '200ms' }}>
              <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="remember" 
                  checked={form.remember} 
                  onChange={handleChange}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer transition-all duration-200 group-hover:scale-110"
                />
                <span className="text-slate-600 group-hover:text-slate-800 transition-colors">Se souvenir de moi</span>
              </label>
              <Link to="/forgot-password" className="text-violet-600 hover:text-violet-800 font-medium transition-all duration-200 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Erreur globale avec animation */}
            {errors.submit && (
              <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-600 text-xs sm:text-sm flex items-center gap-2 animate-shake">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                {errors.submit}
              </div>
            )}

            {/* Bouton submit avec état de chargement */}
            <button 
              type="submit" 
              disabled={loading || !isFormValid}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg shadow-violet-200 flex items-center justify-center gap-2 group ${
                loading || !isFormValid
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-violet-300 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm">Se connecter</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Trust badges avec animation */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 animate-fadeIn" style={{ animationDelay: '300ms' }}>
              {[
                { icon: Shield, text: 'Connexion sécurisée' },
                { icon: CheckCircle, text: '2FA disponible' }
              ].map(({ icon: Icon, text }, index) => (
                <div key={text} className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 group cursor-default">
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                  <span className="group-hover:text-slate-700 transition-colors">{text}</span>
                </div>
              ))}
            </div>

            {/* Lien inscription avec animation */}
            <p className="text-center text-[11px] sm:text-sm text-slate-500 pt-2 sm:pt-3 border-t border-slate-100 animate-slideIn" style={{ animationDelay: '400ms' }}>
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-violet-600 hover:text-violet-800 font-semibold transition-all duration-200 hover:underline inline-flex items-center gap-1 group">
                <span>Créer un compte marchand</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </p>

          </form>
        </div>
      </div>

      {/* Styles d'animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.4s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.4s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out forwards; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default Login;