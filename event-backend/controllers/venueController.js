const Venue = require('../models/Venue');

// Create a new venue
const createVenue = async (req, res) => {
  try {
    const { venueName, location, maxSeating, length,width, mealsIncluded, costPerHour, contactNo } = req.body;

    // Validation
    if (!venueName || !location || !maxSeating || !length || !width || !costPerHour || !contactNo) {
      return res.status(400).json({ msg: "All required fields must be filled" });
    }

    // Validate contact number
    if (!/^[0-9]{10}$/.test(contactNo)) {
      return res.status(400).json({ msg: "Contact number must be 10 digits" });
    }

    const newVenue = new Venue({
      ...req.body,
      userId: req.user.userId // From auth middleware
    });

    await newVenue.save();
    res.status(201).json({ msg: "Venue added successfully", venue: newVenue });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get all venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(venues);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get venue by ID
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate('userId', 'name email');
    
    if (!venue) {
      return res.status(404).json({ msg: "Venue not found" });
    }

    res.json(venue);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get venues by user
const getUserVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(venues);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Update venue
const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({ msg: "Venue not found" });
    }

    // Check if user owns this venue
    if (venue.userId.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Not authorized to update this venue" });
    }

    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ msg: "Venue updated successfully", venue: updatedVenue });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Delete venue
const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({ msg: "Venue not found" });
    }

    // Check if user owns this venue
    if (venue.userId.toString() !== req.user.userId) {
      return res.status(403).json({ msg: "Not authorized to delete this venue" });
    }

    await Venue.findByIdAndDelete(req.params.id);
    res.json({ msg: "Venue deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  createVenue,
  getAllVenues,
  getVenueById,
  getUserVenues,
  updateVenue,
  deleteVenue
};