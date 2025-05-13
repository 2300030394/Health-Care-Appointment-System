import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const PatientNavBar = () => {
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false'); // Clear login state
    window.location.href = '/patientlogin'; // Redirect to login page
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Patient Dashboard</div>
        <ul className="nav-links">
          <li><Link to="/patienthome">Home</Link></li>
          <li><Link to="/patienthome/profile">Patient Profile</Link></li>
           
          
          <li><Link to="/patienthome/viewdoctors">View Doctors</Link></li>
         <li>
  <Link to="/patienthome/appointments">
    View Appointments By Patient Id
  </Link>
</li>

                    <li><Link to="/patienthome/bookappointment">Book</Link></li>

          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Outlet /> {/* Nested routes will render here */}
    </div>
  );
};

export default PatientNavBar;