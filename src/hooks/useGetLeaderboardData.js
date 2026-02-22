import { collection, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import useDialog from "./useDialog";

export default function useGetLeaderboardData(period) {
    const db = getFirestore();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const { alertBox } = useDialog();
    const q = query(
        collection(db, "users"),
        orderBy(period, "desc"),
        limit(10)
    );

    async function getLeaderboardData() {
        setLoading(true);
        try {
            const userDocSnap = await getDocs(q);
            const leaderboardData = userDocSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(leaderboardData);
        } catch (error) {
            console.log(error)
            alertBox("Something went wrong.");
        } finally {
            setLoading(false)
        }
    }
    return { getLeaderboardData, loading, data };
}