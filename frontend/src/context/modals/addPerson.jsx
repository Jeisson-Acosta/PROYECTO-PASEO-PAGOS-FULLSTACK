import { createContext, useState } from "react"

export const AddPersonContext = createContext()

export function AddPersonProvider({children}) {
    const [open, setOpen] = useState(false)
    const [dataToEdit, setDataToEdit] = useState(null)

    const openModal = () => setOpen(true)
    const closeModal = () => setOpen(false)

    return (
        <AddPersonContext.Provider value={{
            open,
            openModal,
            closeModal,
            dataToEdit,
            setDataToEdit
        }}>
            {children}
        </AddPersonContext.Provider>
    )
}