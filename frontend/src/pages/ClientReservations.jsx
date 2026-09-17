import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import api from "../services/api";

function ClientReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getReservations = async () => {
            try {
                const response = await api.get("/reservations");
                setReservations(response.data);
            } catch (error) {
                console.error(error);
                setMessage("Impossible de charger vos réservations.");
            } finally {
                setLoading(false);
            }
        };

        getReservations();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Chargement...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f6f6] p-6">

            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Mes réservations
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Retrouvez toutes vos réservations.
                    </p>
                </div>

                {message && (
                    <p className="text-center text-red-500 mb-4">
                        {message}
                    </p>
                )}

                {reservations.length === 0 && !message && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                        <p className="text-gray-500">
                            Vous n'avez aucune réservation pour le moment.
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {reservations.map((reservation) => (
                       <div
    key={reservation.id}
    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
>
    <div className="flex gap-4 mb-4">

        {reservation.service?.image ? (
            <img
                src={reservation.service.image}
                alt={reservation.service?.title}
                className="w-20 h-20 rounded-xl object-cover"
            />
        ) : (
            <div className="w-20 h-20 rounded-xl bg-pink-100 flex items-center justify-center text-[#9A3B68]">
                
            </div>
        )}

        <div className="flex-1">
            <h2 className="font-semibold text-gray-800">
                {reservation.service?.title}
            </h2>

            <p className="text-sm text-[#9A3B68] mt-1">
                {reservation.service?.price} DH
            </p>
        </div>

        <span
            className={`h-fit px-3 py-1 rounded-full text-xs font-medium ${
                reservation.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : reservation.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : reservation.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
            }`}
        >
            {reservation.status === "pending"
                ? "En attente"
                : reservation.status === "confirmed"
                ? "Confirmée"
                : reservation.status === "cancelled"
                ? "Annulée"
                : reservation.status}
        </span>

    </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <CalendarDays size={17} className="text-[#9A3B68]" />
                                <span>{reservation.date}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock size={17} className="text-[#9A3B68]" />
                                <span>{reservation.time}</span>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}

export default ClientReservations;