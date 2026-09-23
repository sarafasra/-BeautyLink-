import { useEffect, useState } from "react";
import { CalendarDays, Clock, Star } from "lucide-react";
import api from "../services/api";

function ClientReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [reviewRating, setReviewRating] = useState({});
    const [reviewComment, setReviewComment] = useState({});

    const submitReview = async (reservationId) => {
        try {
            await api.post("/reviews", {
                reservation_id: reservationId,
                rating: reviewRating[reservationId],
                comment: reviewComment[reservationId] || "",
            });

            alert("Avis ajouté avec succès");

            setReviewRating({
                ...reviewRating,
                [reservationId]: "",
            });

            setReviewComment({
                ...reviewComment,
                [reservationId]: "",
            });
        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                    "Erreur lors de l'ajout de l'avis"
            );
        }
    };

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

                            {/* Informations réservation */}
                            <div className="flex gap-4 mb-4">

                                {reservation.service?.image ? (
                                    <img
                                        src={reservation.service.image}
                                        alt={reservation.service?.title}
                                        className="w-20 h-20 rounded-xl object-cover"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-xl bg-pink-100 flex items-center justify-center text-[#9A3B68]">
                                        Beauty
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
                                            : reservation.status === "accepted"
                                            ? "bg-green-100 text-green-700"
                                            : reservation.status === "refused"
                                            ? "bg-red-100 text-red-700"
                                            : reservation.status === "cancelled"
                                            ? "bg-gray-100 text-gray-600"
                                            : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {reservation.status === "pending"
                                        ? "En attente"
                                        : reservation.status === "accepted"
                                        ? "Confirmée"
                                        : reservation.status === "refused"
                                        ? "Refusée"
                                        : reservation.status === "cancelled"
                                        ? "Annulée"
                                        : reservation.status}
                                </span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <CalendarDays
                                    size={17}
                                    className="text-[#9A3B68]"
                                />
                                <span>{reservation.date}</span>
                            </div>

                            {/* Heure */}
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock
                                    size={17}
                                    className="text-[#9A3B68]"
                                />
                                <span>{reservation.time}</span>
                            </div>

                            {/* Avis */}
                            {reservation.status === "accepted" && (
                                <div className="border-t border-gray-100 mt-5 pt-5">

                                    <h3 className="font-semibold text-gray-800">
                                        Donner votre avis
                                    </h3>

                                    {/* Étoiles */}
                                    <div className="flex gap-1 mt-3">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() =>
                                                    setReviewRating({
                                                        ...reviewRating,
                                                        [reservation.id]: star,
                                                    })
                                                }
                                            >
                                                <Star
                                                    size={22}
                                                    className={
                                                        star <=
                                                        (reviewRating[
                                                            reservation.id
                                                        ] || 0)
                                                            ? "text-yellow-500"
                                                            : "text-gray-300"
                                                    }
                                                    fill={
                                                        star <=
                                                        (reviewRating[
                                                            reservation.id
                                                        ] || 0)
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Commentaire */}
                                    <textarea
                                        value={
                                            reviewComment[reservation.id] || ""
                                        }
                                        onChange={(e) =>
                                            setReviewComment({
                                                ...reviewComment,
                                                [reservation.id]:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="Écrivez votre commentaire..."
                                        className="w-full border border-gray-200 rounded-xl p-3 mt-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
                                        rows="3"
                                    />

                                    {/* Bouton */}
                                    <button
                                        onClick={() =>
                                            submitReview(reservation.id)
                                        }
                                        disabled={
                                            !reviewRating[reservation.id]
                                        }
                                        className="bg-[#d87093] text-white px-5 py-2 rounded-full mt-3 disabled:opacity-50"
                                    >
                                        Publier mon avis
                                    </button>
                                </div>
                            )}

                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default ClientReservations;