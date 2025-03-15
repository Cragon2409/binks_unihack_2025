import { useState, useEffect } from 'react'


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
import { supabase } from './supabase';
import { useAppDispatch, useAppSelector } from './API/hooks'
import { fetchCourses } from './API/coursesSlice'
import { setSession } from './API/sessionSlice';

function App() {
  const courses = useAppSelector(( state ) => state.courses.courses)
  const session = useAppSelector(( state ) => state.session.session)
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  // const [_errorLogMessage, setErrorLogMessage] = useState("")
  // const [courseTable, _setCourseTable] = useState(null)
  console.log(courses)

  useEffect(() => { // log in effects
    // setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session as React.SetStateAction<null>))
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session as React.SetStateAction<null>))

    })

    return () => subscription.unsubscribe()
  }, [])


  useEffect(() => {
    if (session != null) {
      dispatch(fetchCourses((session as any)?.user.id));
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return (
      <ThemeProvider>
        <main className="loading-screen-main">
            loading...
        </main>
      </ThemeProvider>
    )
  } else if (!session) { //display log in page if not logged in
    return (
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['discord','github']} />)
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