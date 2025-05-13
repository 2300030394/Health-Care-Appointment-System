import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewAppointments.css'; // Optional CSS for styling

const ViewAppointmentsByDoctorId = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorData = JSON.parse(localStorage.getItem('loggedInDoctor'));
        const doctorId = doctorData?.doctorId;

        if (!doctorId) {
          setError('Doctor not logged in or ID not found.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:2024/appointments/doctor/${doctorId}`);
        setAppointments(response.data);
      } catch (err) {
        setError('Failed to fetch appointments.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="appointments-container">
      <h2>🗓️ Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Patient ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.patient_id}</td>
                <td>{appointment.status || 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAppointmentsByDoctorId;
