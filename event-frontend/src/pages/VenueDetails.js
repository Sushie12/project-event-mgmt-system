import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await API.get(`/venues/${id}`);
        setVenue(res.data);
      } catch (err) {
        console.error("Error fetching venue:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!venue) return <p style={{ textAlign: "center" }}>Venue not found.</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "2rem",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem", color: "#333" }}>
          {venue.venueName}
        </h2>

        <p style={{ color: "#666", marginBottom: "1rem" }}>
          {venue.location}
        </p>

        <div
          style={{
            background: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          <p><strong>Max Seating:</strong> {venue.maxSeating} People</p>
          <p>
            <strong>Dimensions:</strong> {venue.length}ft x {venue.width}ft 
            <span style={{ marginLeft: "0.5rem", color: "#666" }}>
              (Area: {venue.length * venue.width} sqft)
            </span>
          </p>
          <p><strong>Cost:</strong> ₹{venue.costPerHour} / hour</p>
          <p><strong>Contact:</strong> {venue.contactNo}</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <p>
            <strong>Meals Included:</strong> {venue.mealsIncluded ? "Yes" : "No"}
          </p>
          {venue.mealsIncluded && (
            <p style={{ color: "#d97a7a", fontSize: "14px", marginTop: "0.5rem" }}>
              Note: Contact the venue provider to further discuss the food details.
            </p>
          )}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: "#666", fontSize: "13px", marginBottom: "1rem" }}>
            Note: Kindly contact the venue provider to avoid any further discrepancies.
          </p>
          
          <button
            onClick={() => alert("Booking initiated!")}
            style={{
              width: "100%",
              padding: "0.6rem",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Book Now!
          </button>
        </div>
      </div>
    </div>
  );
}

export default VenueDetails;




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api";

// function VenueDetails() {
//   const { id } = useParams(); // Grabs the ID from the URL
//   const [venue, setVenue] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVenueDetails = async () => {
//       try {
//         const res = await API.get(`/venues/${id}`);
//         setVenue(res.data);
//       } catch (err) {
//         console.error("Error fetching venue details", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVenueDetails();
//   }, [id]);

//   if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading Venue Details...</div>;
//   if (!venue) return <div style={{ textAlign: "center", padding: "50px" }}>Venue not found.</div>;

//   return (
//     <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
//       <button onClick={() => navigate(-1)} style={{ marginBottom: "20px", cursor: "pointer", background: "none", border: "none", color: "#2563eb", fontWeight: "bold" }}>
//         ← Back to Browse
//       </button>

//       <h1 style={{ color: "#9c367f", marginBottom: "10px" }}>{venue.venueName}</h1>
//       <p style={{ fontSize: "18px", color: "#555" }}>{venue.location}</p>

//       <hr style={{ margin: "20px 0", border: "0.5px solid #eee" }} />

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", fontSize: "16px" }}>
//         <p><strong>Max Seating:</strong> {venue.maxSeating} People</p>
//         <p><strong>Dimensions:</strong> {venue.length}ft x {venue.width}ft ({venue.length * venue.width} sqft)</p>
//         <p><strong>Cost Per Hour:</strong> ₹{venue.costPerHour}</p>
//         <p><strong>Contact:</strong> {venue.contactNo}</p>
//       </div>

//       <div style={{ marginTop: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "8px" }}>
//         <p><strong>Meals Included:</strong> {venue.mealsIncluded ? " Yes" : "No"}</p>
//         {venue.mealsIncluded && (
//           <p style={{ color: "#d97a7a", fontStyle: "italic", fontSize: "14px", marginTop: "5px" }}>
//             <strong>Note:</strong> Contact the venue provider to further discuss the food details.
//           </p>
//         )}
//       </div>

//       <div style={{ marginTop: "30px", textAlign: "center" }}>
//         <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>
//           <strong>Note:</strong> Kindly contact the venue provider to avoid any further discrepancies.
//         </p>
        
//         <button 
//           onClick={() => alert("Booking functionality coming soon!")}
//           style={{
//             width: "100%",
//             padding: "15px",
//             background: "#2563eb",
//             color: "white",
//             fontSize: "18px",
//             fontWeight: "bold",
//             border: "none",
//             borderRadius: "10px",
//             cursor: "pointer"
//           }}
//         >
//           Book Now!
//         </button>
//       </div>
//     </div>
//   );
// }

// export default VenueDetails;