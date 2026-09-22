import { Link } from "react-router-dom";

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));

    const isLoggedIn = !!user;
    const isClient = user?.role === "client";

    return (
        <div className="min-h-screen bg-[#faf7f8]">

            {/* Navbar */}
            <nav className="bg-white px-8 py-5 flex items-center justify-between shadow-sm">

                <Link
                    to={isClient ? "/client/dashboard" : "/dashboard"}
                    className="text-2xl font-bold text-[#A33F70]"
                >
                    BeautyLink
                </Link>

                <div className="flex items-center gap-6 text-sm">

                    <Link
                        to="/"
                        className="text-[#A33F70] font-semibold"
                    >
                        Accueil
                    </Link>

                    <Link
                        to="/services"
                        className="text-gray-600 hover:text-[#A33F70]"
                    >
                        Prestations
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link
                                to={isClient ? "/client/reservations" : "/reservations"}
                                className="text-gray-600 hover:text-[#A33F70]"
                            >
                                Mes réservations
                            </Link>

                            <Link
                                to="/profile"
                                className="text-gray-600 hover:text-[#A33F70]"
                            >
                                Mon profil
                            </Link>

                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.href = "/login";
                                }}
                                className="text-gray-600 hover:text-red-500"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-600 hover:text-[#A33F70]"
                            >
                                Connexion
                            </Link>

                            <Link
                                to="/register"
                                className="bg-[#A33F70] text-white px-5 py-2 rounded-lg"
                            >
                                Inscription
                            </Link>
                        </>
                    )}

                </div>
            </nav>

            {/* Hero */}
            <section className="max-w-6xl mx-auto px-8 py-20 flex items-center justify-between gap-10">

                <div className="max-w-xl">

                    <p className="text-[#A33F70] font-semibold text-sm mb-3">
                        BEAUTÉ • STYLE • BIEN-ÊTRE
                    </p>

                    <h1 className="text-5xl font-bold text-[#292929] leading-tight">
                        Révélez votre beauté,
                        <span className="text-[#A33F70]">
                            {" "}simplement.
                        </span>
                    </h1>

                    <p className="text-gray-500 mt-5 leading-7">
                        Découvrez des prestations de beauté et trouvez
                        facilement le professionnel qui vous correspond.
                    </p>

                    <div className="flex gap-4 mt-8">

                        <Link
                            to="/services"
                            className="bg-[#A33F70] text-white px-6 py-3 rounded-xl font-medium"
                        >
                            Découvrir les prestations
                        </Link>

                        {!isLoggedIn && (
                            <Link
                                to="/register"
                                className="border border-[#A33F70] text-[#A33F70] px-6 py-3 rounded-xl font-medium"
                            >
                                Créer un compte
                            </Link>
                        )}

                    </div>
                </div>

                {/* Image temporaire */}
                <div className="w-[400px] h-[400px] bg-[#f3dce7] rounded-[40px] flex items-center justify-center">

                    <div className="text-center">

                        <div className="text-7xl mb-4">
                            💄
                        </div>

                        <p className="text-[#A33F70] font-semibold">
                            Votre beauté,
                        </p>

                        <p className="text-gray-600 text-sm">
                            notre priorité ✨
                        </p>

                    </div>

                </div>

            </section>

            {/* Prestations */}
            <section className="bg-white py-16 px-8">

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl font-bold text-center text-[#292929]">
                        Nos prestations
                    </h2>

                    <p className="text-gray-500 text-center mt-2">
                        Découvrez nos services beauté.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                        <div className="p-8 bg-[#faf7f8] rounded-2xl text-center">
                            <div className="text-5xl">💇‍♀️</div>

                            <h3 className="font-bold text-lg mt-4">
                                Coiffure
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Coupes, brushing, coloration et soins.
                            </p>
                        </div>

                        <div className="p-8 bg-[#faf7f8] rounded-2xl text-center">
                            <div className="text-5xl">💅</div>

                            <h3 className="font-bold text-lg mt-4">
                                Onglerie
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Manucure, nail art et soins des ongles.
                            </p>
                        </div>

                        <div className="p-8 bg-[#faf7f8] rounded-2xl text-center">
                            <div className="text-5xl">💄</div>

                            <h3 className="font-bold text-lg mt-4">
                                Maquillage
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Maquillage quotidien et événements.
                            </p>
                        </div>

                    </div>
                </div>

            </section>

            {/* Comment ça marche */}
            <section className="py-16 px-8">

                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl font-bold text-center text-[#292929]">
                        Comment ça marche ?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-[#f3dce7] flex items-center justify-center text-[#A33F70] font-bold">
                                1
                            </div>

                            <h3 className="font-bold mt-4">
                                Choisissez
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Trouvez la prestation qui vous convient.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-[#f3dce7] flex items-center justify-center text-[#A33F70] font-bold">
                                2
                            </div>

                            <h3 className="font-bold mt-4">
                                Réservez
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Choisissez une date et une heure.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-[#f3dce7] flex items-center justify-center text-[#A33F70] font-bold">
                                3
                            </div>

                            <h3 className="font-bold mt-4">
                                Profitez
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Profitez de votre rendez-vous beauté.
                            </p>
                        </div>

                    </div>
                </div>

            </section>

            {/* Footer */}
            <footer className="bg-[#292929] text-white text-center py-6">
                <p className="text-sm">
                    © 2026 BeautyLink — Tous droits réservés.
                </p>
            </footer>

        </div>
    );
}

export default Home;