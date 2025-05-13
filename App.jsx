import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './main/Home';
import About from './main/About';
import MainNavBar from './main/MainNavBar';
import PatientRegistration from './patient/PatientRegistration';

import AdminLogin from './admin/AdminLogin';
import AdminNavBar from './admin/AdminNavBar';
import AdminHome from './admin/AdminHome';
import AddDoctor from './admin/AddDoctor';
import ViewDoctors from './admin/ViewDoctors';
import ViewPatients from './admin/ViewPatients';
import ViewAppointments from './admin/ViewAppointments';
import GetDoctorById from './admin/GetDoctorById';

import DoctorHome from './doctor/DoctorHome';
import DoctorNavBar from './doctor/DoctorNavBar';
import DoctorLogin from './doctor/DoctorLogin';
import DoctorProfile from './doctor/DoctorProfile';
import ViewAppointmentsByDoctorId from './doctor/ViewAppointmentsByDoctorId';

import PatientLogin from './patient/PatientLogin';
import PatientNavBar from './patient/PatientNavBar';
import PatientHome from './patient/PatientHome';
import PatientProfile from './patient/PatientProfile';
import ViewAppointmentsByPatientId from './patient/ViewAppointmentsByPatientId';
import BookAppointment from './patient/BookAppointment';
import ViewDoctorsp from './patient/ViewDoctorsp';

import './main/style.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(status === 'true');
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', status);
  };

  return (
    <Router>
      <div className="app-container">
        <MainNavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<PatientRegistration />} />
          <Route path="/adminlogin" element={<AdminLogin onLogin={handleLogin} />} />
          <Route path="/doctorlogin" element={<DoctorLogin onLogin={handleLogin} />} />
          <Route path="/patientlogin" element={<PatientLogin onLogin={handleLogin} />} />

          {/* Admin Routes */}
          {isLoggedIn ? (
            <Route path="/adminhome" element={<AdminNavBar />}>
              <Route index element={<AdminHome />} />
              <Route path="adddoctor" element={<AddDoctor />} />
              <Route path="viewdoctors" element={<ViewDoctors />} />
              <Route path="viewpatients" element={<ViewPatients />} />
              <Route path="viewappointments" element={<ViewAppointments />} />
              <Route path="getdoctorbyid" element={<GetDoctorById />} />
            </Route>
          ) : (
            <Route path="/adminhome/*" element={<AdminLogin onLogin={handleLogin} />} />
          )}

          {/* Doctor Routes */}
          {isLoggedIn ? (
            <Route path="/doctorhome" element={<DoctorNavBar />}>
              <Route index element={<DoctorHome />} />
              <Route path="profile" element={<DoctorProfile />} />
              <Route path="appointments" element={<ViewAppointmentsByDoctorId />} />
            </Route>
          ) : (
            <Route path="/doctorhome/*" element={<DoctorLogin onLogin={handleLogin} />} />
          )}

          {/* Patient Routes */}
          {isLoggedIn ? (
            <Route path="/patienthome" element={<PatientNavBar />}>
              <Route index element={<PatientHome />} />
              <Route path="profile" element={<PatientProfile />} />
              <Route path="viewdoctors" element={<ViewDoctorsp />} />
              <Route path="appointments" element={<ViewAppointmentsByPatientId />} />
              <Route path="bookappointment" element={<BookAppointment />} />
              <Route path="book/:doctorId" element={<BookAppointment />} />
              <Route path="viewappointmentsbypatientid" element={<ViewAppointmentsByPatientId />} />
            </Route>
          ) : (
            <Route path="/patienthome/*" element={<PatientLogin onLogin={handleLogin} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
