import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import medicalkit from './medicalkit.jpg';
import patient from './patient.jpg';
import appointments from './appointments.jpg';
import doctorl from './doctorl.jpg';
import patientl from './patientl.jpg';

const AdminHome = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const doctorRes = await axios.get('http://localhost:2024/admin/doctorcount');
      setDoctorCount(doctorRes.data);

      const patientRes = await axios.get('http://localhost:2024/admin/patientcount');
      setPatientCount(patientRes.data);

      const appointmentRes = await axios.get('http://localhost:2024/admin/appointmentcount');
      setAppointmentCount(appointmentRes.data);
    } catch (err) {
      console.error('Failed to fetch counts:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/adminlogin';
  };

  const handleSearch = () => {
    navigate(`/adminhome/getdoctorbyid?id=${searchQuery}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <input
          type="text"
          placeholder="Search Doctor By ID"
          className="dashboard-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="dashboard-search-btn" onClick={handleSearch}>Search</button>
      </div>

      <h2 className="dashboard-title">Status</h2>
      <div className="status-cards">
        <div className="status-card">
          <img src={medicalkit} alt="Doctor Icon" className="status-image" />
          <div className="card-text">
            <strong>{doctorCount}</strong>
            <span>Doctors</span>
          </div>
        </div>
        <div className="status-card">
          <img src={patient} alt="Patient Icon" className="status-image" />
          <div className="card-text">
            <strong>{patientCount}</strong>
            <span>Patients</span>
          </div>
        </div>
        <div className="status-card">
          <img src={appointments} alt="Booking Icon" className="status-image" />
          <div className="card-text">
            <strong>{appointmentCount}</strong>
            <span>New Booking</span>
          </div>
        </div>
      </div>

      <h2 className="dashboard-title">Quick Links</h2>
      <div className="quick-links">
        <div className="quick-link" onClick={() => navigate("/adminhome/viewdoctors")}>
          <img src={doctorl} alt="Doctor List" className="status-image" />
          <p className="quick-link-text">Doctor’s List</p>
        </div>
        <div className="quick-link" onClick={() => navigate("/adminhome/viewpatients")}>
          <img src={patientl} alt="Patient List" className="status-image" />
          <p className="quick-link-text">Patient List</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;