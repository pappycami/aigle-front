import { useState } from "react";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { setAccessToken } = useAuth();
  const [email, setEmail] = useState("user@mail.com"); // valeur par défaut pour test
  const [password, setPassword] = useState("password123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password });
      setAccessToken(accessToken); // stocké en mémoire (refresh reste en cookie)
      navigate("/"); // redirige vers la page d'accueil
    } catch (err) {
      setError("Email ou mot de passe invalide");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded"
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
