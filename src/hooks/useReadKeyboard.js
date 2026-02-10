import { useEffect, useState } from "react";

function useReadKeyboard(setKeyPressed) {
    function handleKeyPress(e){
        const isValidKey = /^[a-zA-Z]$|^Enter$|^Backspace$/.test(e.key);

        if (isValidKey) {
            console.log(e.key.toUpperCase());
            setKeyPressed(e.key.toUpperCase());
        }
    }


    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      }
    }, [])
}

export default useReadKeyboard