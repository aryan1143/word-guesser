import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { randomWord } from '../utils/wordUtil';
import WordsContext from '../../context/WordsContext';
import Context from '../../context/Context';
import WonLogo from '/won.jpg';
import LostLogo from '/lost.jpg';

const WinOrLost = ({ status = 'lost' }) => {



    const { setTargetWord, targetWord, setAllWords } = useContext(WordsContext);
    const { setShowPopUp, inDailyWordle } = useContext(Context);

    function handleOnClick() {
        const word = randomWord();
        setTargetWord(word);
        setShowPopUp(null);
        setAllWords([
            '-----', '-----', '-----', '-----', '-----', '-----'
        ]);
        console.log(word)
    }

    return (
        <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-9/10 h-45/100 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-30/100`}>
                <div className="w-full flex justify-between h-fit text-2xl items-center">
                    <p className='bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120]'>
                        Game Status
                    </p>
                </div>
                <div className='overflow-hidden p-3 shadow-[0_4px_0_0_#234120] flex flex-col h-full w-full items-center border rounded-t-none border-[#0000004d] bg-[#d7ead5]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <div className='w-full mb-auto'>
                        {status === 'won' ?
                            <img className='w-full' src={WonLogo} />
                            :
                            <img className='w-full' src={LostLogo} />
                        }

                    </div>
                    <div className='w-full h-3/10 flex flex-col gap-2 text-2xl justify-center items-center text-[#234120]'>
                        <p className='w-full h-fit flex justify-center items-center'>
                            {status === 'won' ? `GUESSED WORDLE: ${targetWord}` : `TARGET WORDLE: ${targetWord}`}
                        </p>
                        <div className='flex justify-center gap-3'>
                            <p>Tries: 5</p>
                            <p>Score: 17</p>
                        </div>
                    </div>
                    <div className='w-full flex justify-around mt-auto gap-2 text-2xl'>
                        <Link onClick={handleOnClick} to={'/'} className='flex justify-center items-center flex-1 md:w-[6vw] h-[calc(1rem+3vh)] md:h-[calc(1.2rem+3vh)] text-[#234120] bg-[#acdda8] cursor-pointer shadow-[0_2px_0_0_#234120]'>Home</Link>
                        {!inDailyWordle && <button onClick={handleOnClick} className='flex-1 md:w-[6vw] h-[calc(1rem+3vh)] md:h-[calc(1.2rem+3vh)] bg-[#234120] text-[#acdda8] cursor-pointer shadow-[0_3px_0_0_#acdda8]'>Play Again</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WinOrLost