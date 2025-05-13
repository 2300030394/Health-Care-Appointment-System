import React from 'react';
import './style.css'; // Global styles

const About = () => {
  return (
    <div className="about-container">
      <h1>About the Healthcare System</h1>
      <p>
        The Healthcare System is designed to streamline the management of doctor-patient appointments, 
        doctor records, and patient records. Our goal is to create a user-friendly system that is easy 
        to navigate and helps improve efficiency in healthcare services.
      </p>

      <h2>Features:</h2>
      <ul>
        <li>Appointment scheduling</li>
        <li>Doctor and Patient management</li>
        <li>Patient record tracking</li>
        <li>Secure login system for admins</li>
      </ul>
    </div>
  );
};

export default About;