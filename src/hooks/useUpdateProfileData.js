import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { setDataLocal } from "../lib/localStorage";
import { app } from "../lib/firebaseClient";

export default function useUpdateProfileData() {
    const db = getFirestore();
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);

    async function updateProfile(key, value) {
        setLoading(true);
        const userId = auth.currentUser.uid
        const userRef = doc(db, "users", userId);
        try {
            await updateDoc(userRef, {
                [key]: value
            });
            const userDocSnap = await getDoc(userRef);
            const userData = userDocSnap.data();
            setDataLocal("userData", userData);
            setisSuccess(true);
        } catch (error) {
            setisSuccess(false);
            console.log(error)
            alert("Something went wrong.");
        } finally {
            setLoading(false)
        }
    }
    return {updateProfile, loading, isSuccess};
}