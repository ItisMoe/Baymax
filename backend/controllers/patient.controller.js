const Patient = require("../models/Patient.model");

const bcrypt = require("bcrypt");


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
      const { id } = req.params;
      const patient = await Patient.findById(id);
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const addPatient1 = async (req, res) => {
    try {
      //hashing the password for the patient

      
      const patient = await Patient.create(req.body);
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //const addPatient= async(req,res) =>{

      // hash the password
  // bcrypt
   
  // .hash(req.body.address, 10)
  // .then((hashedPassword) => {
  //   // create a new user instance and collect the data
  //   const patient =  Patient.create(req.body)

      // return success if the new user is added to the database successfully
      // .then((result) => {

   //   try{
     // const hashedAddress = await bcrypt.hash(req.body.address, 10);

      // Create a new patient instance with hashed address
      //const patient = await Patient.create({ ...req.body, address: hashedAddress });
  
        //res.status(201).send({
          //message: "Patient Created Successfully",
          //result,
        //});
      //}
      // catch error if the new user wasn't added successfully to the database
      //.catch((error) => {
        //res.status(500).send({
         // message: "Error creating patient::"+error,
          //error,
        //});
      //});
  //})
  // catch error if the password hash isn't successful
  //.catch((e) => {
    //res.status(500).send({
      //message: "Password was not hashed successfully",
      //e,
    //});
  //});


  const addPatient = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Create a new patient instance with hashed address
      const patient = await Patient.create({ ...req.body, password: hashedPassword });
  
      // Send success response
      res.status(201).send({
        message: "Patient Created Successfully",
        result: patient, // Assuming you want to send the created patient object
      });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send({
        message: "Error creating patient",
        error: error.message, // Send error message for better understanding
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
  
  const login= async (request, response) => {
     // check if email exists
     const hashedPassword = await bcrypt.hash(request.body.password, 10);

  Patient.findOne({ userName: request.body.userName })

  // if email exists
  .then((user) => {
    // compare the password entered and the hashed password found
    
console.log(hashedPassword);
console.log(user.password);
    bcrypt
      .compare(hashedPassword, user.password)
      

      // if the passwords match
      .then((passwordCheck) => {

        // check if password matches
        if(!passwordCheck) {
          return response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        }

        //   create JWT token
        const token = jwt.sign(
          {
            userIdMongo: user.patient_ID
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );

        //   return success response
        response.status(200).send({
          message: "Login Successful",
          email: user.email,
          token,
        });
      })
      // catch error if password does not match
      .catch((error) => {
        response.status(400).send({
          message: "Passwords does not match",
          error,
        });
      });
  })
  // catch error if email does not exist
  .catch((e) => {
    response.status(404).send({
      message: "Username not found",
      e,
    });
  });
  }

  module.exports = {
    login,
    getPatient,
    getAllPatients,
    addPatient,
    updatePatient,
    deletePatient,
  };