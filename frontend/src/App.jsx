import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Reservations from "./pages/Reservations";
import Services from "./pages/Services";
import CreateReservation from "./pages/CreateReservation";
import ClientReservations from "./pages/ClientReservations";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/services" element={<Services />} />

                <Route path="/services/ajouter" element={<Services />} />

                <Route path="/reservations" element={<Reservations />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/profile" element={<Profile />} />

                <Route
                    path="/reservations/create/:serviceId"
                    element={<CreateReservation />}
                />

                <Route
                    path="/client/reservations"
                    element={<ClientReservations />}
                />

                <Route
                    path="/client.dashboard"
                    element={<Dashboard />}
                />
                <Route path="/client/dashboard" element={<Dashboard />} />
<Route path="/profile" element={<Profile />} />
   <Route path="/services"  element={<Services/>}/>
   <Route path="/services/ajouter" element={<Services />} />
   
            <Route
    path="/reservations/create/:serviceId"
    element={<CreateReservation />}
/>

<Route
    path="/client/reservations"
    element={<ClientReservations />}
/>
  <Route path="/services" element={<Services />} />

                <Route path="/services/ajouter" element={<Services />} />

                <Route path="/reservations" element={<Reservations />} />

                <Route
                    path="/reservations/create/:serviceId"
                    element={<CreateReservation />}
                />

                <Route
                    path="/client/reservations"
                    element={<ClientReservations />}
                />

                {/* Ancienne URL du dashboard client */}
                <Route
                    path="/client.dashboard"
                    element={<Dashboard />}
                />

            </Routes>

              

            
        </BrowserRouter>
    );
}

export default App;