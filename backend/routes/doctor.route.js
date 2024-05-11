const express = require("express");
const Doctor = require("../models/Doctor.model.js");
const router = express.Router();
const {getAllDoctors, getDoctorByEmail ,addTimeSlot,addDoctor,login,getAvailableAppointments,getTimeSlotsByDate } = require('../controllers/DoctorController.js');

router.get('/', getAllDoctors);
router.get("/getAvailableAppointments/",getAvailableAppointments);


router.post("/", addDoctor);

// router.get("/:id", getDoctorByEmail);


router.post("/login/",login);

router.post("/addTimeSlot/",addTimeSlot);
router.get("/getTimeSlotsByDate/",getTimeSlotsByDate);



module.exports = router;
