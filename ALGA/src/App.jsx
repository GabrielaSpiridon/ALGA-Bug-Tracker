//App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import MyHome from './pages/MyHome';
import Projects from './pages/Projects';
import Bugs from './pages/Bugs';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On mount, you might check localStorage or cookie to restore auth state
  useEffect(() => {
    const storedAuth = localStorage.getItem('authenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authenticated');
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar always visible */}
        <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        <Routes>
          {/* Default route is login if not authenticated */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/myHome" /> : (
              <div>
                <Login onLoginSuccess={handleLoginSuccess} />
                 <div className="text-center mt-3">
                  <Link to="/register" className="btn btn-secondary">Go to Register</Link>
                </div>
              </div>
            )} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/myHome" /> : (
              <div>
                <Login onLoginSuccess={handleLoginSuccess} />
                <div className="text-center mt-3">
                  
                </div> 
              </div>
            )} 
          />
          <Route 
            path="/register" 
            element={
              <div>
                <Register />
                <div className="button">
                  <Link to="/login" className="btn btn-secondary">Back to Login</Link>
                </div>
              </div>
            } 
          />
          <Route 
            path="/myHome" 
            element={isAuthenticated ? <MyHome /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/projects" 
            element={isAuthenticated ? <Projects /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/bugs" 
            element={isAuthenticated ? <Bugs /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
