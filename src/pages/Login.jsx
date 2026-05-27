// Die Login-Seite — wo sich Mitglieder einloggen
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-Mail oder Passwort falsch.')
    }
    // Bei Erfolg leitet App.jsx automatisch zum Dashboard weiter

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div className="card" style={{ width: '100%', maxWidth: 380 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏛️</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Willkommen zurück</h2>
          <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>Melde dich bei Memberyard an</p>
        </div>

        {/* Fehler-Nachricht */}
        {error && (
          <div style={{
            background: '#2d0f0f', border: '1px solid #5a1a1a',
            borderRadius: 8, padding: '12px 16px',
            color: '#ff6b6b', fontSize: 14, marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        {/* Formular */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            className="input"
            type="email"
            placeholder="E-Mail Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            className="btn-primary"
            onClick={handleLogin}
            disabled={loading}
            style={{ marginTop: 4, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Einloggen…' : 'Einloggen'}
          </button>
        </div>

        {/* Link zur Registrierung */}
        <p style={{ textAlign: 'center', color: '#666', fontSize: 14, marginTop: 20 }}>
          Noch kein Konto?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: '#4A90D9', cursor: 'pointer' }}
          >
            Verein erstellen
          </span>
        </p>
      </div>
    </div>
  )
}
