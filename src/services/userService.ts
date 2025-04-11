import { User } from "../types/user";

const API_URL = "http://localhost:8080/api/users"; // adapte si besoin

export const getAllUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs");
  return res.json();
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return res.json();
};

export const updateUser = async (user: User): Promise<User> => {
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
};
