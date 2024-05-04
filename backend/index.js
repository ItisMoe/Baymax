const express = require("express");
const mongoose = require("mongoose");
const Patient = require("./models/Patient.model.js");
const patientRoute = require("./routes/patient.route.js");

const dbConnect = require("./db/dbConnect");

const app = express();

require('dotenv').config(); 

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/patients", patientRoute);




app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});




dbConnect().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});