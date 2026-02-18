const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  venueName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  maxSeating: {
    type: Number,
    required: true,
    min: 1
  },
  length: {
    type: Number,
    required: true,
    min: 1
  },
  width:{
    type:Number,
    required:true,
    min:1
  },
  mealsIncluded: {
    type: Boolean,
    default: false
  },
  costPerHour: {
    type: Number,
    required: true,
    min: 0
  },
  contactNo: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Venue', venueSchema);