const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    description: { type: String, required: true },

    // Store date and time separately (both as strings)
    date: { type: String, required: true }, // e.g. "2025-12-04"
    time: { type: String, required: false }, // e.g. "14:30"

    location: { type: String, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // -------------------------------
    // Availability
    // -------------------------------
    isPublic: { type: Boolean, default: true },

    invitedUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],

    // -------------------------------
    // Accessibility
    // -------------------------------
    

    // -------------------------------
    // Event Type (Open or Closed)
    // -------------------------------
    eventType: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },

    seats: {
      type: Number,
      default: null // controller enforces only for closed events
    },
    
     registrations: {
      type: [
        {
          name: String,
          email: String,
          seats: { type: Number, required: true },
          createdAt: { type: Date, default: Date.now }
        }
      ],
      default: []
    },


    // -------------------------------
    // RSVP Enable/Disable
    // -------------------------------
    enableRsvp: {
      type: Boolean,
      default: false
    },

    maxSeats: {
      type: Number,
      default: null // required only if enableRsvp = true
    },

    // -------------------------------
    // RSVP List
    // -------------------------------
  rsvps: {
  type: [
    {
      name: String,
      email: String,
      seats: { type: Number, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  default: []
},

  wheelchair: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
