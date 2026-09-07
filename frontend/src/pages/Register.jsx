import { useState } from "react";
import api from "../services/api";

function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "client",
    });

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
        <div>
            <h1>Inscription</h1>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={form.password}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmer le mot de passe"
                    value={form.password_confirmation}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="client">Client</option>
                    <option value="professionnel">Professionnel</option>
                </select>

                <button type="submit">
                    S'inscrire
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;