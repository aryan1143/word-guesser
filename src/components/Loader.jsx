import React from 'react'

const Loader = ({text = 'Please Wait...', isText=true, isBg = true}) => {
  return (
    <div className={`absolute md:text-xl flex flex-col gap-1 px-6 rounded-sm ${isBg && 'border border-[#0000004d] shadow-[0_3px_0_0_#234120] bg-[#acdda8]' }  py-4 justify-center items-center z-30 top-[45%] md:top-[50%] left-[50%] -translate-[50%]`}>
        <div className='loader'>

        </div>
        {isText && <p>{text}</p>}
    </div>
  )
}

export default Loader