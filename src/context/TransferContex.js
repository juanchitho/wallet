import { createContext , useContext , useState } from "react";
import supabase from "../supabase/supabase";

export const TransferContext = createContext();

export const useTransfer = () => {
    const context = useContext(TransferContext);
    if (!context) throw new Error("useTransfer debe estar dentro del proveedor TransferContext");
    return context;
};


export const TransferContextProvider = ({children}) => {
    const [historial, setName] = useState();

    const getHistorial = async () => {
        const result = await supabase.from('transfer').select()
        console.log(result);

    }    

    return (
        <TransferContext.Provider value={{ historial , getHistorial }} >
            {children}
        </TransferContext.Provider>
    )
}
