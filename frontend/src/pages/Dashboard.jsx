import { Link } from "react-router-dom";
import {
    Scissors,
    Sparkles,
    Hand,
} from "lucide-react";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const isClient = user?.role === "client";

   
    if (isClient) {
        return (
            <div className="min-h-screen bg-white">

                <section className="bg-[#fff7f9] px-8 py-16">
                    <div className="max-w-7xl mx-auto">

                        <p className="text-[#d87093] font-semibold mb-3">
                            BIENVENUE SUR BEAUTYLINK
                        </p>

                        <h1 className="text-4xl font-bold text-gray-800">
                            Bonjour {user?.name || "Amina"} !
                        </h1>

                        <p className="text-gray-600 text-lg mt-4">
                            Découvrez les meilleurs professionnels de beauté
                            et réservez votre prochaine prestation.
                        </p>

                        <Link
                            to="/services"
                            className="inline-block bg-[#d87093] text-white px-7 py-3 rounded-full mt-7 hover:bg-[#c45f82]"
                        >
                            Découvrir les prestations
                        </Link>

                    </div>
                </section>

                <section className="px-8 py-12">
                    <div className="max-w-7xl mx-auto">

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Nos catégories
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <Link
                                to="/services/category/1"
                                className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
                            >
                                <div className="w-16 h-16 mx-auto bg-[#fceef3] rounded-full flex items-center justify-center">
                                    <Scissors
                                        size={30}
                                        strokeWidth={1.8}
                                        className="text-[#d87093]"
                                    />
                                </div>

                                <h3 className="font-bold text-lg mt-4">
                                    Coiffure
                                </h3>

                                <p className="text-gray-500 text-sm mt-2">
                                    Découvrez nos prestations de coiffure
                                </p>
                            </Link>

                            <Link
                                to="/services/category/2"
                                className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
                            >
                                <div className="w-16 h-16 mx-auto bg-[#fceef3] rounded-full flex items-center justify-center">
                                    <Sparkles
                                        size={30}
                                        strokeWidth={1.8}
                                        className="text-[#d87093]"
                                    />
                                </div>

                                <h3 className="font-bold text-lg mt-4">
                                    Maquillage
                                </h3>

                                <p className="text-gray-500 text-sm mt-2">
                                    Découvrez nos prestations de maquillage
                                </p>
                            </Link>

                            <Link
                                to="/services/category/3"
                                className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
                            >
                                <div className="w-16 h-16 mx-auto bg-[#fceef3] rounded-full flex items-center justify-center">
                                    <Hand
                                        size={30}
                                        strokeWidth={1.8}
                                        className="text-[#d87093]"
                                    />
                                </div>

                                <h3 className="font-bold text-lg mt-4">
                                    Onglerie
                                </h3>

                                <p className="text-gray-500 text-sm mt-2">
                                    Découvrez nos prestations d'onglerie
                                </p>
                            </Link>

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


    return (
        <div className="min-h-screen bg-[#faf9f9]">

            <main className="p-8 overflow-y-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#252525]">
                        Bonjour {user?.name || "Amina"}
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Voici un résumé de votre activité beauté.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-9">

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-4xl font-bold text-[#A33F70]">
                            12
                        </p>

                        <p className="text-xs font-semibold text-gray-600 mt-3 uppercase">
                            Réservations
                        </p>

                        <p className="text-xs font-semibold text-gray-600">
                            aujourd'hui
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-4xl font-bold text-[#A33F70]">
                            8
                        </p>

                        <p className="text-xs font-semibold text-gray-600 mt-3 uppercase">
                            Nouveaux
                        </p>
                    </div>

                    <div className="bg-[#f8eef3] rounded-2xl p-6 shadow-sm border border-[#f0dce5]">
                        <p className="text-4xl font-bold text-[#A33F70]">
                            24
                        </p>

                        <p className="text-xs font-semibold text-gray-600 mt-3 uppercase">
                            Prestations
                        </p>

                        <p className="text-xs font-semibold text-gray-600">
                            actives
                        </p>
                    </div>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

                    <section className="lg:col-span-2">

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-lg font-bold text-[#252525]">
                                Mes prochaines réservations
                            </h2>

                            <Link
                                to="/reservations"
                                className="text-xs font-semibold text-[#A33F70]"
                            >
                                Voir tout
                            </Link>

                        </div>


                        <div className="bg-white rounded-2xl p-4 mb-4 flex items-center gap-4 shadow-sm">

                            <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center">
                            </div>

                            <div className="flex-1">

                                <h3 className="text-sm font-semibold">
                                    Sara L.
                                </h3>

                                <p className="text-xs text-gray-500">
                                    Coupe + Brushing
                                </p>

                                <p className="text-[11px] text-gray-400 mt-1">
                                    15 Mai 2024 • 10:00
                                </p>

                            </div>

                            <span className="text-[10px] font-semibold bg-green-100 text-green-600 px-3 py-1 rounded-full">
                                Confirmée
                            </span>

                        </div>


                        <div className="bg-white rounded-2xl p-4 mb-4 flex items-center gap-4 shadow-sm">

                            <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center">
                            </div>

                            <div className="flex-1">

                                <h3 className="text-sm font-semibold">
                                    Yassine B.
                                </h3>

                                <p className="text-xs text-gray-500">
                                    Coloration
                                </p>

                                <p className="text-[11px] text-gray-400 mt-1">
                                    15 Mai 2024 • 14:00
                                </p>

                            </div>

                            <span className="text-[10px] font-semibold bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
                                En attente
                            </span>

                        </div>

                        {/* Réservation 3 */}

                        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">

                            <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center">
                            </div>

                            <div className="flex-1">

                                <h3 className="text-sm font-semibold">
                                    Maha R.
                                </h3>

                                <p className="text-xs text-gray-500">
                                    Brushing + Soin
                                </p>

                                <p className="text-[11px] text-gray-400 mt-1">
                                    16 Mai 2024 • 11:00
                                </p>

                            </div>

                            <span className="text-[10px] font-semibold bg-green-100 text-green-600 px-3 py-1 rounded-full">
                                Confirmée
                            </span>

                        </div>

                    </section>


                    <section>

                        <h2 className="text-lg font-bold text-[#252525] mb-4">
                            Inspirations du moment
                        </h2>

                        <div className="rounded-2xl overflow-hidden h-48 relative bg-gray-200">

                            <img
                                src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800&auto=format&fit=crop"
                                alt="Routine beauté"
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                            <div className="absolute bottom-4 left-4 text-white">

                                <span className="text-[9px] bg-[#A33F70] px-2 py-1 rounded">
                                    ASTUCE BEAUTÉ
                                </span>

                                <h3 className="font-semibold text-sm mt-2">
                                    Routine Peau Parfaite
                                </h3>

                                <p className="text-[10px] text-gray-200">
                                    Découvrez les secrets d'une
                                    hydratation parfaite...
                                </p>

                            </div>

                        </div>

                        <div className="mt-4 bg-[#fff0f6] border border-[#f4d7e5] rounded-2xl p-4 flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            </div>

                            <div>

                                <p className="text-xs font-bold text-[#A33F70]">
                                    Nail Art Studio
                                </p>

                                <p className="text-[10px] text-gray-500">
                                    Nouveau près de chez vous
                                </p>

                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;