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
import Loading from "@/components/common/Loading";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import NotFound from "@/pages/error/NotFound";
import ApiKeyManagement from "@/pages/ApiKeyManagement";

//pages
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Home = lazy(() => import("@/pages/auth/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Docs = lazy(() => import("@/pages/Docs"));
const Profile = lazy(() => import("@/pages/Profile"));

//wrappers
import ProtectedRoute from "@/components/protectedWrappers/ProtectedRoute";
import AuthRoute from "@/components/protectedWrappers/AuthRoute";
import AdminRoute from "./components/protectedWrappers/AdminRoute";

function App() {
  const { checkAuth, loading, user } = useAuthStore();

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

  if (loading) return <Loading />;

  return (
    <>
      <Suspense fallback={<Loading />}>
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
              <Route
                path="forgot-password"
                element={
                  <AuthRoute>
                    <ForgotPassword />
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
              <Route path="docs" element={<Docs />} />
              <Route path="profile" element={<Profile />} />
              <Route
                path="api-key-management"
                element={
                  <ApiKeyManagement />
                }
              ></Route>
            </Route>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
