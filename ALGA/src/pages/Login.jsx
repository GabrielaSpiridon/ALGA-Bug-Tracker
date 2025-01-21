// login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

import configuration from '../configuration.js';


function Login({ onLoginSuccess }) {
  // State variables for input fields
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  
  // State to toggle between login and registration modes
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const navigate = useNavigate();

  /**
   * handleSubmit will be used for both login and register actions,
   * depending on the current mode (isRegisterMode).
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isRegisterMode) {
      // Registration logic using Axios
      const requestBody = {
        user_email: username,
        user_name: username, // If you want to separate email and username, create another input field
        password: password
      };

      try {
        const response = await axios.post('http://localhost:3000/auth/register', requestBody);
        // If successful, response.data should contain { userId: ... }
        alert(`User registered successfully! User ID: ${response.data.userId}`);
        setIsRegisterMode(false);
        setUsername('');
        setPassword('');
      } catch (err) {
        if (err.response) {
          alert(`Registration failed: ${err.response.data}`);
        } else {
          alert(`Registration failed: ${err.message}`);
        }
      }
    } else {
      // Login logic stub
      // In a real application, you would verify credentials with the backend:
      const requestBody = {
        user_email: username,
        password: password
      };
      const response = await axios.post('http://localhost:3000/auth/login', requestBody);
      const result = response.data; // Axios automatically parses JSON const result = await response.json();
      
      if (result.success) {
        alert(`login successful`);

        configuration.currentUserId = result.userId; // Save userId in config
       // localStorage.setItem('userId', result.userId); // Save userId in localStorage
        
        setIsRegisterMode(true);
        onLoginSuccess();
        
      navigate('/myHome'); // Redirect to myHome

       // transferam datele intre ecrane prin  configuration navigate('/myHome', { state: { userId: result.userId } }); // Pass userId from response

      } else {
        setIsRegisterMode(false);
        alert(`Invalid credentials`);
      }
    
    }
  };

  return (
    <div>
      
      <div className="loginLargeContainer">
        
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Login to ALGABugTracker</h2>
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div>
              <input 
                type="text" 
                placeholder="Username:"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                className="loginInputContainer"
              />
            </div>
            <div >
              <input 
                type="password" 
                placeholder="Password:"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                className="loginInputContainer"
              />
            </div>
            <button className="loginButton" type="submit">Login</button>
            <button 
              className="loginButton"
              type="button" 
              onClick={() => navigate('/register')}
            >
              Register
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;