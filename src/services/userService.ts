import { User } from "@/types/user";
import api from "@/configs/apiBack";

const myHeaders = (token: string|null): object => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
}

export const getAllUsers = async (accessToken: string|null): Promise<User[]> => {
  const res = await api.get("/users", myHeaders(accessToken));
  console.log(res);
  return res.data;
};

export const createUser = async (user: Omit<User, "id">, accessToken: string|null): Promise<User> => {
  const res = await api.post("/users", user, myHeaders(accessToken));
  return res.data;
};

export const updateUser = async (user: User, accessToken: string|null): Promise<User> => {
  const res = await api.put(`/users/${user.id}`, user, myHeaders(accessToken));
  return res.data;
};

export const deleteUser = async (id: number|undefined, accessToken: string|null): Promise<void> => {
  const res = await api.delete(`/users/${id}`, myHeaders(accessToken));
  return res.data;
};
