import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { setDataLocal } from "../lib/localStorage";
import { app } from "../lib/firebaseClient";
import useDialog from "./useDialog";
import {isToday, isYesterday } from 'date-fns';

export default function useHandleStreak() {
    const db = getFirestore();
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const { alertBox } = useDialog();

    async function handleStreak() {
        setLoading(true);
        const user = auth.currentUser;
        if (!user) return;
        const userId = user.uid;
        const userRef = doc(db, "users", userId);

        try {
            const snap = await getDoc(userRef);
            if (snap.exists()) {
                const data = snap.data();
                const streakData = data?.streakData;
                const today = new Date();
                if (!streakData) {
                    await setDoc(userRef, {
                        streakData: {
                            currentStreak: 1,
                            lastActivityDate: today
                        }
                    }, { merge: true });
                }
                else {
                    const lastActivityDate = new Date(streakData.lastActivityDate);
                    if (isToday(lastActivityDate)) {
                        console.log("Already active today");
                    }
                    else if (isYesterday(lastActivityDate)) {
                        await updateDoc(userRef, {
                            "streakData.currentStreak": streakData.currentStreak + 1,
                            "streakData.lastActivityDate": today
                        });
                    }
                    else {
                        await updateDoc(userRef, {
                            "streakData.currentStreak": 1,
                            "streakData.lastActivityDate": today
                        });
                    }
                }

                const userDocSnap = await getDoc(userRef);
                const userData = userDocSnap.data();
                setDataLocal("userData", userData);
                setisSuccess(true);
            }
        } catch (error) {
            setisSuccess(false);
            console.log(error)
            alertBox("Something went wrong.");
        } finally {
            setLoading(false)
        }
    }
    return { handleStreak, loading, isSuccess };
}