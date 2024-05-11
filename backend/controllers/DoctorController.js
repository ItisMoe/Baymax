const Doctor = require('../models/Doctor'); 


const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


const addDoctor = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Check if patient with the provided email already exists
      const existingDoctor = await Doctor.findOne({ email: req.body.email });
      if (existingDoctor) {
        console.log("Doctor email already exists");
        return res.status(400).send({
          message: "Doctor email already exists",
        });
      }
  
      // Create a new patient instance with hashed password
      const doctor = await Doctor.create({ ...req.body, password: hashedPassword });
  
      // Send success response
      res.status(201).send({
        message: "Doctor Created Successfully",
        result: doctor,
      });
    } catch (error) {
      console
      // Handle unexpected errors
      res.status(500).send({
        message: "Error creating patient",
        error: error.message,
      });
    }
  };
  
  const login = async (request, response) => {
    try {
      console.log("request sent to me");
      // Check if email exists
      const doctor = await Doctor.findOne({ email: request.body.email });
      if (!doctor) {
        console.log("email not found")
        return response.status(404).send({
          message: "Username not found",
        });
      }
  
      // Compare the entered password and the hashed password
      const passwordCheck = await bcrypt.compare(request.body.password, doctor.password);
      if (!passwordCheck) {
        return response.status(400).send({
          message: "Passwords do not match",
        });
      }
  
      // Create JWT token
      const token = jwt.sign(
        {
          userIdMongo: doctor._id, // Assuming MongoDB's default ID field
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
  
      // Return success response
      response.status(200).send({
        message: "Login Successful",
        email: doctor.email,
        token,
      });
    } catch (error) {
      console.error(error);
      response.status(500).send({
        message: "Error during login",
        error: error.message,
      });
    }
  };

  const getAvailableAppointments = async (req, res) => {
    const { email, date } = req.body;

    try {
        // Find the doctor by email
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Filter the doctor's appointments for the given date and status 'Available'
        const availableAppointments = doctor.appointments.filter(appointment =>
            appointment.date.getTime() === new Date(date).getTime() 
            //&& appointment.status === 'Available'
        );

        // Respond with the available appointments for the given date
        res.status(200).json({ availableAppointments });
    } catch (error) {
        console.error('Error fetching available appointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Controller method to add a time slot for a doctor
const addTimeSlot = async (req, res) => {
    const { email } = req.body; // Assuming the email is sent in the request body
    const timeSlotData = req.body.timeSlot; // Assuming the time slot data is sent in the request body under the 'timeSlot' key

    try {
        // Find the doctor by email
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Check if there are any existing time slots that overlap with the new time slot
        const overlappingTimeSlot = doctor.availableTimeSlots.find(slot => {
            if (slot.date.getTime() === new Date(timeSlotData.date).getTime()) {
                if ((new Date(timeSlotData.date + 'T' + slot.start_time) >= new Date(timeSlotData.date + 'T' + timeSlotData.start_time) &&
                    new Date(timeSlotData.date + 'T' + slot.start_time) < new Date(timeSlotData.date + 'T' + timeSlotData.end_time)) ||
                    (new Date(timeSlotData.date + 'T' + slot.end_time) > new Date(timeSlotData.date + 'T' + timeSlotData.start_time) &&
                    new Date(timeSlotData.date + 'T' + slot.end_time) <= new Date(timeSlotData.date + 'T' + timeSlotData.end_time)) ||
                    (new Date(timeSlotData.date + 'T' + slot.start_time) <= new Date(timeSlotData.date + 'T' + timeSlotData.start_time) &&
                    new Date(timeSlotData.date + 'T' + slot.end_time) >= new Date(timeSlotData.date + 'T' + timeSlotData.end_time))) {
                    return true; // Overlapping time slot found
                }
            }
            return false; // No overlapping time slot found
        });

        if (overlappingTimeSlot) {
            return res.status(400).json({ error: 'Time slot overlaps with an existing slot' });
        }

        // Create a new time slot using the provided data
        const newTimeSlot = {
            _id: mongoose.Schema.Types.ObjectId,
            date: timeSlotData.date,
            start_time: timeSlotData.start_time,
            end_time: timeSlotData.end_time,
            status: 'Available' // Assuming newly added time slots are initially available
        };

        // Add the new time slot to the doctor's availableTimeSlots array
        doctor.availableTimeSlots.push(newTimeSlot);

        // Save the updated doctor document
        await doctor.save();

        // Respond with success message
        res.status(200).json({ message: 'Time slot added successfully', timeSlot: newTimeSlot });
    } catch (error) {
        console.error('Error adding time slot:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addTimeSlot };
