import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { loginFromApi } from "../services/authService";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { accessToken, setAccessToken, loading } = useAuth();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && accessToken) {
      navigate("/");
    }
  }, [loading, accessToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accessToken } = await loginFromApi({ email, password });
      setAccessToken(accessToken);
      toast.success("Vous êtes Authentifier");
      navigate("/");
    } catch (err) {
      toast.error("Erreur d'authentification");
      setError("Email ou mot de passe invalide");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" placeholder="Mot de passe" className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}
