import FallbackVideo from '/fallbackloading.webm'

const Fallback = () => {
    return (
        <div className='absolute z-50 w-screen h-dvh bg-[#ffffff20] dark:bg-[#00000040] backdrop-blur-sm'>
            <div className='absolute top-[50%] left-[50%] -translate-[50%]'>
                <video autoPlay loop muted playsInline width="100%">
                    <source src={FallbackVideo} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}

export default Fallback