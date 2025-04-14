
import { useEffect, useState } from "react";
import { getAccessTokenFromApi } from "../services/authService";

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccessTokenFromApi().then((token) => {
      setAccessToken(token);
      setLoading(false);
    });
  }, []);

  return { accessToken, loading };
}
