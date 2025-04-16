import { useEffect, useState, ReactNode, } from "react";
import { getAccessTokenFromApi, logoutFromApi } from "@services/authService";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const logout = async () => {
      try {
        await logoutFromApi();
      } catch (err) {
        console.error("Erreur lors de la déconnexion côté serveur", err);
      }
    
      // Nettoyage côté client
      setAccessToken(null);
      // Supprime cookies client manuellement si besoin (JS ne peut pas supprimer HttpOnly)
      document.cookie = "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    };
  
    useEffect(() => {
      getAccessTokenFromApi().then((token) => {
        setAccessToken(token);
        setLoading(false);
      });
    }, []);
  
    return (
      <AuthContext.Provider value={{ accessToken, setAccessToken, loading, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };