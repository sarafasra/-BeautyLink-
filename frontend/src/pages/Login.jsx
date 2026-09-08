import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
     const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setMessage("Connexion réussie !");

            navigate("/dashboard");
        } catch (error) {
            console.log(error);

            setMessage(
                error.response?.data?.message ||
                "Erreur de connexion avec le serveur"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row min-h-[580px]">
                
                <div 
                    className="relative md:w-1/2 bg-cover bg-center min-h-[250px] md:min-h-full flex flex-col justify-end p-8 text-white"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="relative z-10 space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                            Révélez votre<br />beauté idéale
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-200 font-light max-w-sm">
                            Rejoignez la communauté de professionnels et passionnés de la beauté.
                        </p>
                    </div>
                </div>

                <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-[#faf9f9]">
                    
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-2xl font-bold text-[#8E3A62] tracking-tight">BeautyLink</span>
                    </div>

                    <div className="bg-gray-200/70 p-1 rounded-full flex mb-6">
                        <button type="button" className="w-1/2 py-2 text-xs sm:text-sm font-medium text-[#8E3A62] bg-white rounded-full shadow-sm transition">
                            Se connecter
                        </button>
                        <Link to="/register" className="w-1/2 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition text-center">
                            S'inscrire
                        </Link>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        
                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Adresse e-mail</label>
                            <input
                                type="email"
                                placeholder="Entrez votre e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#8E3A62] text-gray-700 placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-xs font-semibold text-gray-700">Mot de passe</label>
                                <a href="#" className="text-[11px] font-medium text-gray-500 hover:underline">Mot de passe oublié ?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-4 pr-16 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#8E3A62] text-gray-700 placeholder-gray-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? "Masquer" : "Afficher"}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#8E3A62] hover:bg-[#783052] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition duration-200 mt-2"
                        >
                            Se connecter
                        </button>
                    </form>

                    {/* Message Feedback */}
                    {message && (
                        <p className={`mt-3 text-xs text-center font-medium ${message.includes("réussie") ? "text-green-600" : "text-red-500"}`}>
                            {message}
                        </p>
                    )}

                    {/* Divider */}
                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <span className="relative bg-[#faf9f9] px-3 text-[11px] text-gray-400 uppercase font-medium">Ou continuer avec</span>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                            Google
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm">
                            Apple
                        </button>
                    </div>

                    {/* Bottom Register Link */}
                    <p className="mt-6 text-center text-xs text-gray-500">
                        Vous n'avez pas encore de compte ?{" "}
                        <Link to="/register" className="text-[#8E3A62] font-semibold hover:underline">
                            S'inscrire
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;