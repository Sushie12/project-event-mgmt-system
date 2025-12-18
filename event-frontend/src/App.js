import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import HomePage from "./pages/HomePage";
import Events from "./pages/Events";
import CreateNewEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";

function AppWrapper() {
  const location = useLocation();

  // Hide navbar on these pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<CreateNewEvent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails/>}></Route>
        {/* <Route path="/create" element={<CreateEvent />} /> */}

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
