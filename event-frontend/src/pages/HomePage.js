import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [dashboard, setDashboard] = useState({ createdEvents: [], invitedEvents: [] });
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "User";

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/events/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchDashboard();
  }, []);

  // Reusable event card
  const EventCard = ({ event }) => {
    const formattedDate = event.date
      ? new Date(event.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : "";

    const isHovered = hoveredId === event._id;

    return (
      <div
        key={event._id}
        onClick={() => navigate(`/events/${event._id}`)}
        onMouseEnter={() => setHoveredId(event._id)}
        onMouseLeave={() => setHoveredId(null)}
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          background: "#fafafa",
          cursor: "pointer",
          transition: "all 0.2s ease",
          transform: isHovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: isHovered ? "0 8px 20px rgba(0,0,0,0.15)" : "none"
        }}
      >
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p><b>Timings:</b> {formattedDate} | {event.time}</p>
        <p><b>Location:</b> {event.location}</p>
      </div>
    );
  };

  return (
    
    <div style={{ padding: "40px" }}>

      <h1 style={{color:"#cf1717"}}>Hello {userName},Welcome to Home Page!</h1>

      <button
        onClick={() => navigate("/browse-venues")}
        style={{ borderRadius: "10px", background: "#d97a7a", cursor: "pointer", padding: "10px 4px" }}>
        Browse All Venues
      </button>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onMouseEnter={(e) => (e.target.style.background = "#91a7e1")}
          onMouseLeave={(e) => (e.target.style.background = "#6570e9")}
          style={{ background: "#6570e9", color: "white", padding: "10px 5px", borderRadius: "10px", cursor: "pointer", fontSize: "15px", marginRight: "10px", transition: "background 0.3s ease" }}
          onClick={() => navigate("/add-venue")}
        >
          + Add Event Venue
        </button>

        <button
          onMouseEnter={(e) => (e.target.style.background = "#3a363674")}
          onMouseLeave={(e) => (e.target.style.background = "#1d1515")}
          style={{ background: "#1d1515", color: "white", padding: "8px 5px", borderRadius: "8px", cursor: "pointer", fontSize: "15px" }}
          onClick={() => navigate("/create")}
        >
          + Create New Event
        </button>
      </div>

      {/* ========== DASHBOARD SECTION ========== */}

     

      {/* Invited Events */}
      <h2 style={{ color: "#d97a7a", marginTop: "40px" }}> Events I'm Invited To</h2>
      {dashboard.invitedEvents.length === 0 ? (
        <p style={{ color: "#888" }}>You have no event invitations.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "10px" }}>
          {dashboard.invitedEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {/* ========== ALL EVENTS SECTION ========== */}
      <h1 style={{ color: "#9c3636ff", fontSize: "40px", marginTop: "40px" }}>All Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

       {/* My Created Events */}
      <h2 style={{ color: "#6570e9", marginTop: "40px" }}>My Created Events</h2>
      {dashboard.createdEvents.length === 0 ? (
        <p style={{ color: "#888" }}>You haven't created any events yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "10px" }}>
          {dashboard.createdEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

    </div>

    
  );
}

export default HomePage;




