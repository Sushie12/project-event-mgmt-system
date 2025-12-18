import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import API from "../api";


function Welcome() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(""); // "signup" or "login"
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    userId: "",
    dob: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signup") {
        const res = await API.post("/auth/register", formData);
        setMessage(res.data.msg);
      } else if (mode === "login") {
        const res = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setMessage("Login successful!");

        setTimeout(() => navigate("/home"), 500);
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #80deea)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
          width: "380px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#00796b",
            borderBottom: "3px solid #00796b",
            display: "inline-block",
            paddingBottom: "5px",
            marginBottom: "25px",
          }}
        >
          Welcome to the Event Management Project!
        </h1>

        {!mode && (
          <>
            <p style={{ fontSize: "18px", margin: "15px 0" }}>New User?</p>
            <button
              onClick={() => setMode("signup")}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#00796b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>

            <p style={{ margin: "20px 0", fontWeight: "bold" }}>(OR)</p>

            <p style={{ fontSize: "18px", margin: "15px 0" }}>
              Already have an account?
            </p>
            <button
              onClick={() => setMode("login")}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#004d40",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </>
        )}

        {mode && (
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "20px",
              textAlign: "left",
            }}
          >
            <h2 style={{ color: "#00796b", textAlign: "center" }}>
              {mode === "signup" ? "Sign Up" : "Login"}
            </h2>

            <label>Name:</label>
            <input
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}wor
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            {mode === "signup" && (
              <>
                <label>User ID:</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />

                <label>Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#00796b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
                marginTop: "15px",
              }}
            >
              {mode === "signup" ? "Register" : "Login"}
            </button>

            <button
              type="button"
              onClick={() => setMode("")}
              style={{
                marginTop: "10px",
                background: "none",
                color: "#00796b",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Back
            </button>
          </form>
        )}

        {message && <p style={{ marginTop: "15px", color: "#004d40" }}>{message}</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0 15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};


export default Welcome;
