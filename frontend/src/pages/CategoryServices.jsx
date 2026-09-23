import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star, Heart, Clock } from "lucide-react";
import api from "../services/api";

function CategoryServices() {
    const { categoryId } = useParams();

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = {
        1: {
            name: "Coiffure",
            description: "Découvrez nos professionnels de coiffure.",
        },
        2: {
            name: "Maquillage",
            description: "Découvrez nos professionnels de maquillage.",
        },
        3: {
            name: "Onglerie",
            description: "Découvrez nos professionnels de l'onglerie.",
        },
    };

    const category = categories[categoryId];

    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await api.get("/services");

                const filteredServices = response.data.filter(
                    (service) =>
                        service.category_id === Number(categoryId)
                );

                setServices(filteredServices);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement des prestations :",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        getServices();
    }, [categoryId]);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-700">
                    Catégorie introuvable
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff7f9]">

            <div className="max-w-7xl mx-auto px-8 py-12">

                <Link
                    to="/"
                    className="text-[#d87093] hover:underline"
                >
                    Retour
                </Link>

                <div className="text-center mt-8 mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">
                        {category.name}
                    </h1>

                    <p className="text-gray-500 mt-3">
                        {category.description}
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">
                            Chargement...
                        </p>
                    </div>
                ) : services.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                        <p className="text-gray-500">
                            Aucune prestation disponible dans cette catégorie.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
                            >

                                <div className="relative">

                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-56 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-56 bg-[#fceef3] flex items-center justify-center">
                                            <span className="text-[#d87093]">
                                                BeautyLink
                                            </span>
                                        </div>
                                    )}

                                    <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
                                        <Heart
                                            size={21}
                                            className="text-[#d87093]"
                                        />
                                    </button>

                                </div>

                                <div className="p-5">

                                    <h2 className="text-xl font-bold text-gray-800">
                                        {service.title}
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center gap-2 mt-4">
                                        <span className="font-semibold">
                                            {service.user?.name}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 mt-2">
                                        {service.user?.city || "Ville non disponible"}
                                    </p>

                                    <div className="flex items-center gap-4 mt-4">

                                        <span className="font-bold text-[#d87093]">
                                            {service.price} DH
                                        </span>

                                        <span className="flex items-center gap-1 text-gray-500">
                                            <Clock size={16} />
                                            {service.duration} min
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-1 mt-3">
                                        <Star
                                            size={17}
                                            className="text-yellow-400 fill-yellow-400"
                                        />

                                        <span className="text-gray-500">
                                            Avis à venir
                                        </span>
                                    </div>

                                    <Link
                                        to={`/services/${service.id}`}
                                        className="block text-center bg-[#d87093] text-white py-2 rounded-full mt-5"
                                    >
                                        Voir le profil
                                    </Link>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default CategoryServices;