import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react'
import { app } from '../lib/firebaseClient';
import { getAuth } from 'firebase/auth';
import Context from './Context';

const AchivementContext = createContext();

const AchivementContextProvider = ({ children }) => {
    const db = getFirestore();
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [unlockedPfps, setUnlockedPfps] = useState([]);

    const {showToastMessege} = useContext(Context);

    async function unlockPfp(pfpId) {
        if (!pfpId) {
            return;
        }
        setLoading(true);
        const userId = auth.currentUser.uid;
        const userRef = doc(db, "users", userId);
        try {
            await updateDoc(userRef, {
                [`unlockedPfps.${pfpId}`]: true
            });
    
            showToastMessege(`Unlocked: ${pfpId}`);
        } catch (error) {
            showToastMessege('Error while unlocking PFP!');
        } finally {
            setLoading(false);
        }
    }

    const updateAchivementStats = () => {

    }

    const getUnlockedAchivements = () => {

    }


    return (
        <AchivementContext.Provider value={{
            loading, updateAchivementStats, getUnlockedAchivements, unlockPfp, unlockedPfps
        }}>
            {children}
        </AchivementContext.Provider>
    )
}

export default AchivementContextProvider

export function useAchivements() {
    return useContext(AchivementContext);
}