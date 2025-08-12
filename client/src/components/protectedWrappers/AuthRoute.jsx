import useAuthStore from "@/store/authStore";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  return isAuthenticated ? (
    <Navigate to={location.state?.from?.pathname || "/app"} replace />
  ) : (
    children
  );
};

export default AuthRoute;
