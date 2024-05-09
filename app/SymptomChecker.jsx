import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import { LinearGradient } from "expo-linear-gradient";

const symptomsByCategory = {
  Respiratory: [
    "continuous_sneezing",
    "cough",
    "breathlessness",
    "high_fever",
    "phlegm",
    "throat_irritation",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "blood_in_sputum",
  ],
  Digestive: [
    "stomach_pain",
    "acidity",
    "nausea",
    "ulcers_on_tongue",
    "indigestion",
    "vomiting",
    "spotting_urination",
    "constipation",
    "diarrhoea",
    "abdominal_pain",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "passage_of_gases",
    "stomach_bleeding",
  ],
  Skin: [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "discoloration",
    "red_spots_over_body",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze",
  ],
  Neurological: [
    "headache",
    "dizziness",
    "altered_sensorium",
    "slurred_speech",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "coma",
    "visual_disturbances",
    "lack_of_concentration",
  ],
  Urinary: [
    "burning_micturition",
    "yellow_urine",
    "yellowing_of_eyes",
    "dark_urine",
    "bladder_discomfort",
    "foul_smell_of_urine",
    "continuous_feel_of_urine",
    "polyuria",
  ],
  Musculoskeletal: [
    "joint_pain",
    "muscle_wasting",
    "muscle_pain",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "painful_walking",
  ],
  General: [
    "fatigue",
    "weight_gain",
    "anxiety",
    "mood_swings",
    "weight_loss",
    "restlessness",
    "lethargy",
    "malaise",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "weakness_in_limbs",
    "fast_heart_rate",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "swollen_legs",
    "swollen_blood_vessels",
    "swollen_extremities",
    "bruising",
    "depression",
    "irritability",
    "increased_appetite",
    "family_history",
  ],
  Eye: [
    "redness_of_eyes",
    "pain_behind_the_eyes",
    "watering_from_eyes",
    "blurred_and_distorted_vision",
  ],
  Liver: [
    "yellowish_skin",
    "acute_liver_failure",
    "history_of_alcohol_consumption",
  ],
  Infectious: [
    "shivering",
    "chills",
    "high_fever",
    "mild_fever",
    "sweating",
    "dehydration",
    "fluid_overload",
    "fluid_overload.1",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
  ],
};

const categoryIcons = {
  Respiratory: "lungs",
  Digestive: "utensils",
  Skin: "allergies",
  Neurological: "brain",
  Urinary: "toilet",
  Musculoskeletal: "user-injured",
  General: "clinic-medical",
  Eye: "eye",
  Liver: "medkit",
  Infectious: "disease",
};


const SymptomChecker = ({navigation}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [collapsed, setCollapsed] = useState(
    Object.keys(symptomsByCategory).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    )
  );

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) => ({ ...prev, [symptom]: !prev[symptom] }));
  };

  const toggleCollapse = (category) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <ScrollView style={styles.container}>
      {Object.keys(symptomsByCategory).map((category) => (
        <View key={category}>
          <TouchableOpacity
            onPress={() => toggleCollapse(category)}
            style={styles.header}
          >
            {/* Modified to use dynamic icon */}
            <FontAwesome5
              name={categoryIcons[category]}
              size={24}
              color="white"
            />
            <Text style={styles.headerText}>{category}</Text>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed[category]}>
            <View style={styles.content}>
              {symptomsByCategory[category].map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  style={styles.symptomItem}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={styles.symptomText}>
                    {symptom.replace(/_/g, " ")}
                  </Text>
                  <View
                    style={
                      selectedSymptoms[symptom]
                        ? styles.checkboxChecked
                        : styles.checkboxUnchecked
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          </Collapsible>
        </View>
      ))}
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.button}>
        <TouchableOpacity onPress={()=>{  navigation.navigate("SymptomCheckerOutput", {
          selectedSymptoms: selectedSymptoms,
        });}}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#007bff",
    borderRadius: 25,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  symptomItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#eeeeee",
  },
  symptomText: {
    fontSize: 20,
    fontWeight:'bold',
  },
  checkboxUnchecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  checkboxChecked: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
  },
  button: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom:40,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SymptomChecker;
