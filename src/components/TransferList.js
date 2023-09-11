import { useEffect } from "react";
import { useTransfer } from "../context/TransferContex";


function TransferList() {
        const {historial, getHistorial} = useTransfer([]);

        useEffect(() => {
            getHistorial();
        }, [])
        
    return (
        <div>historial</div>
    )
}

export default TransferList;