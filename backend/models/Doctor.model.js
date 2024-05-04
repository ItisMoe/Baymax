const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
  sex: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  universityStudied: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { data: Buffer, contentType: String }, // Storing image as binary data
  availableTimeSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot' }], // Array of available time slot IDs
  availableAppointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }] // Array of available appointment IDs
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
