import { createClient } from '@supabase/supabase-js'
import { Capacitor } from '@capacitor/core'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// In the native iOS app the webview runs at capacitor://localhost, which
// Supabase can't parse for auth tokens, so skip URL session detection there.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    detectSessionInUrl: !Capacitor.isNativePlatform(),
  },
})
