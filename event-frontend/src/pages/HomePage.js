import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [hoveredId, setHoveredId] = useState(null); // ✅ INSIDE component
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "40px" }}>

      {/* CREATE EVENT BUTTON */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            background: "black",
            color: "white",
            padding: "10px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "15px"
          }}
          onClick={() => navigate("/create")}
        >
          + Create New Event
        </button>
      </div>

      <h1 style={{ color: "#9c3636ff", fontSize: "40px", marginTop: "20px" }}>
        All Events
      </h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          {events.map((event) => {
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
                  boxShadow: isHovered
                    ? "0 8px 20px rgba(0,0,0,0.15)"
                    : "none"
                }}
              >
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <p>
                  <b>Timings:</b> {formattedDate} | {event.time}
                </p>
                <p><b>Location:</b> {event.location}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HomePage;
