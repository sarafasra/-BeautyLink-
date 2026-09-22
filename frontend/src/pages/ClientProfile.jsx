import { useEffect, useState } from "react";
import {
    MapPin,
    Mail,
    Phone,
    User,
    CalendarDays,
    Clock,
} from "lucide-react";
import api from "../services/api";

function ClientProfile({ user }) {
    const [editMode, setEditMode] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);

    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [city, setCity] = useState(user.city || "");
    const [bio, setBio] = useState(user.bio || "");
    const [profilePhoto, setProfilePhoto] = useState(null);
const [activeTab, setActiveTab] = useState("about");
const [reservations, setReservations] = useState([]);
useEffect(() => {
    if (activeTab === "reservations") {
        api.get("/reservations")
            .then((response) => {
                setReservations(response.data);
            })
            .catch((error) => {
                console.log(error.response?.data || error);
            });
    }
}, [activeTab]);
const handleUpdate = async (e) => {
    e.preventDefault();

    try {
        const response = await api.put("/profile",  {
            name,
            email,
            phone,
            city,
            bio,
        });

        let updatedUser = response.data.user;

        if (profilePhoto) {
            const formData = new FormData();
            formData.append("profile_photo", profilePhoto);

            const photoResponse = await api.post("/profile/photo", formData);

            updatedUser = photoResponse.data.user;
        }

        setCurrentUser(updatedUser);
        setProfilePhoto(null);
        setEditMode(false);

    } catch (error) {
        console.log(error.response?.data || error);
    }
};


    return (
        <div className="min-h-screen bg-[#faf9f9] p-6">

            <div className="max-w-5xl mx-auto">


                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                    <div className="h-40 bg-gradient-to-r from-pink-100 to-pink-50"></div>

                    <div className="px-8 pb-6">

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between">

                            <div className="flex items-end gap-5 -mt-14">

                               <div className="w-28 h-28 rounded-full bg-[#f4dce7] border-4 border-white flex items-center justify-center overflow-hidden">
    {currentUser.profile_photo ? (
        <img
src={`http://127.0.0.1:8002/storage/${currentUser.profile_photo}`}            alt="Photo de profil"
            className="w-full h-full object-cover"
        />
    ) : (
        <User size={50} className="text-[#9A3B68]" />
    )}
</div>

                                <div className="pb-2">

                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {currentUser.name}
                                    </h1>

                                    <p className="text-[#9A3B68] mt-1">
                                        Client BeautyLink
                                    </p>

                                    {currentUser.city && (
                                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                                            <MapPin size={16} />
                                            <span>{currentUser.city}</span>
                                        </div>
                                    )}

                                </div>
                            </div>

                            <button
                                onClick={() => setEditMode(!editMode)}
                                className="mt-5 md:mt-0 bg-[#9A3B68] hover:bg-[#7f3056] text-white px-5 py-2.5 rounded-xl"
                            >
                                {editMode ? "Annuler" : "Modifier le profil"}
                            </button>

                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm mt-6 px-6">

                    <div className="flex gap-8 border-b">
<button
    onClick={() => setActiveTab("about")}
    className={`py-4 ${
        activeTab === "about"
            ? "text-[#9A3B68] border-b-2 border-[#9A3B68] font-medium"
            : "text-gray-500 hover:text-[#9A3B68]"
    }`}
>
    À propos
</button>

<button
    onClick={() => setActiveTab("reservations")}
    className={`py-4 ${
        activeTab === "reservations"
            ? "text-[#9A3B68] border-b-2 border-[#9A3B68] font-medium"
            : "text-gray-500 hover:text-[#9A3B68]"
    }`}
>
    Mes réservations
</button>

<button
    onClick={() => setActiveTab("reviews")}
    className={`py-4 ${
        activeTab === "reviews"
            ? "text-[#9A3B68] border-b-2 border-[#9A3B68] font-medium"
            : "text-gray-500 hover:text-[#9A3B68]"
    }`}
>
    Mes avis
</button>

                    </div>

                  <div className="py-8">

    {activeTab === "about" && (
        <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                À propos de moi
            </h2>

            {editMode ? (

                <form onSubmit={handleUpdate} className="space-y-5">

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Photo de profil
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfilePhoto(e.target.files[0])}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Nom
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#9A3B68]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#9A3B68]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Téléphone
                        </label>

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Votre numéro de téléphone"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#9A3B68]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Ville
                        </label>

                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Votre ville"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#9A3B68]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-2">
                            Bio
                        </label>

                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Parlez un peu de vous..."
                            rows="4"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#9A3B68]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#9A3B68] hover:bg-[#7f3056] text-white px-6 py-3 rounded-xl"
                    >
                        Enregistrer
                    </button>

                </form>

            ) : (

                <>
                    <div className="grid md:grid-cols-2 gap-5">

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">

                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                                <Mail size={20} className="text-[#9A3B68]" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="text-gray-800">
                                    {currentUser.email}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">

                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                                <Phone size={20} className="text-[#9A3B68]" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Téléphone
                                </p>

                                <p className="text-gray-800">
                                    {currentUser.phone || "Non renseigné"}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">

                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                                <MapPin size={20} className="text-[#9A3B68]" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Ville
                                </p>

                                <p className="text-gray-800">
                                    {currentUser.city || "Non renseignée"}
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="mt-6">

                        <h3 className="font-semibold text-gray-800 mb-2">
                            Bio
                        </h3>

                        <p className="text-gray-600 leading-relaxed">
                            {currentUser.bio || "Aucune bio renseignée pour le moment."}
                        </p>

                    </div>
                </>
            )}
        </>
    )}

    {activeTab === "reservations" && (
        <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Mes réservations
            </h2>

            {reservations.length === 0 ? (

                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500">
                        Vous n'avez aucune réservation pour le moment.
                    </p>
                </div>

            ) : (

                <div className="space-y-4">

                    {reservations.map((reservation) => (
                        <div
                            key={reservation.id}
                            className="bg-gray-50 rounded-xl p-5 border border-gray-100"
                        >

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {reservation.service?.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {reservation.service?.category?.name}
                                    </p>

                                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">

    <div className="flex items-center gap-2">
        <CalendarDays size={16} className="text-[#9A3B68]" />
        <span>{reservation.date}</span>
    </div>

    <div className="flex items-center gap-2">
        <Clock size={16} className="text-[#9A3B68]" />
        <span>{reservation.time}</span>
    </div>

</div>
                                </div>

                                <div>

                                    {reservation.status === "pending" && (
                                        <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                                            En attente
                                        </span>
                                    )}

                                    {reservation.status === "accepted" && (
                                        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm">
                                            Acceptée
                                        </span>
                                    )}

                                    {reservation.status === "refused" && (
                                        <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm">
                                            Refusée
                                        </span>
                                    )}

                                    {reservation.status === "cancelled" && (
                                        <span className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-sm">
                                            Annulée
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}
        </>
    )}

    {activeTab === "reviews" && (
        <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Mes avis
            </h2>

            <div className="text-center py-12 bg-gray-50 rounded-xl">
                <p className="text-gray-500">
                    Aucun avis publié pour le moment.
                </p>
            </div>
        </>
    )}

</div>
                </div>

            </div>
        </div>
    );
}

export default ClientProfile;