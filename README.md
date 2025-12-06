# SMS Chat Simulator

Une application web statique React pour créer et prévisualiser des conversations SMS simulées.

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173` (ou le port indiqué par Vite).

### Build de production

```bash
npm run build
```

Les fichiers statiques seront générés dans le dossier `dist/`. Vous pouvez déployer ce dossier sur n'importe quel hébergeur de sites statiques (Netlify, Vercel, GitHub Pages, etc.).

### Prévisualisation du build

```bash
npm run preview
```

## 📁 Structure du projet

```
sms-simulator/
├── client/              # Application React frontend
│   ├── src/
│   │   ├── components/  # Composants React
│   │   ├── pages/       # Pages de l'application
│   │   ├── hooks/       # Hooks React personnalisés
│   │   ├── lib/         # Utilitaires
│   │   └── types/       # Types TypeScript
│   ├── public/          # Assets statiques
│   └── index.html       # Point d'entrée HTML
├── dist/                # Build de production (généré)
└── package.json         # Dépendances et scripts
```

## ✨ Fonctionnalités

- ✅ Création et édition de conversations SMS
- ✅ Prévisualisation en temps réel sur un téléphone simulé
- ✅ Personnalisation des noms des participants
- ✅ Mode sombre/clair
- ✅ Sauvegarde automatique dans le localStorage
- ✅ Interface responsive

## 🛠️ Technologies

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Styling
- **Wouter** - Routing léger
- **Radix UI** - Composants UI accessibles

## 📝 Notes

Cette application est **100% statique** et ne nécessite pas de serveur backend ni de base de données. Toutes les données sont stockées localement dans le navigateur via `localStorage`.

