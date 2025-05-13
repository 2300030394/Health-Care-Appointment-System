import React, { useEffect, useState } from 'react';
import config from '../config';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedDoctor = JSON.parse(localStorage.getItem('loggedInDoctor'));
    console.log('🩺 Stored doctor data:', storedDoctor);
    if (storedDoctor) {
      setDoctor(storedDoctor);
    }
  }, []);

  if (!doctor) {
    return <p className="loading-text">Loading doctor profile...</p>;
  }

  return (
    <div className="doctor-profile-container">
      <h2 className="welcome-text">
        Welcome, {doctor.name ? doctor.name : 'Doctor'}!
      </h2>

      {doctor.id ? (
        <img
          className="profile-image"
          src={`${config.url}/doctor/displaydoctorimage?id=${doctor.id}`}
          alt="Doctor Profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <p className="no-image-text">No profile image found 🧑‍⚕️</p>
      )}

      <div className="doctor-details">
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Contact:</strong> {doctor.contact}</p>
        <p><strong>Hospital:</strong> {doctor.hospital}</p>
      </div>
    </div>
  );
};

export default DoctorProfile;
