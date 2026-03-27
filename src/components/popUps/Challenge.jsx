import React, { useContext, useEffect, useState } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { RiCloseFill } from 'react-icons/ri'
import compareWord from '../utils/compareWord'
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import Context from '../../context/Context';
import { getWordIndex } from '../utils/getWordleOrIndex';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';
import { getDataLocal } from '../../lib/localStorage';
import useDialog from '../../hooks/useDialog';
import ChallengeContext from '../../context/ChallengeContext';

const Challenge = () => {
    const [isTimed, setIsTimed] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [copied, setCopied] = useState(false);
    const [isWrongWordle, setIsWrongWordle] = useState(false);
    const [word, setWord] = useState('');
    const [duration, setDuration] = useState(30);
    const [isWaiting, setIsWaiting] = useState(false);
    const [justCreated, setJustCreated] = useState(false);

    const { challengeId: paramsChallengeId } = useParams();
    const locationPath = useLocation().pathname;
    const navigate = useNavigate();
    const { confirmBox } = useDialog();
    const { challengeId } = useContext(Context);

    const {
        createChallengeLoading, acceptChallengeLoading, startChallengeLoading, challengeDataLoading,
        error, challengeURL, challengeStatus, challengeData,
        createChallenge, acceptChallenge, startChallenge, exitChallenge,
    } = useContext(ChallengeContext);

    const { showToastMessege, showCreateChallenge, setShowPopUp, setShowCreateChallenge, setChallengeId } = useContext(Context);
    const userId = getDataLocal('userId');
    const ongoingChallengeId = getDataLocal('challengeId');

    useEffect(() => {
      if(!ongoingChallengeId) setChallengeId(null);
    }, [])
    

    useEffect(() => {
        if (locationPath.includes('challenge') && paramsChallengeId) {
            setChallengeId(paramsChallengeId);
        }
    }, [locationPath, paramsChallengeId, setChallengeId]);


    async function handleClose(action) {
        if (!challengeId) {
            action === 'close' ? setShowPopUp(null) : setShowPopUp('GameMode');
            setShowCreateChallenge(false);
        }
        if (challengeData.players.includes(userId)) {
            const result = await confirmBox('Are you sure you want to leave the challenge!');
            if (result) {
                exitChallenge(challengeId || ongoingChallengeId);
            } else {
                return;
            }
        }
        if (action === 'close') {
            setShowPopUp(false);
            setShowCreateChallenge(false);
            navigate('/');
        } else if (action === 'back') {
            setShowPopUp('GameMode');
            setShowCreateChallenge(false);
            navigate('/');
        }
    }

    function handleWordleInput(value) {
        if (value.length >= 5) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
        if (value.length > 5) {
            return;
        }
        setWord(value);
        setIsWrongWordle(false);
    }

    function handleCreateChallenge() {
        if (!compareWord(word) && (!isTimed)) {
            setIsWrongWordle(true);
            showToastMessege("Word is not in list❌")
            return;
        }

        if (isTimed) {
            createChallenge({ isTimed: isTimed, duration: duration });
        } else {
            const wordle1Index = getWordIndex(word);
            createChallenge({ wordle1Index });
        }
        setJustCreated(true);
        setWord(null);
    }

    async function handleCopy() {
        if (!challengeURL) return;
        try {
            await navigator.clipboard.writeText(challengeURL);
            showToastMessege("Link copied! 📋")
            setCopied(true);
        } catch (err) {
            showToastMessege("Failed to copy ❌");
        }
    }

    function handleCancel() {
        navigate('/');
        setChallengeId(null);
    }

    function handleAccept() {
        if (!challengeData) return;
        if (!compareWord(word) && (!challengeData.isTimed)) {
            setIsWrongWordle(true);
            showToastMessege("Word is not in list❌")
            return;
        }
        if (!isTimed) {
            const wordle2Index = getWordIndex(word);
            acceptChallenge(challengeId, wordle2Index);
            return;
        }
        acceptChallenge(challengeId);
    }

    useEffect(() => {
        if (challengeData && challengeId) {
            if (challengeData.players.length >= 2 && challengeData.status === 'ready') {
                startChallenge(challengeId);
                setIsWaiting(false);
                return;
            }

            if (challengeData.createdBy === userId) {
                setIsWaiting(true);
            }
        }
    }, [challengeData])

    const renderChallengeState = () => {
        const isChallengePath = locationPath.includes('challenge');

        if (challengeDataLoading || acceptChallengeLoading) return <Loader isBg={false} />;
        if (isWaiting) {
            if (justCreated && copied) {
                return <WaitingUi />;
            } else if (!justCreated) {
                return <WaitingUi
                    startChallengeLoading={startChallengeLoading}
                    challengePlayersNo={challengeData && challengeData.players.length}
                />;
            }
        }

        if (isChallengePath) {
            return (
                <AcceptChallengeUI
                    challengeData={challengeData}
                    handleAccept={handleAccept}
                    handleCancel={handleCancel}
                    word={word}
                    isWrongWordle={isWrongWordle}
                    handleWordleInput={handleWordleInput}
                    isDisabled={isDisabled}
                />
            );
        }
        if (showCreateChallenge) {
            return (
                <CreateChallengeUI
                    isTimed={isTimed}
                    word={word}
                    isWrongWordle={isWrongWordle}
                    challengeURL={challengeURL}
                    copied={copied}
                    isDisabled={isDisabled}
                    loading={createChallengeLoading}
                    duration={duration}
                    handleWordleInput={handleWordleInput}
                    setIsTimed={setIsTimed}
                    setDuration={setDuration}
                    handleCreateChallenge={handleCreateChallenge}
                    handleCopy={handleCopy}
                    challengeId={challengeId}
                />
            );
        }
        return null;
    };


    return (
        <div className={`absolute top-0 left-0 z-30 h-screen w-screen bg-[#62626225] dark:bg-[rgba(0,0,0,0.4)] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-9/10 h-5/10 -translate-y-10 md:translate-y-0 md:h-7/10 md:w-30/100`}>
                <div className="w-full flex justify-between h-fit text-2xl items-center">
                    <p className='flex items-center gap-1 bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] [text-shadow:1px_2px_0_#acdda8] dark:[text-shadow:1px_2px_0_#1a1f24] bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 border-[#0000004d] text-[#234120] dark:text-[#e0e8f0]'>
                        <button className='cursor-pointer' onClick={() => handleClose('back')}>
                            <MdArrowBack />
                        </button>
                        Challenge With Friends
                    </p>
                    <button onClick={() => handleClose('close')} className='cursor-pointer bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] -mb-0.5 z-20 bg-size-[30px_30px] h-full bg-[#d7ead5] dark:bg-[#1d2532] border dark:border-[rgba(255,255,255,0.1)] border-b-0 rounded-b-none rounded-xl px-2 p-1 flex items-center border-[#0000004d] text-[#234120] dark:text-[#e0e8f0]'>
                        <RiCloseFill />
                    </button>
                </div>

                <div className='overflow-hidden shadow-[0_4px_0_0_#234120] dark:shadow-[0_4px_0_0_#000000] p-3 flex flex-col h-full w-full items-center border dark:border-[rgba(255,255,255,0.1)] rounded-t-none border-[#0000004d] bg-[#d7ead5] dark:bg-[#1d2532]  rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    {renderChallengeState()}
                </div>
            </div>
        </div>
    )
}

