import { useState, useEffect } from "react";
import { User } from "../types/user";

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

export default function UserForm({ user, isOpen, onClose, onSave }: Props) {
  const [editedUser, setEditedUser] = useState<User | null>(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return;
    const { name, value } = e.target;

    if (name.startsWith("profile.")) {
      const profileField = name.split(".")[1];
      setEditedUser({
        ...editedUser,
        profile: {
          ...editedUser.profile,
          [profileField]: value,
        },
      });
    } else {
      setEditedUser({
        ...editedUser,
        [name]: value,
      });
    }
  };

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (editedUser) onSave(editedUser);
  };

  if (!isOpen || !editedUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Modifier l'utilisateur</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={editedUser.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Email"
          />
          <input
            name="role"
            type="text"
            value={editedUser.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Rôle"
          />
          <input
            name="profile.firstname"
            type="text"
            value={editedUser.profile?.firstname || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Prénom"
          />
          <input
            name="profile.lastname"
            type="text"
            value={editedUser.profile?.lastname || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Nom"
          />
          <input
            name="profile.phone"
            type="text"
            value={editedUser.profile?.phone || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Téléphone"
          />

          <div className="flex justify-end space-x-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose} >
              Annuler
            </button>
            <button
              type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
