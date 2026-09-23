import { useEffect, useState } from "react";
import { MapPin, Star, Clock, CheckCircle } from "lucide-react";
import api from "../services/api";
import ClientProfile from "./ClientProfile";

function Profile() {
  const [user, setUser] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");

  const [activeTab, setActiveTab] = useState("Prestations");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [reviews, setReviews] = useState([]);

 useEffect(() => {
  const getProfile = async () => {
    try {
      const response = await api.get("/profile");

      setUser(response.data);

      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone || "");
      setCity(response.data.city || "");
      setProfession(response.data.profession || "");
      setBio(response.data.bio || "");

      const reviewsResponse = await api.get(
        `/professionals/${response.data.id}/reviews`
      );

      setReviews(reviewsResponse.data);

      console.log("Mes avis :", reviewsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  getProfile();
}, []);

  if (!user) {
    return (
      <p className="p-10 text-center text-gray-500">
        Chargement...
      </p>
    );
  }

  if (user.role === "client") {
    return <ClientProfile user={user} />;
  }

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("profession", profession);
    formData.append("bio", bio);

    if (profilePhoto) {
      formData.append("profile_photo", profilePhoto);
    }

    formData.append("_method", "PUT");

    await api.post("/profile", formData);

    const updatedUser = await api.get("/profile");
    setUser(updatedUser.data);

    setProfilePhoto(null);
    setEditMode(false);

  } catch (error) {
    console.log(error.response?.data || error);
  }
};

  return (
    <div className="bg-[#faf8f9] min-h-screen p-6 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto">

        <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
          <span>Accueil</span>
          <span>›</span>
          <span>Professionnels</span>
          <span>›</span>
          <span className="text-gray-700 font-medium">
            {user.name || "Professionnel"}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">

          <div className="h-64 relative bg-pink-100">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
              alt="Cover"
              className="w-full h-full object-cover"
            />

            <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2.5 rounded-full shadow-sm text-gray-600 transition-all">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          <div className="px-8 pb-6 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4">

            <div className="flex items-end gap-5">

              <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden -mt-12 bg-white relative z-10">
                <img
                  src={
                    user.profile_photo
                      ? `http://127.0.0.1:8002/storage/${user.profile_photo}`
                      : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                  }
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mb-1">

                {editMode ? (
                  <div className="space-y-3 w-full min-w-[280px]">

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#9E3B68]"
                      placeholder="Nom"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setProfilePhoto(e.target.files[0])
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#9E3B68]"
                      placeholder="Email"
                    />

                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#9E3B68]"
                      placeholder="Téléphone"
                    />

                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#9E3B68]"
                      placeholder="Ville"
                    />

                    <input
                      type="text"
                      value={profession}
                      onChange={(e) =>
                        setProfession(e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#9E3B68]"
                      placeholder="Profession"
                    />

                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#9E3B68]"
                      placeholder="À propos de vous"
                      rows="4"
                    />

                    <div className="flex gap-2 pt-1">

                      <button
                        onClick={handleUpdate}
                        className="bg-[#a63d75] text-white px-5 py-2 rounded-full text-sm"
                      >
                        Enregistrer
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="bg-gray-100 text-gray-600 px-5 py-2 rounded-full text-sm"
                      >
                        Annuler
                      </button>

                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5">
                      <h1 className="text-2xl font-bold">
                        {user.name}
                      </h1>

                      <span className="bg-pink-100 text-[#9E3B68] rounded-full p-0.5 text-xs">
                        <CheckCircle size={16} />
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm mt-0.5">
                      {user.profession || "Professionnel de beauté"}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">

                      <span className="text-amber-500 font-bold flex items-center gap-0.5">
                        <Star size={15} fill="currentColor" />
                        
                      </span>

                    Avis ({reviews.length})

                     

                      <span className="flex items-center gap-1 text-gray-500">
                        {user.city || "Ville non renseignée"}
                        <MapPin size={14} />
                      </span>

                    </div>
                  </>
                )}

              </div>
            </div>

            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-[#a63d75] text-white px-6 py-2 rounded-full whitespace-nowrap"
              >
                Modifier le profil
              </button>
            )}

          </div>
        </div>

        <div className="flex gap-8 border-b border-gray-200/60 mb-6 text-sm font-medium text-gray-500 px-2">

          <button
            onClick={() => setActiveTab("À propos")}
            className={`pb-3 ${
              activeTab === "À propos"
                ? "border-b-2 border-[#9E3B68] text-[#9E3B68] font-semibold"
                : "hover:text-gray-700"
            }`}
          >
            À propos
          </button>

          <button
            onClick={() => setActiveTab("Prestations")}
            className={`pb-3 ${
              activeTab === "Prestations"
                ? "border-b-2 border-[#9E3B68] text-[#9E3B68] font-semibold"
                : "hover:text-gray-700"
            }`}
          >
            Prestations
          </button>

         <button 
  onClick={() => setActiveTab("Avis")} 
  className={`pb-3 ${
    activeTab === "Avis" 
      ? "border-b-2 border-[#9E3B68] text-[#9E3B68] font-semibold" 
      : "hover:text-gray-700"
  }`}
>
  Avis
</button>

        </div>

        {activeTab === "Prestations" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-3">

              <h2 className="font-bold text-gray-900 text-base mb-2">
                Prestations
              </h2>

              {user.services && user.services.length > 0 ? (
                user.services.map((service) => (

                  <div
                    key={service.id}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-4"
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={
                          service.image
                            ? service.image
                            : "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=150&q=80"
                        }
                        alt={service.title}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div>

                        <h3 className="font-bold text-gray-800 text-sm">
                          {service.title}
                        </h3>

                        <p className="text-xs text-gray-400 mt-0.5">
                          {service.description}
                        </p>

                        <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-3">

                          <span className="flex items-center gap-1">
                            <Clock size={13} />
                            {service.duration} min
                          </span>

                          <span>
                            {service.price} DH
                          </span>

                        </p>

                      </div>

                    </div>

                  </div>

                ))
              ) : (
                <div className="bg-white rounded-2xl p-6 text-center text-sm text-gray-400 border border-gray-100">
                  Aucune prestation disponible pour le moment.
                </div>
              )}

            </div>

            <div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                <h2 className="font-bold text-gray-900 text-base mb-4">
                  Informations pratiques
                </h2>

                <div className="flex items-start gap-3 mb-5">

                  <span className="p-2 rounded-full bg-pink-50 text-[#9E3B68] text-xs mt-0.5">
                    <MapPin size={14} />
                  </span>

                  <div>

                    <h4 className="text-xs font-bold text-gray-800">
                      Ville
                    </h4>

                    <p className="text-xs text-gray-400 mt-1">
                      {user.city || "Ville non renseignée"}
                    </p>

                    <h4 className="text-xs font-bold text-gray-800 mt-3">
                      Téléphone
                    </h4>

                    <p className="text-xs text-gray-400 mt-1">
                      {user.phone || "Téléphone non renseigné"}
                    </p>

                  </div>
                </div>

                <div className="flex items-start gap-3">

                  <span className="p-2 rounded-full bg-pink-50 text-[#9E3B68] text-xs mt-0.5">
                    <Clock size={13} />
                  </span>

                  <div className="w-full">

                    <h4 className="text-xs font-bold text-gray-800">
                      Horaires d'ouverture
                    </h4>

                    <div className="text-xs text-gray-400 mt-2 space-y-1.5">

                      <div className="flex justify-between">
                        <span>Lun - Ven</span>
                        <span>09h00 - 19h00</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Samedi</span>
                        <span>10h00 - 18h00</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Dimanche</span>
                        <span className="text-pink-400">
                          Fermé
                        </span>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {activeTab === "À propos" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <h2 className="font-bold text-gray-900 text-base mb-2">
              À propos
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed">
              {user.bio || "Aucune description pour le moment."}
            </p>

          </div>
        )}

      {activeTab === "Avis" && (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

    <h2 className="font-bold text-gray-900 text-base mb-4">
      Avis
    </h2>

    {reviews.length > 0 ? (
      <div className="space-y-5">

        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-5"
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="font-semibold text-gray-800">
                  {review.user?.name || "Client"}
                </p>

                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                      fill={
                        star <= review.rating
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
              </div>

              <span className="text-xs text-gray-400">
                {new Date(review.created_at).toLocaleDateString("fr-FR")}
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-3">
              {review.comment || "Aucun commentaire."}
            </p>

          </div>
        ))}

      </div>
    ) : (
      <p className="text-sm text-gray-500">
        Aucun avis à afficher pour le moment.
      </p>
    )}

  </div>
)}

      </div>
    </div>
  );
}

export default Profile;