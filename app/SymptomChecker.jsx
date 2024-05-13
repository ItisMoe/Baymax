
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';
import CustomCheckbox from './CustomCheckBox';
import axios from 'axios';


// Simplified categories and mapping provided earlier

const detailedSymptomMapping = {
  // Respiratory Symptoms
  "Sneezing and Coughs": ["continuous_sneezing", "cough", "phlegm"],
  "Breathing Difficulties": ["breathlessness", "fast_heart_rate"],
  "Nasal Congestion": ["runny_nose", "congestion", "sinus_pressure"],
  "Throat and Chest Issues": ["throat_irritation", "chest_pain", "patches_in_throat"],

  // Digestive Symptoms
  "Stomach and Abdominal Issues": ["stomach_pain", "abdominal_pain", "acidity", "ulcers_on_tongue", "indigestion"],
  "Bowel Issues": ["constipation", "diarrhoea", "bloody_stool", "pain_during_bowel_movements", "pain_in_anal_region", "irritation_in_anus"],
  "Liver and Gallbladder Issues": ["yellowish_skin", "dark_urine", "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "stomach_bleeding"],

  // Skin Symptoms
  "Rashes and Irritations": ["skin_rash", "itching", "nodal_skin_eruptions", "pus_filled_pimples", "blackheads", "scurring"],
  "Discolorations and Texture Changes": ["dischromic _patches", "yellowish_skin", "skin_peeling", "silver_like_dusting"],
  "Other Skin Conditions": ["puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"],

  // Pain and Inflammation
  "General Pain": ["headache", "neck_pain", "back_pain", "belly_pain"],
  "Musculoskeletal Pain": ["joint_pain", "knee_pain", "hip_joint_pain", "muscle_pain", "swelling_joints", "movement_stiffness"],
  "Localized Pain": ["pain_behind_the_eyes", "chest_pain", "abdominal_pain"],

  // General Wellbeing
  "Fever and Temperature Related": ["high_fever", "mild_fever", "shivering", "chills"],
  "Fatigue and Energy Levels": ["fatigue", "lethargy", "weakness_in_limbs", "muscle_weakness"],
  "Appetite and Weight Changes": ["weight_gain", "weight_loss", "loss_of_appetite", "increased_appetite"],

  // Neurological Symptoms
  "Headaches and Dizziness": ["headache", "dizziness"],
  "Sensory Issues": ["blurred_and_distorted_vision", "loss_of_smell", "watering_from_eyes"],
  "Coordination and Movement Issues": ["loss_of_balance", "unsteadiness", "weakness_of_one_body_side", "spinning_movements"],

  // Urinary and Renal Issues
  "Urination Issues": ["burning_micturition", "spotting_urination", "continuous_feel_of_urine", "polyuria"],
  "Kidney Related Symptoms": ["yellow_urine", "dark_urine"],

  // Reproductive Health
  "Menstruation Related": ["abnormal_menstruation"],
  "Other Reproductive Symptoms": ["extra_marital_contacts"], // Consider renaming or reclassifying this symptom

  // Mental and Emotional Wellbeing
  "Mood and Behavioral Changes": ["anxiety", "mood_swings", "irritability", "depression"],
  "Cognitive Symptoms": ["lack_of_concentration", "altered_sensorium"],

  // Other Symptoms
  "Less Common Symptoms": ["coma", "receiving_unsterile_injections"],
  "Miscellaneous Symptoms": ["history_of_alcohol_consumption", "family_history", "toxic_look_(typhos)"]
};

const symptomCategories = {
  "Respiratory System": [
    "Sneezing and Coughs",
    "Breathing Difficulties",
    "Nasal Congestion",
    "Throat and Chest Issues"
  ],
  "Digestive System": [
    "Stomach and Abdominal Issues",
    "Bowel Issues",
    "Liver and Gallbladder Issues"
  ],
  "Skin Conditions": [
    "Rashes and Irritations",
    "Discolorations and Texture Changes",
    "Other Skin Conditions"
  ],
  "Pain and Inflammation": [
    "General Pain",
    "Musculoskeletal Pain",
    "Localized Pain"
  ],
  "General Wellbeing": [
    "Fever and Temperature Related",
    "Fatigue and Energy Levels",
    "Appetite and Weight Changes"
  ],
  "Neurological Symptoms": [
    "Headaches and Dizziness",
    "Sensory Issues",
    "Coordination and Movement Issues"
  ],
  "Urinary and Renal Issues": [
    "Urination Issues",
    "Kidney Related Symptoms"
  ],
  "Reproductive Health": [
    "Menstruation Related",
    "Other Reproductive Symptoms"
  ],
  "Mental and Emotional Wellbeing": [
    "Mood and Behavioral Changes",
    "Cognitive Symptoms"
  ],
  "Other Symptoms": [
    "Less Common Symptoms",
    "Miscellaneous Symptoms"
  ]
};



// Icon mapping for each category
const categoryIcons = {
  "Respiratory System": "lungs",
  "Digestive System": "biohazard",
  "Skin Conditions": "allergies",
  "Pain and Inflammation": "biohazard",
  "General Wellbeing": "heartbeat",
  "Neurological Symptoms": "brain",
  "Urinary and Renal Issues": "disease",
  "Reproductive Health": "baby-carriage",
  "Mental and Emotional Wellbeing": "head-side-virus",
  "Other Symptoms": "biohazard"
};

const SymptomChecker = ({navigation}) => {
  const [checkedState, setCheckedState] = useState(new Map());
  const [openCategory, setOpenCategory] = useState({});

  const handleToggleCheckbox = (symptom) => {
    setCheckedState(prevState => new Map(prevState).set(symptom, !prevState.get(symptom)))
  };

  const toggleCategory = (category) => {
    setOpenCategory(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  // const handlePredictDisease = () => {
  //   const requestBody = Object.entries(detailedSymptomMapping).reduce((acc, [key, values]) => {
  //     values.forEach(symptom => acc[symptom] = checkedState.get(key) ? 1 : 0);
  //     return acc;
  //   }, {});
  //   console.log(requestBody);
  //   Alert.alert('Diseease Prediction', JSON.stringify(requestBody, null, 2));
  // //i need to send the request body through an axios post request to http://localhost:3000/predictions/
  //   // handle json object of the expected response 
  //   //pass the json object of the response to the navigation.navigate instead of request body
  
  //   navigation.navigate('PredictedDisease', { requestBody });

  // };

  constructUrl = (ipAddress, endpoint) => {
    return `http://${ipAddress}:3000${endpoint}`;
  };
  const handlePredictDisease = async () => {
    // Preparing the requestBody based on checked symptoms
    const requestBody = Object.entries(detailedSymptomMapping).reduce((acc, [key, values]) => {
      values.forEach(symptom => {
        acc[symptom] = checkedState.get(key) ? 1 : 0;
      });
      return acc;
    }, {});
  
    try {
      console.log(requestBody);
      const url = constructUrl("10.21.128.63", "/predictions");
  
      const response = await axios.post(url, requestBody);
      const responseData = response.data;
      console.log(responseData); // Log the response data
  
      // Navigate to the PredictedDisease screen and pass the response data
      navigation.navigate('PredictedDisease', { diseaseInfo: responseData });
    } catch (error) {
      console.log('Failed to fetch data:', error);
      Alert.alert('Error', 'Failed to fetch data from the server');
    }
  };
  

  

  return (
    <ScrollView style={styles.container}>
      {Object.entries(symptomCategories).map(([category, symptoms]) => (
        <View key={category} style={styles.category}>
          <TouchableOpacity onPress={() => toggleCategory(category)} style={styles.header}>
            <FontAwesome5 name={categoryIcons[category]} size={20} color="#4a90e2" />
            <Text style={styles.categoryTitle}>{category}</Text>
            <MaterialCommunityIcons
              name={openCategory[category] ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#4a90e2"
            />
          </TouchableOpacity>
          {openCategory[category] && (
            <View style={styles.symptomsList}>
              {symptoms.map(symptom => (
                <View key={symptom} style={styles.symptom}>
                  <Text style={styles.symptomText}>{symptom}</Text>
                  <CustomCheckbox
                    isChecked={checkedState.get(symptom) || false}
                    onCheck={() => handleToggleCheckbox(symptom)}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.predictButton} onPress={handlePredictDisease}>
      {/*  */}
      {/* navigation.navigate("PredictedDisease") */}
        <FontAwesome5 name="microscope" size={20} color="white" />
        <Text style={styles.predictButtonText}>Predict Disease</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  category: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8ecf4',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 15,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  symptomsList: {
    padding: 15,
  },
  symptom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  symptomText: {
    fontSize: 16,
    color: '#666',
  },
  predictButton: {
    flexDirection: 'row',
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  predictButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  }
});

export default SymptomChecker;
