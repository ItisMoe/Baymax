import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions, // Import Dimensions to calculate width
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";

const specialityType = [
  { name: "Cardiologist", icon: "❤️", key: "cardiologist" },
  { name: "Dentist", icon: "🦷", key: "dentist" },
  { name: "Dermatologist", icon: "👩‍⚕️", key: "dermatologist" },
  { name: "Endocrinologist", icon: "🧬", key: "endocrinologist" },
  { name: "Gastroenterologist", icon: "🍏", key: "gastroenterologist" },
  { name: "Neurologist", icon: "🧠", key: "neurologist" },
  { name: "Obstetrician/Gynecologist", icon: "🤰", key: "obgyn" },
  { name: "Oncologist", icon: "🎗️", key: "oncologist" },
  { name: "Ophthalmologist", icon: "👁️", key: "ophthalmologist" },
  { name: "Orthopedic Surgeon", icon: "🦴", key: "orthopedic" },
  { name: "Otolaryngologist", icon: "👂", key: "ent" },
  { name: "Pediatrician", icon: "👶", key: "pediatrician" },
  { name: "Psychiatrist", icon: "🧠", key: "psychiatrist" },
  { name: "Pulmonologist", icon: "🫁", key: "pulmonologist" },
  { name: "Rheumatologist", icon: "🤲", key: "rheumatologist" },
  { name: "Urologist", icon: "🚽", key: "urologist" },
];

const { width } = Dimensions.get("window"); // Get the window width

const SpecialityScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    console.log("Rendering item:", item); // Debugging line
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          console.log("Navigating to:", item.key); // Debugging line
          navigation.navigate("DoctorList", { type: item.key });
        }}
      >
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.text}>{item.name}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={specialityType}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  item: {
    width: width / 2 - 20, // Half of screen width minus margin
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  icon: {
    fontSize: 35,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    textAlign: "center",
  },
  cardContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: "100%", // Ensure card fills container
    borderWidth: 0,
    borderRadius: 10,
  },
});

export default SpecialityScreen;
