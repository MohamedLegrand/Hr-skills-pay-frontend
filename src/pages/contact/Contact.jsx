import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle, AlertCircle, Loader2, ArrowRight, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errors, setErrors] = useState({});

  // Validation simple
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nom requis';
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.subject.trim()) newErrors.subject = 'Sujet requis';
    if (!formData.message.trim()) newErrors.message = 'Message requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    
    // Simulation d'envoi
    try {
      await new Promise(res => setTimeout(res, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full mb-4">
            <MessageCircle className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-semibold text-violet-700">Contact</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Parlons de <span className="text-violet-600">votre projet</span>
          </h1>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Une question ? Notre équipe est là pour vous aider à intégrer Hr Skills Pay.
          </p>
        </div>

        {/* Messages de statut */}
        {status === 'success' && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-800">Message envoyé !</p>
              <p className="text-sm text-emerald-700">Nous vous répondrons sous 4 heures ouvrées.</p>
            </div>
          </div>
        )}
        
        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Erreur d'envoi</p>
              <p className="text-sm text-red-700">Veuillez réessayer ou nous écrire directement.</p>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Nom + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom complet *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${errors.name ? 'border-red-300' : 'border-slate-200'}`}
                  placeholder="Votre nom"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${errors.email ? 'border-red-300' : 'border-slate-200'}`}
                  placeholder="vous@entreprise.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
            </div>

            {/* Sujet */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Sujet *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${errors.subject ? 'border-red-300' : 'border-slate-200'}`}
                placeholder="Résumez votre demande"
              />
              {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none ${errors.message ? 'border-red-300' : 'border-slate-200'}`}
                placeholder="Décrivez votre demande..."
              />
              {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </div>

            {/* Consentement */}
            <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-slate-300 text-violet-600" />
              <span className="text-sm text-slate-600">
                J'accepte que mes informations soient utilisées pour me recontacter.
              </span>
            </label>

            {/* Bouton */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 disabled:opacity-70 transition-all group"
            >
              {status === 'submitting' ? (
                <><Loader2 className="w-5 h-5 animate-spin" />Envoi en cours...</>
              ) : (
                <><span>Envoyer mon message</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>
        </div>

        {/* Infos de contact */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="mailto:support@hrskillspay.com" className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200 hover:border-violet-300 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-semibold text-slate-900 group-hover:text-violet-600">support@hrskillspay.com</p>
              <p className="text-xs text-slate-400 mt-1">Réponse sous 4h</p>
            </div>
          </a>
          
          <a href="tel:+237600000000" className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200 hover:border-violet-300 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Téléphone</p>
              <p className="font-semibold text-slate-900 group-hover:text-violet-600">+237 6XX XXX XXX</p>
              <p className="text-xs text-slate-400 mt-1">Lun-Ven 9h-18h</p>
            </div>
          </a>
          
          <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Adresse</p>
              <p className="font-semibold text-slate-900">Douala, Cameroun</p>
              <p className="text-xs text-slate-400 mt-1">Sur rendez-vous</p>
            </div>
          </div>
        </div>

        {/* FAQ rapide */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Questions fréquentes</h3>
          <div className="space-y-3">
            {[
              { q: 'Temps de réponse moyen ?', a: 'Nous répondons sous 4 heures ouvrées.' },
              { q: 'Support en anglais ?', a: 'Oui, notre équipe est bilingue FR/EN.' },
              { q: 'Urgence technique ?', a: 'Écrivez à security@hrskillspay.com pour une réponse <1h.' }
            ].map((faq, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl">
                <p className="font-medium text-slate-900">{faq.q}</p>
                <p className="text-sm text-slate-600 mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;