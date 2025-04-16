import { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { loginFromApi } from "@services/authService";
import { toast } from "react-hot-toast";

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
      console.error(err);
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="max-w-md p-6 mx-auto mt-10 shadow">
      <h2 className="mb-4 text-2xl font-bold">Connexion</h2>
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" placeholder="Mot de passe" className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded">
          Se connecter
        </button>
      </form>
    </div>
  );
}