export default Challenge



const CreateChallengeUI = ({ isTimed, word, isWrongWordle, handleCopy, challengeURL, copied, handleCreateChallenge, isDisabled, loading, setIsTimed, setDuration, duration, handleWordleInput, challengeId }) => {
    return (
        <>
            <form className='w-full h-15/100 flex justify-around gap-5 px-2'>
                <div className='flex-1'>
                    <input
                        className='peer sr-only'
                        id="customWordle"
                        checked={isTimed === false}
                        value="false"
                        type="radio"
                        name='type'
                        onChange={(e) => setIsTimed(e.target.value === "true")}
                    />
                    <label
                        className='flex-1 py-1 bg-[#acdda8] dark:bg-[#2a3942] shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] flex justify-center items-center text-xl dark:text-[#698566] md:text-2xl peer-checked:bg-[#234120] dark:peer-checked:bg-[#1a1f24] peer-checked:shadow-[2px_3px_0_0_#acdda8] dark:peer-checked:shadow-[2px_3px_0_0_#4a7c52] peer-checked:text-[#acdda8] dark:peer-checked:text-[#e0e8f0] cursor-pointer transition-colors duration-100'
                        htmlFor="customWordle"
                    >
                        Custom Wordle
                    </label>
                </div>
                <div className='flex-1'>
                    <input
                        className='peer sr-only'
                        id="timedWordle"
                        checked={isTimed === true}
                        value="true"
                        type="radio"
                        name='type'
                        onChange={(e) => setIsTimed(e.target.value === "true")}
                    />
                    <label
                        className='flex-1 py-1 bg-[#acdda8] dark:bg-[#2a3942] shadow-[2px_3px_0_0_#234120] dark:shadow-[2px_3px_0_0_#000000] flex justify-center items-center text-xl dark:text-[#698566] md:text-2xl peer-checked:bg-[#234120] dark:peer-checked:bg-[#1a1f24] peer-checked:shadow-[2px_3px_0_0_#acdda8] dark:peer-checked:shadow-[2px_3px_0_0_#4a7c52] peer-checked:text-[#acdda8] dark:peer-checked:text-[#e0e8f0] cursor-pointer transition-colors duration-100'
                        htmlFor="timedWordle"
                    >
                        Timed Wordle
                    </label>
                </div>
            </form>
            <div className='w-full h-15/100 flex flex-col items-center justify-center'>
                {isTimed ?
                    <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} name="duration" className='w-fit h-fit p-2 px-8 bg-[#234120] dark:bg-[#1a1f24] text-xl text-[#acdda8] dark:text-[#e0e8f0] dark:border dark:border-[#505a6b]'>
                        <option value="30">30 Sec</option>
                        <option value="60">60 Sec</option>
                        <option value="90">90 Sec</option>
                        <option value="120">120 Sec</option>
                    </select>
                    :
                    <input type="text" value={word} onChange={(e) => handleWordleInput(e.target.value.toUpperCase())} id="wordleInput" placeholder='Enter a 5 letter word...' className={`p-2 text-2xl text-[#234120] dark:text-[#e0e8f0] focus:outline-0 bg-[#acdda8] dark:bg-[#2a3942] ${isWrongWordle ? 'border-[#b10000] shake' : 'border-[#234120] dark:border-[#4a7c52]'} border-b-2 w-95/100`} />
                }

            </div>
            <div className='w-full flex-1 flex justify-center items-center'>
                <div className='relative w-8/10 h-7/10 border-2 border-[#234120] dark:border-[#505a6b] flex flex-col shadow-[2px_3px_0_0_#acdda8] dark:shadow-[2px_3px_0_0_#4a7c52]'>
                    <button onClick={handleCopy} className={`absolute top-1 left-[75%] md:left-[80%] w-fit h-fit flex justify-end p-1 items-center text-[#234120] dark:text-[#e0e8f0] cursor-pointer ${!challengeURL && 'text-gray-400 dark:text-gray-600'}`}>
                        {copied ? <FaClipboardCheck /> : <FaClipboard />}
                        <p>{copied ? 'Copied' : 'Copy'}</p>
                    </button>
                    <div className='w-full flex-1 flex justify-center items-center p-3 text-[#234120] dark:text-[#e0e8f0] text-xl'>
                        <p onClick={handleCopy} className={`w-full text-center text-balance line-clamp-2 ${challengeURL ? "cursor-pointer hover:underline" : "text-gray-400 dark:text-gray-600"}`}>{challengeURL ? challengeURL : 'Create challenge to get challenge link'}</p>
                    </div>
                </div>
            </div>
            <div className='h-15/100 w-full mt-auto'>
                <button onClick={handleCreateChallenge} disabled={!isTimed && isDisabled || loading || challengeId} className='w-full h-8/10 disabled:bg-[#566854] dark:disabled:bg-[#3a4a38] disabled:shadow-none bg-[#234120] dark:bg-[#4a7c52] text-[#acdda8] dark:text-white text-2xl shadow-[0_4px_0_0_#acdda8] dark:shadow-[0_4px_0_0_#000000] hover:shadow-[0_6px_0_0_#acdda8] dark:hover:shadow-[0_6px_0_0_#1a1f24] transition-shadow duration-100 active:shadow-[0_1px_0_0_#acdda8] dark:active:shadow-[0_1px_0_0_#000000] active:translate-y-1'>{loading ? 'Creating Challenge...' : 'Create Challenge'}</button>
            </div>
        </>
    )
}

