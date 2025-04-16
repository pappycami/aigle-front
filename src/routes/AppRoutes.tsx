import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import PrivateLayout from "../layouts/PrivateLayout";
import HomePage from "../pages/HomePage";
import UsersPage from "../pages/UsersPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={
          <PrivateRoute>
            <PrivateLayout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
