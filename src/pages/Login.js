import { useState ,useEffect} from "react";
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!supabase.auth.getUser()) {
          navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        

        
        try{
            
            await supabase.auth.signInWithPassword({
                email,
                password,
            })
            console.log("pasoo el login");
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="youremail@site.com" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button> Send </button>
            </form>

        </div>
    );
}

export default Login;