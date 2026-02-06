import React from 'react'

const Settings = ({isHidden}) => {
  return (
    <div className={`absolute top-0 left-0 z-30 ${isHidden ? 'hidden' : ''} h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`shadow-[0_3px_0_0_#234120] flex justify-center items-center border pop-up border-[#0000004d] bg-[#d7ead5] w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-9/10 md:w-3/10 rounded-xl`}>
        Settings
      </div>
    </div>
  )
}

export default Settings