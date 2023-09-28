import React, { useState, useEffect } from "react";//useState es un estado, en js es una variable
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import Transfer from "../components/Transfer";
import TransferList from "../components/TransferList";
import { getReceivedTransfers, getSentTransfers } from "../components/TransferService";

import { useTransfer } from "../context/TransferContex";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const { historial, setName } = useTransfer();
  
  const [receivedTransfers, setReceivedTransfers] = useState([]);
  const [sentTransfers, setSentTransfers] = useState([]);

  console.log("este es el historial", historial); //me puede ser util para traerme el monto

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate("/login");
    }
  }, [navigate]);

    // Obtener las transferencias recibidas y enviadas del usuario actual
    useEffect(() => {
      const fetchTransfers = async () => {
        const user = await supabase.auth.getUser();
        if (user) {
          const userId = user.data.user.id;
          const received = await getReceivedTransfers(userId);
          const sent = await getSentTransfers(userId);
          setReceivedTransfers(received);
          setSentTransfers(sent);
        }
      };
  
      fetchTransfers();
    }, []);

    // Calcular el saldo en respuesta a cambios en las transferencias recibidas y enviadas
    useEffect(() => {
      const receivedTotal = receivedTransfers.reduce((total, transfer) => total + transfer.monto, 0);
      const sentTotal = sentTransfers.reduce((total, transfer) => total + transfer.monto, 0);
      const calculatedBalance = receivedTotal - sentTotal;
      setBalance(calculatedBalance);
    }, [receivedTransfers, sentTransfers]);
    
    
    

  const addFunds = async (amount) => {
    // Obtener el ID de la billetera que deseas actualizar (puedes cambiar esto según tu lógica)
    const walletId = 1; // Cambia esto para que coincida con la billetera que deseas actualizar

    // Actualizar el saldo de la billetera en Supabase utilizando una cláusula WHERE
    const { error } = await supabase
      .from("wallet")
      .update({ balance: balance + amount })
      .eq("id", walletId); // Establece la condición WHERE

    if (error) {
      console.error("Error al agregar fondos:", error.message);
    } else {
      setBalance(balance + amount);
    }
  };

  return (
    <div>
      <h1>Billetera</h1>
      <button
        onClick={() => {
          supabase.auth.signOut();
          setName([]);
        }}
      >
        {" "}
        LogOut{" "}
      </button>
      <p>Saldo: ${balance}</p>
      <button onClick={() => addFunds(10)}>Agregar $10</button>
      <Transfer />
      <TransferList />
    </div>
  );
};

export default Wallet;
