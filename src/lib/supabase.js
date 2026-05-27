// Diese Datei stellt die Verbindung zu Supabase her
// Stell dir vor: das ist das Telefon das mit der Datenbank redet

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Den Supabase-Client erstellen — wird in der ganzen App verwendet
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
