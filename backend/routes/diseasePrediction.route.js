const express = require("express");
const router = express.Router();
const { getResponseOpenAI } = require('../controllers/predictDisease.controller.js'); // Updated import


router.post("/", getResponseOpenAI);

module.exports = router;
