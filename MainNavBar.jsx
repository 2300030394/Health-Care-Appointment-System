import React from "react";
import { Link, useNavigate } from "react-router-dom";

function MainNavBar() {
  const navigate = useNavigate();

  const handleLoginRedirect = (role) => {
    if (role === "admin") {
      navigate("/adminlogin");
    } else if (role === "doctor") {
      navigate("/doctorlogin");
    } else if (role === "patient") {
      navigate("/patientlogin");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">🏥 HealthCare System</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        

        <li className="dropdown">
          <span>Login ⏷</span>
          <ul className="dropdown-menu">
            <li><span onClick={() => handleLoginRedirect("admin")}>Admin</span></li>
            <li><span onClick={() => handleLoginRedirect("doctor")}>Doctor</span></li>
            <li><span onClick={() => handleLoginRedirect("patient")}>Patient</span></li>
          </ul>
        </li>
        <li><Link to="/registration">Registration</Link></li>
      </ul>
    </nav>
  );
}

export default MainNavBar;
