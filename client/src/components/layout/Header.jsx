import { NavLink } from "react-router-dom";

import logo from "@/assets/images/logo.png";
import AdminRoute from "../protectedWrappers/AdminRoute";

const Header = () => {
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
            <NavLink className="nav-link" aria-current="page" to={"/"}>
              Home
            </NavLink>
            <NavLink className="nav-link" to={"/app"}>
              Dashboard
            </NavLink>
            {
              <AdminRoute>
                <NavLink className="nav-link" to={"/app/api-key-management"}>
                  Manage Keys
                </NavLink>
              </AdminRoute>
            }
            <NavLink className="nav-link" to={"/app/settings"}>
              Settings
            </NavLink>
            <NavLink className="nav-link" to={"/app/profile"}>
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
