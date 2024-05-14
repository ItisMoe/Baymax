import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

// Mock appointment data with detailed patient information
const appointments = [
  {
    id: 1,
    date: "2024-05-20",
    time: "10:00 AM",
    location: "Room 101",
    patient: {
      name: "John Doe",
      age: 30,
      nationality: "American",
      bloodType: "A+",
      height: "180 cm",
      weight: "70 kg",
      gender: "Male",
      diseases: ["Hypertension"],
      vaccines: ["Flu", "COVID-19"],
      activityLevel: "Moderate",
      surgeries: ["Appendectomy"],
    },
  },
  // Additional appointments can be added here with similar structure
];

const DoctorSchedule = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});

  const handlePress = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {appointments.map((appointment) => (
        <TouchableOpacity
          key={appointment.id}
          style={styles.card}
          onPress={() => handlePress(appointment)}
        >
          <Icon
            name="event-note"
            size={45}
            color="#007BFF"
            style={{ marginBottom: 5 }}
          />
          <Text style={styles.cardTitle}>{appointment.patient.name}</Text>
          <Text style={styles.cardDetail}>
            {appointment.date} at {appointment.time}
          </Text>
          <Text style={styles.cardDetail}>{appointment.location}</Text>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalTextTitle}>Patient Details</Text>
            {Object.entries(selectedAppointment.patient || {}).map(
              ([key, value]) => (
                <Text key={key} style={styles.modalText}>
                  <Text style={styles.boldText}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Text>{" "}
                  {Array.isArray(value) ? value.join(", ") : value}
                </Text>
              )
            )}
          </ScrollView>
          <TouchableOpacity style={styles.buttonClose} onPress={handleClose}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  cardDetail: {
    fontSize: 16,
    color: "#666",
    fontWeight:'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: "80%",
    width: "90%",
    alignSelf: "center",
  },
  modalTextTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#004d40",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonClose: {
    marginTop: 30,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "80%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DoctorSchedule;
