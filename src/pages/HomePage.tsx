import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getAllUsers, deleteUser, updateUser } from "../services/userService";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import { User } from "../types/user";

export default function HomePage() {
  const { accessToken, loading } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/login");
    }
  }, [loading, accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      getAllUsers(accessToken)
        .then((data) => setUsers(data))
        .catch((err) => {
          console.error(err);
          setError("Erreur lors du chargement des utilisateurs");
        });
    }
  }, [accessToken]);

  const handleEdit = (user: User) => {
    console.log("Éditer utilisateur :", user);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedUser: User) => {
    if (!accessToken) return;
    try {
      const savedUser = await updateUser(updatedUser, accessToken);
      setUsers(users.map((u) => (u.id === savedUser.id ? savedUser : u)));
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (id: number) => {
    console.log("Supprimer utilisateur ID:", id);
    if (!accessToken) return;
  
    const confirm = window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?");
    if (!confirm) return;
  
    try {
      await deleteUser(id, accessToken);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setError("Impossible de supprimer l'utilisateur.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
      <div className="p-4">
        <UserList users={users} onDelete={handleDelete} onEdit={handleEdit} />
        <UserForm user={selectedUser} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      </div>
    );
}
