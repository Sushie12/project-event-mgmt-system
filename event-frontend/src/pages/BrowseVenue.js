import React, { useEffect, useState } from "react";
import API from "../api"; // Adjust path based on your file structure
import { useNavigate } from "react-router-dom";

function BrowseVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await API.get("/venues"); // This hits your getAllVenues controller
        setVenues(res.data);
      } catch (err) {
        console.error("Failed to fetch venues", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading Venues...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ color: "#9c3636", marginBottom: "30px" }}>Available Venues</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {venues.map((venue) => {
          const isHovered = hoveredId === venue._id;
          
          // Calculate Area on the fly
          const area = venue.length * venue.width;

          return (
            <div
              key={venue._id}
              onMouseEnter={() => setHoveredId(venue._id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate(`/venues/${venue._id}`)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                background: "#fafafa",
                cursor: "pointer",
                transition: "all 0.2s ease",
                transform: isHovered ? "translateY(-5px)" : "translateY(0)",
                boxShadow: isHovered ? "0 8px 20px rgba(0,0,0,0.15)" : "none",
              }}
            >
              <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>{venue.venueName}</h2>
              
              <div style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
                <p style={{ margin: "5px 0" }}>
                  <span style={{ fontWeight: "bold" }}>Location:</span> {venue.location}
                </p>
                
                <p style={{ margin: "5px 0" }}>
                  <span style={{ fontWeight: "bold" }}>Dimensions:</span> {venue.length}ft x {venue.width}ft 
                  <span style={{ color: "#2563eb", fontWeight: "bold" }}> ({area} sqft)</span>
                </p>

                <p style={{ margin: "5px 0" }}>
                  <span style={{ fontWeight: "bold" }}>Max Seating:</span> {venue.maxSeating} People
                </p>

                <p style={{ margin: "5px 0" }}>
                  <span style={{ fontWeight: "bold" }}>Price:</span> ₹{venue.costPerHour}/hr
                </p>
              </div>

              {venue.mealsIncluded && (
                <div style={{ 
                  marginTop: "10px", 
                  display: "inline-block", 
                  padding: "4px 8px", 
                  background: "#dcfce7", 
                  color: "#166534", 
                  borderRadius: "4px", 
                  fontSize: "12px",
                  fontWeight: "bold"
                }}>
                  Meals Included
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BrowseVenues;