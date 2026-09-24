import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Reservations from "./pages/Reservations";
import Services from "./pages/Services";
import CategoryServices from "./pages/CategoryServices";
import CreateReservation from "./pages/CreateReservation";
import ClientReservations from "./pages/ClientReservations";
import Home from "./pages/Home";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import ClientFavorites from "./pages/ClientFavorites";
import ProfessionalLayout from "./components/ProfessionalLayout";
import ClientLayout from "./components/ClientLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/services/category/:categoryId"
                    element={<CategoryServices />}
                />

                <Route
                    path="/professional/:id"
                    element={<ProfessionalProfile />}
                />

                {/* Professionnel */}
                <Route element={<ProfessionalLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/services"
                        element={<Services />}
                    />

                    <Route
                        path="/services/ajouter"
                        element={<Services />}
                    />

                    <Route
                        path="/reservations"
                        element={<Reservations />}
                    />

                </Route>

                {/* Client */}
                <Route element={<ClientLayout />}>

                    <Route
                        path="/client/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/client/reservations"
                        element={<ClientReservations />}
                    />

                    <Route
                        path="/reservations/create/:serviceId"
                        element={<CreateReservation />}
                    />

                    <Route
                        path="/client/favorites"
                        element={<ClientFavorites />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;