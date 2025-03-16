import { useEffect } from 'react'

import { Routes, Route } from 'react-router-dom';

import { supabase } from './API/supabase';

import AppLayout from './components/Layout/AppLayout'
import ThemeProvider from './components/ThemeProvider/ThemeProvider'
import Dashboard from './pages/Dashboard/Dashboard';
import Courses from './pages/Courses/Courses';
import Timetable from './pages/Timetable/Timetable';
import Login from './pages/Login/Login';
import LoginLayout from './components/Layout/LoginLayout'

import { useAppDispatch, useAppSelector } from './API/hooks'
import { fetchCourses } from './API/coursesSlice'
import { setSession } from './API/sessionSlice';

import './App.css'


function App() {
  const session = useAppSelector(( state ) => state.session.session)

  const dispatch = useAppDispatch();

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

      // setLoading(false);
    }
  }, [session]);

  return (
    <ThemeProvider>
      <Routes>
        {
          session ? 
          (
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="timetable" element={<Timetable />} />
            </Route>
          )
          :
          (
            <Route path="/*" element={<LoginLayout />}>
              <Route path="*" element={<Login supabase={supabase} />} />
            </Route>
          )
        }
      </Routes>
    </ThemeProvider>
  )

}

export default App;