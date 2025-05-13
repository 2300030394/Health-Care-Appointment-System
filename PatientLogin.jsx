import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PatientLogin.css';

const PatientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:2024/patient/checkpatientlogin', {
        username,
        password,
      });

      const patient = response.data;

      // Don't store sensitive data like password
      const safePatientData = {
        id: patient.id,
        name: patient.name,
        username: patient.username,
        contact: patient.contact,
        address: patient.address,
        gender: patient.gender,
        
      };

      localStorage.setItem('loggedInPatient', JSON.stringify(safePatientData));
      navigate('/patienthome');
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
    <div className="patient-login-container">
      <div className="patient-login-form">
        <h2>Patient Login</h2>
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
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
