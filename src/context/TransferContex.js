import { createContext , useContext , useState } from "react";
import supabase from "../supabase/supabase";


export const TransferContext = createContext();

export const useTransfer = () => {
    const context = useContext(TransferContext);
    if (!context) throw new Error("useTransfer debe estar dentro del proveedor TransferContext");
    return context;
};


export const TransferContextProvider = ({children}) => {
    const [historial, setName] = useState([]);
    const [historialDesactualizado, setHistorialDesactualizado] = useState(true);//para que se actualice el historial
    //supabase.auth.onAuthStateChange(); ver!
    const getHistorial = async () => {

        const user = await supabase.auth.getUser();
        console.log("asi viene el objeto",user.data.user);//va acceder a la data del usuario y de ahi al id

        const {data , error} = await supabase
        .from('transfer')//de la tabla transfer
        .select()//selecciona todo
        .eq('userId', user.data.user.id)//donde el userId sea igual al id del usuario
        .order('id', { ascending: false });//ordena por id de forma ascendente
        
        
       /*  console.log(data);
        console.log(error);
        console.log(historial); */
        //if (error) throw error;
       return data;

    }    

    return (
        <TransferContext.Provider value={{ historial , getHistorial ,historialDesactualizado , setHistorialDesactualizado, setName}} >
            {children}
        </TransferContext.Provider>
    )
}
