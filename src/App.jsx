import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import Header from './components/Header'
import LeaderBoard from './components/popUps/LeaderBoard'
import { useState } from 'react'
import Stastistics from './components/popUps/Stastistics'
import Settings from './components/popUps/Settings'


function App() {
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  return (
    <>
      <div className='relative flex items-center w-screen h-screen flex-col bg-[#dbffd0] overflow-hidden'>
        <Header setShowLeaderBoard={setShowLeaderBoard} setShowSetting={setShowSetting} setShowStatistics={setShowStatistics}/>
        <LeaderBoard isHidden={!showLeaderBoard}/>
        <Stastistics isHidden={!showStatistics} />
        <Settings isHidden={!showSetting} />
        <Routes >
          <Route path='/' element={<HomePage />} />
          <Route path='/game-page' element={<GamePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
