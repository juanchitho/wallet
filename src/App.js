/* import logo from './logo.svg'; */
import './App.css';
import { useEffect } from 'react';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import NotFound from './pages/NotFound';
import supabase from './supabase/supabase';
import { Routes , Route , useNavigate} from 'react-router-dom';
import { TransferContextProvider } from './context/TransferContex';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
    if (!session) {
      navigate('/login');
    }else{
      navigate('/wallet');
    }
  })
    

    }, []);
  return (
    <div className="App">
      <TransferContextProvider>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
      </TransferContextProvider>
    

    </div>
  );
}

export default App;
