import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [seatsToBook, setSeatsToBook] = useState("");
  const [confirmationStep, setConfirmationStep] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookingType, setBookingType] = useState("");

  const fetchEvent = useCallback(async () => {
    try {
      const res = await API.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error("Error fetching event:", err.response?.data || err);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (!event) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const registeredSeats = event.registrations?.reduce(
    (sum, r) => sum + (r.seats || 1),
    0
  );

  const rsvpSeats = event.rsvps?.reduce(
    (sum, r) => sum + (r.seats || 1),
    0
  );

  const handleBookClick = (type) => {
    setSuccessMessage("");
    setBookingType(type);
    setSeatsToBook("");
    setConfirmationStep("selectSeats");
  };

  const maxSeats =
    bookingType === "rsvp" ? event.maxSeats || 0 : event.seats || 0;

  const seatsBooked =
    bookingType === "rsvp" ? rsvpSeats : registeredSeats;

  const availableSeats = maxSeats - seatsBooked;

  const validateSeatSelection = () => {
    const num = Number(seatsToBook);
    if (!num || num <= 0) return alert("Enter valid seats");
    if (num > availableSeats) return alert("Housefull!");
    setConfirmationStep("confirmBooking");
  };

  const confirmBooking = async () => {
    try {
      const endpoint =
        bookingType === "rsvp"
          ? `/events/rsvp/${id}`
          : `/events/register/${id}`;

      const res = await API.post(endpoint, {
        name: "Guest",
        email: "guest@example.com",
        seats: Number(seatsToBook),
      });

      setSuccessMessage(
        `🎉 ${bookingType.toUpperCase()} successful! Total seats booked: ${res.data.totalSeatsBooked}`
      );
      setConfirmationStep(false);
      fetchEvent();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

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
          {event.title}
        </h2>

        <p style={{ color: "#666", marginBottom: "1rem" }}>
          {event.description}
        </p>

        <div
          style={{
            background: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
          }}
        >
          <p>
            <strong>Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          {/* <p><strong>Date:</strong> {new Date(e.date).toLocaleDateString()}</p> */}
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>

        {/* SEAT INFO */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p>
            <strong>Registered:</strong>{" "}
            {registeredSeats}/{event.seats || 0}
            <span style={{ marginLeft: "0.5rem", color: "#666" }}>
              (Available: {(event.seats || 0) - registeredSeats})
            </span>
          </p>

          {event.enableRsvp && (
            <p>
              <strong>RSVP:</strong>{" "}
              {rsvpSeats}/{event.maxSeats || 0}
              <span style={{ marginLeft: "0.5rem", color: "#666" }}>
                (Available: {(event.maxSeats || 0) - rsvpSeats})
              </span>
            </p>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {(event.seats || 0) - registeredSeats > 0 && (
            <button
              onClick={() => handleBookClick("register")}
              style={{
                flex: 1,
                padding: "0.6rem",
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          )}

          {event.enableRsvp &&
            (event.maxSeats || 0) - rsvpSeats > 0 && (
              <button
                onClick={() => handleBookClick("rsvp")}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  background: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                RSVP
              </button>
            )}
        </div>

        {/* SELECT SEATS */}
        {confirmationStep === "selectSeats" && (
          <div style={{ marginTop: "1rem" }}>
            <input
              type="number"
              min={1}
              max={availableSeats}
              value={seatsToBook}
              onChange={(e) =>
                setSeatsToBook(
                  Math.min(Number(e.target.value), availableSeats)
                )
              }
              style={{
                padding: "0.5rem",
                width: "100%",
                marginBottom: "0.8rem",
              }}
            />
            <button
              onClick={validateSeatSelection}
              style={{
                width: "100%",
                padding: "0.6rem",
                background: "#673ab7",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* CONFIRMATION */}
        {confirmationStep === "confirmBooking" && (
          <div style={{ marginTop: "1rem" }}>
            <p>
              Confirm booking of <strong>{seatsToBook}</strong> seat(s)?
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={confirmBooking}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  background: "#388e3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmationStep(false)}
                style={{
                  flex: 1,
                  padding: "0.6rem",
                  background: "#b71c1c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {successMessage && (
          <p
            style={{
              marginTop: "1rem",
              background: "#e8f5e9",
              padding: "0.8rem",
              borderRadius: "6px",
              color: "#2e7d32",
              fontWeight: "bold",
            }}
          >
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
