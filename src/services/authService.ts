import { LoginRequest, AuthResponse } from "../types/auth";

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // important pour cookies !
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Échec de connexion");
  }

  return response.json();
};
