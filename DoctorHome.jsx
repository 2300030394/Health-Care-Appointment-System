import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorHome.css';

const DoctorHome = () => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/doctorhome/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInDoctor');
    navigate('/doctor/login');
  };

  return (
    <div className="doctor-home-container">
      <h1 className="doctor-home-title">👨‍⚕️ Welcome to Doctor's Dashboard</h1>
      <p className="doctor-home-subtitle">Your one-stop spot for healing and helping!</p>

      <div className="doctor-home-buttons">
        <button onClick={handleViewProfile}>View Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default DoctorHome;
