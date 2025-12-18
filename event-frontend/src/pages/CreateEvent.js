import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    isPublic: true,
    invitedUsers: "",
    wheelchair: false,
    eventType: "open",
    seats: "",
    enableRsvp: false,
    maxSeats: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // const [dateError, setDateError] = useState("");


 const handleSubmit = async (e) => {
  e.preventDefault();


  const payload = {
    ...form,
    invitedUsers:
      form.invitedUsers.trim() === ""
        ? []
        : form.invitedUsers.split(",").map((id) => id.trim()),
    seats: form.seats === "" ? null : Number(form.seats),
    maxSeats: form.maxSeats === "" ? null : Number(form.maxSeats)
  };

  try {
    const token = localStorage.getItem("token");

    await API.post("/events", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Event created successfully!");
    navigate("/home");
  } catch (err) {
    alert(err.response?.data?.msg || "Event creation failed");
  }
};


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2f7, #f8f9fb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "14px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)"
        }}
      >
        <h2 style={{ marginBottom: "25px" }}>Create New Event</h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ ...inputStyle, height: "80px" }}
          />

          <input type="date" name="date" value={form.date} onChange={handleChange} required style={inputStyle} />




          <input type="time" name="time" value={form.time} onChange={handleChange} required style={inputStyle} />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>
            Make Available to All?
            <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} />
          </label>

          {!form.isPublic && (
            <input
              name="invitedUsers"
              placeholder="Comma separated User IDs"
              value={form.invitedUsers}
              onChange={handleChange}
              style={inputStyle}
            />
          )}

          <label style={labelStyle}>
            Wheelchair Accessible?
            <input type="checkbox" name="wheelchair" checked={form.wheelchair} onChange={handleChange} />
          </label>

          <label style={labelStyle}>
            Event Type:
            <select name="eventType" value={form.eventType} onChange={handleChange} style={inputStyle}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </label>

          {form.eventType === "closed" && (
            <input
              name="seats"
              type="number"
              placeholder="Number of seats"
              value={form.seats}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          )}

          <label style={labelStyle}>
            Enable RSVP?
            <input type="checkbox" name="enableRsvp" checked={form.enableRsvp} onChange={handleChange} />
          </label>

          {form.enableRsvp && (
            <input
              name="maxSeats"
              type="number"
              placeholder="Max bookings allowed"
              value={form.maxSeats}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          )}

          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "12px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Create Event
          </button>

        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const labelStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px"
};

export default CreateEvent;
