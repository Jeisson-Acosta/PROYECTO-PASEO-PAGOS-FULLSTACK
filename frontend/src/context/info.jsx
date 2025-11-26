import { createContext, useState } from "react";

export const InfoContext = createContext()

export function InfoContextProvider({ children }) {
    const [allInfo, setAllInfo] = useState(null)

    return (
        <InfoContext.Provider value={{
            allInfo,
            setAllInfo
        }}>
            {children}
        </InfoContext.Provider>
    )
}