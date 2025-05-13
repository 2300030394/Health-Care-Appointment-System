import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PatientRegistration.css';

const PatientRegistration = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    username: '',
    password: '',
    gender: '',
    contact: '',
    address: '',
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append(
        'patient',
        new Blob([JSON.stringify(patientData)], {
          type: 'application/json',
        })
      );
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('http://localhost:2024/patient/addpatient', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Registration successful! Redirecting...');
      setError('');
      setPatientData({
        name: '',
        username: '',
        password: '',
        gender: '',
        contact: '',
        address: '',
      });
      setImage(null);

      setTimeout(() => navigate('/patientlogin'), 2000);
    } catch (err) {
      console.error('Registration error:', err);
      let errorMsg = 'Registration failed. Please try again.';
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }
      setError(errorMsg);
      setSuccessMessage('');
    }
  };

  return (
    <div className="patient-registration-container">
      <div className="registration-form">
        <h2>Patient Registration</h2>
        {error && <p className="error-msg">{error}</p>}
        {successMessage && <p className="success-msg">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={patientData.name} onChange={handleChange} required />

          <label>Username:</label>
          <input type="text" name="username" value={patientData.username} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={patientData.password} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={patientData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Contact:</label>
          <input type="text" name="contact" value={patientData.contact} onChange={handleChange} required />

          <label>Address:</label>
          <textarea name="address" value={patientData.address} onChange={handleChange} required />

          <label>Profile Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
