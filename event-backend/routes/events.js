const express = require('express');
const router = express.Router();
const { createEvent, getEvents, rsvpEvent,deleteEvent,getEventById,registerEvent} = require('../controllers/eventController');
const  protect  = require('../middleware/authMiddleware'); // optional JWT auth

// Routes
router.post('/', protect, createEvent);       // Create event (only logged-in users)
router.get('/', getEvents);                   // Get all events
router.get('/:id', getEventById); 

router.delete('/:id', protect, deleteEvent);  //delete an event(by an event creator only)
router.post("/register/:id", registerEvent);  // register
router.post("/rsvp/:id", rsvpEvent);



module.exports = router;

