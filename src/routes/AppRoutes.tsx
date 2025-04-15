import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import HomePage from "../pages/HomePage";
import UsersPage from "../pages/UsersPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Routes protégées */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <ContactPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
