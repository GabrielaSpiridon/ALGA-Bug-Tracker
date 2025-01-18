import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

function Register() {
  const [user_email, setUserEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        user_email: user_email,
        user_name: username,
        password: password
      };
      const response = await axios.post('http://localhost:3000/auth/register', requestBody);
      alert(`User registered successfully! User ID: ${response.data.userId}`);
      setUserEmail('');
      setUsername('');
      setPassword('');
      navigate('/login');
    } catch (err) {
      if (err.response) {
        alert(`Registration failed: ${err.response.data}`);
      } else {
        alert(`Registration failed: ${err.message}`);
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Register for ALGABugTracker</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div className="mb-3">
            <input 
              type="text" 
              placeholder="User email"
              value={user_email}
              onChange={(e) => setUserEmail(e.target.value)} 
              className="form-control"
            />
          </div>
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
          <button className="btn btn-primary w-100 mb-2" type="submit">Register</button>
          <button 
            className="btn btn-link w-100"
            type="button" 
            onClick={() => navigate('/login')}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
