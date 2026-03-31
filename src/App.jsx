import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { getDataLocal } from './lib/localStorage'
import { lazy, Suspense, useContext, useEffect } from 'react'
import Header from './components/Header'
import Context from './context/Context'
import useHandleStatsHistory from './hooks/useHandleStatsHistory'
import useChallengeWordle from './hooks/useChallengeWordle'
import Fallback from './components/Fallback'
import LoginContext from './context/LoginContext'
import Toast from './components/popUps/Toast'
import usePlaySound from './components/utils/usePlaySound'

function LazyWrapper({ children }) {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>;
}

const GamePage = lazy(()=> import('./pages/GamePage'));

const LeaderBoard = lazy(() => import('./components/popUps/LeaderBoard'));
const Settings = lazy(() => import('./components/popUps/Settings'));
const GameMode = lazy(() => import('./components/popUps/GameMode'));
const Profile = lazy(() => import('./components/popUps/Profile'));
const Login = lazy(() => import('./components/popUps/Login'));
const SignUp = lazy(() => import('./components/popUps/SignUp'));
const Verification = lazy(() => import('./components/popUps/Verification'));
const WinOrLost = lazy(() => import('./components/popUps/WinOrLost'));
const Challenge = lazy(() => import('./components/popUps/Challenge'));
const GetDuration = lazy(() => import('./components/popUps/GetDuration'));
const HintBox = lazy(() => import('./components/popUps/HintBox'));
const PfpSelector = lazy(() => import('./components/popUps/PfpSelector'));


function App() {
  const { showPopUp, setShowPopUp, showToast, toastMessege, showCreateChallenge, setShowCreateChallenge, setChallengeId, darkMode, setDarkMode, setHardMode, setEasyMode, setHintBtn, setSoundOn } = useContext(Context);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const challengeId = getDataLocal('challengeId');
  const { challengeData } = useChallengeWordle();
  const playSound = usePlaySound();
  const navigate = useNavigate();

  useEffect(() => {
    const localDarkMode = getDataLocal('darkMode');
    const localHardMode = getDataLocal('hardMode');
    const localEasyMode = getDataLocal('easyMode');
    const localHintBtn = getDataLocal('hintBtn');
    const soundOn = getDataLocal('soundOn');

    setDarkMode(localDarkMode);
    setHardMode(localHardMode);
    setEasyMode(localEasyMode);
    setHintBtn(localHintBtn);
    setSoundOn(soundOn);

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const isNotFirstTimeVisit = getDataLocal("isNotFirstTimeVisit");
    if (!isNotFirstTimeVisit) {
      setShowPopUp("Login");
    }

    const loggedIn = getDataLocal("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(loggedIn);
    }

    if (challengeId) {
      setChallengeId(challengeId);
    }
  }, [])

  useEffect(() => {
    const userId = getDataLocal('userId');
    if (!challengeData) return;

    if (challengeData.status === 'waiting' && challengeData.createdBy === userId) {
      setShowCreateChallenge(true);
    }

    if (challengeData.status === 'active') {
      navigate('/');
    }
  }, [challengeData])

  useEffect(() => {
    function handleGlobalButtonClick(event) {
      const button = event.target.closest('button, input[type="button"], input[type="submit"], input[type="reset"]');
      if (!button) return;
      playSound('click');
    }

    document.addEventListener('click', handleGlobalButtonClick, true);
    return () => {
      document.removeEventListener('click', handleGlobalButtonClick, true);
    };
  }, [playSound])



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
      <div onClick={handleBgClick} className="relative select-none flex items-center w-screen h-dvh flex-col bg-[#ccf0c1] dark:bg-[#0f1419] overflow-hidden bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]">
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route
            path='/game-page'
            element={
              <LazyWrapper>
                <GamePage />
              </LazyWrapper>
            }
          />

          <Route
            path='/challenge/:challengeId'
            element={
              <LazyWrapper>
                <>
                  <Challenge />
                  <HomePage />
                </>
              </LazyWrapper>
            }
          />
        </Routes>
        {showToast &&
          <Toast text={toastMessege} />
        }

        {showCreateChallenge && (
          <LazyWrapper>
            <Challenge />
          </LazyWrapper>
        )}

        {showPopUp === 'GetDuration' && (
          <LazyWrapper>
            <GetDuration />
          </LazyWrapper>
        )}

        {showPopUp === 'won' ? (
          <LazyWrapper>
            <WinOrLost status='won' />
          </LazyWrapper>
        ) : showPopUp === 'lost' ? (
          <LazyWrapper>
            <WinOrLost status='lost' />
          </LazyWrapper>
        ) : showPopUp === 'timeUp' ? (
          <LazyWrapper>
            <WinOrLost status='timeUp' />
          </LazyWrapper>
        ) : showPopUp === 'waiting' && (
          <LazyWrapper>
            <WinOrLost status='waiting' />
          </LazyWrapper>
        )}

        {showPopUp === 'pfpSelect' && (
          <LazyWrapper>
            <PfpSelector />
          </LazyWrapper>
        )}

        {showPopUp === 'SignUp' && (
          <LazyWrapper>
            <SignUp />
          </LazyWrapper>
        )}

        {showPopUp === 'Verification' && (
          <LazyWrapper>
            <Verification />
          </LazyWrapper>
        )}

        {showPopUp === 'Login' && (
          <LazyWrapper>
            <Login />
          </LazyWrapper>
        )}

        {showPopUp === 'LeaderBoard' && (
          <LazyWrapper>
            <LeaderBoard />
          </LazyWrapper>
        )}

        {showPopUp === 'Profile' && (
          <LazyWrapper>
            {isLoggedIn ? <Profile /> : <Login />}
          </LazyWrapper>
        )}

        {showPopUp === 'Settings' && (
          <LazyWrapper>
            <Settings />
          </LazyWrapper>
        )}

        {showPopUp === 'GameMode' && (
          <LazyWrapper>
            <GameMode />
          </LazyWrapper>
        )}

        {showPopUp === 'HintBox' && (
          <LazyWrapper>
            <HintBox />
          </LazyWrapper>
        )}
      </div>
    </>
  )
}

export default App
