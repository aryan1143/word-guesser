import React from 'react'

const Toast = ({text}) => {
  return (
    <div className='absolute toast z-50 flex justify-center items-center h-fit min-w-35 md:min-w-50 px-3 py-2 rounded-3xl bg-[#234120] dark:bg-[#1a1f24] text-[calc(0.5rem+2vw)] md:text-2xl text-[#acdda8] dark:text-[#e0e8f0] top-[10%] left-[50%] -translate-[50%]'>
        {text}
    </div>
  )
}

export default Toast