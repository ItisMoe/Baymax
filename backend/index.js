const express = require("express");
const mongoose = require("mongoose");
const Patient = require("./models/Patient.model.js");
const patientRoute = require("./routes/patient.route.js");
const doctorRoute=require("./routes/doctor.route.js")
const cors = require('cors');

const dbConnect = require("./db/dbConnect");


const app = express();

const auth = require("./auth");
app.use(cors());
require('dotenv').config(); 

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes
app.use("/api/patients", patientRoute);
app.use("/api/doctors",doctorRoute)

app.get("/free-endpoint", auth,(request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", (request, response) => {
  response.json({ message: "You are authorized to access me" });
});


app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});




dbConnect().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});