import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Services() {
    const navigate = useNavigate();
  const isAddPage = window.location.pathname === "/services/ajouter";

  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState("");
  const[selectedCategory, setSelectedCategory] = useState("Toutes");

  const [newService, setNewService] = useState({
    category_id: 1,
    title: "",
    description: "",
    price: "",
    duration: "",
  });
  useEffect(() => {
    getServices();
  }, []);
const addService = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/services", newService);

    setServices([...services, response.data.service]);

    setNewService({
      category_id: 1,
      title: "",
      description: "",
      price: "",
      duration: "",
    });

    setMessage("Prestation ajoutée avec succès");

  } catch (error) {
    console.log(error.response?.data);
  }
};
  const getServices = async () => {
    try {
      const response = await api.get("/services");
setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateService = async (e) => {
    e.preventDefault();

    try {
        const response = await api.put(
            `/services/${editingService.id}`, 
            editingService
        );

        setServices(
            services.map((service) =>service.id === editingService.id
        ? response.data.service
    :service
)
        );
        setEditingService(null);
    } catch (error) {
    console.log(error.response?.data);
}
  };

  const deleteService = async (id) => {
    try {
      await api.delete(`/services/${id}`);

      setServices(
        services.filter((service) => service.id !==id)
      );
          setMessage("Prestation supprimée avec succès");

    }catch (error){
      console.log(error.response?.data);
      
    }
  };
  if (isAddPage) {
  return (
    <div className="min-h-screen bg-pink-50/40 p-8">

      <h1 className="text-2xl font-bold mb-6">
        Ajouter une prestation
      </h1>
      {message && (
  <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4 max-w-xl">
    ✅ {message}
  </div>
)}


      <form onSubmit={addService} className="bg-white p-6 rounded-2xl max-w-xl">

        <input
          type="text"
          placeholder="Nom de la prestation"
          value={newService.title}
          onChange={(e) =>
            setNewService({
              ...newService,
              title: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-4"
        />

        <textarea
          placeholder="Description"
          value={newService.description}
          onChange={(e) =>
            setNewService({
              ...newService,
              description: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-4"
        />
        <select
  value={newService.category_id}
  onChange={(e) =>
    setNewService({
      ...newService,
      category_id: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3 mb-4"
>
  <option value="1">Coiffeure</option>
  <option value="2">Maquillage</option>
  <option value="3">Onglerie</option>
</select>

        <input
          type="number"
          placeholder="Prix"
          value={newService.price}
          onChange={(e) =>
            setNewService({
              ...newService,
              price: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="number"
          placeholder="Durée"
          value={newService.duration}
          onChange={(e) =>
            setNewService({
              ...newService,
              duration: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-4"
        />

        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-[#9A3B68] text-white px-5 py-2 rounded-lg"
          >
            Ajouter
          </button>

          <button
            type="button"
            onClick={() => navigate("/services")}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            Annuler
          </button>

        </div>

      </form>
    </div>
  );
}
  if (editingService)
     {
        console.log("EDITING SERVICE:", editingService);
  return (
    <div className="min-h-screen bg-pink-50/40 p-8">
     
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Modifier la prestation
      </h1>

      <form
        onSubmit={updateService}
        className="bg-white p-6 rounded-2xl shadow-sm max-w-xl"
      >
        <input
          type="text"
          value={editingService.title}
          onChange={(e) =>
            setEditingService({
              ...editingService,
              title: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Titre"
        />

        <textarea
          value={editingService.description}
          onChange={(e) =>
            setEditingService({
              ...editingService,
              description: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Description"
        />
        <select
  value={editingService.category_id}
  onChange={(e) =>
    setEditingService({
      ...editingService,
      category_id: e.target.value,
    })
  }
  className="w-full border rounded-lg p-3 mb-4"
>
  <option value="1">Coiffeure</option>
  <option value="2">Maquillage</option>
  <option value="3">Onglerie</option>
</select>

        <input
          type="number"
          value={editingService.price}
          onChange={(e) =>
            setEditingService({
              ...editingService,
              price: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Prix"
        />

        <input
          type="number"
          value={editingService.duration}
          onChange={(e) =>
            setEditingService({
              ...editingService,
              duration: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3 mb-6"
          placeholder="Durée"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#9A3B68] text-white px-5 py-2 rounded-lg"
          >
            Enregistrer
          </button>

          <button
            type="button"
            onClick={() => setEditingService(null)}
            className="bg-gray-200 px-5 py-2 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
const filteredServices = selectedCategory === "Toutes"
? services
: services.filter(
  (service) => service.category?.name === selectedCategory
);

  return (
    <div className="min-h-screen bg-pink-50/40 p-8">
      {/* Header section */}
       {showAddForm && (
  <form
    onSubmit={addService}
    className="bg-white p-6 rounded-2xl shadow-sm max-w-xl mb-6"
  >
    <h2 className="text-xl font-bold mb-4">
      Ajouter une prestation
    </h2>

    <input
      type="text"
      value={newService.title}
      onChange={(e) =>
        setNewService({
          ...newService,
          title: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3 mb-4"
      placeholder="Titre"
    />

    <textarea
      value={newService.description}
      onChange={(e) =>
        setNewService({
          ...newService,
          description: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3 mb-4"
      placeholder="Description"
    />

    <input
      type="number"
      value={newService.price}
      onChange={(e) =>
        setNewService({
          ...newService,
          price: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3 mb-4"
      placeholder="Prix"
    />

    <input
      type="number"
      value={newService.duration}
      onChange={(e) =>
        setNewService({
          ...newService,
          duration: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3 mb-4"
      placeholder="Durée en minutes"
    />

    <div className="flex gap-3">
      <button
        type="submit"
        className="bg-[#9A3B68] text-white px-5 py-2 rounded-lg"
      >
        Ajouter
      </button>

      <button
        type="button"
        onClick={() => setShowAddForm(false)}
        className="bg-gray-200 px-5 py-2 rounded-lg"
      >
        Annuler
      </button>
    </div>
  </form>
)}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes prestations</h1>
          <p className="text-sm text-gray-500">Gérez vos services, durées et tarifs.</p>
        </div>
     <button
  onClick={() => navigate("/services/ajouter")}
  className="bg-[#9A3B68] text-white px-5 py-3 rounded-xl"
>
  + Ajouter une prestation
</button>
      </div>
  {message && (
      <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-6">
        ✅ {message}
      </div>
    )}
      {/* Filter Tabs */}
<div className="flex gap-2 mb-8">

  <button
    onClick={() => setSelectedCategory("Toutes")}
    className={`px-4 py-1.5 rounded-full text-xs font-medium ${
      selectedCategory === "Toutes"
        ? "bg-[#E8A5C2] text-white"
        : "bg-white text-gray-700 border border-gray-200"
    }`}
  >
    Toutes
  </button>

  <button
    onClick={() => setSelectedCategory("Coiffeure")}
    className={`px-4 py-1.5 rounded-full text-xs font-medium ${
      selectedCategory === "Coiffeure"
        ? "bg-[#E8A5C2] text-white"
        : "bg-white text-gray-700 border border-gray-200"
    }`}
  >
    Coiffeure
  </button>

  <button
    onClick={() => setSelectedCategory("Maquillage")}
    className={`px-4 py-1.5 rounded-full text-xs font-medium ${
      selectedCategory === "Maquillage"
        ? "bg-[#E8A5C2] text-white"
        : "bg-white text-gray-700 border border-gray-200"
    }`}
  >
Maquillage  </button>

  <button
    onClick={() => setSelectedCategory("Onglerie")}
    className={`px-4 py-1.5 rounded-full text-xs font-medium ${
      selectedCategory === "Onglerie"
        ? "bg-[#E8A5C2] text-white"
        : "bg-white text-gray-700 border border-gray-200"
    }`}
  >
    Onglerie
  </button>

</div>
  

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <p className="text-gray-500">Aucune prestation disponible.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image & Duration Badge */}
                <div className="relative h-44 bg-gray-100">
                  <img
                    src={service.image || "https://via.placeholder.com/300"}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    ⏱ <span>{service.duration} min</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                      {service.title}
                    </h2>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#9A3B68] block leading-none">
                        {service.price}
                      </span>
                      <span className="text-xs font-bold text-[#9A3B68]">DH</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 mt-2">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex items-center gap-2">
               <button
  onClick={() => setEditingService(service)}
  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg flex items-center justify-center gap-1"
>
  ✏️ Modifier
</button>
                <button
 onClick={() => deleteService(service.id)}
  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50"
>
  🗑️
</button>
              </div>
            </div>
          ))}

          {/* Card Nouvelle Prestation (Dashed) */}
          <div  
                      onClick={() => navigate("/services/ajouter")}
 
          className="border-2 border-dashed border-pink-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-pink-50/20 min-h-[320px] cursor-pointer hover:bg-pink-50/40">

            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold mb-3">
              +
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">
              Nouvelle Prestation
            </h3>
            <p className="text-xs text-gray-400 max-w-[180px]">
              Cliquez pour ajouter un nouveau service à votre catalogue.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;