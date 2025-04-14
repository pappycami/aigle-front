import { createContext, useEffect, useState } from "react";
import { getAccessTokenFromApi } from "../services/authService";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Vérifie s'il y a un token en session (ex: si déjà connecté)
  useEffect(() => {
    (async () => {
      const token = await getAccessTokenFromApi(); // va ping le backend
      if (token) {
        setAccessToken(token);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
