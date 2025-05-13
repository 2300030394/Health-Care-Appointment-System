import React from 'react';
import './style.css'; // Ensure this points to your global or Home-specific CSS

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>👩‍⚕️ Welcome to <span className="highlight">HealthCare System</span></h1>
        <p>Your one-stop platform to manage doctors, patients, and appointments efficiently.</p>
      </div>

      <div className="home-services">
        <h2>🌟 Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <div className="emoji">📅</div>
            <h3>Book Appointments</h3>
            <p>Schedule and manage appointments with ease.</p>
          </div>
          <div className="service-card">
            <div className="emoji">🧑‍🤝‍🧑</div>
            <h3>Manage Patients</h3>
            <p>Register, view, and update patient records securely.</p>
          </div>
          <div className="service-card">
            <div className="emoji">👨‍⚕️</div>
            <h3>Doctor Directory</h3>
            <p>Browse and manage doctor profiles in the system.</p>
          </div>
          <div className="service-card">
            <div className="emoji">📄</div>
            <h3>Medical Records</h3>
            <p>Access and manage appointment history and reports.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
