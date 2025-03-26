import { useEffect } from 'react'

import { Routes, Route } from 'react-router-dom';

import { supabase } from './API/supabase';

import AppLayout from './components/Layout/AppLayout';
import LoginLayout from './components/Layout/LoginLayout';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import CoursesPage from './pages/CoursesPage/CoursesPage';
import CoursePage from './pages/CoursePage/CoursePage';
import TimetablePage from './pages/TimetablePage/TimetablePage';
import LoginPage from './pages/LoginPage/LoginPage';
import PasswordResetPage from './pages/PasswordResetPage/PasswordResetPage';


import { useAppDispatch, useAppSelector } from './API/hooks';
import { fetchCourses } from './API/coursesSlice';
import { setSession } from './API/sessionSlice';

import './App.css';

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
            <Route path='/' element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path='courses'>
                <Route index element={<CoursesPage />} />
                <Route path=':courseId' element={<CoursePage />} />
              </Route>
              <Route path='timetable' element={<TimetablePage />} />
            </Route>
          )
          :
          (
            <Route path='/*' element={<LoginLayout />}>
              <Route path='auth' element={<PasswordResetPage supabase={supabase} />} />
              <Route path='*' element={<LoginPage supabase={supabase} />} />
            </Route>
          )
        }
      </Routes>
    </ThemeProvider>
  )

}

export default App;