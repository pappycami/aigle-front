import { User } from "../types/user";
import { API_BASE_URL } from "../configs/Aigle";

const API_URL = `${API_BASE_URL}/users`; 

export const getAllUsers = async (accessToken: string|null): Promise<User[]> => {
  const res = await fetch(API_URL , {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs");
  return res.json();
};

export const createUser = async (user: Omit<User, "id">, accessToken: string|null): Promise<User> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json" 
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Erreur lors de la création");
  return res.json();
};

export const updateUser = async (user: User, accessToken: string|null): Promise<User> => {
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  
  if (!res.ok) {
    const errorText = await res.text(); 
    console.error("Erreur PUT:", errorText);
    throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  } 
  return res.json();
};

export const deleteUser = async (id: number|undefined, accessToken: string|null): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Erreur lors de la suppression");
};
