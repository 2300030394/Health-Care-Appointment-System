import React, { useState } from 'react';
import axios from 'axios';

function ViewAppointments() {
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const fetchAppointments = () => {
    axios
      .get(`http://localhost:2024/patient/viewbyid/${patientId}`)
      .then((response) => {
        setAppointments(response.data);
        setError('');
      })
      .catch((err) => {
        console.error('Error fetching appointments:', err);
        setError('No appointments found or error fetching data');
        setAppointments([]);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🗓️ View Appointments</h2>
      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <button onClick={fetchAppointments}>View</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {appointments.length > 0 && (
        <table border="1" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.appointmentDate}</td>
                <td>{appt.appointmentTime}</td>
                <td>{appt.doctorId}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewAppointments;