const AcceptChallengeUI = ({ challengeData, handleCancel, handleAccept, word, handleWordleInput, isWrongWordle, isDisabled }) => {
    return (
        <div className='flex w-full h-full flex-col text-[#234120] dark:text-[#e0e8f0] mt-3 [text-shadow:1px_2px_0_#acdda8] dark:[text-shadow:1px_2px_0_#1a1f24]'>
            <div className='w-full h-15/100 flex justify-center gap-2 text-3xl'>
                <img src="/logo.png" className='h-6/10' />
                <h3>Wordle Challange</h3>
            </div>
            <div className='w-full flex flex-col gap-3 text-2xl items-center'>
                <p> {'Challenge By: '}
                    <span className='underline'>
                        {challengeData ? challengeData.player1Name : 'Player'}
                    </span>
                </p>
                <p> {'Challenge Type: '}
                    <span className='underline'>
                        {challengeData && challengeData.isTimed ? 'Timed Wordle' : 'Custom Wordle'}
                    </span>
                </p>
                {challengeData && challengeData.isTimed &&
                    <p> {'Challenge Duration: '}
                        <span className='underline'>
                            {challengeData && challengeData.isTimed ? challengeData.duration + 'sec' : '0sec'}
                        </span>
                    </p>
                }
            </div>
            {challengeData && !challengeData.isTimed &&
                <input type="text" value={word} onChange={(e) => handleWordleInput(e.target.value.toUpperCase())} id="wordleInput" placeholder='Enter a wordle for opponent...' className={`p-2 m-auto text-2xl text-[#234120] dark:text-[#e0e8f0] focus:outline-0 bg-[#acdda8] dark:bg-[#2a3942] ${isWrongWordle ? 'border-[#b10000] shake' : 'border-[#234120] dark:border-[#4a7c52]'} border-b-2 w-75/100`} />
            }
            <p className='my-auto px-3 text-2xl text-center text-balance text-[#3e613b] dark:text-[#7fb877]'>Do you want to play the wordle challenge?</p>
            <div className='w-full h-15/100 flex justify-around gap-2 mt-auto'>
                <button onClick={handleCancel} className='w-full h-8/10 bg-[#acdda8] dark:bg-[#4a7c52] text-[#234120] dark:text-[#e0e8f0] text-2xl shadow-[1px_2px_0_#234120] dark:shadow-[1px_2px_0_#000000]'>Cancel</button>
                <button disabled={isDisabled && challengeData && !challengeData.isTimed} onClick={handleAccept} className='w-full h-8/10 disabled:bg-[#566854] dark:disabled:bg-[#3a4a38] bg-[#234120] dark:bg-[#1a1f24] text-[#acdda8] dark:text-[#e0e8f0] text-2xl shadow-[1px_2px_0_#acdda8] dark:shadow-[1px_2px_0_#4a7c52]'>Accept</button>
            </div>
        </div>
    )
}

const WaitingUi = ({ startChallengeLoading, challengePlayersNo }) => {
    return (
        <div className='w-full h-full flex flex-col gap-5 justify-center items-center text-4xl text-[#234120] dark:text-[#e0e8f0] [text-shadow:1px_2px_0_#acdda8] dark:[text-shadow:1px_2px_0_#1a1f24]'>
            <h3 className='text-center text-balance'>Waiting for other players to join...</h3>
            <div className='relative h-2/10 flex justify-center items-center'>
                {challengePlayersNo || 1}/2
                <div className='absolute top-[50%] left-[50%] -translate-[50%] spin h-full aspect-square flex justify-center items-center'></div>
            </div>
            {startChallengeLoading && <p>Starting...</p>}
        </div>
    )
}
