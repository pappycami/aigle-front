import { LoginRequest, AuthResponse } from "../types/auth";
import { API_BASE_URL } from "../configs/Aigle";

export const loginFromApi = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Échec de connexion");
  }

  return response.json();
};

export const getAccessTokenFromApi = async (): Promise<string | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      console.warn("Erreur de rafraîchissement de token");
      return null;
    }

    const data = await res.json();
    return data.accessToken || null;
  } catch (err) {
    console.error("Erreur lors de la récupération du token :", err);
    return null;
  }
}

export const logoutFromApi = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Échec de deconnexion");
  }
  return response.json();

}