import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAllUsers } from "../services/userService";

export default function HomePage() {
  const { accessToken, loading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/login");
    }
  }, [loading, accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      getAllUsers(accessToken)
        .then((data) => setUsers(data))
        .catch((err) => {
          console.error(err);
          setError("Erreur lors du chargement des utilisateurs");
        });
    }
  }, [accessToken]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="border p-4 rounded shadow">
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Nom :</strong> {user.profile?.firstname} {user.profile?.lastname}</p>
            <p><strong>Rôle :</strong> {user.role}</p>
            <p><strong>Groupes :</strong> {user.groups.map((g: any) => g.name).join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
