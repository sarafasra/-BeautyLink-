import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
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
   <Route path="/services"  element={<Services/>}/>
            
            </Routes>

         
        </BrowserRouter>
    );
}

export default App;