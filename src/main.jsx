import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './context/ContextProvider.jsx'
import WordsContextProvider from './context/WordsContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <WordsContextProvider>
          <App />
        </WordsContextProvider>
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
