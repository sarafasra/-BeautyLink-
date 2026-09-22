import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function CreateReservation() {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const times = [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
    ];

    useEffect(() => {
        const getService = async () => {
            try {
                const response = await api.get("/services");

                const foundService = response.data.find(
                    (item) => item.id === Number(serviceId)
                );

                setService(foundService);
            } catch (error) {
                console.error(error);
                setMessage("Impossible de charger la prestation.");
            } finally {
                setLoading(false);
            }
        };

        getService();
    }, [serviceId]);

    const handleReservation = async (e) => {
        e.preventDefault();

        if (!date || !time) {
            setMessage("Veuillez choisir une date et une heure.");
            return;
        }

        try {
            await api.post("/reservations", {
                service_id:Number (serviceId),
                date: date,
                time: time,
            });

            setMessage("Réservation créée avec succès !");

            setTimeout(() => {
navigate("/client/reservations");            }, 1000);
        } catch (error) {
            console.error(error);
            setMessage("Erreur lors de la réservation.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Chargement...</p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Prestation introuvable.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f6f6] flex justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden">

                <div className="flex items-center justify-center border-b px-4 py-4">
                    <h1 className="text-sm font-medium text-gray-700">
                        Réservation
                    </h1>
                </div>

                <div className="p-4">

                    <div className="flex gap-3 bg-[#faf8f8] border border-gray-100 rounded-xl p-3 mb-6">

                        {service.image ? (
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-lg bg-pink-100 flex items-center justify-center text-[#9A3B68]">
                                
                            </div>
                        )}

                        <div>
                            <h2 className="font-medium text-gray-800">
                                {service.title}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {service.user?.name}
                            </p>

                            <p className="text-sm text-[#9A3B68] mt-1">
                                {service.price} DH
                            </p>
                        </div>

                    </div>

                    <form onSubmit={handleReservation}>

                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Choisir une date
                            </label>

                            <input
                                type="date"
                                value={date}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-200"
                                required
                            />

                        </div>

                        <div className="mb-6">

                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Choisir une heure
                            </label>

                            <div className="grid grid-cols-3 gap-3">

                                {times.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setTime(item)}
                                        className={`py-2 rounded-full text-sm border transition ${
                                            time === item
                                                ? "bg-[#9A3B68] text-white border-[#9A3B68]"
                                                : "bg-white text-gray-700 border-pink-200 hover:bg-pink-50"
                                        }`}
                                    >
                                        {item}
                                    </button>
                                ))}

                            </div>

                        </div>

                        {message && (
                            <p className="text-center text-sm text-gray-600 mb-4">
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#9A3B68] hover:bg-[#7f3056] text-white font-medium py-3 rounded-full"
                        >
                            Confirmer la réservation
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}

export default CreateReservation;