import React from "react";
import { useNavigate } from "react-router-dom";
import "./PatientHome.css"; // rename CSS too if you want!

const doctors = [
  { name: "Doc1 name", specialty: "Oncologist", exp: "12 yrs", rating: 3, id: 1 },
  { name: "Doc2 name", specialty: "Cardiologist", exp: "22 yrs", rating: 4, id: 2 },
  { name: "Doc3 name", specialty: "Pediatrist", exp: "17 yrs", rating: 3.5, id: 3 },
  { name: "Doc4 name", specialty: "Radiologist", exp: "33 yrs", rating: 4.5, id: 4 },
  { name: "Doc5 name", specialty: "Orthopedist", exp: "5 yrs", rating: 3.5, id: 5 },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const half = rating % 1 !== 0;
  const empty = 5 - fullStars - (half ? 1 : 0);

  return (
    <>
      {"★".repeat(fullStars)}
      {half && "☆"}
      {"☆".repeat(empty)}
    </>
  );
};

const PatientHome = () => {
  const navigate = useNavigate();

  const handleScheduleClick = (doctorId) => {
    navigate("/patienthome/bookappointment", { state: { doctorId } });
  };

  return (
    <div className="container">
      <h2>Our Doctors</h2>
      <div className="doctor-list">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <p><strong>{doc.name}</strong></p>
            <p>{doc.specialty}</p>
            <p>{doc.exp} experience</p>
            <p>{renderStars(doc.rating)}</p>
            <button onClick={() => handleScheduleClick(doc.id)}>Schedule now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientHome;
