import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  useEffect(() => {api.get("/profile").then((response) => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!user) {
    return <p className="p-10 text-center text-gray-500">Chargement...</p>;
  }

  const handleUpdate = async (e) => {

    e.preventDefault();
    try {
        const response = await api.put("/profile", {
            name: name,
            email: email,
        });


        setUser(response.data.user);
        setEditMode(false);
    }catch (error){

        console.log(error);
    }
  };

  return (
    <div className="bg-[#faf8f9] min-h-screen p-6 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
          <span>Accueil</span>
          <span>›</span>
          <span>Professionnels</span>
          <span>›</span>
          <span className="text-gray-700 font-medium">{user.name || "Amina Beauty"}</span>
        </div>

        {/* Header / Cover Section */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-64 relative bg-pink-100">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
              alt="Cover"
              className="w-full h-full object-cover"
            />
            {/* Heart Button */}
            <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2.5 rounded-full shadow-sm text-gray-600 transition-all">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Profile Info Row */}
          <div className="px-8 pb-6 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="flex items-end gap-5">
              {/* Profile Avatar */}
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden -mt-12 bg-white relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Details */}
              <div className="mb-1">
                <div className="flex items-center gap-1.5">
{editMode ? (
    <div className="space-y-3 mt-4">
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Nom"
        />

        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Email"
        />
    </div>
) : (
    <h1 className="text-2xl font-bold">
        {user.name} ✓
    </h1>
)}                  <span className="bg-pink-100 text-[#9E3B68] rounded-full p-0.5 text-xs">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-0.5">Coiffeuse Professionnelle</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    ★ 4.9
                  </span>
                  <span className="text-gray-400">(120 avis)</span>
                  <span className="text-gray-300">•</span>
                  <span className="flex items-center gap-1 text-gray-500">
                    📍 Marrakech
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <button className="bg-[#9E3B68] hover:bg-[#882F57] text-white font-medium px-8 py-2.5 rounded-xl text-sm shadow-sm transition-all self-stretch md:self-auto text-center">
              Contacter
            </button>
            <button
    onClick={() => setEditMode(true)}
    className="bg-[#a63d75] text-white px-6 py-2 rounded-full whitespace-nowrap"
>
    Modifier le profil
</button>

{editMode && (
    <button
        onClick={handleUpdate}
        className="bg-[#a63d75] text-white px-6 py-2 rounded-full"
    >
        Enregistrer
    </button>
)}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-gray-200/60 mb-6 text-sm font-medium text-gray-500 px-2">
          <button className="pb-3 hover:text-gray-700">À propos</button>
          <button className="pb-3 border-b-2 border-[#9E3B68] text-[#9E3B68] font-semibold">
            Prestations
          </button>
          <button className="pb-3 hover:text-gray-700">Avis (120)</button>
          <button className="pb-3 hover:text-gray-700">Photos</button>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Side: Prestations List */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="font-bold text-gray-900 text-base mb-2">Prestations</h2>

            {/* Service Item 1 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=150&q=80"
                  alt="Coupe Femme"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Coupe Femme</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Coupe + Brushing</p>
                  <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-3">
                    <span>🕒 45 min</span>
                    <span>🏷️ 150 DH</span>
                  </p>
                </div>
              </div>
              <button className="bg-[#FDF2F7] text-[#9E3B68] font-medium px-5 py-2 rounded-xl text-xs hover:bg-[#FCE5F0] transition-colors">
                Réserver
              </button>
            </div>

            {/* Service Item 2 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=150&q=80"
                  alt="Brushing"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Brushing</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Brushing + Soin profond</p>
                  <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-3">
                    <span>🕒 30 min</span>
                    <span>🏷️ 100 DH</span>
                  </p>
                </div>
              </div>
              <button className="bg-[#FDF2F7] text-[#9E3B68] font-medium px-5 py-2 rounded-xl text-xs hover:bg-[#FCE5F0] transition-colors">
                Réserver
              </button>
            </div>

            {/* Service Item 3 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=150&q=80"
                  alt="Coloration"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Coloration</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Coloration complète (sans ammoniaque)
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-3">
                    <span>🕒 90 min</span>
                    <span>🏷️ 300 DH</span>
                  </p>
                </div>
              </div>
              <button className="bg-[#FDF2F7] text-[#9E3B68] font-medium px-5 py-2 rounded-xl text-xs hover:bg-[#FCE5F0] transition-colors">
                Réserver
              </button>
            </div>

            {/* Service Item 4 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=150&q=80"
                  alt="Lissage Brésilien"
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Lissage Brésilien</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Lissage + Soin Kératine</p>
                  <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-3">
                    <span>🕒 120 min</span>
                    <span>🏷️ 500 DH</span>
                  </p>
                </div>
              </div>
              <button className="bg-[#FDF2F7] text-[#9E3B68] font-medium px-5 py-2 rounded-xl text-xs hover:bg-[#FCE5F0] transition-colors">
                Réserver
              </button>
            </div>
          </div>

          {/* Right Side: Informations Pratiques */}
          <div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 text-base mb-4">
                Informations pratiques
              </h2>

              {/* Address */}
              <div className="flex items-start gap-3 mb-5">
                <span className="p-2 rounded-full bg-pink-50 text-[#9E3B68] text-xs mt-0.5">
                  📍
                </span>
                <div>
                  <h4 className="text-xs font-bold text-gray-800">Adresse</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Gueliz, Rue de la Liberté
                    <br />
                    Marrakech, Maroc
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <span className="p-2 rounded-full bg-pink-50 text-[#9E3B68] text-xs mt-0.5">
                  🕒
                </span>
                <div className="w-full">
                  <h4 className="text-xs font-bold text-gray-800">Horaires d'ouverture</h4>
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
                      <span className="text-pink-400">Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6 lg:w-2/3">
          <h2 className="font-bold text-gray-900 text-base mb-2">À propos</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Coiffeuse professionnelle avec plus de 8 ans d'expérience dans les salons de prestige. 
            Passionnée par mon métier, je vous accompagne pour révéler votre beauté naturelle.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Profile;