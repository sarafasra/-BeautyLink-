import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Clock, Heart } from "lucide-react";
import api from "../services/api";

function ProfessionalProfile() {
    const { id } = useParams();

    const [professional, setProfessional] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
useEffect(() => {
    const getProfessional = async () => {
        try {
            const response = await api.get(`/profile/${id}`);

            console.log("Professional:", response.data);

            setProfessional(response.data);

            const reviewsResponse = await api.get(
                `/professionals/${id}/reviews`
            );

            console.log("Reviews:", reviewsResponse.data);

            setReviews(reviewsResponse.data);
        } catch (error) {
            console.log("Erreur:", error);
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    getProfessional();
}, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Chargement...</p>
            </div>
        );
    }

    if (!professional) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">
                    Professionnel introuvable.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff7f9]">
            <div className="max-w-6xl mx-auto px-6 py-10">

                <Link
                    to="/"
                    className="text-[#d87093] hover:underline"
                >
                     Retour
                </Link>

                <div className="bg-white rounded-3xl shadow-sm mt-6 overflow-hidden">

                    <div className="h-48 bg-pink-100">
                        <img
                            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="px-8 pb-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">

                            <div className="flex items-end gap-5">

                                <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden -mt-12 bg-white">

                                    <img
                                        src={
                                            professional.profile_photo
                                                ? `http://127.0.0.1:8002/storage/${professional.profile_photo}`
                                                : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                                        }
                                        alt={professional.name}
                                        className="w-full h-full object-cover"
                                    />

                                </div>

                                <div className="pb-2">

                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {professional.name}
                                    </h1>

                                    <p className="text-gray-500 mt-1">
                                        {professional.profession ||
                                            "Professionnel de beauté"}
                                    </p>

                                    <div className="flex items-center gap-4 mt-2 text-sm">

                                        <span className="flex items-center gap-1 text-gray-500">
                                            <MapPin size={15} />
                                            {professional.city ||
                                                "Ville non renseignée"}
                                        </span>

                                        <span className="flex items-center gap-1 text-yellow-500">
                                            <Star
                                                size={16}
                                                fill="currentColor"
                                            />
                                            Avis à venir
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <button className="w-11 h-11 rounded-full bg-pink-50 flex items-center justify-center">
                                <Heart
                                    size={21}
                                    className="text-[#d87093]"
                                />
                            </button>

                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">

                        <h2 className="text-xl font-bold text-gray-800">
                            À propos
                        </h2>

                        <p className="text-gray-500 mt-3 leading-relaxed">
                            {professional.bio ||
                                "Aucune description pour le moment."}
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">

                        <h2 className="font-bold text-gray-800">
                            Informations
                        </h2>

                        <div className="mt-4 space-y-4">

                            <div>
                                <p className="text-sm font-semibold">
                                    Ville
                                </p>

                                <p className="text-sm text-gray-500">
                                    {professional.city ||
                                        "Non renseignée"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    Téléphone
                                </p>

                                <p className="text-sm text-gray-500">
                                    {professional.phone ||
                                        "Non renseigné"}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">

                    <h2 className="text-xl font-bold text-gray-800 mb-5">
                        Prestations
                    </h2>

                    {professional.services &&
                    professional.services.length > 0 ? (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {professional.services.map((item) => (

                                <div
                                    key={item.id}
                                    className="border border-gray-100 rounded-xl p-4 flex gap-4"
                                >

                                    <img
                                        src={
                                            item.image ||
                                            "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80"
                                        }
                                        alt={item.title}
                                        className="w-20 h-20 rounded-xl object-cover"
                                    />

                                    <div>

                                        <h3 className="font-bold text-gray-800">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center gap-4 mt-2 text-sm">

                                            <span className="text-[#d87093] font-semibold">
                                                {item.price} DH
                                            </span>

                                            <span className="flex items-center gap-1 text-gray-400">
                                                <Clock size={14} />
                                                {item.duration} min
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <p className="text-gray-500">
                            Aucune prestation disponible.
                        </p>

                    )}

                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">

                    <h2 className="text-xl font-bold text-gray-800">
                        Avis
                    </h2>

                 {reviews.length > 0 ? (
    <div className="mt-5 space-y-5">
        {reviews.map((review) => (
            <div
                key={review.id}
                className="border-b border-gray-100 pb-4"
            >
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                        {review.user?.name}
                    </h3>

                    <div className="flex items-center gap-1 text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={16}
                                fill={
                                    star <= review.rating
                                        ? "currentColor"
                                        : "none"
                                }
                            />
                        ))}
                    </div>
                </div>

                <p className="text-gray-500 mt-2">
                    {review.comment || "Aucun commentaire."}
                </p>
            </div>
        ))}
    </div>
) : (
    <p className="text-gray-500 mt-3">
        Aucun avis à afficher pour le moment.
    </p>
)}

                </div>

            </div>
        </div>
    );
}

export default ProfessionalProfile;