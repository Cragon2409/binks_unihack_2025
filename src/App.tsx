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
  const [_errorLogMessage, setErrorLogMessage] = useState("")
  const [courseTable, setCourseTable] = useState(null)



  useEffect(() => { // log in effects
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

  useEffect(() => { //retrieve relevant databases for user
    if (session != null) {
      const fetchCourseTable = async () => {
        const {data, error} = await supabase 
          .from('courses')
          .select()
          .in("user_id", [(session as any).user.id])

        if (error) {
          setErrorLogMessage("Database failed to retrieve")
        }
        if (data) {
          setCourseTable(data as any)
        }

      }
      fetchCourseTable()
    }
  }, [session])

  useEffect(() => { //log course table
    console.log("Course Table:")
    console.log(courseTable)
  },[courseTable])

  if (!session) { //display log in page if not logged in
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['discord','github']} />)
  } else {
    return (
      <ThemeProvider>
        <button onClick={() => supabase.auth.signOut() }>Sign Out</button>
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