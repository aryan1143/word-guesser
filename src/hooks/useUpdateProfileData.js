import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { setDataLocal } from "../lib/localStorage";
import { app } from "../lib/firebaseClient";
import useDialog from "./useDialog";
import LoginContext from "../context/LoginContext";

export default function useUpdateProfileData() {
    const db = getFirestore();
    const auth = getAuth(app);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const {alertBox} = useDialog();
    const { isLoggedIn } = useContext(LoginContext);

    async function updateProfile(key, value) {
        if (!isLoggedIn) {
            setLoading(false);
            return;
        }
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
            alertBox("Something went wrong.");
        } finally {
            setLoading(false)
        }
    }
    return {updateProfile, loading, isSuccess};
}