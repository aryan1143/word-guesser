import React, { useContext, useState } from 'react'
import Context from '../../context/Context';
import closeIcon from '/close-icon48.png'
import ReactSwitch from 'react-switch';

const Settings = () => {
  const { setShowPopUp } = useContext(Context);
  const [checked, setChecked] = useState(false)


  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`flex flex-col items-center pop-up w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-25/100`}>
        <div className="w-full flex justify-between h-fit text-2xl items-center">
          <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120]'>
            Settings
          </p>
          <button onClick={() => { setShowPopUp(null) }} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
            <img src={closeIcon} className='filter drop-shadow-[0_4px_0_#acdda8] filter-green size-5' alt="Close" />
          </button>
        </div>
        <div className='overflow-hidden shadow-[0_4px_0_0_#234120] flex flex-col md:flex-row h-full w-full items-center border rounded-t-none border-[#0000004d] bg-[#d7ead5]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
          <div className='h-full w-full p-4 pt-6 flex flex-col gap-2 justify-start text-3xl text-[#234120]'>
            <div className='flex justify-between h-18/100 w-full bg-[#acdda8] shadow-[2px_3px_0_0_#234120] items-center px-5'>
              <p>Dark Mode</p>
              <ReactSwitch checked={checked} onColor='#234120' activeBoxShadow='#234120' onChange={(value)=>{setChecked(value)}}/>
            </div>
            <div className='flex justify-between h-18/100 w-full bg-[#acdda8] shadow-[2px_3px_0_0_#234120] items-center px-5'>
              <p>Hard Mode</p>
              <ReactSwitch checked={checked} onColor='#234120' activeBoxShadow='#234120' onChange={(value)=>{setChecked(value)}}/>
            </div>
            <div className='flex justify-between h-18/100 w-full bg-[#acdda8] shadow-[2px_3px_0_0_#234120] items-center px-5'>
              <p>Contrast Mode</p>
              <ReactSwitch checked={checked} onColor='#234120' activeBoxShadow='#234120' onChange={(value)=>{setChecked(value)}}/>
            </div>
            <div className='flex justify-between h-18/100 w-full bg-[#acdda8] shadow-[2px_3px_0_0_#234120] items-center px-5'>
              <p>Offline Mode</p>
              <ReactSwitch checked={checked} onColor='#234120' activeBoxShadow='#234120' onChange={(value)=>{setChecked(value)}}/>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings