import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import Header from './components/Header'


function App() {
  return (
    <>
      <div className='relative flex items-center w-screen h-screen flex-col bg-[#dbffd0] overflow-hidden'>
        <Header />
        <Routes >
          <Route path='/' element={<HomePage />} />
          <Route path='/game-page' element={<GamePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
