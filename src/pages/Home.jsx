// Die Startseite — was Besucher als erstes sehen
// Wie die Eingangstür zum Vereinshaus

import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(ellipse at top, #1a1d3e 0%, #0f1117 60%)',
    }}>
      {/* Logo & Name */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          width: 64, height: 64,
          background: 'linear-gradient(135deg, #4A90D9, #7B68EE)',
          borderRadius: 16,
          margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
        }}>
          🏛️
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#fff', letterSpacing: -1 }}>
          Memberyard
        </h1>
        <p style={{ color: '#888', fontSize: 18, marginTop: 8, maxWidth: 400 }}>
          Das private Netzwerk für deinen Verein.
          Strukturiert, sicher, einfach.
        </p>
      </div>

      {/* Alleinstellungsmerkmal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 12,
        maxWidth: 520,
        width: '100%',
        marginBottom: 40,
      }}>
        {[
          { icon: '🔒', text: 'Privat & sicher' },
          { icon: '📅', text: 'Vereinskalender' },
          { icon: '💬', text: 'Themen-Channels' },
          { icon: '👥', text: 'Mitgliederverwaltung' },
        ].map(item => (
          <div key={item.text} className="card" style={{ textAlign: 'center', padding: '16px 12px' }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontSize: 13, color: '#aaa' }}>{item.text}</div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
        <button className="btn-primary" onClick={() => navigate('/register')}>
          Verein erstellen — kostenlos
        </button>
        <button className="btn-secondary" onClick={() => navigate('/login')}>
          Einloggen
        </button>
      </div>

      <p style={{ color: '#444', fontSize: 12, marginTop: 24 }}>
        Kostenlos für Vereine bis 20 Mitglieder
      </p>
    </div>
  )
}
