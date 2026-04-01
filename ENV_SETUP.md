# 🛡️ Configuration des Variables d'Environnement

## Setup initial

Pour lancer ce projet, vous devez configurer les variables d'environnement :

### 1️⃣ Créer le fichier `.env.local`

```bash
cp .env.example .env.local
```

### 2️⃣ Remplir vos clés API

Ouvrez `.env.local` et complétez avec vos vraies clés :

```env
VITE_STRIPE_TEST_KEY=REMOVEDYOUR_ACTUAL_KEY
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY
VITE_HR_SKILLS_PAY_API_KEY=your_actual_api_key
VITE_HR_SKILLS_PAY_SECRET=your_actual_secret
VITE_API_URL=https://api.hrskillspay.com
```

### 3️⃣ Utiliser dans le code

**Accédez aux variables avec `import.meta.env`** :

```javascript
// ✅ BON
const stripeKey = import.meta.env.VITE_STRIPE_TEST_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

// ❌ MAUVAIS (ne jamais faire)
const key = "REMOVED...";  // Danger !
```

---

## ⚠️ Règles d'or

| À faire ✅ | À ne pas faire ❌ |
|-----------|------------------|
| Mettre les clés dans `.env.local` | Hardcoder les clés |
| Utiliser `VITE_` pour Vite | Committer `.env.local` |
| Partager `.env.example` | Partager les vraies clés |
| Utiliser `import.meta.env` | Utiliser `process.env` (côté serveur seulement) |

---

## 🔐 Clés exposées ?

Si vous avez accidentellement committé une clé :

```bash
# Nettoyer l'historique
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env.local' \
  --prune-empty --tag-name-filter cat -- --all

# Forcer le push
git push origin main --force --all

# Révoquer la clé sur Stripe/votre service
```

---

## 📚 Ressources

- [Vite: Variables d'environnement](https://vitejs.dev/guide/env-and-mode.html)
- [Stripe: API Keys](https://stripe.com/docs/keys)
- [GitHub: Secret scanning](https://docs.github.com/en/code-security/secret-scanning)
