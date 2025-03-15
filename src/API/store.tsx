import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './coursesSlice'
import sessionReducer from './sessionSlice'

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    session: sessionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store