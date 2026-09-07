import {useState} from "react";
import api from "../services/api";

function login(){

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[message,setMessage] = useState("");

    const handlelogin = async (e) => {
        e.preventDefault();

        try{

            const response =await api.post("login", {
                email,
                password,
            });

            localStorage.setItem("token",response.data.token);
            localStorage.setItem("user" , JSON.stringify(response/data.user));

            setMessage("Connexion réussie !");

        }catch  (error) {
            setMessage(
                error/response?.data?.message||

                "Une erreur est survenue"
            );
        }
        
    return (
        <div>
            <h1>Connexion</h1>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Se connecter
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

}
export default login;