import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context/Context';
import ReactSwitch from 'react-switch';
import { RiCloseFill } from 'react-icons/ri';
import { setDataLocal } from '../../lib/localStorage';

const Settings = () => {
  const { setShowPopUp, setDarkMode, darkMode, setHardMode, hardMode, setEasyMode, easyMode, setHintBtn, hintBtn } = useContext(Context);

  function toggleDarkMode(value) {
    setDarkMode(value);
    setDataLocal('darkMode', value);
  }

  function toggleHardMode(value) {
    setHardMode(value);
    setDataLocal('hardMode', value);

    if(easyMode) {
      setEasyMode(!value);
      setDataLocal('easyMode', !value);
    }
  }

  function toggleEasyMode(value) {
    setEasyMode(value);
    setDataLocal('easyMode', value);

    if (hardMode) {
      setHardMode(!value);
      setDataLocal('hardMode', !value);
    }
  }

  function toggleHintBtn(value) {
    setHintBtn(value);
    setDataLocal('hintBtn', value);
  }


  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] dark:bg-[rgba(0,0,0,0.4)] backdrop-blur-xs`}>
      <div className={`flex flex-col items-center pop-up w-9/10 h-6/10 -translate-y-10 lg:translate-y-0 lg:h-7/10 lg:w-25/100`}>
        <div className="w-full flex justify-between h-fit text-2xl items-center">
          <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] dark:[text-shadow:1px_2px_0_#1a1f24] bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120] dark:text-[#e0e8f0]'>
            Settings
          </p>
          <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
            <RiCloseFill className='text-[#234120] dark:text-[#e0e8f0]' />
          </button>
        </div>
        <div className='overflow-hidden shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] flex flex-col lg:flex-row h-full w-full items-center border dark:border-[rgba(255,255,255,0.1)] rounded-t-none border-[#0000004d] bg-[#d7ead5] dark:bg-[#1d2532]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px]'>
          <div className='h-full w-full p-4 pt-6 flex flex-col gap-2 justify-start text-3xl text-[#234120] dark:text-[#e0e8f0]'>
            <div className='flex justify-between h-18/100 w-full bg-[#acdda8] dark:bg-[#2a3942] shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] items-center px-5'>
              <p>Dark Mode</p>
              <ReactSwitch checked={darkMode} onColor={darkMode ? '#4a7c52' : '#234120'} offColor='#505a6b' activeBoxShadow={darkMode ? '#000000' : '#234120'} onChange={(value) => { toggleDarkMode(value) }} />
            </div>
            <div className='flex justify-between h-18/100 w-full bg-[#acdda8] dark:bg-[#2a3942] shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] items-center px-5'>
              <p>Hard Mode</p>
              <ReactSwitch checked={hardMode} onColor={hardMode ? '#4a7c52' : '#234120'} offColor='#505a6b' activeBoxShadow={hardMode ? '#000000' : '#234120'} onChange={(value) => { toggleHardMode(value) }} />
            </div>
            <div className='flex justify-between h-18/100 w-full bg-[#acdda8] dark:bg-[#2a3942] shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] items-center px-5'>
              <p>Easy Mode</p>
              <ReactSwitch checked={easyMode} onColor={easyMode ? '#4a7c52' : '#234120'} offColor='#505a6b' activeBoxShadow={easyMode ? '#000000' : '#234120'} onChange={(value) => { toggleEasyMode(value) }} />
            </div>
            <div className='flex justify-between h-18/100 w-full bg-[#acdda8] dark:bg-[#2a3942] shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] items-center px-5'>
              <p>Hint Button</p>
              <ReactSwitch checked={hintBtn} onColor={hintBtn ? '#4a7c52' : '#234120'} offColor='#505a6b' activeBoxShadow={hintBtn ? '#000000' : '#234120'} onChange={(value) => { toggleHintBtn(value) }} />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings