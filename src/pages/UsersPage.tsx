import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { getAllUsers, deleteUser, updateUser, createUser } from "@services/userService";
import UserList from "@components/UserList";
import UserForm from "@components/UserForm";
import UserAddButton from "@components/UserAddButton";
import { User } from "@/types/user";
import toast from "react-hot-toast";

export default function UsersPage() {
  const { accessToken, loading } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Redirection si non authentifié
  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/login");
    }
  }, [loading, accessToken, navigate]);

  // Chargement des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!accessToken) return;
        const data = await getAllUsers(accessToken);
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des utilisateurs");
      }
    };

    fetchUsers();
  }, [accessToken]);

  const handleAddClick = () => {
    setSelectedUser(null); // Création d'un nouvel utilisateur
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: number) => {
    if (!accessToken || !id) return;

    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id, accessToken);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("Utilisateur supprimé");
    } catch (err: unknown) {
      if(err instanceof Error){
        console.error("Erreur suppression :", err.message);
      }
      setError("Impossible de supprimer l'utilisateur.");
    }
  };

  const handleSave = async (user: User) => {
    try {
      if (!accessToken) throw new Error("Token manquant");

      const savedUser = user.id
        ? await updateUser(user, accessToken)
        : await createUser(user, accessToken);

      setUsers((prev) =>
        user.id
          ? prev.map((u) => (u.id === savedUser.id ? savedUser : u))
          : [...prev, savedUser]
      );

      setIsModalOpen(false);
      setSelectedUser(null);
      toast.success("Utilisateur enregistré");
    } catch (err: unknown) {
      if(err instanceof Error) {
        console.error("Erreur enregistrement :", err.message);
      }
      toast.error("Une erreur est survenue lors de l'enregistrement");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-4 space-y-4">
      <UserAddButton onAddClick={handleAddClick} />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <UserForm user={selectedUser} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </div>
  );
}
