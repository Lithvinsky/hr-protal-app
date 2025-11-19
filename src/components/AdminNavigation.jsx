import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout, getCurrentUser, getCurrentUserRole } from "../services/authService.js";

const AdminNavigation = () => {
  const username = getCurrentUser();
  const userRole = getCurrentUserRole();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const firstLetter = username?.charAt(0).toUpperCase() || "A";

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">
        <NavLink
          to={`/${username}/home`}
          className="navbar-brand fw-bold text-white d-flex align-items-center"
        >
          <i className="bi bi-briefcase-fill me-2"></i>
          HR Portal
          {userRole === "admin" && (
            <span className="badge bg-danger ms-2">Admin</span>
          )}
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to={`/${username}/home`}
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active fw-bold" : ""}`
                }
              >
                <i className="bi bi-house-door me-1"></i>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/${username}/profiles`}
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active fw-bold" : ""}`
                }
              >
                <i className="bi bi-people me-1"></i>
                Profiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/${username}/holidays`}
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active fw-bold" : ""}`
                }
              >
                <i className="bi bi-calendar-check me-1"></i>
                Holidays
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/${username}/admin-holidays`}
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active fw-bold" : ""}`
                }
              >
                <i className="bi bi-clipboard-check me-1"></i>
                Manage Requests
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button
                className="btn btn-link nav-link text-white d-flex align-items-center"
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              >
                <span className="bg-light text-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                      style={{width: "32px", height: "32px", fontSize: "0.9rem", fontWeight: "bold"}}>
                  {firstLetter}
                </span>
                <span className="d-none d-md-inline">{username}</span>
                <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {showDropdown && (
                <div
                  className="dropdown-menu dropdown-menu-end show"
                  style={{ position: "absolute", right: 0, top: "100%" }}
                >
                  <div className="dropdown-item-text">
                    <small className="text-muted">Signed in as</small>
                    <div className="fw-bold">{username}</div>
                    <small className="text-danger">Administrator</small>
                  </div>
                  <hr className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
