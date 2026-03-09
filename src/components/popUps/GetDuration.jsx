import { useContext, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";
import Context from "../../context/Context";
import { useGlobalTimer } from "../../context/TimerContext";
import { useNavigate } from "react-router-dom";
import { randomWord } from "../utils/wordUtil";
import WordsContext from "../../context/WordsContext";

export default function GetDuration() {
    const [timeDuration, setTimeDuration] = useState(90);
    const { setShowPopUp, setIsTimed } = useContext(Context);
    const { setTargetWord, setAllWords, setAllWordsState, setLetterIndex, setSubmitedRowNo } = useContext(WordsContext);

    const navigate = useNavigate();

    const { startTimer } = useGlobalTimer();

    const timeOptions = [
        { label: "1 Min", value: 60 },
        { label: "1.5 Min", value: 90 },
        { label: "3 Mins", value: 180 },
        { label: "5 Mins", value: 300 },
    ];

    function handleClose(action) {
        action === 'close' ? setShowPopUp(null) : setShowPopUp('GameMode');
    }

    function handleStartPractice() {
        setLetterIndex(0);
        setSubmitedRowNo(0);
        setAllWords([
            '-----', '-----', '-----', '-----', '-----', '-----'
        ]);
        setAllWordsState(['', '', '', '', '', '']);
        setIsTimed(true);
        setShowPopUp(null);
        startTimer(timeDuration);
        navigate('/game-page');
        const wordle = randomWord();
        setTargetWord(wordle);
    }

    return (
        <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-9/10 h-45/100 -translate-y-10 md:translate-y-0 md:h-60/100 md:w-25/100`}>
                <div className="w-full flex justify-between h-fit text-2xl items-center">
                    <p className='flex items-center gap-1 bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120]'>
                        <button className='cursor-pointer' onClick={() => handleClose('back')}>
                            <MdArrowBack />
                        </button>
                        Practice Mode
                    </p>
                    <button onClick={() => handleClose('close')} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] border border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d]'>
                        <RiCloseFill className='text-[#234120]' />
                    </button>
                </div>

                <div className='overflow-hidden shadow-[0_4px_0_0_#234120] p-3 flex flex-col h-full w-full items-center border rounded-t-none border-[#0000004d] bg-[#d7ead5]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <div className="text-center mt-auto">
                        <h2 className="text-3xl text-[#234120] [text-shadow:1px_1px_0_#acdda8]">Select Duration</h2>
                        <p className="text-xl text-[#234120] opacity-80 mt-1">How much time do you need?</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full my-auto">
                        {timeOptions.map((option) => (
                            <button
                                key={option.label}
                                onClick={() => setTimeDuration(option.value)}
                                className={`text-xl py-4 px-4 rounded-lg border-2 transition-all cursor-pointer ${timeDuration === option.value
                                    ? "border-[#234120] bg-[#234120] text-[#acdda8] shadow-[0_2px_0_0_#142512]"
                                    : "border-[#234120] text-[#234120] bg-transparent hover:bg-[#23412015]"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleStartPractice}
                        className="w-full mt-auto bg-[#234120] text-[#acdda8] text-2xl py-3 rounded-xl border border-[#142512] shadow-[0_4px_0_0_#acdda8] active:shadow-[0_0px_0_0_#142512] active:translate-y-0.5 transition-all cursor-pointer"
                    >
                        Start Practice
                    </button>
                </div>
            </div>
        </div>
    );
}