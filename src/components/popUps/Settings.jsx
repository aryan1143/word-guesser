import React from 'react'

const Settings = ({isHidden}) => {
  return (
    <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`shadow-[0_4px_0_0_#234120] flex justify-center items-center border pop-up border-[#0000004d] bg-[#d7ead5] w-9/10 h-6/10 -translate-y-10 md:translate-y-0 md:h-8/10 md:w-25/10 rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]`}>
        Settings
      </div>
    </div>
  )
}

export default Settings