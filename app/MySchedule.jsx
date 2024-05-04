import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const MySchedule = () => {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      date: "2024-05-05",
      time: "14:00",
      doctorName: "Dr. Smith",
      location: "Room 101, 123 Main St, Springfield",
    },
    {
      id: "2",
      date: "2024-05-06",
      time: "16:00",
      doctorName: "Dr. Doe",
      location: "Room 102, 456 Elm St, Rivertown",
    },
    // Additional appointments can be added here
  ]);

  const handleLongPress = (appointment) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete this appointment with ${appointment.doctorName}?`,
      [
        {
          text: "Delete",
          onPress: () => {deleteAppointment(appointment.id)},
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const deleteAppointment = (appointmentId) => {
    //deleteBackendAppointment(appointmentId); //TODO
    setAppointments((currentAppointments) =>
      currentAppointments.filter(
        (appointment) => appointment.id !== appointmentId
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item)}
      style={styles.card}
    >
      <View style={styles.row}>
        <Icon name="person-circle-outline" size={30} color="#4F8EF7" />
        <Text style={styles.doctorName}>{item.doctorName}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="calendar-outline" size={30} color="#4F8EF7" />
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="time-outline" size={30} color="#4F8EF7" />
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-outline" size={30} color="#4F8EF7" />
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  date: {
    fontSize: 17,
    marginLeft: 10,
    color: "#333",
  },
  time: {
    fontSize: 17,
    marginLeft: 10,
    color: "#333",
    fontWeight:'bold',
  },
  location: {
    fontSize: 17,
    color: "#666",
    marginLeft: 10,
  },
});

export default MySchedule;
