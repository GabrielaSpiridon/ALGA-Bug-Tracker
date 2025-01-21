import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 shadow-sm fixed-top"
        height = '30px' >
      <div className="container-fluid">
        {/* Left-side Brand */}
        
        <img 
          src="algaLogo.svg"
          height= '60px'
          width= '60px'>
          </img>
        
        <Link className="navbar-brand" to="/"
          style={{padding: '20px'}}>
          ALGA Bug Tracker
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collap  se"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation items aligned to the right */}
          <ul className="navbar-nav ms-auto">
            <li className="navBarButton" >
              <Link className="nav-link" to="/myHome">
                Dashboard
              </Link>
            </li>
            <li className="navBarButton">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
            <li className="navBarButton">
              <Link className="nav-link" to="/bugs">
                Bugs
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
      {isAuthenticated ? (
        <button onClick={onLogout} className="loginNavBarButton">
          Logout
        </button>
      ) : (
        <Link to="/login" className="loginNavBarButton">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
