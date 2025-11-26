import { useContext } from "react"
import { AddPersonContext } from "../../context/modals/addPerson"

export const useAddPerson = () => {
    const context = useContext(AddPersonContext)
    if (!context) {
        throw new Error('useAddPerson must be used within a AddPersonProvider')
    }
    return context
}