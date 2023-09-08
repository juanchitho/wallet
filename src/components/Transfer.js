import { useState } from "react";
import supabase from "../supabase/supabase";

function Transfer() {
    const [monto,setMonto] = useState(0);
    const [email,setEmail] = useState("");

    const handleSubmit = async (e) =>  {
        e.preventDefault();
        
        try{
            const user = supabase.auth.getUser();
            
            const result = await supabase.from('transfer').insert(
            {   monto: monto, 
                email: email,
                userId: user.id
            }
        )
        console.log(result);
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div> 
            <form onSubmit={handleSubmit}>
                <input type="number" name="monto" placeholder="ingrese el monto de su tranferencia" onChange={ (e) => setMonto(e.target.value)}/> 
                <input type="text" name="email" placeholder="ingrese el email del destinatario" onChange={ (e) => setEmail(e.target.value)}/>
                <button> Send </button>
            </form>   
        </div>

    )
}

export default Transfer;