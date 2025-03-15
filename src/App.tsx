import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createClient } from '@supabase/supabase-js'
// import { Database } from './database.types'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const SUPABASE_URL = 'https://quaobmjerksaujqlspoz.supabase.co'
const VITE_ANON_KEY = process.env.VITE_ANON_KEY ?? ""

const supabase = createClient(SUPABASE_URL, VITE_ANON_KEY)


function App() {
  const [count, setCount] = useState(0)
  const [session, setSession] = useState(null)
  const [errorLogMessage, setErrorLogMessage] = useState("")
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
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  } else {
    return (
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => {
            supabase.auth.signOut()
            setSession(null);
            }}>
            Sign Out
          </button>
          <p>
            Logged in as {(session as any).user.email}.
            <br></br>
            ID: {(session as any).user.id}
            <br></br>
            Edit <code>src/App.tsx</code> and save to test HMR
            <br></br>
            {errorLogMessage}
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    )
  }

  
}

export default App
