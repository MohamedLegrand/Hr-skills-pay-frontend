import { useState, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, CheckCircle, Shield, Mail, Lock } from 'lucide-react';

const FormField = ({ label, name, value, onChange, placeholder, type = 'text', error, required, icon: Icon, focused, onFocus, onBlur }) => {
  const inputClass = useMemo(() => 
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-9 sm:pl-10 text-sm rounded-xl border bg-white text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 ${
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
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
      </div>
      {error && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
};

const PasswordInput = ({ label, name, value, onChange, error, placeholder, show, onToggle, focused, onFocus, onBlur }) => {
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

  return (
    <div>
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
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', motDePasse: '', remember: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors(err => ({ ...err, [name]: '' }));
  }, []);

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

  const handleFocus = useCallback((field) => setFocused(field), []);
  const handleBlur = useCallback(() => setFocused(''), []);

  return (
    <section id="login" className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Carte de connexion responsive */}
      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-violet-200/50 border border-violet-100 overflow-hidden">
        
        {/* Logo responsive */}
        <div className="flex justify-center pt-6 sm:pt-8 pb-1 sm:pb-2">
          <img 
            src="/images/logo.png" 
            alt="HR-skills pay" 
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain drop-shadow-sm"
            loading="eager"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const svg = document.createElement('div');
                svg.innerHTML = `
                  <svg class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-violet-600 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                `;
                parent.appendChild(svg.firstChild);
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
            <p className="text-xs sm:text-sm text-slate-500">Connectez-vous à votre espace marchand</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="px-5 sm:px-6 lg:px-8 py-5 sm:py-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            
            {/* Email */}
            <FormField 
              label="Email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="jean@email.com" 
              type="email" 
              error={errors.email} 
              required 
              icon={Mail}
              focused={focused}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            {/* Mot de passe */}
            <PasswordInput 
              label="Mot de passe" 
              name="motDePasse" 
              value={form.motDePasse} 
              onChange={handleChange} 
              error={errors.motDePasse} 
              placeholder="Votre mot de passe" 
              show={showPassword} 
              onToggle={() => setShowPassword(!showPassword)}
              focused={focused}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            {/* Options */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="remember" 
                  checked={form.remember} 
                  onChange={handleChange}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
                />
                <span className="text-slate-600 group-hover:text-slate-800 transition-colors">Se souvenir de moi</span>
              </label>
              <Link to="/forgot-password" className="text-violet-600 hover:text-violet-800 font-medium transition-colors">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Erreur globale */}
            {errors.submit && (
              <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-600 text-xs sm:text-sm flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                {errors.submit}
              </div>
            )}

            {/* Bouton submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:from-violet-400 disabled:to-indigo-400 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-xs sm:text-sm">Connexion en cours...</span>
                </>
              ) : (
                <>
                  <span className="text-xs sm:text-sm">Se connecter</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
              {[
                { icon: Shield, text: 'Connexion sécurisée' },
                { icon: CheckCircle, text: '2FA disponible' }
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
                  {text}
                </span>
              ))}
            </div>

            {/* Lien inscription */}
            <p className="text-center text-[11px] sm:text-sm text-slate-500 pt-2 sm:pt-3 border-t border-slate-100">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-violet-600 hover:text-violet-800 font-semibold transition-colors">
                Créer un compte marchand
              </Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;