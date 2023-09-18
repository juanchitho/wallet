//import { createContext , useContext , useState } from "react";
import supabase from "../supabase/supabase";


// Función para obtener todas las transferencias recibidas por un usuario
async function getReceivedTransfers(userId) {
    try {
        const { data, error } = await supabase
        .from('transfer')
        .select('*')
        .eq('receiverUserId', userId);
        console.log("userId del transferservice",userId);
        
    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error al obtener las transferencias recibidas:', error);
    return [];
  }
}

// Función para obtener todas las transferencias enviadas por un usuario
async function getSentTransfers(userId) {
  try {
    const { data, error } = await supabase
      .from('transfer')
      .select('*')
      .eq('userId', userId);

      console.log("mira esto  esta el userId",data);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error al obtener las transferencias enviadas:', error);
    return [];
  }
}

export { getReceivedTransfers, getSentTransfers };
