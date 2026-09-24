import { Link, Outlet, useNavigate } from "react-router-dom";

function ClientLayout() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="min-h-screen">

            <nav className="bg-white shadow-sm px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    <Link
                        to="/client/dashboard"
                        className="text-2xl font-bold text-[#d87093]"
                    >
                        BeautyLink
                    </Link>

                    <div className="flex items-center gap-8">

                        <Link
                            to="/client/dashboard"
                            className="text-gray-700 hover:text-[#d87093]"
                        >
                            Accueil
                        </Link>

                        <Link
to="/client/services"
                            className="text-gray-700 hover:text-[#d87093]"
                        >
                            Prestations
                        </Link>

                        <Link
                            to="/client/reservations"
                            className="text-gray-700 hover:text-[#d87093]"
                        >
                            Mes réservations
                        </Link>

                        <Link
                            to="/client/favorites"
                            className="text-gray-700 hover:text-[#d87093]"
                        >
                            Mes favoris
                        </Link>

                        <Link
to="/client/profile"                            className="text-gray-700 hover:text-[#d87093]"
                        >
                            Mon profil
                        </Link>

                        <button
                            onClick={logout}
                            className="text-gray-700 hover:text-red-500"
                        >
                            Déconnexion
                        </button>

                    </div>
                </div>
            </nav>

            <Outlet />

        </div>
    );
}

export default ClientLayout;