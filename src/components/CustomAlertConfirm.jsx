const CustomAlertConfirm = ({ dialogType, messege, handleOnConfirm, handleOnCancel }) => {

    return (
        <div className={`text-[#234120] fixed top-0 left-0 z-30 h-screen w-screen bg-[#62626225] backdrop-blur-xs`}>
            <div className={`flex flex-col items-center pop-up w-8/10 h-2/10 -translate-y-10 md:translate-y-0 md:h-3/10 md:w-23/100`}>
                <div className='overflow-hidden p-3 shadow-[0_4px_0_0_#234120] flex flex-col h-full w-full items-center border border-[#0000004d] bg-[#d7ead5] rounded-xl bg-[linear-gradient(rgba(35,65,32,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(35,65,32,0.05)_1px,transparent_1px)] bg-size-[30px_30px]'>
                    <div className='flex flex-row gap-2 h-fit w-full justify-start items-center'>
                        <img src="/logo.svg" className='size-[calc(1.3rem+0.2vw)]' />
                        <div className='h-fit'>
                            <p className='text-3xl md:text-4xl'>W-GUESSER</p>
                        </div>
                    </div>
                    <div className='flex-1 flex items-center justify-center'>
                        <p className='text-xl md:text-2xl'>{messege}</p>
                    </div>
                    <div className='h-fit w-full flex justify-end gap-2'>
                        {dialogType === 'confirm' && <button onClick={handleOnCancel} className='flex-1 w-45/100 h-[calc(1rem+2.5vh)] text-[#234120] bg-[#acdda8] cursor-pointer shadow-[0_2px_0_0_#234120]'>Cancel</button>}
                        <button onClick={handleOnConfirm} className='flex-1 h-[calc(1rem+2.5vh)] bg-[#234120] text-[#acdda8] cursor-pointer shadow-[0_3px_0_0_#acdda8]'>{dialogType === 'confirm' ? 'Confirm' : 'Ok'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomAlertConfirm