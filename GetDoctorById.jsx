import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './GetDoctorById.css'; // import the CSS

const GetDoctorById = () => {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const doctorId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    if (doctorId) {
      fetchDoctorById(doctorId);
    }
  }, [doctorId]);

  const fetchDoctorById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:2024/doctor/viewbyid?id=${id}`);
      setDoctor(response.data);
    } catch (err) {
      setError('Doctor not found or error occurred.');
    }
  };

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="doctor-details-container">
      {doctor ? (
        <>
          <h2>Doctor Details</h2>
          <div className="doctor-info">
            <p><strong>Name:</strong> {doctor.name}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Contact:</strong> {doctor.contact}</p>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading doctor details...</p>
      )}
    </div>
  );
};

export default GetDoctorById;