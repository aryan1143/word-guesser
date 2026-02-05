import React from 'react'

const Tile = ({letter, isBigTiles, isGuessed, isGuessedWithPos, isWrongGuess}) => {
  return (
    <div className={`${isBigTiles ? 'w-[max(4rem,calc(3rem+1.5vw))] h-[max(4rem,calc(3rem+1.5vw))]' : 'w-[max(3.5rem,calc(2rem+1.5vw))] h-[max(3.5rem,calc(2rem+1.5vw))]'} ${isGuessed ? (isGuessedWithPos? 'bg-[#6aaa64] text-white' : 'bg-[#c9b458] text-white') : isWrongGuess ? 'text-white bg-gray-400' : 'border-3 border-gray-400'} flex justify-center items-center`}>
      <p className={`${isBigTiles ? 'text-5xl' : 'text-4xl'} font-bold`}>{letter}</p>
    </div>
  )
}

export default Tile