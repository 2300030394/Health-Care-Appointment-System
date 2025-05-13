import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewPatients.css';

export default function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:2024/admin/viewallpatients');
        console.log('Response data:', response.data);

        if (Array.isArray(response.data)) {
          setPatients(response.data);
        } else {
          console.error('Expected an array, but got:', response.data);
          setError('Unexpected response format.');
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Failed to load patients. Please try again later.');
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="patient-list">
      <h2>View Patients</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!error && patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.contact}</td>
                <td>{patient.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}