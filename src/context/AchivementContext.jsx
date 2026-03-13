import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { app } from '../lib/firebaseClient';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Context from './Context';
import WordsContext from './WordsContext';
import { getDataLocal, setDataLocal } from '../lib/localStorage';

const AchivementContext = createContext();

const defaultPfps = {
    "ach_warrior": false, "ach_oracle": false, "ach_sniper": false,
    "ach_streaker": false, "ach_immortal": false, "ach_lexicon": false,
    "ach_architect": false, "ach_night_owl": false, "ach_palindrome": false,
    "ach_clutch_king": false, "ach_speedster": false, "ach_veteran": false,
    "ach_early_bird": false, "ach_risk_taker": false, "ach_glitch": false,
};

const AchivementContextProvider = ({ children }) => {
    const db = getFirestore();
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [unlockedPfps, setUnlockedPfps] = useState(getDataLocal('unlockedPfps') || defaultPfps);

    const { showToastMessege } = useContext(Context);
    const { submitedRowNo, currentWord, isHardMode, gameTime } = useContext(WordsContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setPfpDataToApp(user.uid);
        });
        return () => unsubscribe();
    }, []);

    async function setPfpDataToApp(userId) {
        if (!userId) return;
        setLoading(true);
        const userRef = doc(db, "users", userId);
        try {
            const snap = await getDoc(userRef);
            if (snap.exists()) {
                const data = snap.data();
                const cloudPfps = data?.unlockedPfps || defaultPfps;
                setUnlockedPfps(cloudPfps);
                setDataLocal('unlockedPfps', cloudPfps);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    }

    async function unlockPfp(pfpId) {
        if (!pfpId || unlockedPfps[pfpId]) return;

        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const userRef = doc(db, "users", userId);
        const updatedSet = { ...unlockedPfps, [pfpId]: true };

        try {
            setUnlockedPfps(updatedSet);
            setDataLocal('unlockedPfps', updatedSet);

            await updateDoc(userRef, {
                [`unlockedPfps.${pfpId}`]: true
            });

            showToastMessege(`Achievement Unlocked: ${pfpId.replace('ach_', '').replace('_', ' ')}!`);
        } catch (error) {
            console.error("Unlock error:", error);
        }
    }

    const checkAchievements = (stats) => {
        const hour = new Date().getHours();

        //guesses taken based
        if (submitedRowNo === 1) unlockPfp("ach_sniper");
        if (submitedRowNo === 2) unlockPfp("ach_oracle");
        if (submitedRowNo === 6) unlockPfp("ach_clutch_king");

        //word based (Palindrome)
        const rev = currentWord.split('').reverse().join('');
        if (currentWord.toLowerCase() === rev.toLowerCase()) unlockPfp("ach_palindrome");

        //the glitch (Rare letters)
        if (/[xzqj]/i.test(currentWord)) unlockPfp("ach_glitch");

        //time based
        if (hour >= 0 && hour < 4) unlockPfp("ach_night_owl");
        if (hour >= 5 && hour < 8) unlockPfp("ach_early_bird");

        //mode based
        if (isHardMode) unlockPfp("ach_risk_taker");
        if (gameTime < 30) unlockPfp("ach_speedster");

        //stats based
        if (stats?.totalWins >= 50) unlockPfp("ach_warrior");
        if (stats?.streak >= 7) unlockPfp("ach_streaker");
        if (stats?.streak >= 30) unlockPfp("ach_immortal");
        if (stats?.totalGames >= 100) unlockPfp("ach_veteran");
    };

    return (
        <AchivementContext.Provider value={{
            loading, unlockPfp, unlockedPfps, checkAchievements
        }}>
            {children}
        </AchivementContext.Provider>
    );
};

export default AchivementContextProvider;
export function useAchivements() { return useContext(AchivementContext); }