import { Link, Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useState } from "react";

function ProfessionalLayout() {
    const [activeItem, setActiveItem] = useState("");

    return (
        <div className="min-h-screen bg-[#faf9f9] flex">

            <aside className="w-56 bg-[#292929] text-white flex flex-col min-h-screen">

                <div className="p-5">
                    <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-full bg-[#8E3A62]">
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

                <nav className="px-3 space-y-2">

                    <Link
                        to="/dashboard"
                        onClick={() => setActiveItem("dashboard")}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                            activeItem === "dashboard"
                                ? "bg-[#A33F70] text-white"
                                : "text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/services"
                        onClick={() => setActiveItem("services")}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                            activeItem === "services"
                                ? "bg-[#A33F70] text-white"
                                : "text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        Prestations
                    </Link>

                    <Link
                        to="/reservations"
                        onClick={() => setActiveItem("reservations")}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                            activeItem === "reservations"
                                ? "bg-[#A33F70] text-white"
                                : "text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        Mes réservations
                    </Link>

                    <Link
                        to="/profile"
                        onClick={() => setActiveItem("profile")}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                            activeItem === "profile"
                                ? "bg-[#A33F70] text-white"
                                : "text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        Mon profil
                    </Link>

                </nav>

                <div className="mt-auto p-4">

                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                        className="w-full text-left px-3 text-gray-300 text-sm hover:text-white"
                    >
                        <div className="flex items-center gap-3">
                            <LogOut size={17} />
                            Déconnexion
                        </div>
                    </button>

                </div>

            </aside>

            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>

        </div>
    );
}

export default ProfessionalLayout;