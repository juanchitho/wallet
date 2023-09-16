import { useState } from "react";
import supabase from "../supabase/supabase";
import { useTransfer } from "../context/TransferContex";



// Función para obtener el userId a partir del correo electrónico
async function getUserIdByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('userId')
        .eq('email', email)
        .single();

        console.log("aca esta el userId",data);
  
      if (error) {
        throw error;
      }
  
      if (data) {
        return data.userId; // El destinatario existe, devuelve su userId
      } else {
        console.error('El destinatario con el correo electrónico no existe.');
        return null; // El destinatario no existe, devuelve null
      }
    } catch (error) {
      console.error('Error al obtener el userId por correo electrónico:', error);
      return null;
    }
  }



// Función para crear una transferencia(agrega una fila a la tabla de transfer)
function Transfer() {
  const {setHistorialDesactualizado} = useTransfer();
  const [monto, setMonto] = useState(0);
  const [email, setEmail] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obtener el userId del destinatario
      const destinatarioUserId = await getUserIdByEmail(email);
      const user = await supabase.auth.getUser();

      if (destinatarioUserId !== null) {
        // Crear el objeto de transferencia con senderUserId y receiverUserId
        const transferencia = {
          monto: monto,
          email: email,
          //userId: user.data.user.id, // Reemplaza con el ID del usuario que envía la transferencia
          receiverUserId: destinatarioUserId,
        };

        // Insertar la transferencia en la tabla de transferencias
        const result = await supabase.from('transfer').insert([transferencia]);
        console.log(result);
        if (result.error===null) {
          setHistorialDesactualizado(true);
        }
      } else {
        console.error('El destinatario no existe.');
      }
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