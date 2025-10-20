import { createRoot } from 'react-dom/client'
import './index.css'
import App from './route.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <App />
        <Toaster position='top-right' />
      </Provider>
    </GoogleOAuthProvider>
  </BrowserRouter>
)
