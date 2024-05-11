const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctor_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Confirmed', 'Cancelled', 'Completed'], default: 'Confirmed' },
    reminder_sent: { type: Boolean, default: false }
});

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nationality: { type: String, required: true },
    sex: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    activityLevel: { type: String, required: true },
    isSmoking: { type: Boolean, default: false },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bloodPressure: { type: Number },
    allergies: [{ type: String }],
    diseases: [{
        disease_Name: { type: String },
        infection_start_Date: { type: Date }
    }],
    vaccines: [{
        name: { type: String },
        date: { type: Date }
    }],
    surgeries: [{
        name: { type: String },
        date: { type: Date },
        recovered: { type: Boolean }
    }],
    image: { type: String },
    familyChronicDiseases: [{
        name: { type: String },
        relation: { type: String }
    }],
    medications: [{
        relation: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        dailyDose: { type: Number },
        remainingPills: { type: String }
    }],
    bookedAppointments: [appointmentSchema]
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
