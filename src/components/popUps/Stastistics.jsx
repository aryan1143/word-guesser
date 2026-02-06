import React from 'react'

const Stastistics = ({isHidden}) => {
  return (
    <div className={`absolute top-0 left-0 z-30 ${isHidden ? 'hidden' : ''} h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
      <div className={`flex justify-center items-center border pop-up border-[#0000004d] bg-[#d7ead5] w-8/10 h-8/10 rounded-xl`}>
        Stastistics
      </div>
    </div>
  )
}

export default Stastistics