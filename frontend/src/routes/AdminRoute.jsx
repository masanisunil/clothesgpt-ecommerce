import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, userRole, authLoading } = useAuth();

  // 🔄 Wait until auth is resolved
  if (authLoading) {
    return null; // or loader
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
