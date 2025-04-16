import { User } from "@/types/user";

interface Props {
  users: User[];
  onDelete: (id?: number ) => void;
  onEdit: (user: User) => void;
}

export default function UserList({ users, onDelete, onEdit }: Props) {
  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Liste des utilisateurs</h2>
      <table className="w-full text-sm text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rôle</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">              
              <td className="p-2">
                {user.profile?.firstname} {user.profile?.lastname}
              </td>

              <td className="p-2">{user.email}</td>
              
              <td className="p-2">{user.role}</td>
              
              <td className="p-2 space-x-2">
                <button className="text-blue-600 hover:underline" onClick={() => onEdit(user)}>
                  Modifier
                </button>
                <button className="text-red-600 hover:underline" onClick={() => onDelete(user.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
