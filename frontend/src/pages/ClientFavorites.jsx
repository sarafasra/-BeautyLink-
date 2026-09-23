import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Clock } from "lucide-react";
import api from "../services/api";

function ClientFavorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = async () => {
        try {
            const response = await api.get("/favorites");
            setFavorites(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (serviceId) => {
        try {
            await api.delete(`/favorites/${serviceId}`);

            setFavorites(
                favorites.filter(
                    (favorite) => favorite.service_id !== serviceId
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#fff7f9] p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Mes favoris
                </h1>

                <p className="text-gray-500 mb-8">
                    Retrouvez les prestations que vous avez ajoutées à vos favoris.
                </p>

                {loading ? (
                    <p className="text-center text-gray-500">
                        Chargement...
                    </p>
                ) : favorites.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                        <Heart
                            size={40}
                            className="mx-auto text-gray-300 mb-4"
                        />

                        <p className="text-gray-500">
                            Vous n'avez aucune prestation en favoris.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {favorites.map((favorite) => {
                            const service = favorite.service;

                            return (
                                <div
                                    key={favorite.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-md"
                                >

                                    <div className="relative">

                                        {service?.image ? (
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-52 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-52 bg-[#fceef3] flex items-center justify-center">
                                                <span className="text-[#d87093]">
                                                    BeautyLink
                                                </span>
                                            </div>
                                        )}

                                        <button
                                            onClick={() =>
                                                removeFavorite(service.id)
                                            }
                                            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
                                        >
                                            <Heart
                                                size={21}
                                                className="text-[#d87093] fill-[#d87093]"
                                            />
                                        </button>

                                    </div>

                                    <div className="p-5">

                                        <h2 className="text-xl font-bold text-gray-800">
                                            {service?.title}
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            {service?.description}
                                        </p>

                                        <div className="flex items-center gap-4 mt-4">

                                            <span className="font-bold text-[#d87093]">
                                                {service?.price} DH
                                            </span>

                                            <span className="flex items-center gap-1 text-gray-500">
                                                <Clock size={16} />
                                                {service?.duration} min
                                            </span>

                                        </div>

                                        {service?.user?.id && (
                                            <Link
                                                to={`/professional/${service.user.id}`}
                                                className="block text-center bg-[#d87093] text-white py-2 rounded-full mt-5"
                                            >
                                                Voir le profil
                                            </Link>
                                        )}

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>
        </div>
    );
}

export default ClientFavorites;