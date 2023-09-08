import { createContext } from "react";

export const TransferContext = createContext();

export const TransferContextProvider = ({children}) => {
    return (
        <TransferContext.Provider value={{}} >
            {children}
        </TransferContext.Provider>
    )
}
