import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="min-h-screen bg-[#faf9f9] flex">

            {/* Sidebar */}
            <aside className="w-56 bg-[#292929] text-white flex flex-col min-h-screen">

                {/* Logo */}
                <div className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#8E3A62] flex items-center justify-center">
                            
                        </div>

                        <div>
                            <h1 className="font-bold text-lg">
                                BeautyLink
                            </h1>

                            <p className="text-[10px] text-gray-400">
                                Tableau de bord
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="px-3 space-y-2">

                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#A33F70] text-white text-sm font-medium">
                        
                        Dashboard
                    </button>

                  <Link
    to="/services"
    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 text-sm"
>
    Mes prestations
</Link>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 text-sm">
                        
                        Mes réservations
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 text-sm">
                        
                        Mes avis
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 text-sm">
                        
                        Messages

                        <span className="ml-auto w-2 h-2 rounded-full bg-[#A33F70]"></span>
                    </button>

                   <Link
    to="/profile"
    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 text-sm"
>
    Mon profil
</Link>
                </nav>

                {/* Bottom */}
                <div className="mt-auto p-4 space-y-8">

                    <button className="w-full py-2.5 rounded-full bg-[#A33F70] hover:bg-[#8E3A62] text-white text-xs font-semibold">
                         Ajouter une réservation
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 text-gray-300 text-sm hover:text-white">
                        
                        Déconnexion
                    </button>

                </div>

            </aside>


            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#252525]">
                        Bonjour {user?.name || "Amina"} 
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Voici un résumé de votre activité beauté.
                    </p>
                </div>


                {/* Statistics */}
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

                        <p className="text-xs font-semibold text-gray-600">
                            avis
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


                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

                    {/* Reservations */}
                    <section className="lg:col-span-2">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-[#252525]">
                                Mes prochaines réservations
                            </h2>

                            <button className="text-xs font-semibold text-[#A33F70]">
                                Voir tout
                            </button>
                        </div>


                        {/* Reservation 1 */}
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


                        {/* Reservation 2 */}
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


                        {/* Reservation 3 */}
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


                    {/* Inspirations */}
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
                                💅
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