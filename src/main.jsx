import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './context/ContextProvider.jsx'
import WordsContextProvider from './context/WordsContextProvider.jsx'
import LoginContextProvider from './context/LoginContextProvider.jsx'
import ConfirmContextProvider from './context/ConfirmContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <ContextProvider>
          <WordsContextProvider>
            <ConfirmContextProvider >
              <App />
            </ConfirmContextProvider>
          </WordsContextProvider>
        </ContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
