import { useEffect, useState } from "react";
import { deleteField, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function useHandleStatsHistory(action = 'get', statsData = null) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!action) {
                setLoading(false);
                return;
            }
            if (user && action === 'get') {
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
                } finally {
                    setLoading(false);
                }

            } else if (user && action === 'set' && statsData) {
                try {
                    const ref = doc(db, "users", user.uid, "stats", "history");
                    await updateDoc(ref, {
                        [today]: statsData
                    });
                    const snap = await getDoc(ref);
                    if (snap.exists()) {
                        const data = snap.data();
                        const keys = Object.keys(data).sort();
                        if (keys.length >= 365) {
                            const oldest = keys[0];
                            await updateDoc(ref, { [oldest]: deleteField() });
                        }
                    }

                } catch (e) {
                    console.log(e);
                }
            } else if (!user) {
                console.log("User is not logged in");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [action, statsData]);
    return { data, loading };
}

export default useHandleStatsHistory;