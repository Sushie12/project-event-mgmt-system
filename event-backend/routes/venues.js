const express = require('express');
const router = express.Router();
const protect= require('../middleware/authMiddleware');
const {
  createVenue,
  getAllVenues,
  getVenueById,
  getUserVenues,
  updateVenue,
  deleteVenue
} = require('../controllers/venueController');

// Public routes
router.get('/', getAllVenues);              // Get all venues
router.get('/:id', getVenueById);           // Get single venue

// Protected routes (require authentication)
router.post('/', protect, createVenue);           // Create venue
router.get('/user/my-venues', protect, getUserVenues);  // Get user's venues
router.put('/:id', protect, updateVenue);         // Update venue
router.delete('/:id', protect, deleteVenue);      // Delete venue

module.exports = router;