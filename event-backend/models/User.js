const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: { type: String, required: true, unique: true }, // unique user ID
  dob: { type: Date, required: true },
  invitedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
 
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
