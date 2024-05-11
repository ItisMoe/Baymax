const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
    date: { type: Date, required: true }, 
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    status: { type: String, enum: ['Available', 'Booked'], default: 'Available' }
});

const appointmentSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Confirmed', 'Cancelled', 'Completed'], default: 'Confirmed' },
    reminder_sent: { type: Boolean, default: false }
});

const doctorSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    specialty: { type: String, required: true },
    location: { type: String, required: true },
    sex: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    universityStudied: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    availableTimeSlots: [timeSlotSchema], 
    appointments: [appointmentSchema]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
