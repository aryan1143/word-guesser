import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './context/ContextProvider.jsx'
import WordsContextProvider from './context/WordsContextProvider.jsx'
import LoginContextProvider from './context/LoginContextProvider.jsx'
import ConfirmContextProvider from './context/ConfirmContextProvider.jsx'
import { ChallengeProvider } from './context/ChallengeContext.jsx'
import { TimerProvider } from './context/TimerContext.jsx'
import { ScoreContextProvider } from './context/ScoreContext.jsx'
import AchivementContextProvider from './context/AchivementContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <ContextProvider>
          <WordsContextProvider>
            <ConfirmContextProvider >
              <TimerProvider >
                <ScoreContextProvider>
                  <ChallengeProvider >
                    <AchivementContextProvider>
                      <App />
                    </AchivementContextProvider>
                  </ChallengeProvider>
                </ScoreContextProvider>
              </TimerProvider>
            </ConfirmContextProvider>
          </WordsContextProvider>
        </ContextProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
