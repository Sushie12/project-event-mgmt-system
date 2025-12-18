const Event = require('../models/Event');
const mongoose = require("mongoose");

// Create Event

const createEvent= async (req, res) => {
    // console.log("Incoming event data:", req.body);
    // console.log("User:", req.user);
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      isPublic,
      invitedUsers,
      wheelchair,
      eventType,
      seats,
      enableRsvp,
      maxSeats
    } = req.body;

    // ---------------------------
    // VALIDATION SECTION
    // ---------------------------

    // 1️⃣ Required fields
    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({ msg: "Please fill all required fields." });
    }


    // 2️⃣ Private event must have invitedUsers
    if (isPublic === false) {
      if (!invitedUsers || invitedUsers.length === 0) {
        return res.status(400).json({
          msg: "Private event must include invited users list."
        });
      }
    }

    // 3️⃣ Closed event MUST have seats
    if (eventType === "closed") {
      if (!seats || seats < 1) {
        return res.status(400).json({
          msg: "Closed events must specify the number of seats."
        });
      }
    }

    // Open events should not set seats
    if (eventType === "open" && seats) {
      return res.status(400).json({
        msg: "Open events cannot have seats."
      });
    }

    // 4️⃣ If RSVP enabled → maxSeats required
    if (enableRsvp === true) {
      if (!maxSeats || maxSeats < 1) {
        return res.status(400).json({
          msg: "If RSVP is enabled, maxSeats is required."
        });
      }
    }

    // If RSVP disabled → maxSeats must stay null
    if (enableRsvp === false && maxSeats) {
      return res.status(400).json({
        msg: "maxSeats should not be provided when RSVP is disabled."
      });
    }

    // ---------------------------
    // CREATE EVENT
    // ---------------------------
    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      isPublic,
      invitedUsers,
      wheelchair,
      eventType,
      seats: eventType === "closed" ? seats : null,
      enableRsvp,
      maxSeats: enableRsvp ? maxSeats : null,
      createdBy: req.user.userId
    });

    res.status(201).json({
      msg: "Event created successfully!",
      event
      //event: newEvent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registerEvent = async (req, res) => {
  try {
    const { name, email, seats } = req.body;

    if (!name || !email || !seats || seats <= 0) {
      return res.status(400).json({ message: "Name, Email, and valid seats are required" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Only check seats if event is closed
    const currentSeatsBooked = event.registrations.reduce((sum, r) => sum + (r.seats || 1), 0);
    if (event.eventType === "closed" && currentSeatsBooked + seats > event.seats) {
      return res.status(400).json({ message: "Event is FULL" });
    }
    const bookedSeats = Number(seats) || 1;

    // Push current booking
    event.registrations.push({
      name,
      email,
      seats:bookedSeats,       // number of seats booked by this user
      createdAt: new Date()
    });

    await event.save();

    // Total cumulative seats including this booking
    const totalSeatsCumulative = event.registrations.reduce(
      (sum, r) => sum + (r.seats || 1),  // fallback for OLD DATA
      0
    );

    res.json({
      message: "Registration successful",
      totalRegistrations: totalSeatsCumulative,  // cumulative seats
      totalSeatsBooked: seats                     // seats booked by current user
    });
  } catch (err) {
    console.error("REGISTER EVENT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};










// RSVP to Event
// RSVP to Event
const rsvpEvent = async (req, res) => {
  try {
    const { name, email, seats } = req.body;

    if (!name || !email || !seats || seats <= 0) {
      return res.status(400).json({ message: "Name, Email, and valid seats are required" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if seats exceed maxSeats for RSVP
    const seatsBooked = event.rsvps.reduce((sum, r) => sum + (r.seats || 1), 0);
    if (seatsBooked + seats > event.maxSeats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    event.rsvps.push({
      name,
      email,
      seats,      // <-- store the number of seats booked
      createdAt: new Date()
    });

    await event.save();

    res.json({
      message: "RSVP successful",
      totalRsvps: event.rsvps.length,
      totalSeatsBooked: event.rsvps.reduce((sum, r) => sum + (r.seats || 1), 0)
    });
  } catch (err) {
    console.error("RSVP EVENT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};





const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the logged-in user is the event creator
    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    // Log raw incoming id for debugging
    // console.log("Incoming Event ID:", JSON.stringify(req.params.id));

    // Ensure the id is clean
    const id = req.params.id ? req.params.id.replace(/\s+/g, "") : "";
    console.log("Cleaned Event ID:", JSON.stringify(id));

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Event ID" });
    }

    // Fetch event
    const event = await Event.findById(id).populate("createdBy", "email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.json(event);

  } catch (error) {
    console.error("Error in getEventById:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// const getEventById = async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id).populate('createdBy', 'email');
//     if (!event) {
//       return res.status(404).json({ msg: 'Event not found' });
//     }
//     res.json(event);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

// const getEventById = async (req, res) => {
//   try {
//     const id = req.params.id.trim();

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid Event ID" });
//     }

//     const event = await Event.findById(id);

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(event);
//   } catch (error) {
//     console.error("Error fetching event:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



module.exports = { createEvent, getEvents, rsvpEvent,deleteEvent,getEventById,registerEvent};
