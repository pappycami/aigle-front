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
  const [formErrors, setFormErrors] = useState<Partial<Record<string, string>>>({});

  useEffect(() => {
    setEditedUser(user);
    setFormErrors({});
  }, [user]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        if (!value) return "L'email est requis.";
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return "Format email invalide.";
        return "";
      case "role":
        if (!value) return "Le rôle est requis.";
        return "";
      case "profile.firstname":
      case "profile.lastname":
        if (!value) return "Ce champ est requis.";
        if (value.length < 2) return "Minimum 2 caractères.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editedUser) return;

    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));

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
    if (!editedUser) return;

    const fieldsToValidate: Record<string, string> = {
      email: editedUser.email,
      role: editedUser.role,
      "profile.firstname": editedUser.profile?.firstname || "",
      "profile.lastname": editedUser.profile?.lastname || "",
    };

    const newErrors: Partial<Record<string, string>> = {};

    for (const [field, value] of Object.entries(fieldsToValidate)) {
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave(editedUser);
    }
  };

  if (!isOpen || !editedUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {editedUser.id ? "Modifier l'utilisateur" : "Créer un utilisateur"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              value={editedUser.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Email"
            />
            {formErrors["email"] && (
              <p className="text-red-500 text-sm">{formErrors["email"]}</p>
            )}
          </div>

          {/* Rôle */}
          <div>
            <select
              name="role"
              value={editedUser.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionner un rôle</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
              <option value="MODERATOR">Modérateur</option>
              <option value="CONTRIBUTOR">Contributeur</option>
            </select>
            {formErrors["role"] && (
              <p className="text-red-500 text-sm">{formErrors["role"]}</p>
            )}
          </div>

          {/* Prénom */}
          <div>
            <input
              name="profile.firstname"
              type="text"
              value={editedUser.profile?.firstname || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Prénom"
            />
            {formErrors["profile.firstname"] && (
              <p className="text-red-500 text-sm">{formErrors["profile.firstname"]}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <input
              name="profile.lastname"
              type="text"
              value={editedUser.profile?.lastname || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Nom"
            />
            {formErrors["profile.lastname"] && (
              <p className="text-red-500 text-sm">{formErrors["profile.lastname"]}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <input
              name="profile.phone"
              type="text"
              value={editedUser.profile?.phone || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Téléphone"
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
