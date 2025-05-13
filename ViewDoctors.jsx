import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewdoctors.css'; // Assuming you have your styling for the layout

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  // Fetch doctors when the component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:2024/admin/viewalldoctors');
      setDoctors(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch doctors. ' + err.message);
    }
  };

  const handleDelete = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:2024/admin/deletedoctor?did=${doctorId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the deletion is successful, remove the doctor from the list
        setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== doctorId));
      } else {
        setError("Failed to delete doctor.");
      }
    } catch (error) {
      setError("Error deleting doctor: " + error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">View & Delete Doctors</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="table-responsive mt-4">
        <table className="table table-bordered text-center">
          <thead style={{ backgroundColor: '#add8e6', fontWeight: 'bold' }}>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.contact}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(doctor.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No doctors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDoctors;