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
      const result = await response.json();
      
      if (result.success) {
        alert(`login successful`);

        setIsRegisterMode(true);
        onLoginSuccess();
        navigate('/myHome');
      } else {
        setIsRegisterMode(false);
        alert('Invalid credentials');
      }
    
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login to ALGABugTracker</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div className="mb-3">
            <input 
              type="text" 
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control"
            />
          </div>
          <button className="btn btn-primary w-100 mb-2" type="submit">Login</button>
          <button 
            className="btn btn-link w-100"
            type="button" 
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;