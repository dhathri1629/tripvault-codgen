import TripDetails from "./pages/TripDetails";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTrip from "./pages/AddTrip";
import EditTrip from "./pages/EditTrip";
import Favorites from "./pages/Favorites";
import AllPhotos from "./pages/AllPhotos";
import PublicProfile from "./pages/PublicProfile";

import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>

                {/* Default */}
                <Route
                    path="/"
                    element={
                        <Navigate to="/register" />
                    }
                />

                {/* Authentication */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Add Trip */}
                <Route
                    path="/add-trip"
                    element={
                        <ProtectedRoute>
                            <AddTrip />
                        </ProtectedRoute>
                    }
                />

                {/* Edit Trip */}
                <Route
                    path="/edit-trip/:id"
                    element={
                        <ProtectedRoute>
                            <EditTrip />
                        </ProtectedRoute>
                    }
                />

                {/* Favorites */}
                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    }
                />

                {/* All Uploaded Photos */}
                <Route
                    path="/photos"
                    element={
                        <ProtectedRoute>
                            <AllPhotos />
                        </ProtectedRoute>
                    }
                />

                {/* Public Profile */}
                <Route
                    path="/profile/:username"
                    element={<PublicProfile />}
                />

            </Routes>
        </Router>
    );
}

export default App;