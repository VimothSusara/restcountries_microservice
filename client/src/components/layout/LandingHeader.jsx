import { NavLink } from "react-router-dom";

import logo from "@/assets/images/logo.png";
import useAuthStore from "@/store/authStore";

import { CircleUser } from 'lucide-react';

const LandingHeader = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    // <header className="landing-header h-25 w-100 bg-light text-primary d-flex justify-content-center align-items-center border border-1">
    //   <h1>LandingHeader</h1>
    // </header>
    <nav className="landing-header navbar navbar-expand-lg bg-light sticky-top shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand ms-lg-5" to={"/"}>
          <img src={logo} alt="Logo" className="main-logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDropdownContainer"
          aria-controls="navbarDropdownContainer"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarDropdownContainer">
          <div className="navbar-nav mx-auto gap-lg-5">
            <NavLink className="nav-link active" aria-current="page" to={"/"}>
              Home
            </NavLink>
            <NavLink className="nav-link" to={"/"}>
              Features
            </NavLink>
            <NavLink className="nav-link" to={"/"}>
              How it Works
            </NavLink>
            <NavLink className="nav-link" to={"/"}>
              About
            </NavLink>
          </div>

          {isAuthenticated ? (
            <div className="navbar-nav ms-auto gap-lg-3 me-lg-5">
              <NavLink end className={({ isActive }) => `navbar-link text-decoration-none d-flex align-items-center ${isActive ? 'active-link' : ''}`} to={"/app"}>
                Dashboard
              </NavLink>
              {/* <NavLink className="logout-btn" to={"/auth/logout"}>
                LOGOUT
              </NavLink> */}
              <NavLink className="nav-link d-flex align-items-center" to={"/app/profile"} title="profile">
              <CircleUser size={35} style={{ color: "var(--orange-dark)" }} />
            </NavLink>
            </div>
          ) : (
            <div className="navbar-nav ms-auto gap-lg-3 me-lg-5">
              <NavLink className="sign-up-btn" to={"/auth/register"}>
                SIGN UP
              </NavLink>
              <NavLink className="login-btn" to={"/auth/login"}>
                LOGIN
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;
