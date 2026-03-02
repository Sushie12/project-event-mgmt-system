import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";


function AddVenue() {
  const [formData, setFormData] = useState({
    venueName: "",
    location: "",
    maxSeating: "",
    length:"",
    width:"",
    mealsIncluded: false,
    costPerHour: "",
    contactNo: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/venues", formData);
      setMessage("Venue added successfully!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Failed to add venue");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ color: "#9c3636ff", marginBottom: "20px" }}>Add Event Venue</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Event Venue Name *
          </label>
          <input
            type="text"
            name="venueName"
            value={formData.venueName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "14px"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "14px"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Max Seating Capacity *
          </label>
          <input
            type="number"
            name="maxSeating"
            value={formData.maxSeating}
            onChange={handleChange}
            required
            min="1"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "14px"
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Room Dimensions *
          </label>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
             Length:
            </label>
            {/* Length Field */}
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleChange}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd", width: "80px" }}
            />
            <span>ft.</span>

            {/* Width Field */}
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
             Width:
            </label>
            <input
              type="number"
              name="width"
              value={formData.width}
              onChange={handleChange}
              required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd", width: "80px" }}
            />
            <span>ft.</span>

            {/* Area Display */}
            <div style={{ marginLeft: "15px", fontWeight: "bold", color: "#555" }}>
              Area: {formData.length && formData.width ? formData.length * formData.width : 0} sqft
            </div>

          </div>
        </div>


        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              name="mealsIncluded"
              checked={formData.mealsIncluded}
              onChange={handleChange}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <span style={{ fontWeight: "bold" }}>Meals Included</span>
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Cost of Venue for 1 Hour (₹) *
          </label>
          <input
            type="number"
            name="costPerHour"
            value={formData.costPerHour}
            onChange={handleChange}
            required
            min="0"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "14px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Your Contact No. *
          </label>
          <input
            type="tel"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            placeholder="10-digit mobile number"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "14px"
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            background: "#2563eb",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Submit Venue
        </button>
        
      </form>

      {message && (
        <p style={{ 
          marginTop: "15px", 
          textAlign: "center",
          color: message.includes("success") ? "green" : "red"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddVenue;