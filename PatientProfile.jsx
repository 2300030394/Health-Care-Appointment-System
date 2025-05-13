import React, { useEffect, useState } from 'react';
import config from '../config';
import './PatientProfile.css';

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const storedPatient = JSON.parse(localStorage.getItem('loggedInPatient'));
    console.log('🌈 Stored patient data:', storedPatient);
    if (storedPatient) {
      setPatient(storedPatient);
    }
  }, []);

  if (!patient) {
    return <p className="loading-text">Loading patient profile...</p>;
  }

  return (
    <div className="patient-profile-container">
      <h2 className="welcome-text">
        Welcome, {patient.name ? patient.name : 'Patient'}!
      </h2>

      {patient.id ? (
        <img
          className="profile-image"
          src={`${config.url}/patient/displaypatientimage?id=${patient.id}`}
          alt="Patient Profile"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <p className="no-image-text">No profile image found 😶</p>
      )}

      <div className="patient-details">
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Contact:</strong> {patient.contact}</p>
        <p><strong>Address:</strong> {patient.address}</p>
      </div>
    </div>
  );
};

export default PatientProfile;
