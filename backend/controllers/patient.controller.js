const Patient = require("../models/Patient.model");
const Doctor = require("../models/Doctor.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const getAllPatients = async (req, res) => {
    try {
      const patients = await Patient.find({});
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const getPatient = async (req, res) => {
    try {
      const { email } = req.params;
      const patient = await Patient.findById(email);
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };






  const addPatient = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Check if patient with the provided email already exists
      const existingPatient = await Patient.findOne({ email: req.body.email });
      if (existingPatient) {
        console.log("Patient email already exists");
        return res.status(400).send({
          message: "Patient email already exists",
        });
      }
  
      // Create a new patient instance with hashed password
      const patient = await Patient.create({ ...req.body, password: hashedPassword });
  
      // Send success response
      res.status(201).send({
        message: "Patient Created Successfully",
        result: patient,
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
  
  
  

  const updatePatient = async (req, res) => {
    try {
      const { id } = req.params;
  
      const patient = await Patient.findByIdAndUpdate(id, req.body);
  
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      const updatedPatient = await Patient.findById(id);
      res.status(200).json(updatePatient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deletePatient = async (req, res) => {
    try {
      const { id } = req.params;
  
      const patient = await Patient.findByIdAndDelete(id);
  
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const login = async (request, response) => {
    try {
      console.log("request sent to me");
  
      // Check if email exists for patient
      const patient = await Patient.findOne({ email: request.body.email });
      if (patient) {
        // Compare the entered password and the hashed password for patient
        const passwordCheck = await bcrypt.compare(request.body.pass, patient.password);
        if (passwordCheck) {
          // Create JWT token for patient
          const token = jwt.sign(
            {
              userIdMongo: patient._id, 
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
  
          console.log("user type returned "+0);
          // Return success response for patient
          return response.status(200).send({
            message: "Login Successful for patient",
            userType: 0, // 0 for patient
            email: patient.email,
            token,
          });
        }
      }
  
      // Check if email exists for doctor
      const doctor = await Doctor.findOne({ email: request.body.email });
      if (doctor) {
        // Compare the entered password and the hashed password for doctor
        const passwordCheck = await bcrypt.compare(request.body.pass, doctor.password);
        if (passwordCheck) {
          // Create JWT token for doctor
          const token = jwt.sign(
            {
              userIdMongo: doctor._id, // Assuming MongoDB's default ID field
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
  
          // Return success response for doctor
          return response.status(200).send({
            message: "Login Successful for doctor",
            userType: 1, // 1 for doctor
            email: doctor.email,
            token,
          });
        }
      }
      console.log("user type returned "+1);
      // Return error response if login fails
      return response.status(400).send({
        message: "Login failed, invalid credentials",
        userType: 2, // 2 for failed login
      });
    } catch (error) {
      console.log("user type returned "+2);
      console.error(error);

      response.status(500).send({
        message: "Error during login",
        error: error.message,
        userType: 2, // 2 for failed login
      });
    }
  };
  
  
  const login2 = async (request, response) => {
    try {
      console.log("request sent to me and i am caleed");
      // Check if email exists
      const user = await Patient.findOne({ email: request.body.email });
      if (!user) {
        console.log("email not found")
        return response.status(404).send({
          message: "Username not found",
        });
      }
  
      // Compare the entered password and the hashed password
      const passwordCheck = await bcrypt.compare(request.body.password, user.password);
      if (!passwordCheck) {
        return response.status(400).send({
          message: "Passwords do not match",
        });
      }
  
      // Create JWT token
      const token = jwt.sign(
        {
          userIdMongo: user._id, // Assuming MongoDB's default ID field
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
  
      // Return success response
      response.status(200).send({
        message: "Login Successful",
        email: user.email,
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

  const checkEmail = async (request, response) => {
    try {
      
      const  email  = request.body.email;
      console.log("i was called: "+email);
      // Check if email exists
      const user = await Patient.findOne({ email: email });
      if (user) {
        console.log("i returned fine");
        return response.status(500).send({
          message: "Email already Exists",
        });
      }
      else{
        return response.status(201).send({
          message: "Email does not exist",
        });
      }
  

    } catch (error) {
      console.error(error);
      response.status(500).send({
        message: "Error during trying to find email",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    login,
    getPatient,
    getAllPatients,
    addPatient,
    updatePatient,
    deletePatient,
    checkEmail,
  };