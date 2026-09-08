import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "client",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/register", form);

            setMessage(response.data.message);

            setForm({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                role: "client",
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Une erreur est survenue"
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
                            Rejoignez la<br />communauté
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-200 font-light max-w-sm">
                            Créez votre compte pour accéder aux meilleurs services de beauté.
                        </p>
                    </div>
                </div>

                <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-[#faf9f9]">
                    
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-2xl font-bold text-[#8E3A62] tracking-tight">BeautyLink</span>
                    </div>

                    <div className="bg-gray-200/70 p-1 rounded-full flex mb-6">
                        <Link to="/login" className="w-1/2 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition text-center">
                            Se connecter
                        </Link>
                        <button type="button" className="w-1/2 py-2 text-xs sm:text-sm font-medium text-[#8E3A62] bg-white rounded-full shadow-sm transition">
                            S'inscrire
                        </button>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-3">
                        
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nom complet</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Entrez votre nom"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#8E3A62] text-gray-700 placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Adresse e-mail</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Entrez votre e-mail"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#8E3A62] text-gray-700 placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Vous êtes ?</label>
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#8E3A62] text-gray-700"
                            >
                                <option value="client">Client</option>
                                <option value="professionnel">Professionnel</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Mot de passe</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full pl-4 pr-16 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#8E3A62] text-gray-700 placeholder-gray-400"
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

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Confirmer le mot de passe</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password_confirmation"
                                placeholder="••••••••"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#8E3A62] text-gray-700 placeholder-gray-400"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 bg-[#8E3A62] hover:bg-[#783052] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition duration-200 mt-2"
                        >
                            S'inscrire
                        </button>
                    </form>

                    {message && (
                        <p className="mt-3 text-xs text-center font-medium text-gray-700">
                            {message}
                        </p>
                    )}

                    <p className="mt-5 text-center text-xs text-gray-500">
                        Vous avez déjà un compte ?{" "}
                        <Link to="/login" className="text-[#8E3A62] font-semibold hover:underline">
                            Se connecter
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Register;