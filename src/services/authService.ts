import api from "@/configs/apiBack";
import { LoginRequest, AuthResponse } from "@/types/auth";

export const loginFromApi = async (credentials: LoginRequest): Promise<AuthResponse|string> => {
  try {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  } catch (err: unknown) {
    if(err instanceof Error) {
      console.error("Erreur lors de la Autentification :", err.message);
    }
    return "";
  }
};

export const getAccessTokenFromApi = async (): Promise<string|null> => {
  try {
    const res = await api.post("/auth/refresh");
    return res.data.accessToken || null;
  } catch (err: unknown) {
    if(err instanceof Error) {
      console.error("Erreur lors de la récupération du token :", err.message);
    }
    return null;
  }
}

export const logoutFromApi = async (): Promise<null> => {
  const res = await api.delete("/auth/logout");
  return res.data;

}