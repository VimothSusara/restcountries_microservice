import useAuthStore from "@/store/authStore";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  return isAuthenticated && user && user?.role_id === 1 ? (
    children
  ) : (
    <Navigate to="/app" replace />
  );
};

export default AdminRoute;