const express = require("express");
const Patient = require("../models/Patient.model.js");
const router = express.Router();
const {getAllPatients, getPatient, addPatient, updatePatient, deletePatient, login} = require('../controllers/patient.controller.js');


router.get('/', getAllPatients);
router.get("/:id", getPatient);

router.post("/", addPatient);
router.post("/login/",login);
// update a patient
router.put("/:id", updatePatient);

// delete a patient
router.delete("/:id", deletePatient);

router.get("/authenticated-endpoint",getAllPatients);
router.get("/free-endpoint",getAllPatients);



module.exports = router;
