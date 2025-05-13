import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import "./BookAppointment.css";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "Pending",
  });

  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("appointment", JSON.stringify(formData));
    if (image) {
      data.append("appointmentImage", image);
    }

    try {
      const response = await axios.post(`${config.url}/appointment/book`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMsg(response.data || "Appointment booked successfully!");
      setError("");
    } catch (err) {
      setMsg("");
      if (err.response && err.response.data) {
        setError(err.response.data || "Failed to book appointment.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="appointment-wrapper">
      <div className="appointment-container">
        <h2 className="appointment-title">📅 Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="appointment-form" encType="multipart/form-data">
          <input
            type="number"
            name="patientId"
            placeholder="Patient ID"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="appointment-input"
          />
          <input
            type="number"
            name="doctorId"
            placeholder="Doctor ID"
            value={formData.doctorId}
            onChange={handleChange}
            required
            className="appointment-input"
          />
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            className="appointment-input"
          />
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
            className="appointment-input"
          />
          <input
            type="file"
            name="appointmentImage"
            accept="image/*"
            onChange={handleImageChange}
            className="appointment-input"
          />
          <button type="submit" className="appointment-button">Book Now</button>
        </form>

        {msg && <p className="appointment-message" style={{ color: 'green' }}>{msg}</p>}
        {error && <p className="appointment-message" style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default BookAppointment;
