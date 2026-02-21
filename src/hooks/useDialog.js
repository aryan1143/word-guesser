import { useContext } from "react"
import ConfirmContext from "../context/ConfirmContext"

export default function useDialog() {
    const dialogs = useContext(ConfirmContext);

    return dialogs;
}