import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import Header from './components/Header'
import LeaderBoard from './components/popUps/LeaderBoard'
import { useContext, useEffect, useState } from 'react'
import Settings from './components/popUps/Settings'
import Context from './context/Context'
import GameMode from './components/popUps/GameMode'
import Profile from './components/popUps/Profile'
import LoginContext from './context/LoginContext'
import Login from './components/popUps/Login'
import SignUp from './components/popUps/SignUp'
import { getDataLocal } from './lib/localStorage'
import PfpSelector from './components/popUps/PfpSelector'
import useHandleStatsHistory from './hooks/useHandleStatsHistory'



function App() {
  const { showPopUp, setShowPopUp } = useContext(Context);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  useEffect(() => { 
    const isNotFirstTimeVisit = getDataLocal("isNotFirstTimeVisit");
    if (!isNotFirstTimeVisit) {
      setShowPopUp("Login");
    }
    const loggedIn = getDataLocal("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(loggedIn);
    }
  }, [])

  useHandleStatsHistory();

  function handleBgClick(e) {
    const isInsidePopup = e.target.closest('.pop-up');
    const isPopupButton = e.target.closest('.pop-up-button');
    if (!isInsidePopup && !isPopupButton) {
      setShowPopUp(null);
    }
  }

  return (
    <>
      <div onClick={handleBgClick} className="relative select-none flex items-center w-screen h-screen flex-col bg-[#ccf0c1] overflow-hidden bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[40px_40px]">
        <Header />
        {showPopUp === 'pfpSelect' &&  <PfpSelector />}
        {showPopUp === 'SignUp' &&  <SignUp />}
        {showPopUp === 'Login' && <Login />}
        {showPopUp === 'LeaderBoard' && <LeaderBoard />}
        {showPopUp === 'Profile' && (isLoggedIn ? <Profile /> : <Login />)}
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
