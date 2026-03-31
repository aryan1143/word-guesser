import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { app } from '../lib/firebaseClient';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Context from './Context';
import WordsContext from './WordsContext';
import LoginContext from './LoginContext';
import { getDataLocal, setDataLocal } from '../lib/localStorage';
import usePlaySound from '../components/utils/usePlaySound';

const AchivementContext = createContext();

const defaultPfps = {
    "ach_warrior": true, "ach_oracle": false, "ach_sniper": false,
    "ach_streaker": false, "ach_immortal": false, "ach_night_owl": false,
    "ach_palindrome": false, "ach_clutch_king": false, "ach_speedster": false,
    "ach_veteran": false, "ach_early_bird": false, "ach_risk_taker": false,
    "ach_glitch": false,
};

const defaultGameStats = {
    totalWins: 0, totalGamesPlayed: 0, totalWinsInRow: 0
};

const AchivementContextProvider = ({ children }) => {
    const db = getFirestore();
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [unlockedPfps, setUnlockedPfps] = useState(getDataLocal('unlockedPfps') || defaultPfps);
    const [gameStats, setGameStats] = useState(getDataLocal('gameStats') || defaultGameStats);

    const { showToastMessege } = useContext(Context);
    const { submitedRowNo, targetWord } = useContext(WordsContext);
    const { gameTime, isHardMode } = useContext(Context);
    const { isLoggedIn } = useContext(LoginContext);

    const userData = getDataLocal('userData');

    const playSound = usePlaySound();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) return;

            const snap = await getDoc(doc(db, "users", user.uid));
            const data = snap.data();

            const pfps = data?.unlockedPfps ?? defaultPfps;
            const stats = data?.gameStats ?? defaultGameStats;

            setUnlockedPfps(pfps);
            setGameStats(stats);

            setDataLocal("unlockedPfps", pfps);
            setDataLocal("gameStats", stats);
        });

        return unsubscribe;
    }, [auth, db]);

    async function unlockPfp(pfpId) {
        if (!isLoggedIn || !pfpId || unlockedPfps[pfpId]) return;

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
            
            playSound('achievement');
            showToastMessege(`Achievement Unlocked: ${pfpId
                .replace('ach_', '')
                .replaceAll('_', ' ')
                .replace(/\b\w/g, l => l.toUpperCase())
                }🏆`);
        } catch (error) {
            console.error("Unlock error:", error);
        }
    }

    const checkAchievements = () => {
        const hour = new Date().getHours();

        //guesses taken based
        if (submitedRowNo === 1) unlockPfp("ach_sniper");
        if (submitedRowNo === 2) unlockPfp("ach_oracle");
        if (submitedRowNo === 6) unlockPfp("ach_clutch_king");

        //word based (Palindrome)
        const rev = targetWord.split('').reverse().join('');
        if (targetWord.toLowerCase() === rev.toLowerCase()) unlockPfp("ach_palindrome");

        //the glitch (Rare letters)
        if (/[xzqj]/i.test(targetWord)) unlockPfp("ach_glitch");

        //time based
        if (hour >= 0 && hour < 4) unlockPfp("ach_night_owl");
        if (hour >= 5 && hour < 8) unlockPfp("ach_early_bird");

        //mode based
        if (isHardMode) unlockPfp("ach_risk_taker");
        if (gameTime < 30) unlockPfp("ach_speedster");

        //stats based
        if (userData?.streakData?.currentStreak?.streak >= 7) unlockPfp("ach_streaker");
        if (gameStats?.totalWinsInRow >= 30) unlockPfp("ach_immortal");
        if (gameStats?.totalGamesPlayed >= 100) unlockPfp("ach_veteran");
    };

    async function updateGameStats(isWin) {
        if (!isLoggedIn || !gameStats) return;
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        setLoading(true);
        const userRef = doc(db, "users", userId);

        const updatedStats = {
            ...gameStats,
            totalGamesPlayed: gameStats.totalGamesPlayed + 1,
            ...(isWin ? {
                totalWins: gameStats.totalWins + 1,
                totalWinsInRow: gameStats.totalWinsInRow + 1
            }
                : { totalWinsInRow: 0 })
        };

        try {
            await updateDoc(userRef, {
                "gameStats.totalGamesPlayed": updatedStats.totalGamesPlayed,
                "gameStats.totalWins": updatedStats.totalWins,
                "gameStats.totalWinsInRow": updatedStats.totalWinsInRow
            });

            setDataLocal('gameStats', updatedStats);
            setGameStats(updatedStats);
        } catch (error) {
            console.error("GameStats Update Error: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AchivementContext.Provider value={{
            loading, unlockPfp, unlockedPfps, checkAchievements, updateGameStats
        }}>
            {children}
        </AchivementContext.Provider>
    );
};

export default AchivementContextProvider;
export function useAchivements() { return useContext(AchivementContext); }