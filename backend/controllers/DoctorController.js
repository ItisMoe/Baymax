const Doctor = require("../models/Doctor.model");

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");


const jwt = require("jsonwebtoken");

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller method to fetch a doctor by email
const getDoctorByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
        message: "Error creating doctor",
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


  //also fetch the patient along with the appointment
  const getAvailableAppointments = async (req, res) => {
    console.log("method called");
    const { email, date } = req.body;
    try {
        // Find the doctor by email
        console.log("get all available appointments call");
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ error: 'lol not found' });
        }

        // Filter the doctor's appointments for the given date and status 'Available'
        const availableAppointments = doctor.appointments.filter(appointment =>
            appointment.date.getTime() === new Date(date).getTime() 
            //&& appointment.status === 'Available'
        );

        // Respond with the available appointments for the given date
        console.log(availableAppointments);
        res.status(200).json({ availableAppointments });
    } catch (error) {
        console.error('Error fetching available appointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Controller method to add a time slot for a doctor
const addTimeSlot = async (req, res) => {
  const { email, timeSlot } = req.body;
  const { date, start_time, end_time } = timeSlot;

  // Convert AM/PM times to 24-hour format
  const startTime24 = convertTo24Hour(start_time);
  const endTime24 = convertTo24Hour(end_time);

  try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
          return res.status(404).send('Doctor not found.');
      }

      const startTime = new Date(`${date}T${startTime24}:00`);
      const endTime = new Date(`${date}T${endTime24}:00`);

      // Validate the date objects
      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
          return res.status(400).send('Invalid date or time provided.');
      }

      // Check for overlapping or exact same time slots
      const overlappingSlots = doctor.availableTimeSlots.filter(slot =>
          new Date(slot.date).toDateString() === new Date(date).toDateString() &&
          ((new Date(slot.start_time) <= startTime && new Date(slot.end_time) > startTime) ||
           (new Date(slot.start_time) < endTime && new Date(slot.end_time) >= endTime) ||
           (new Date(slot.start_time).getTime() === startTime.getTime() && new Date(slot.end_time).getTime() === endTime.getTime()))
      );

      if (overlappingSlots.length > 0) {
          return res.status(400).send('Time slot overlaps with an existing slot or is exactly the same.');
      }

      // Add new time slot
      const newSlot = {
          date: startTime, // Storing both date and time together
          start_time: startTime,
          end_time: endTime,
          status: 'Available' // Default status
      };

      doctor.availableTimeSlots.push(newSlot);
      await doctor.save();
      res.status(201).send('Time slot added successfully.');
  } catch (error) {
      console.error('Error adding time slot:', error);
      res.status(500).send(error.message);
  }
};


function convertTo24Hour(time) {
  let [hours, minutes] = time.match(/\d{1,2}/g);
  const modifier = time.match(/AM|PM/i)[0];

  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  if (modifier.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
  } else if (modifier.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

const getTimeSlotsByDate = async (req, res) => {
  const { email, date } = req.body; // Assuming 'date' is sent in the request body

  console.log(email);
  try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
          return res.status(404).json({ error: 'Doctor not found' });
      }

      if (!doctor.availableTimeSlots) {
          return res.status(404).json({ error: 'No time slots found' });
      }

      // Ensure the date is valid
      const queryDate = new Date(date);
      if (isNaN(queryDate.getTime())) {
          return res.status(400).json({ error: 'Invalid date provided' });
      }

      // Filter time slots based on the given date
      const timeSlots = doctor.availableTimeSlots.filter(slot =>
          new Date(slot.date).toDateString() === queryDate.toDateString()
      );

      // Respond with the filtered time slots for the given date
      res.status(200).json({ timeSlots });
  } catch (error) {
      console.error('Error fetching time slots for doctor:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllDoctors, getDoctorByEmail,addTimeSlot,addDoctor,login,getAvailableAppointments,getTimeSlotsByDate };
