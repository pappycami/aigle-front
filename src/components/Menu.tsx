import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function Menu() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Vous êtes deconnecté");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-blue-600 p-4 text-white shadow">
      <h1 className="text-xl font-bold">Aigle 🦅</h1>
      <ul className="flex gap-4">
        <li>
          <Link to="/users" className="hover:underline">Utilisateurs</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="hover:underline">
            Déconnexion
          </button>
        </li>
      </ul>
    </nav>
  );
}
