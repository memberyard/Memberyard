# Memberyard – Setup Anleitung für den PC

## Was du brauchst (einmalig installieren)
1. **Node.js** → nodejs.org → "LTS" Version herunterladen & installieren
2. **VS Code** → code.visualstudio.com → herunterladen & installieren

---

## Schritt 1 – Projektordner erstellen

Öffne VS Code → Terminal → New Terminal

```bash
mkdir memberyard
cd memberyard
```

---

## Schritt 2 – Dateien einfügen

Kopiere alle mitgelieferten Dateien in den memberyard Ordner.
Die Struktur muss so aussehen:

```
memberyard/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   └── supabase.js
    └── pages/
        ├── Home.jsx
        ├── Login.jsx
        ├── Register.jsx
        └── Dashboard.jsx
```

---

## Schritt 3 – Supabase Zugangsdaten eintragen

1. Gehe zu supabase.com → Dein Projekt → Settings → API
2. Kopiere "Project URL" und "anon public" Key
3. Benenne `.env.example` um zu `.env.local`
4. Trage deine Daten ein:

```
VITE_SUPABASE_URL=https://DEINE-URL.supabase.co
VITE_SUPABASE_ANON_KEY=DEIN-KEY
```

---

## Schritt 4 – App starten

Im Terminal im memberyard Ordner:

```bash
npm install
npm run dev
```

→ Öffne dann: http://localhost:5173

---

## Schritt 5 – Auf Vercel deployen

```bash
# Einmalig Vercel CLI installieren
npm install -g vercel

# Deployen
vercel
```

Folge den Anweisungen → am Ende hast du eine Live-URL.

**Wichtig:** Auf Vercel auch die Umgebungsvariablen eintragen:
Vercel Dashboard → Dein Projekt → Settings → Environment Variables

---

## Was dann funktioniert

- ✅ Startseite (memberyard.vercel.app)
- ✅ Registrierung als Admin
- ✅ Login
- ✅ Dashboard (geschützt)
- ✅ Automatischer Logout

---

## Nächste Schritte (Phase 3)

Dann bauen wir das Rollen-System: Admin / Mitglied / Gast
