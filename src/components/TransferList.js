import { useEffect } from "react";
import { useTransfer } from "../context/TransferContex";


function TransferList() {
        const {historial, getHistorial} = useTransfer();
        


        useEffect(() => {
            getHistorial();
        }, [])
        
    return (
        <div>historial de movimientos

            {historial.map((transfer) => ( 
                <div key={transfer.id}>
                    <p>{transfer.email}</p>
                    <p> {transfer.monto} </p>
                </div>
            ))}               
        </div>

            

    )
}

export default TransferList;