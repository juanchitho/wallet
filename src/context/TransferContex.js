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

    const getHistorial = async () => {

        const user = await supabase.auth.getUser();
        //console.log("asi viene el objeto",user.data.user);//va acceder a la data del usuario y de ahi al id

        const {error,data} = await supabase
        .from('transfer')//de la tabla transfer
        .select()//selecciona todo
        .eq('userId', user.data.user.id)//donde el userId sea igual al id del usuario
        .order('id', { ascending: true });//ordena por id de forma ascendente
        

        if (error) throw error;
        
        setName(data);
    }
   /*  const createTransfer = async (monto,email) => {
        try{
            const user = await supabase.auth.getUser();
            
            const {error,data} = await supabase.from('transfer').insert(
            {   monto: monto, 
                email: email,
                
            }
        );
        if (error) throw error;
        console.log(user.data)
        console.log(data);
        
        } catch (error) {
            console.error(error);
        }    

    } */
    return (
        <TransferContext.Provider value={{ historial , getHistorial }} >
            {children}
        </TransferContext.Provider>
    )
}
