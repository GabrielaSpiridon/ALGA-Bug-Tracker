import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


function Login({ onLoginSuccess }) {
  // State variables for input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // State to toggle between login and registration modes
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isRegisterMode) {
      if (username && password) {
        alert(`User "${username}" registered successfully!`);
        // Switch back to login mode after registration
        setIsRegisterMode(false);
      } else {
        alert('Please provide both a username and a password to register.');
      }
    } else {
      // Dummy check for now
      if (username === 'user' && password === 'pass') {
        onLoginSuccess();
        navigate('/myHome');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div  className="d-flex align-items-center justify-content-center vh-100">
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">{isRegisterMode ? 'Register for ALGABugTracker' : 'Login to ALGABugTracker'}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div className="mb-3">
            <input 
              type="text" 
              placeholder={isRegisterMode ? "Choose a username" : "Username: user"}
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              placeholder={isRegisterMode ? "Choose a password" : "Password: pass"}
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control"
            />
          </div>
          
          <button className="btn btn-primary w-100 mb-2" type="submit">
            {isRegisterMode ? 'Register' : 'Login'}
          </button>

          {isRegisterMode ? (
            <button 
              className="btn btn-secondary w-100"
              type="button" 
              onClick={() => setIsRegisterMode(false)}
            >
              Cancel
            </button>
          ) : (
            <button 
              className="btn btn-link w-100"
              type="button" 
              onClick={() => setIsRegisterMode(true)}
            >
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
