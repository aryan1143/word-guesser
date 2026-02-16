import React from 'react'

const Loader = ({text = 'Please Wait...', isText=true}) => {
  return (
    <div className='absolute md:text-xl flex flex-col gap-1 px-6 rounded-sm border border-[#0000004d] shadow-[0_3px_0_0_#234120] py-4 justify-center items-center bg-[#acdda8]  z-30 top-[45%] md:top-[50%] left-[50%] -translate-[50%]'>
        <div className='loader'>

        </div>
        {isText && <p>{text}</p>}
    </div>
  )
}

export default Loader