import React from 'react'

const Tile = ({letter, isBigTiles, isGuessed, isGuessedWithPos, isWrongGuess, style}) => {
  return (
    <div className={`${style} ${isBigTiles ? 'w-[max(4rem,calc(3rem+1.5vw))] h-[max(4rem,calc(3rem+1.5vw))]' : 'w-[max(3.5rem,calc(2rem+1.5vw))] h-[max(3.5rem,calc(2rem+1.5vw))]'} ${isGuessed ? (isGuessedWithPos? 'bg-[#619d5c] dark:bg-[#7fb877] text-white' : 'bg-[#ddc459] dark:bg-[#c9a938] text-white') : isWrongGuess ? 'text-white bg-gray-400 dark:bg-[#505a6b]' : isBigTiles ? 'border-3 border-gray-400 dark:border-[#505a6b] shadow-[0_1px_0_0_#99a1af] dark:shadow-[0_1px_0_0_#505a6b]' : 'border-2 bg-[#dbffd0] dark:bg-[#2a3942] border-[#234120b7] dark:border-[rgba(255,255,255,0.2)] shadow-[0_1px_0_0_#234120] dark:shadow-[0_1px_0_0_#505a6b]'} flex justify-center items-center`}>
      <p className={`${isBigTiles ? 'text-5xl' : 'text-4xl'} text-[#234120] dark:text-[#e0e8f0]`}>{letter}</p>
    </div>
  )
}

export default Tile