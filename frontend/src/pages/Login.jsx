import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            // Sauvegarder les informations de connexion
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setMessage("Connexion réussie !");

            // Redirection selon le rôle
            if (response.data.user.role === "client") {
                navigate("/client/dashboard");
            } else if (response.data.user.role === "professionnel") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);

            setMessage(
                error.response?.data?.message ||
                    "Email ou mot de passe incorrect."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fff7f9] flex items-center justify-center p-4">

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row min-h-[580px]">

                {/* Image */}
                <div
                    className="relative md:w-1/2 bg-cover bg-center min-h-[280px] md:min-h-full flex flex-col justify-end p-8"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    <div className="relative z-10 text-white">
                        <h1 className="text-3xl font-bold leading-tight">
                            Révélez votre
                            <br />
                            beauté idéale
                        </h1>

                        <p className="mt-3 text-sm text-gray-200 max-w-sm">
                            Trouvez les meilleurs professionnels de beauté
                            près de chez vous.
                        </p>
                    </div>
                </div>

                {/* Formulaire */}
                <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-[#faf9f9]">

                    {/* Logo */}
                    <div className="text-center mb-7">
                        <h2 className="text-3xl font-bold text-[#8E3A62]">
                            BeautyLink
                        </h2>

                        <p className="text-sm text-gray-500 mt-2">
                            Bienvenue sur BeautyLink
                        </p>
                    </div>

                    {/* Navigation Login / Register */}
                    <div className="bg-gray-200/70 p-1 rounded-full flex mb-7">

                        <button
                            type="button"
                            className="w-1/2 py-2.5 text-sm font-semibold text-[#8E3A62] bg-white rounded-full shadow-sm"
                        >
                            Se connecter
                        </button>

                        <Link
                            to="/register"
                            className="w-1/2 py-2.5 text-sm font-medium text-gray-600 hover:text-[#8E3A62] text-center transition"
                        >
                            S'inscrire
                        </Link>

                    </div>

                    {/* Formulaire */}
                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Adresse e-mail
                            </label>

                            <input
                                type="email"
                                placeholder="Entrez votre e-mail"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#8E3A62] focus:ring-1 focus:ring-[#8E3A62]"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>

                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-gray-700">
                                    Mot de passe
                                </label>

                                <button
                                    type="button"
                                    className="text-xs text-gray-500 hover:text-[#8E3A62]"
                                >
                                    Mot de passe oublié ?
                                </button>
                            </div>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full px-4 py-3 pr-20 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#8E3A62] focus:ring-1 focus:ring-[#8E3A62]"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-[#8E3A62]"
                                >
                                    {showPassword
                                        ? "Masquer"
                                        : "Afficher"}
                                </button>

                            </div>
                        </div>

                        {/* Bouton */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-[#8E3A62] hover:bg-[#783052] disabled:bg-gray-400 text-white text-sm font-semibold rounded-xl shadow-md transition"
                        >
                            {loading
                                ? "Connexion..."
                                : "Se connecter"}
                        </button>

                    </form>

                    {/* Message */}
                    {message && (
                        <p
                            className={`mt-4 text-sm text-center font-medium ${
                                message.includes("réussie")
                                    ? "text-green-600"
                                    : "text-red-500"
                            }`}
                        >
                            {message}
                        </p>
                    )}

                    {/* Register */}
                    <p className="mt-7 text-center text-sm text-gray-500">
                        Vous n'avez pas encore de compte ?{" "}

                        <Link
                            to="/register"
                            className="text-[#8E3A62] font-semibold hover:underline"
                        >
                            S'inscrire
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;