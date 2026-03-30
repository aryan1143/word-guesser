import { collection, doc, getDocs, getFirestore, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import useDialog from "./useDialog";
import useHandleStatsHistory from "./useHandleStatsHistory";
import useGeneratePeriodLabel from "./useGeneratePeriod";
import { getDataLocal } from "../lib/localStorage";
import LoginContext from "../context/LoginContext";

export default function useGetLeaderboardData(period = 'dailyScore') {
    const db = getFirestore();
    const [data, setData] = useState(null);
    const { isLoggedIn } = useContext(LoginContext);

    const [loadingCount, setLoadingCount] = useState(0);

    const startLoading = () => setLoadingCount(prev => prev + 1);
    const stopLoading = () => {
        setLoadingCount(prev => Math.max(0, prev - 1));
    };

    const timeOutRef = useRef(null);
    const lastSentRef = useRef(null);

    const { alertBox } = useDialog();
    const userId = getDataLocal('userId');

    const { data: statsData, loading: statsLoading, getHistory } = useHandleStatsHistory();

    const { period: periodData } = useGeneratePeriodLabel(
        period === 'monthlyScore' ? 'month' : period === 'weeklyScore' ? 'week' : null
    );

    useEffect(() => {
        if (!isLoggedIn) return;
        getHistory();
    }, []);

    const today = new Date().toISOString().split('T')[0];

    const periodScore = useMemo(() => {
        if (statsLoading || !statsData) return 0;

        if (period === 'dailyScore') {
            return statsData[today] || 0;
        };

        if (!Array.isArray(periodData) || !periodData.length) return 0;

        if (period === 'monthlyScore') {
            return periodData.reduce((total, group) => {
                if (!Array.isArray(group)) return total;

                return total + group.reduce((sum, key) => sum + (statsData[key] || 0), 0);
            }, 0);
        }

        return periodData.reduce((total, key) => total + (statsData[key] || 0), 0);
    }, [statsData, statsLoading, periodData]);


    useEffect(() => {
        if (!isLoggedIn || !userId || statsLoading || !statsData) return;
        if (lastSentRef.current === periodScore) return;

        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }

        timeOutRef.current = setTimeout(async () => {
            try {
                startLoading();
                lastSentRef.current = periodScore;

                await updateDoc(doc(db, "users", userId), {
                    [period]: periodScore
                });
            } catch (error) {
                console.log(error);
            } finally {
                stopLoading();
            }
        }, 1000);

        return () => clearTimeout(timeOutRef.current);

    }, [periodScore, userId, period, db, statsData, statsLoading, userId]);

    const q = useMemo(() => {
        return query(
            collection(db, "users"),
            orderBy(period, "desc"),
            limit(10)
        );
    }, [db, period]);

    const getLeaderboardData = useCallback(async () => {
        if (!isLoggedIn) return;
        try {
            startLoading();
            const snap = await getDocs(q);

            const leaderboardData = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setData(leaderboardData);
        } catch (error) {
            console.log(error);
            alertBox("Something went wrong.");
        } finally {
            stopLoading();
        }
    }, [q, alertBox]);

    useEffect(() => {
        if (!userId || statsLoading || !statsData) return;
        getLeaderboardData();
    }, [q, userId, statsLoading, statsData, getLeaderboardData]);

        const loading = loadingCount > 0 || statsLoading;

    return { loading, data };
}