import { Routes,Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UpdateRestaurant } from "./pages/UpdateRestaurant";
import { AdminDashboard } from "./pages/AdminDashboard";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./Components/PrivateRoute";

function App(){
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/admin/dashboard" element={
                    <PrivateRoute role="admin">
                        <AdminDashboard/>
                    </PrivateRoute>
                } />
                <Route path="/admin/restaurants/update" element={
                    <PrivateRoute role="admin">
                        <UpdateRestaurant/>
                    </PrivateRoute>
                } />
                <Route path="/customer/dashboard" element={
                    <PrivateRoute role="customer">
                        <CustomerDashboard/>
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider>
    );
}
export default App;