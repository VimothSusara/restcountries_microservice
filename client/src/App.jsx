import { Suspense, useEffect, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

//store
import useAuthStore from "@/store/authStore";

//layouts
import MainLayout from "@/layouts/MainLayout";
import LandingLayout from "@/layouts/LandingLayout";

//pages
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Home = lazy(() => import("@/pages/auth/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Settings = lazy(() => import("@/pages/Settings"));
const Profile = lazy(() => import("@/pages/Profile"));

//Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  );
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  return isAuthenticated ? (
    <Navigate to={location.state?.from?.pathname || "/app"} replace />
  ) : (
    children
  );
};

function App() {
  const { checkAuth, loading } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (e) {
        console.log(e);
      }
    };

    verifyAuth();
  }, [checkAuth]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingLayout />}>
              <Route index element={<Home />} />
            </Route>

            <Route path="/auth" element={<LandingLayout />}>
              <Route
                path="login"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route
                path="register"
                element={
                  <AuthRoute>
                    <Register />
                  </AuthRoute>
                }
              />
            </Route>

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
