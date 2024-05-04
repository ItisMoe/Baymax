const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patient_ID: { type: Number, unique: true,required: true },
  //    required: [true, "Please provide an Email!"],
  //unique: [true, "Email Exist"],
  image: { type: String, required: true },
  sex: { type: String, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true },

  password: { type: String, required: true },

  address: { type: String, required: true },
  nationality: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  bloodType: { type: String, required: true },
  activityLevel: { type: String, required: true },
  smoking: { type: Boolean, default: false },
  BMI: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bloodPressure: { type: Number },
  allergies: [{ type: String }],
  diseases: [{
    disease_Name: { type: String },
    infection_start_Date: { type: Date }
  }],
  medicationPurchaseHistory: [{
    purchaseId: { type: Number,unique: true },
    medications_purchased:[{
    	medication_Name: { type: String },
    	medication_Price: { type: Number },
    	Quantity: { type: Number },
  }],    
    total_Price: { type: Number },
    datePurchased: { type: Date }
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
  familyChronicDiseases: [{
    name: { type: String },
    relation: { type: String }
  }],
  medications: [{
    medicationName: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication' },
    startDate: { type: Date },
    endDate: { type: Date },
    dailyDose: { type: Number },
    remainingPills:{type: String}
  }],
  bookedAppointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
});
const Patient = mongoose.model('Patient', patientSchema);




module.exports =  Patient;