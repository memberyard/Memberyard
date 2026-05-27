// Die Hauptdatei der App
// Hier wird festgelegt welche Seite bei welcher URL angezeigt wird
// Stell dir vor: das ist das Inhaltsverzeichnis des Buches

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

// Seiten importieren
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Prüfen ob jemand bereits eingeloggt ist
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Zuhören wenn sich jemand ein- oder ausloggt
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f1117' }}>
        <span style={{ color: '#4A90D9', fontFamily: 'sans-serif' }}>Laden…</span>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Startseite — für alle sichtbar */}
        <Route path="/" element={<Home />} />

        {/* Login — nur wenn NICHT eingeloggt */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />

        {/* Registrierung — nur wenn NICHT eingeloggt */}
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

        {/* Dashboard — nur wenn eingeloggt */}
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
