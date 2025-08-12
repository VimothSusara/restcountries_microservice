import useAuthStore from "@/store/authStore";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
