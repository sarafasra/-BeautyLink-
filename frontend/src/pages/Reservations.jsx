import {Search,CalendarDays,Clock,CheckCircle,Pencil,X,} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";

function Reservations() {
    const [reservations, setReservation] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        api.get("/professional/reservations")
        .then((response) => {
            setReservation(response.data);
        })
        .catch((error) => {
            console.log(error);
            
        }) 
       
    }, []
);


         const today = new Date().toISOString().split("T")[0];
         const todayReservations = reservations.filter(
            (reservation) => reservation.date === today
         );

         const pendingReservations = reservations.filter(
            (reservation) => reservation.status === "pending"
         );

const filteredReservations = reservations.filter((reservation) => {
    const searchName = reservation.user?.name?.toLowerCase();
    const searchValue = search.toLowerCase();

    if (search !== "" && !searchName?.includes(searchValue)) {
        return false;
    }

    if (statusFilter !== "all" && reservation.status !== statusFilter) {
        return false;
    }

    return true;
});
 const confirmReservation = (id) => {
    api.put(`/reservations/${id}/status`, {
        status: "accepted",
    })
    .then(() => {
        const updatedReservations = reservations.map((reservation) => {
            if (reservation.id === id) {
                return {
                    ...reservation,
                    status: "accepted",
                };
            }

            return reservation;
        });

        setReservation(updatedReservations);
    })
    .catch((error) => {
        console.log(error);
    });
};
const refuseReservation = (id) => {
    api.put(`/reservations/${id}/status`, {
        status: "refused",
    })
        .then(() => {
            const updatedReservations = reservations.map((reservation) => {
                if (reservation.id === id) {
                    return {
                        ...reservation,
                        status: "refused",
                    };
                }

                return reservation;
            });

            setReservation(updatedReservations);
        })
        .catch((error) => {
            console.log(error);
        });
};


const weekReservations = reservations.filter((reservation) => {
    const date = new Date(reservation.date);
    const today = new Date();

    const diff = today - date;
    const days = diff / (1000 * 60 * 60 * 24 );

    return days >= 0 && days <= 7;
});
    return (
        <div className="min-h-screen bg-[#faf9f9] p-8">

            <div className="flex justify-between items-start mb-7">
                <div>
                    <h1 className="text-2xl font-bold text-[#A33F70]">
                        Mes Réservations
                    </h1>

                    <p className="text-xs text-gray-500 mt-1">
                        Gérez vos rendez-vous et plannings.
                    </p>
                </div>

                <div className="relative">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Rechercher un client..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-48 h-8 pl-9 pr-3 text-xs border border-gray-200 rounded-md outline-none focus:border-[#A33F70]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5 mb-7">

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#df72a8] flex items-center justify-center text-white">
                            <CalendarDays size={16} />
                        </div>

                        <div>
                            <p className="text-[9px] text-gray-500 uppercase">
                                Aujourd'hui
                            </p>

                            <p className="text-sm font-bold text-[#252525]">
    {todayReservations.length} Rendez-vous
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f6d3e2] flex items-center justify-center text-[#A33F70]">
                            <Clock size={16} />
                        </div>

                        <div>
                            <p className="text-[9px] text-gray-500 uppercase">
                                En attente
                            </p>

                            <p className="text-sm font-bold text-[#252525]">
{pendingReservations.length} Demandes                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#b46be8] flex items-center justify-center text-white">
                            <CheckCircle size={16} />
                        </div>

                        <div>
                            <p className="text-[9px] text-gray-500 uppercase">
                                Cette semaine
                            </p>

                            <p className="text-sm font-bold text-[#252525]">
{weekReservations.length} Réservations                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-sm font-bold text-[#252525]">
                        Prochains Rendez-vous
                    </h2>

                    <div className="flex gap-2">
                    <button
    onClick={() => setStatusFilter("all")}
className={`px-4 py-1 rounded-full text-[10px] ${
    statusFilter === "all"
        ? "bg-[#d76ca1] text-white"
        : "bg-gray-50 text-gray-600"}`}>
                           Tous
                     </button>

                               <button
                                onClick={() => setStatusFilter("confirmed")}
                                className={`px-4 py-1 rounded-full text-[10px] ${statusFilter === "all"? "bg-[#d76ca1] text-white" : "bg-gray-50 text-gray-600"}`}>
                               Confirmés
                           </button>

                      <button
                     onClick={() => setStatusFilter("pending")}
                    className={`px-4 py-1 rounded-full text-[10px] ${statusFilter === "all" ? "bg-[#d76ca1] text-white"
                     : "bg-gray-50 text-gray-600"}`}>
                           En attente
                      </button>
                    </div>
                </div>

{filteredReservations.map((reservation) => (    <div
        key={reservation.id}
        className="px-5 py-4 border-b border-gray-100 flex items-center justify-between"
    >
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#eadfd7] flex items-center justify-center text-xs font-semibold">
                {reservation.user?.name?.charAt(0)}
            </div>

            <div>
                <p className="text-xs font-bold">
                    {reservation.user?.name}
                </p>

                <p className="text-[9px] text-gray-500">
                     {reservation.service?.title}
                </p>
            </div>
        </div>

        <div className="flex items-center gap-3">

            <div className="text-right">
                <p className="text-[10px] font-semibold">
                    {reservation.date}
                </p>

                <p className="text-[9px] text-[#A33F70]">
                    {reservation.time}
                </p>
            </div>

            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-[8px] font-semibold">
                {reservation.status}
            </span>
{reservation.status === "pending" && (
    <button
        onClick={() => confirmReservation(reservation.id)}
        className="px-3 py-1 rounded-md bg-[#d76ca1] text-white text-[9px]"
    >
        Accepter
    </button>
)}{reservation.status === "pending" && (
    <>
        <button
            onClick={() => confirmReservation(reservation.id)}
            className="px-3 py-1 rounded-md bg-[#d76ca1] text-white text-[9px]"
        >
            Accepter
        </button>

        <button
            onClick={() => refuseReservation(reservation.id)}
            className="px-3 py-1 rounded-md border border-red-200 text-red-500 text-[9px] hover:bg-red-50"
        >
            Refuser
        </button>
    </>
)}

        </div>
    </div>
))}

                <div className="py-4 text-center">
                    <button className="text-[10px] font-semibold text-[#A33F70]">
                        Voir plus de réservations
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Reservations;