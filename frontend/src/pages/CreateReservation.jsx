import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function CreateReservation() {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            await api.post("/reservations", {
                service_id: serviceId,
                date: date,
                time: time,
            });

            setMessage("Réservation créée avec succès !");

            setTimeout(() => {
                navigate("/reservations");
            }, 1500);

        } catch (error) {
            console.log(error.response?.data);
            setMessage("Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50/40 p-8">

            <div className="max-w-xl mx-auto">

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Réserver une prestation
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                    Choisissez la date et l'heure de votre rendez-vous.
                </p>

                {message && (
                    <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-5">
                        {message}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-sm"
                >

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border rounded-lg p-3 mb-5"
                        required
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure
                    </label>

                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border rounded-lg p-3 mb-6"
                        required
                    />

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#9A3B68] text-white px-5 py-3 rounded-lg"
                        >
                            {loading ? "Confirmation..." : "Confirmer la réservation"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/services")}
                            className="bg-gray-200 px-5 py-3 rounded-lg"
                        >
                            Annuler
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default CreateReservation;