import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './viewdoctors.css';

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:2024/patient/viewalldoctors') 
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const handleBook = (doctor) => {
    navigate('/patienthome/bookappointment', { state: { doctor } });
  };

  return (
    <div className="doctors-container">
      <h2 className="heading">Available Doctors</h2>
      <table className="doctors-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.specialization}</td>
              <td>{doc.experience} yrs</td>
              <td>
                <button className="book-button" onClick={() => handleBook(doc)}>
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDoctors;
