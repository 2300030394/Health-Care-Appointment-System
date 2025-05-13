import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorLogin.css';

const DoctorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:2024/doctor/checkdoctorlogin', { username, password });
      const doctor = response.data;
      localStorage.setItem('loggedInDoctor', JSON.stringify(doctor));
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/doctorhome');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data.message || 'Invalid username or password');
      } else if (error.request) {
        setError('Network error. Please try again later.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="doctor-login-container">
      <div className="doctor-login-form">
        <h2>Doctor Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
