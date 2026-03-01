import React from 'react'

const Toast = ({text}) => {
  return (
    <div className='absolute toast z-50 flex justify-center items-center h-fit min-w-35 md:min-w-50 px-3 py-2 rounded-3xl bg-[#234120] text-[calc(0.5rem+2vw)] md:text-2xl text-[#acdda8] top-[10%] left-[50%] -translate-[50%]'>
        {text}
    </div>
  )
}

export default Toast