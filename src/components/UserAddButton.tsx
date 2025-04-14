// src/components/UserAddButton.tsx
import { User } from "../types/user";

interface Props {
  onAddClick: (user: User) => void;
}

export default function UserAddButton({ onAddClick }: Props) {
  const emptyUser: User = {
    email: "",
    role: "USER",
    profile: {
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
      birthDate: "",
    },
    groups: [],
  };

  return (
    <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => onAddClick(emptyUser)}>
      Ajouter un utilisateur
    </button>
  );
}
