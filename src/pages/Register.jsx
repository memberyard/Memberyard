// Die Registrierungsseite — für neue Vereins-Admins
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vereinsname, setVereinsname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async () => {
    if (!vereinsname || !email || !password) {
      setError('Bitte alle Felder ausfüllen.')
      return
    }
    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen lang sein.')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          vereinsname,  // Vereinsname wird beim User gespeichert
          role: 'admin', // Ersteller wird automatisch Admin
        }
      }
    })

    if (error) {
      setError('Fehler bei der Registrierung: ' + error.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  // Erfolgs-Nachricht nach Registrierung
  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
      }}>
        <div className="card" style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
          <h2 style={{ color: '#fff', marginBottom: 8 }}>Fast geschafft!</h2>
          <p style={{ color: '#888', marginBottom: 20 }}>
            Wir haben dir eine Bestätigungs-E-Mail geschickt.
            Bitte klick auf den Link darin um deinen Account zu aktivieren.
          </p>
          <button className="btn-secondary" onClick={() => navigate('/login')}>
            Zum Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div className="card" style={{ width: '100%', maxWidth: 380 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏛️</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Verein erstellen</h2>
          <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>Kostenlos starten</p>
        </div>

        {/* Fehler */}
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
            type="text"
            placeholder="Name deines Vereins"
            value={vereinsname}
            onChange={(e) => setVereinsname(e.target.value)}
          />
          <input
            className="input"
            type="email"
            placeholder="Deine E-Mail Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Passwort (min. 6 Zeichen)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn-primary"
            onClick={handleRegister}
            disabled={loading}
            style={{ marginTop: 4, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Wird erstellt…' : 'Verein erstellen'}
          </button>
        </div>

        <p style={{ textAlign: 'center', color: '#666', fontSize: 14, marginTop: 20 }}>
          Bereits ein Konto?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: '#4A90D9', cursor: 'pointer' }}
          >
            Einloggen
          </span>
        </p>
      </div>
    </div>
  )
}
