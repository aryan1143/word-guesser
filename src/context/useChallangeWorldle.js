import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import compareWord from "../components/utils/compareWord";
import { app } from "../lib/firebaseClient";
import { useState } from "react";
import { getDataLocal } from "../lib/localStorage";

export default function useChallangeWordle() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [challangeURL, setChallangeURL] = useState(null);
    const uid = getDataLocal('userId');

    async function createChallange(wordle = '', isTimed = false) {
        const baseURL = window.location.origin;
        const db = getFirestore(app);
        try {
            const challangeRef = await addDoc(collection(db, "challanges"), {
                createdAt: serverTimestamp(),
                createdBy: uid,
                players: [uid],
                isTimed,
                duration: 0,
                wordle,
                score: 0
            })
            const challangeId = challangeRef.id;
            const URL = `${baseURL}/challange/${challangeId}`;
            setChallangeURL(URL)
        } catch (e) {
            setError(e.code);
        } finally {
            setLoading(false);
        }

    }

    function acceptChallange(challangeId) {

    }

    function startChallange(challangeId) {
        
    }

    return {loading, error, challangeURL}
}
