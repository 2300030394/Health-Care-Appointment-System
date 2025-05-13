import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:2024/appointment/viewall');
        console.log(response.data); // Check if response is an array

        // Ensure the response is an array before setting the state
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          console.error('Received data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching appointments', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointment-list">
      <h2>View Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Doctor ID</th>
            <th>Patient ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.doctorId}</td>
                <td>{appointment.patientId}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No appointments available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}