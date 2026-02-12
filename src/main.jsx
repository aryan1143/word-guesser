import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './context/ContextProvider.jsx'
import WordsContextProvider from './context/WordsContextProvider.jsx'
import LoginContextProvider from './context/LoginContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <ContextProvider>
          <WordsContextProvider>
            <App />
          </WordsContextProvider>
        </ContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
