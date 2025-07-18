import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    registrationID: "",
    studentName: "",
    email: "",
    departmentsr: "",
    address: "",
    phoneNumber: "",
    pincode: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = (e) => {
  e.preventDefault();

  fetch('http://localhost:5000/api/studentDB', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Server response:", data);
      setSubmittedData(formData);  // only update UI if backend is successful
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      alert("Something went wrong while submitting the form.");
    });
};




  return (
    <div className="container">
      <h2>Student Application Form</h2>
      <form onSubmit={handleSubmit}>

        <label>Registration ID:</label>
        <input
          type="text"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          required
         />  
        <label>Student Name:</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
       
        />

        <label>Department:</label>
        <input
          type="text"
          name="departmentsr"
          value={formData.departmentsr}
          onChange={handleChange}
          required
        />

        <label>Address:</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <label>Pincode:</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="output-box">
          <h3>Submitted Student Details</h3>
          <p><strong>Registration ID:</strong> {submittedData.rollNo}</p>
          <p><strong>Student Name:</strong> {submittedData.studentName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Department:</strong> {submittedData.departmentsr}</p>
          <p><strong>Address:</strong> {submittedData.address}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Pincode:</strong> {submittedData.pincode}</p>
        </div>
      )}
    </div>
  );
}

export default App;