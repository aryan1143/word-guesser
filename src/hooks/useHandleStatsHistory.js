import { useEffect, useState } from "react";
import { deleteField, doc, getDoc, getFirestore, increment, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDataLocal } from "../lib/localStorage";

function useHandleStatsHistory() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const today = new Date().toISOString().split("T")[0];

    const db = getFirestore();

    const userId = getDataLocal('userId');
    const getHistory = async () => {
        if (!userId) return null;

        setLoading(true);
        try {
            const ref = doc(db, "users", userId, "stats", "history");
            const snap = await getDoc(ref);

            if (snap.exists()) {
                const historyData = snap.data();
                setData(historyData);
                return historyData;
            } else {
                console.log("No history document found.");
                return null;
            }
        } catch (error) {
            console.error("Firestore Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const setHistory = async (statsData) => {
        if (!userId || !statsData) return;

        setLoading(true);
        try {
            const ref = doc(db, "users", userId, "stats", "history");

            await updateDoc(ref, {
                [today]: increment(statsData)
            });


            const snap = await getDoc(ref);

            if (snap.exists()) {
                const history = snap.data();
                setData(history);

                const keys = Object.keys(history).sort();

                if (keys.length >= 365) {
                    const oldest = keys[0];
                    await updateDoc(ref, { [oldest]: deleteField() });
                }
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, getHistory, setHistory };
}

export default useHandleStatsHistory;