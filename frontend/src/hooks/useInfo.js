import { useContext } from "react"
import { InfoContext } from "../context/info.jsx"

export const useInfo = () => {
    const context = useContext(InfoContext)

    if (context === undefined) {
        throw new Error('Can´t use an context whitout an Provider')
    }

    return context
}