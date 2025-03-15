import { useState, useEffect } from 'react'

import { createClient } from '@supabase/supabase-js'
// import { Database } from './database.types'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { Routes, Route } from 'react-router-dom';

import './App.css'
import AppLayout from './components/Layout/AppLayout'
import ThemeProvider from './components/ThemeProvider/ThemeProvider'
import Dashboard from './pages/Dashboard/Dashboard';
import Courses from './pages/Courses/Courses';
import Timetable from './pages/Timetable/Timetable';

import './App.css'

const SUPABASE_URL = 'https://quaobmjerksaujqlspoz.supabase.co'
const VITE_ANON_KEY = process.env.VITE_ANON_KEY ?? ""

const supabase = createClient(SUPABASE_URL, VITE_ANON_KEY)

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as React.SetStateAction<null>)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as React.SetStateAction<null>)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  } else {
    return (
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="timetable" element={<Timetable />} />
          </Route>
      </Routes>
      </ThemeProvider>
    );  
  }
}

export default App;