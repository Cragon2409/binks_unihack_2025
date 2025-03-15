import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import { persistor, store} from './API/store';  // Import your Redux store
import './index.css'
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
