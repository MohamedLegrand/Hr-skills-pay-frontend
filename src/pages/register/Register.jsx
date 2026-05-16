import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, CheckCircle, Shield, Zap, Users, Building2, User, Briefcase, AlertCircle, Mail, Phone, Lock, UserCheck, Building, FileText } from 'lucide-react';

// ============================================================
// COMPOSANT POUR CHAMP DE FORMULAIRE AVEC VALIDATION
// ============================================================
const FormField = ({ label, name, value, onChange, placeholder, type = 'text', error, required, focused, onFocus, onBlur, icon: Icon, hint, success }) => {
  const inputClass = useMemo(() => 
    `w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-white text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 ${
      error
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : success
        ? 'border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
        : focused === name
        ? 'border-violet-500 ring-2 ring-violet-200'
        : 'border-slate-200 hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200'
    } ${Icon ? 'pl-9 sm:pl-10' : ''}`,
    [error, focused, name, Icon, success]
  );

  return (
    <div className="animate-slideIn">
      <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon className="w-4 h-4 text-slate-400" />
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
        {value && !error && (
          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 animate-scaleIn" />
        )}
        {error && (
          <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 animate-shake" />
        )}
      </div>
      {hint && !error && <p className="text-[10px] text-slate-400 mt-1 ml-1">{hint}</p>}
      {error && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1 flex items-center gap-1">{error}</p>}
    </div>
  );
};

// ============================================================
// COMPOSANT POUR MOT DE PASSE AVEC INDICATEUR DE FORCE
// ============================================================
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
    0: { color: 'bg-slate-200', text: '', label: '', message: '', progress: 0 },
    1: { color: 'bg-red-400', text: 'text-red-500', label: 'Très faible', message: 'Ajoutez au moins 8 caractères', progress: 25 },
    2: { color: 'bg-amber-400', text: 'text-amber-500', label: 'Faible', message: 'Ajoutez des chiffres', progress: 50 },
    3: { color: 'bg-blue-400', text: 'text-blue-500', label: 'Bien', message: 'Ajoutez des caractères spéciaux', progress: 75 },
    4: { color: 'bg-emerald-400', text: 'text-emerald-500', label: 'Fort', message: 'Excellent !', progress: 100 },
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

  const success = value && strength === 4;

  return (
    <div className="animate-slideIn">
      <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 sm:mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Lock className="w-4 h-4 text-slate-400" />
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
        {value && !error && success && (
          <CheckCircle className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
        )}
      </div>
      {error && <p className="text-[10px] sm:text-xs text-red-500 mt-1 ml-1">{error}</p>}
      
      {value && (
        <div className="mt-2 animate-slideDown">
          <div className="flex gap-1 sm:gap-1.5 mb-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 sm:h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  strength >= i ? strengthConfig[strength].color : 'bg-slate-200'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs text-slate-500">
              Force :{' '}
              <span className={`font-medium transition-colors duration-300 ${strengthConfig[strength].text}`}>
                {strengthConfig[strength].label}
              </span>
            </p>
            <p className="text-[10px] text-slate-400">{strengthConfig[strength].message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// BARRE DE PROGRESSION AVEC ANIMATION
// ============================================================
const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between text-xs text-slate-500 mb-2">
        <span className="flex items-center gap-1">
          <span className="font-medium text-violet-600">Étape {currentStep}</span>
          <span>sur {totalSteps}</span>
        </span>
        <span className="font-medium text-violet-600">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// ============================================================
// INDICATEUR D'ÉTAPE
// ============================================================
const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 justify-center">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;
        const isUpcoming = currentStep < stepNumber;
        
        return (
          <div
            key={step.id}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'scale-105' : ''
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
                isCompleted
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                  : isActive
                  ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-200'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Icon className="w-4 h-4" />
              )}
            </div>
            <span className={`text-[10px] font-medium whitespace-nowrap transition-colors ${
              isActive ? 'text-violet-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
            }`}>
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// SÉLECTION DU TYPE DE COMPTE AVEC ANIMATION
// ============================================================
const AccountTypeSelector = ({ accountType, setAccountType }) => {
  return (
    <div className="mb-6 animate-fadeIn">
      <label className="block text-xs font-semibold text-slate-700 mb-3">Type de compte</label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setAccountType('individual')}
          className={`group flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
            accountType === 'individual'
              ? 'border-violet-500 bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 shadow-md scale-[1.02]'
              : 'border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50/50 hover:scale-[1.01]'
          }`}
        >
          <User className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
            accountType === 'individual' ? 'text-violet-600' : ''
          }`} />
          <span className="text-sm font-medium">Particulier / Freelance</span>
        </button>
        <button
          type="button"
          onClick={() => setAccountType('business')}
          className={`group flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
            accountType === 'business'
              ? 'border-violet-500 bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 shadow-md scale-[1.02]'
              : 'border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50/50 hover:scale-[1.01]'
          }`}
        >
          <Building2 className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
            accountType === 'business' ? 'text-violet-600' : ''
          }`} />
          <span className="text-sm font-medium">Entreprise</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================
// EN-TÊTE D'ÉTAPE
// ============================================================
const StepHeader = ({ title, description, icon: Icon }) => (
  <div className="text-center mb-6 animate-fadeIn">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-violet-100 to-indigo-100 mb-3">
      <Icon className="w-6 h-6 text-violet-600" />
    </div>
    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    <p className="text-xs text-slate-500 mt-1">{description}</p>
  </div>
);

// ============================================================
// ÉCRAN DE SUCCÈS
// ============================================================
const SuccessScreen = ({ accountType }) => {
  const navigate = useNavigate();
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4 sm:p-6">
      <div className="text-center max-w-md w-full animate-scaleIn">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-violet-200 animate-bounce">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">Compte créé avec succès ! 🎉</h2>
        <p className="text-sm sm:text-base text-slate-600 mb-2">
          Bienvenue sur <span className="font-semibold text-violet-600">HR-skills pay</span>.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mt-3 sm:mt-4 text-left animate-slideIn">
          <p className="text-xs sm:text-sm text-amber-800 font-medium mb-1">📋 Prochaine étape</p>
          <p className="text-xs sm:text-sm text-amber-700">
            {accountType === 'business' 
              ? "Complétez votre dossier KYC entreprise pour activer les paiements."
              : "Complétez votre dossier KYC pour activer votre compte marchand."}
          </p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 hover:shadow-xl hover:-translate-y-0.5 group"
        >
          <span>Se connecter</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
const Register = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('individual');
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    rccmNumber: '',
    taxId: '',
    representativeName: '',
    acceptTerms: false,
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'Prénom requis';
        if (value.length < 2) return 'Minimum 2 caractères';
        return '';
      case 'lastName':
        if (!value.trim()) return 'Nom requis';
        if (value.length < 2) return 'Minimum 2 caractères';
        return '';
      case 'email':
        if (!value.trim()) return 'Email requis';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email invalide';
        return '';
      case 'phone':
        if (!value.trim()) return 'Téléphone requis';
        if (!/^(\+237|6)[0-9]{8}$/.test(value.replace(/\s/g, ''))) return 'Format: +237XXXXXXXXX';
        return '';
      case 'password':
        if (!value) return 'Mot de passe requis';
        if (value.length < 8) return 'Minimum 8 caractères';
        return '';
      case 'confirmPassword':
        if (value !== form.password) return 'Les mots de passe ne correspondent pas';
        return '';
      case 'companyName':
        if (accountType === 'business' && !value.trim()) return 'Nom de l\'entreprise requis';
        return '';
      case 'rccmNumber':
        if (accountType === 'business' && !value.trim()) return 'Numéro RCCM requis';
        return '';
      case 'taxId':
        if (accountType === 'business' && !value.trim()) return 'Numéro fiscal requis';
        return '';
      case 'representativeName':
        if (accountType === 'business' && !value.trim()) return 'Nom du représentant requis';
        return '';
      default:
        return '';
    }
  }, [form.password, accountType]);

  useEffect(() => {
    const newErrors = {};
    Object.keys(touched).forEach(field => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
  }, [form, touched, validateField]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setTouched(t => ({ ...t, [name]: true }));
  }, []);

  const handleBlur = useCallback((field) => {
    setTouched(t => ({ ...t, [field]: true }));
    setFocused('');
  }, []);

  const handleFocus = useCallback((field) => setFocused(field), []);

  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      return form.firstName && form.lastName && !errors.firstName && !errors.lastName;
    }
    if (currentStep === 2) {
      return form.email && form.phone && !errors.email && !errors.phone;
    }
    if (currentStep === 3) {
      return form.password && form.confirmPassword && !errors.password && !errors.confirmPassword;
    }
    if (currentStep === 4) {
      if (accountType === 'business') {
        return form.companyName && form.rccmNumber && form.taxId && form.representativeName && 
               !errors.companyName && !errors.rccmNumber && !errors.taxId && !errors.representativeName;
      }
      return true;
    }
    return false;
  };

  const nextStep = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    const allFields = ['firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'];
    if (accountType === 'business') {
      allFields.push('companyName', 'rccmNumber', 'taxId', 'representativeName');
    }
    const newTouched = {};
    allFields.forEach(field => { newTouched[field] = true; });
    setTouched(newTouched);
    
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors || !form.acceptTerms) {
      if (!form.acceptTerms) setErrors(e => ({ ...e, acceptTerms: 'Vous devez accepter les CGU' }));
      return;
    }
    
    setSubmitted(true);
  }, [form, errors, accountType]);

  const getSteps = () => {
    const steps = [
      { id: 1, title: 'Identité', icon: User, description: 'Vos informations personnelles' },
      { id: 2, title: 'Contact', icon: Mail, description: 'Email et téléphone' },
      { id: 3, title: 'Sécurité', icon: Shield, description: 'Protégez votre compte' },
    ];
    if (accountType === 'business') {
      steps.push({ id: 4, title: 'Entreprise', icon: Building, description: 'Informations légales' });
    }
    return steps;
  };

  const steps = getSteps();
  const totalSteps = steps.length;
  const currentStepInfo = steps[currentStep - 1];

  if (submitted) {
    return <SuccessScreen accountType={accountType} />;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-violet-200/50 border border-violet-100 overflow-hidden">
        
        {/* Logo */}
        <div className="flex justify-center pt-6 sm:pt-8 pb-1 sm:pb-2">
          <img 
            src="/images/logo.jpeg" 
            alt="HR-skills pay" 
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain drop-shadow-sm rounded-xl transition-transform duration-300 hover:scale-105"
            loading="eager"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.parentElement) {
                const fallbackSvg = document.createElement('div');
                fallbackSvg.className = "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg";
                fallbackSvg.innerHTML = `
                  <svg class="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
            HR-<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">skills pay</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Créez votre compte en quelques minutes
          </p>
        </div>

        {/* Formulaire avec étapes */}
        <div className="px-5 sm:px-6 lg:px-8 py-5 sm:py-6">
          
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          <StepIndicator steps={steps} currentStep={currentStep} />

          {currentStep === 1 && (
            <AccountTypeSelector accountType={accountType} setAccountType={setAccountType} />
          )}

          <StepHeader 
            title={currentStepInfo?.title} 
            description={currentStepInfo?.description} 
            icon={currentStepInfo?.icon} 
          />

          <form onSubmit={handleSubmit} noValidate>
            
            {/* Étape 1 - Identité */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField 
                    label="Prénom" 
                    name="firstName" 
                    value={form.firstName} 
                    onChange={handleChange} 
                    placeholder="Jean" 
                    error={touched.firstName && errors.firstName} 
                    required 
                    focused={focused}
                    onFocus={handleFocus}
                    onBlur={() => handleBlur('firstName')}
                    icon={User}
                    success={touched.firstName && form.firstName && !errors.firstName}
                  />
                  <FormField 
                    label="Nom" 
                    name="lastName" 
                    value={form.lastName} 
                    onChange={handleChange} 
                    placeholder="Dupont" 
                    error={touched.lastName && errors.lastName} 
                    required 
                    focused={focused}
                    onFocus={handleFocus}
                    onBlur={() => handleBlur('lastName')}
                    icon={User}
                    success={touched.lastName && form.lastName && !errors.lastName}
                  />
                </div>
              </div>
            )}

            {/* Étape 2 - Contact */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <FormField 
                  label="Email" 
                  name="email" 
                  type="email"
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="contact@entreprise.com" 
                  error={touched.email && errors.email} 
                  required 
                  focused={focused}
                  onFocus={handleFocus}
                  onBlur={() => handleBlur('email')}
                  icon={Mail}
                  hint="Ex: nom@entreprise.com"
                  success={touched.email && form.email && !errors.email}
                />
                <FormField 
                  label="Téléphone" 
                  name="phone" 
                  type="tel"
                  value={form.phone} 
                  onChange={handleChange} 
                  placeholder="+237 600 000 000" 
                  error={touched.phone && errors.phone} 
                  required 
                  focused={focused}
                  onFocus={handleFocus}
                  onBlur={() => handleBlur('phone')}
                  icon={Phone}
                  hint="Format: +237XXXXXXXXX"
                  success={touched.phone && form.phone && !errors.phone}
                />
              </div>
            )}

            {/* Étape 3 - Sécurité */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <PasswordInput 
                  label="Mot de passe" 
                  name="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  error={touched.password && errors.password} 
                  placeholder="Min. 8 caractères" 
                  show={showPassword} 
                  onToggle={() => setShowPassword(!showPassword)}
                  focused={focused}
                  onFocus={handleFocus}
                  onBlur={() => handleBlur('password')}
                />
                <PasswordInput 
                  label="Confirmer le mot de passe" 
                  name="confirmPassword" 
                  value={form.confirmPassword} 
                  onChange={handleChange} 
                  error={touched.confirmPassword && errors.confirmPassword} 
                  placeholder="Répéter le mot de passe" 
                  show={showConfirm} 
                  onToggle={() => setShowConfirm(!showConfirm)}
                  focused={focused}
                  onFocus={handleFocus}
                  onBlur={() => handleBlur('confirmPassword')}
                />
              </div>
            )}

            {/* Étape 4 - Entreprise */}
            {currentStep === 4 && accountType === 'business' && (
              <div className="space-y-4 animate-fadeIn">
                <FormField 
                  label="Nom de l'entreprise" 
                  name="companyName" 
                  value={form.companyName} 
                  onChange={handleChange} 
                  placeholder="TechPay SARL" 
                  error={touched.companyName && errors.companyName} 
                  required 
                  focused={focused}
                  onFocus={handleFocus}
                  onBlur={() => handleBlur('companyName')}
                  icon={Building}
                  success={touched.companyName && form.companyName && !errors.companyName}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField 
                    label="Numéro RCCM" 
                    name="rccmNumber" 
                    value={form.rccmNumber} 
                    onChange={handleChange} 
                    placeholder="RC/DLA/2024/B/1234" 
                    error={touched.rccmNumber && errors.rccmNumber} 
                    required 
                    focused={focused}
                    onFocus={handleFocus}
                    onBlur={() => handleBlur('rccmNumber')}
                    icon={FileText}
                    success={touched.rccmNumber && form.rccmNumber && !errors.rccmNumber}
                  />
                  <FormField 
                    label="Numéro fiscal" 
                    name="taxId" 
                    value={form.taxId} 
                    onChange={handleChange} 
                    placeholder="M123456789012" 
                    error={touched.taxId && errors.taxId} 
                    required 
                    focused={focused}
                    onFocus={handleFocus}
                    onBlur={() => handleBlur('taxId')}
                    icon={FileText}
                    success={touched.taxId && form.taxId && !errors.taxId}
                  />
                </div>
                <FormField 
                  label="Nom du représentant légal" 
                  name="representativeName" 
                  value={form.representativeName} 
                  onChange={handleChange} 
                  placeholder="Jean Dupont" 
                  error={touched.representativeName && errors.representativeName} 
                  required 
                  focused={focused}
                  onFocus={handleFocus}
                  onBlur={() => handleBlur('representativeName')}
                  icon={UserCheck}
                  success={touched.representativeName && form.representativeName && !errors.representativeName}
                />
              </div>
            )}

            {/* Conditions générales */}
            {(currentStep === totalSteps) && (
              <div className="mt-6 animate-fadeIn">
                <div className="bg-gradient-to-r from-violet-50/80 to-indigo-50/80 border border-violet-100 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      name="acceptTerms" 
                      checked={form.acceptTerms} 
                      onChange={handleChange} 
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 transition-all duration-200 group-hover:scale-110"
                    />
                    <span className="text-xs sm:text-sm text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">
                      J'accepte les{' '}
                      <Link to="/mentions" className="text-violet-600 hover:text-violet-800 font-medium underline underline-offset-2 transition-colors">
                        conditions générales d'utilisation
                      </Link>{' '}
                      et la{' '}
                      <Link to="/confidentialite" className="text-violet-600 hover:text-violet-800 font-medium underline underline-offset-2">
                        politique de confidentialité
                      </Link>{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {touched.acceptTerms && errors.acceptTerms && (
                    <p className="text-xs text-red-500 mt-2 ml-8 animate-shake">{errors.acceptTerms}</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="w-full mt-6 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm sm:text-base transition-all duration-300 shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
                >
                  <span>Créer mon compte marchand</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between gap-3 mt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-50 hover:border-violet-300 transition-all duration-200 hover:-translate-y-0.5"
                >
                  ← Retour
                </button>
              )}
              {currentStep < totalSteps && (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedToNextStep()}
                  className={`ml-auto px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    canProceedToNextStep()
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Suivant →
                </button>
              )}
            </div>
          </form>

          {/* Lien connexion */}
          <p className="text-center text-[11px] sm:text-sm text-slate-500 pt-6 mt-4 border-t border-slate-100">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-violet-600 hover:text-violet-800 font-semibold transition-colors hover:underline">
              Se connecter
            </Link>
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {[
              { icon: Shield, text: 'Données sécurisées' },
              { icon: Zap, text: 'Activation rapide' },
              { icon: Users, text: 'Support 24/7' }
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-[10px] text-slate-500 group cursor-default">
                <Icon className="w-3 h-3 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-slate-700 transition-colors">{text}</span>
              </div>
            ))}
          </div>

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
          from { opacity: 0; transform: translateY(-10px); }
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
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.4s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out forwards; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </section>
  );
};

export default Register;