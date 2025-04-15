// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UsersPage from "./UsersPage";

type Page = "users" | "contact";

export default function HomePage() {
  const { accessToken, loading } = useAuth();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<Page>("users");

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/login");
    }
  }, [loading, accessToken, navigate]);

  const handleLogout = () => {
    // TODO : Ajouter la déconnexion via useAuth()
    navigate("/login");
  };

  const renderPage = () => {
    switch (activePage) {
      case "users":
        return <UsersPage />;
      case "contact":
        return <div>Page de contact (en cours de développement)</div>;
      default:
        return null;
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <nav className="flex gap-4 mb-6 border-b pb-2">
        <button onClick={() => setActivePage("users")} className="font-semibold hover:underline">
          Utilisateurs
        </button>
        <button onClick={() => setActivePage("contact")} className="font-semibold hover:underline">
          Contact
        </button>
        <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline ml-auto">
          Déconnexion
        </button>
      </nav>
      {renderPage()}
    </div>
  );
}
