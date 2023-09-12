import React, { useState, useEffect } from 'react';
import supabase from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import Transfer from '../components/Transfer';
import TransferList from '../components/TransferList';

import { useTransfer } from '../context/TransferContex';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const {historial} = useTransfer();
  //console.log(historial);
  
  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate('/login');
    }
    

    
    // Obtiene el saldo de la billetera desde Supabase
    async function fetchBalance() {
      const { data, error } = await supabase
        .from('wallet')
        .select('balance')
        .single();

      if (error) {
        console.error('Error al obtener el saldo:', error);
        return;
      }

      setBalance(data.balance);
    }

    fetchBalance();
  }, [navigate]);

 
    const addFunds = async (amount) => {
      // Obtener el ID de la billetera que deseas actualizar (puedes cambiar esto según tu lógica)
      const walletId = 1; // Cambia esto para que coincida con la billetera que deseas actualizar
    
      // Actualizar el saldo de la billetera en Supabase utilizando una cláusula WHERE
      const { error } = await supabase
        .from('wallet')
        .update({ balance: balance + amount })
        .eq('id', walletId); // Establece la condición WHERE
    
      if (error) {
        console.error('Error al agregar fondos:', error.message);
      } else {
        setBalance(balance + amount);
      }
    };
    
  

  return (
    <div>
      <h1>Billetera</h1><button onClick={() => supabase.auth.signOut()}> LogOut </button>
      <p>Saldo: ${balance}</p>
      <button onClick={() => addFunds(10)}>Agregar $10</button>
      <Transfer/>
      <TransferList/>

    </div>
  );
};

export default Wallet;
