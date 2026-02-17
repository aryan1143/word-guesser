import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useGeneratePeriod from "./useGeneratePeriod"

function useHandleStatsHistory() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const period = useGeneratePeriod();
    console.log(period)

    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userHistoryRef = doc(db, "users", user.uid, "stats", "history");
                try {
                    const userHistorySnap = await getDoc(userHistoryRef);
                    if (userHistorySnap.exists()) {
                        const historyData = userHistorySnap.data();
                        console.log("Retrieved User History:", historyData);
                        setData(historyData);
                    } else {
                        console.log("No history document found.");
                    }
                } catch (error) {
                    console.error("Firestore Error:", error);
                    setLoading(false);
                }
            } else {
                console.log("User is not logged in");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (!loading && data) {
        
    }
    return { data, loading };
}

export default useHandleStatsHistory;