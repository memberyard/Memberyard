// Das Dashboard — die Hauptseite nach dem Login
// Nur für eingeloggte Mitglieder sichtbar

import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Dashboard({ user }) {
  const navigate = useNavigate()
  const vereinsname = user?.user_metadata?.vereinsname || 'Dein Verein'

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', padding: '24px' }}>
      {/* Navbar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 32, maxWidth: 800, margin: '0 auto 32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, #4A90D9, #7B68EE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>🏛️</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>{vereinsname}</span>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'transparent', border: '1px solid #2a2d3e',
            color: '#888', padding: '8px 16px', borderRadius: 8,
            cursor: 'pointer', fontSize: 13,
          }}
        >
          Ausloggen
        </button>
      </div>

      {/* Hauptinhalt */}
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Willkommens-Banner */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, #1a2540, #1a1d2e)',
          border: '1px solid #2a3a5e',
          marginBottom: 20,
        }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            Willkommen bei Memberyard! 👋
          </h1>
          <p style={{ color: '#888' }}>
            Dein Vereins-Netzwerk ist bereit. Die ersten Funktionen kommen in Phase 4.
          </p>
        </div>

        {/* Vorschau-Kacheln für kommende Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}>
          {[
            { icon: '💬', title: 'Channels', desc: 'Kommt in Phase 4', done: false },
            { icon: '📅', title: 'Kalender', desc: 'Kommt in Phase 4', done: false },
            { icon: '👥', title: 'Mitglieder', desc: 'Kommt in Phase 3', done: false },
            { icon: '🔔', title: 'Benachrichtigungen', desc: 'Kommt in Phase 4', done: false },
          ].map(item => (
            <div key={item.title} className="card" style={{
              opacity: 0.6,
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div style={{ fontWeight: 600, color: '#fff' }}>{item.title}</div>
              <div style={{ fontSize: 12, color: '#555' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div style={{
          marginTop: 20, padding: '14px 18px',
          background: '#1a2d1a', border: '1px solid #2a4a2a',
          borderRadius: 10, fontSize: 13, color: '#6a9a6a',
        }}>
          ✅ Phase 2 abgeschlossen — Login, Registrierung und Dashboard funktionieren.
        </div>
      </div>
    </div>
  )
}
