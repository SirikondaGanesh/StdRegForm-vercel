import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    registration_id: "",
    student_name: "",
    email: "",
    department: "",
    address: "",
    phone_number: "",
    pincode: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Server response:", data);
        setSubmittedData(data); // show submitted data below form
      })
      .catch((error) => {
        console.error("❌ Error submitting data:", error);
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
          name="registration_id"
          value={formData.registration_id}
          onChange={handleChange}
          required
        />

        <label>Student Name:</label>
        <input
          type="text"
          name="student_name"
          value={formData.student_name}
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
          name="department"
          value={formData.department}
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
          name="phone_number"
          value={formData.phone_number}
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
          <p><strong>Registration ID:</strong> {submittedData.registration_id}</p>
          <p><strong>Student Name:</strong> {submittedData.student_name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Department:</strong> {submittedData.department}</p>
          <p><strong>Address:</strong> {submittedData.address}</p>
          <p><strong>Phone Number:</strong> {submittedData.phone_number}</p>
          <p><strong>Pincode:</strong> {submittedData.pincode}</p>
        </div>
      )}
    </div>
  );
}

export default App;
