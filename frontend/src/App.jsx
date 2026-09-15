import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Reservations from "./pages/Reservations";
function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                   <Route
                    path="/dashboard"
                    element={<Dashboard />}
                    
                />
<Route path="/profile" element={<Profile />} />
<Route  path="reservations" element={<Reservations/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;