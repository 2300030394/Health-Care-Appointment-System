// AdminNavBar.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminNavBar = () => {
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false'); // Clear login state
    window.location.href = '/adminlogin'; // Redirect to login page
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Admin Dashboard</div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/adminhome/adddoctor">Add Doctor</Link></li>
          <li><Link to="/adminhome/viewdoctors">View Doctors</Link></li>
          <li><Link to="/adminhome/viewpatients">View Patients</Link></li>
          <li><Link to="/adminhome/viewappointments">View Appointments</Link></li>
         
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Outlet /> {/* Nested routes will render here */}
    </div>
  );
};

export default AdminNavBar;