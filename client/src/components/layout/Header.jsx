import { NavLink } from "react-router-dom";

import logo from "@/assets/images/logo.png";

import useAuthStore from "@/store/authStore";
import AdminRoute from "../protectedWrappers/AdminRoute";

import { CircleUser } from 'lucide-react';

const Header = () => {

  const { isAuthenticated, user } = useAuthStore();

  return (
    <nav className="header navbar navbar-expand-lg bg-light sticky-top shadow-sm">
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
          <div className="navbar-nav ms-auto gap-lg-3 me-lg-5">
            <NavLink end className={({ isActive }) => `navbar-link text-decoration-none d-flex align-items-center ${isActive ? 'active-link' : ''}`} to={"/"}>
              Home
            </NavLink>
            <NavLink end className={({ isActive }) => `navbar-link text-decoration-none d-flex align-items-center ${isActive ? 'active-link' : ''}`} to={"/app"}>
              Dashboard
            </NavLink>
            <NavLink className={({ isActive }) => `navbar-link text-decoration-none d-flex align-items-center ${isActive ? 'active-link' : ''}`} to={"/app/api-key-management"}>
              Manage Keys
            </NavLink>
            <NavLink className={({ isActive }) => `navbar-link text-decoration-none d-flex align-items-center ${isActive ? 'active-link' : ''}`} to={"/app/docs"}>
              Documentation
            </NavLink>
            <NavLink className="nav-link d-flex align-items-center" to={"/app/profile"} title="profile">
              <CircleUser size={35} style={{ color: "var(--orange-dark)" }} />
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
