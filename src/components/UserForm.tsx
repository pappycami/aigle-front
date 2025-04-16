import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, defaultUser } from "@/types/user";
import { updateUser, createUser } from "@services/userService";
import { useAuth } from "@hooks/useAuth";
import toast from 'react-hot-toast';


interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

export default function UserForm({ user, isOpen, onClose, onSave }: Props) {
  
  const { register, handleSubmit, reset, formState: { errors }} = useForm<User>({ defaultValues: defaultUser });
  const { accessToken } = useAuth();

  useEffect(() => {
    reset(user ?? defaultUser);
  }, [user, reset]);  

  const onSubmit = async (formData: User) => {
    try {
      if (formData.id) {
        await updateUser(formData, accessToken);
        toast.success("Utilisateur mis à jour avec succès");
      } else {
        await createUser(formData, accessToken);
        toast.success("Utilisateur créé avec succès");
      }
      onSave(formData);
      onClose();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err);
      toast.error("Une erreur est survenue lors de l'enregistrement");
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">
          {user?.id ? "Modifier l'utilisateur" : "Créer un utilisateur"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <input type="email" className="w-full p-2 border rounded" placeholder="Email"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email invalide",
                },
              })} 
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Rôle */}
          <div>
          <select className="w-full p-2 border rounded" 
            {...register("role", { required: "Le rôle est requis" })}>
            <option value="">-- Sélectionner un rôle --</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">Utilisateur</option>
            <option value="MODERATOR">Modérateur</option>
            <option value="CONTRIBUTOR">Contributeur</option>
          </select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Prénom */}
          <div>
            <input type="text" className="w-full p-2 border rounded" placeholder="Prénom"
              {...register("profile.firstname", {
                required: "Le prénom est requis",
                minLength: {
                  value: 2,
                  message: "Minimum 2 caractères",
                },
              })} 
            />
            {errors.profile?.firstname && (
              <p className="text-sm text-red-500">{errors.profile?.firstname.message}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <input type="text" className="w-full p-2 border rounded" placeholder="Nom"
              {...register("profile.lastname", {
                required: "Le nom est requis",
              })} 
            />
            {errors.profile?.lastname && (
              <p className="text-sm text-red-500">{errors.profile?.lastname.message}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <input type="text" className="w-full p-2 border rounded" placeholder="Téléphone" {...register("profile.phone")} />
          </div>

          {/* Adresse */}
          <div>
            <input type="text" className="w-full p-2 border rounded" placeholder="Adresse" 
              {...register("profile.address", {
                required: "L'adresse est requise",
                minLength: { value: 5, message: "Adresse trop courte" },
              })} />
            {errors.profile?.address && (
              <p className="text-sm text-red-500">{errors.profile?.address.message}</p>
            )}
          </div>

          {/* Date de naissance */}
          <div>
            <input type="date" className="w-full p-2 border rounded" placeholder="Date de naissance" 
              {...register("profile.birthDate", {
                required: "La date de naissance est requise",
              })} />
            {errors.profile?.birthDate && (
              <p className="text-sm text-red-500">{errors.profile?.birthDate.message}</p>
            )}
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
