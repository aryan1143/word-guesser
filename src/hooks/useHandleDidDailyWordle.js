import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { getDataLocal, setDataLocal } from "../lib/localStorage";
import { app } from "../lib/firebaseClient";
import useDialog from "./useDialog";
import { isToday } from 'date-fns';
import LoginContext from "../context/LoginContext";

export default function useHandleDidDailyWordle() {
    const db = getFirestore();
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [didDailyWordle, setDidDailyWordle] = useState(false);
    const { alertBox } = useDialog();
    const { isLoggedIn } = useContext(LoginContext);

    async function getDidDailyWordle() {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }
        const today = new Date();
        setLoading(true);
        const dailyWordleDate = new Date(getDataLocal('dailyWordleDate'))
        if (dailyWordleDate && isToday(dailyWordleDate)) {
            setDidDailyWordle(true);
            setLoading(false);
            return;
        }
        const user = auth.currentUser;
        if (!user) {
            setLoading(false);
            return;
        };
        const userId = user.uid;
        const userRef = doc(db, "users", userId);

        try {
            const snap = await getDoc(userRef);
            if (snap.exists()) {
                const data = snap.data();
                const dailyWordleDate = new Date(data?.dailyWordleDate);
                if (data?.dailyWordleDate && isToday(dailyWordleDate)) {
                    setDidDailyWordle(true);
                    setDataLocal('dailyWordleDate', today);
                }
            }
        } catch (error) {
            alertBox('Something went wrong!')
        } finally {
            setLoading(false);
        }
    }

    async function doDailyWordle() {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const today = new Date();
        const user = auth.currentUser;
        if (!user) {
            setLoading(false);
            return;
        };
        const userId = user.uid;
        const userRef = doc(db, "users", userId);

        try {
            const snap = await getDoc(userRef);
            if (snap.exists()) {
                const data = snap.data();
                const dailyWordleDate = new Date(data?.dailyWordleDate);
                if (!dailyWordleDate) {
                    await setDoc(userRef, {
                        dailyWordleDate: today
                    }, { merge: true });
                } else {
                    if (data?.dailyWordleDate && isToday(dailyWordleDate)) {
                        setDidDailyWordle(true);
                        setDataLocal('dailyWordleDate', today);
                    } else {
                        await updateDoc(userRef, {
                            dailyWordleDate: today
                        });
                        setDidDailyWordle(true);
                        setDataLocal('dailyWordleDate', today);
                    }
                }
                const userDocSnap = await getDoc(userRef);
                const userData = userDocSnap.data();
                setDataLocal("userData", userData);
            }
        } catch (error) {
            console.log(error)
            alertBox("Something went wrong.");
        } finally {
            setLoading(false)
        }
    }
    return { doDailyWordle, getDidDailyWordle, loading, didDailyWordle };
}