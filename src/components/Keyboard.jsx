import React from 'react'
import { MdOutlineBackspace } from "react-icons/md";

const Keyboard = () => {
  const keysRow = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
  ];

  return (
    <div className='flex flex-col justify-end items-center w-screen gap-2 py-5 flex-1'>
      {keysRow.map((keys, i) => {
        return <div key={i} className='flex justify-center w-full max-w-120 gap-1'>
          {
            keys.map((key) => {
              return <div style={{
                            boxShadow: "0 2px 0 0 #234120",
                          }} className={`flex justify-center items-center rounded md:p-4 bg-[#acdda8] px-3 py-3 min-w-9 md:min-w-12 font-bold text-[#234120] ${key === 'Enter' ? 'text-sm md:text-xl' : 'text-xl md:text-2xl'}`} key={key}>{key === 'Backspace' ? <MdOutlineBackspace className='md:size-9'/> : key}</div>
            })
          }
        </div>
      })}
    </div>
  )
}

export default Keyboard