import { useEffect } from "react";
import { useTransfer } from "../context/TransferContex";


function TransferList() {
        const {historial, getHistorial,historialDesactualizado, setHistorialDesactualizado, setName} = useTransfer();
        

        useEffect(() => {
            if (historialDesactualizado) {
              async function traerHistorial() {
                const result = await getHistorial();
                console.log(result);
                setName(result);
                setHistorialDesactualizado(false);
              }
              traerHistorial();
            }
          }, [setName, historialDesactualizado, setHistorialDesactualizado]);
        
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