import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { accessToken, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
