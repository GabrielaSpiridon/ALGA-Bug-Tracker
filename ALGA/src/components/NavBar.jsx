import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isAuthenticated, onLogout }) {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/myHome" style={{ marginRight: '10px' }}>MyHome</Link>
      <Link to="/projects" style={{ marginRight: '10px' }}>Projects</Link>
      <Link to="/bugs" style={{ marginRight: '10px' }}>Bugs</Link>
      {isAuthenticated ? (
        <button onClick={onLogout} style={{ marginLeft: '10px' }}>
          Logout
        </button>
      ) : (
        <Link to="/login" style={{ marginLeft: '10px' }}>Login</Link>
      )}
    </nav>
  );
}

export default NavBar;
