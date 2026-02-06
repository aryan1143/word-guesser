import React from 'react'

const Tile = ({letter, isBigTiles, isGuessed, isGuessedWithPos, isWrongGuess}) => {
  return (
    <div className={`${isBigTiles ? 'w-[max(4rem,calc(3rem+1.5vw))] h-[max(4rem,calc(3rem+1.5vw))]' : 'w-[max(3.5rem,calc(2rem+1.5vw))] h-[max(3.5rem,calc(2rem+1.5vw))]'} ${isGuessed ? (isGuessedWithPos? 'bg-[#619d5c] text-white' : 'bg-[#ddc459] text-white') : isWrongGuess ? 'text-white bg-gray-400' : isBigTiles ? 'border-3 border-gray-400 shadow-[0_1px_0_0_#99a1af]' : 'border-2 bg-[#dbffd0] border-[#234120b7] shadow-[0_1px_0_0_#234120]'} flex justify-center items-center`}>
      <p className={`${isBigTiles ? 'text-5xl' : 'text-4xl'} font-bold`}>{letter}</p>
    </div>
  )
}

export default Tile