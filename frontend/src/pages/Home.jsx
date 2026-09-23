import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Scissors,
    Sparkles,
    Hand,
    Star,
    
} from "lucide-react";
import api from "../services/api";

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));

    const isLoggedIn = !!user;
    const isClient = user?.role === "client";

    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        const getProfessionals = async () => {
            try {
                const response = await api.get("/services");

                const services = response.data;
                const uniqueProfessionals = [];

                services.forEach((service) => {
                    if (
                        service.user &&
                        service.user.role === "professionnel" &&
                        !uniqueProfessionals.some(
                            (professional) =>
                                professional.id === service.user.id
                        )
                    ) {
                        uniqueProfessionals.push({
                            ...service.user,
                            service: service,
                        });
                    }
                });

                setProfessionals(uniqueProfessionals.slice(0, 3));
            } catch (error) {
                console.log(
                    "Erreur lors du chargement des professionnels :",
                    error
                );
            }
        };

        getProfessionals();
    }, []);

    return (
        <div className="min-h-screen bg-white">

            <nav className="bg-white shadow-sm px-8 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">

                    <Link
                        to={isClient ? "/client/dashboard" : "/dashboard"}
                        className="text-2xl font-bold text-[#d87093]"
                    >
                        BeautyLink
                    </Link>

                    <div className="flex items-center gap-6">

                        <Link to="/services">
                            Prestations
                        </Link>

                        {isLoggedIn && (
                            <Link
                                to={
                                    isClient
                                        ? "/client/reservations"
                                        : "/reservations"
                                }
                            >
                                Mes réservations
                            </Link>
                        )}

                        {isLoggedIn && (
                            <Link to="/profile">
                                Mon profil
                            </Link>
                        )}

                        {!isLoggedIn ? (
                            <>
                                <Link to="/login">
                                    Connexion
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-[#d87093] text-white px-5 py-2 rounded-full"
                                >
                                    Inscription
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.href = "/login";
                                }}
                                className="text-red-500"
                            >
                                Déconnexion
                            </button>
                        )}

                    </div>
                </div>
            </nav>

            <section className="bg-[#fff7f9] px-8 py-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                    <div>
                        <p className="text-[#d87093] font-semibold mb-4">
                            BEAUTÉ • STYLE • BIEN-ÊTRE
                        </p>

                        <h1 className="text-5xl font-bold text-gray-800 mb-6">
                            Trouvez votre beauté idéale
                        </h1>

                        <p className="text-gray-600 text-lg mb-8">
                            Réservez facilement les meilleurs professionnels
                            de la beauté près de vous.
                        </p>

                        <Link
                            to="/services"
                            className="inline-block bg-[#d87093] text-white px-7 py-3 rounded-full"
                        >
                            Découvrir les prestations
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-66 h-66 bg-white rounded-full shadow-lg flex items-center justify-center">
                            <Sparkles
                                size={60}
                                strokeWidth={1.5}
                                className="text-[#d87093]"
                            />
                        </div>
                    </div>

                </div>
            </section>

            <section className="px-8 py-12">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                        {[
                            {
                                title: "Coiffure",
                                count: "120 professionnels",
                                icon: Scissors,
                                categoryId: 1,
                            },
                            {
                                title: "Maquillage",
                                count: "98 professionnels",
                                icon: Sparkles,
                                categoryId: 2,
                            },
                            {
                                title: "Onglerie",
                                count: "76 professionnels",
                                icon: Hand,
                                categoryId: 3,
                            },
                        ].map((cat, idx) => {
                            const Icon = cat.icon;

                            return (
                                <Link
                                    key={idx}
                                    to={`/services/category/${cat.categoryId}`}
                                    className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col items-center"
                                >
                                    <div className="w-16 h-16 bg-[#fceef3] rounded-full flex items-center justify-center mb-4">
                                        <Icon
                                            size={30}
                                            strokeWidth={1.8}
                                            className="text-[#d87093]"
                                        />
                                    </div>

                                    <h3 className="font-bold text-gray-800 text-base">
                                        {cat.title}
                                    </h3>

                                    <p className="text-sm text-gray-400 mt-1">
                                        {cat.count}
                                    </p>
                                </Link>
                            );
                        })}

                    </div>

                </div>
            </section>

            <section className="bg-[#fff7f9] px-8 py-16">
                <div className="max-w-7xl mx-auto">

                    <h2 className="text-3xl font-bold text-center mb-10">
                        Nos professionnels
                    </h2>

                    {professionals.length === 0 ? (
                        <div className="text-center text-gray-500">
                            Aucun professionnel disponible pour le moment.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {professionals.map((professional) => (
                                <div
                                    key={professional.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-md"
                                >

                                    <div className="relative">

                                        <img
                                            src={
                                                professional.profile_photo
                                                    ? `http://127.0.0.1:8002/storage/${professional.profile_photo}`
                                                    : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                                            }
                                            alt={professional.name}
                                            className="w-full h-64 object-cover"
                                        />

                                     

                                    </div>

                                    <div className="p-5">

                                        <h3 className="text-xl font-bold">
                                            {professional.name}
                                        </h3>

                                        <div className="flex items-center gap-1 mt-2">
                                            <Star
                                                size={17}
                                                className="text-yellow-400 fill-yellow-400"
                                            />

                                            <span>
                                                Avis à venir
                                            </span>
                                        </div>

                                        <p className="text-gray-500 mt-3">
                                            {professional.city ||
                                                "Ville non renseignée"}
                                            {" • "}
                                            {professional.service?.category?.name ||
                                                "Beauté"}
                                        </p>

                                        <p className="font-semibold mt-3">
                                            À partir de{" "}
                                            {professional.service?.price || 0} DH
                                        </p>

                                        <Link
                                            to={`/professional/${professional.id}`}
                                            className="block text-center bg-[#d87093] text-white py-2 rounded-full mt-4"
                                        >
                                            Voir le profil
                                        </Link>

                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </section>

            <section className="px-8 py-16">
                <div className="max-w-7xl mx-auto">

                    <h2 className="text-3xl font-bold text-center mb-12">
                        Comment ça marche ?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                        <div>
                            <div className="w-14 h-14 mx-auto bg-[#d87093] text-white rounded-full flex items-center justify-center text-xl font-bold">
                                1
                            </div>

                            <h3 className="font-bold text-xl mt-4">
                                Choisissez
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Choisissez une prestation de coiffure,
                                maquillage ou onglerie.
                            </p>
                        </div>

                        <div>
                            <div className="w-14 h-14 mx-auto bg-[#d87093] text-white rounded-full flex items-center justify-center text-xl font-bold">
                                2
                            </div>

                            <h3 className="font-bold text-xl mt-4">
                                Réservez
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Choisissez votre date et votre heure puis
                                envoyez votre réservation.
                            </p>
                        </div>

                        <div>
                            <div className="w-14 h-14 mx-auto bg-[#d87093] text-white rounded-full flex items-center justify-center text-xl font-bold">
                                3
                            </div>

                            <h3 className="font-bold text-xl mt-4">
                                Profitez
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Rendez-vous chez le professionnel et profitez
                                de votre moment beauté.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <footer className="bg-[#292929] text-white px-8 py-8">

                <div className="max-w-7xl mx-auto text-center">

                    <h3 className="text-2xl font-bold text-[#d87093]">
                        BeautyLink
                    </h3>

                    <p className="text-gray-400 mt-2">
                        Votre beauté, votre choix, votre moment.
                    </p>

                    <p className="text-gray-500 text-sm mt-6">
                        © 2026 BeautyLink. Tous droits réservés.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;