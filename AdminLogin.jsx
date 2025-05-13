import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';  // Add external CSS for better styling

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Example of a successful login check
    if (username === 'admin' && password === 'admin') {
      console.log('Login successful');
      onLogin(true);  // Pass true to onLogin in App.jsx
      navigate('/adminhome');  // Redirect to AdminNavBar
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-form-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;