import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.tsx'
import {store} from './API/store';  // Import your Redux store
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>  {/* Wrap the app in Provider */}
    <App />
  </Provider>
</StrictMode>
)
