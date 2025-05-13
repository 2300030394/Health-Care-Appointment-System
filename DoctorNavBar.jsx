import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DoctorNavBar = () => {
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/doctorlogin';
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Doctor Dashboard</div>
        <ul className="nav-links">
          <li><Link to="/doctorhome">Home</Link></li>
          <li><Link to="/doctorhome/profile">Doctor Profile</Link></li>
          <li><Link to="/doctorhome/appointments">View Appointments</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default DoctorNavBar;
