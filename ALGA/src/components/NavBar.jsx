import React from "react";
import { Link } from "react-router-dom";

function NavBar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid">
        {/* Logo and Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="algaLogo.svg"
            alt="Logo"
            height="40"
            className="me-2"
          />
          <span>ALGA Bug Tracker</span>
        </Link>

        {/* Toggler for Mobile */}
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

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Navigation Links */}
            <li className="nav-item">
              <Link className="nav-link" to="/myHome">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bugs">
                Bugs
              </Link>
            </li>
          </ul>

          {/* Authentication Button */}
          <div className="d-flex">
            {isAuthenticated ? (
              <button onClick={onLogout} className="btn btn-outline-primary ms-3">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary ms-3">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
