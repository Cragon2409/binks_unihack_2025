import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './coursesSlice'
import sessionReducer from './sessionSlice'
import assessmentReducer from './assessmentsSlice'
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedSessionReducer = persistReducer(persistConfig, sessionReducer);

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    session: persistedSessionReducer,
    assessments: assessmentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const persistor = persistStore(store);