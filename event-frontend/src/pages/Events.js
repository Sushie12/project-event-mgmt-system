import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";


function Events() {
  const [events, setEvents] = useState([]);

 useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      // Sort by createdAt descending
      const sortedEvents = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setEvents(sortedEvents);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };
  fetchEvents();
}, []);


  return (
    <div style={{ padding: "1rem" }}>
      <h2>Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        events.map((e) => (
          <Link key={e._id} to={`/events/${e._id}`}>
          <div key={e._id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
            <h3>{e.title}</h3>
            <p>{e.description}</p>
            <p><strong>Date:</strong> {new Date(e.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {e.location}</p>
          </div>
          </Link>
        ))
      )}
    </div>
    
  );
}

export default Events;
