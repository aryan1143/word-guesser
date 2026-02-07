import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import Header from './components/Header'
import LeaderBoard from './components/popUps/LeaderBoard'
import { useContext, useState } from 'react'
import Stastistics from './components/popUps/Stastistics'
import Settings from './components/popUps/Settings'
import Context from './context/Context'
import GameMode from './components/popUps/GameMode'


function App() {
  const { showPopUp, setShowPopUp } = useContext(Context);


  function handleBgClick(e) {
    const isInsidePopup = e.target.closest('.pop-up');
    const isPopupButton = e.target.closest('.pop-up-button');
    if (!isInsidePopup && !isPopupButton) {
      setShowPopUp(null);
    }
  }

  return (
    <>
      <div onClick={handleBgClick} className="relative flex items-center w-screen h-screen flex-col bg-[#ccf0c1] overflow-hidden bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[40px_40px]">
        <Header />
        {showPopUp === 'LeaderBoard' && <LeaderBoard />}
        {showPopUp === 'Statistics' && <Stastistics />}
        {showPopUp === 'Settings' && <Settings />}
        {showPopUp === 'GameMode' && <GameMode />}
        <Routes >
          <Route path='/' element={<HomePage />} />
          <Route path='/game-page' element={<GamePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
