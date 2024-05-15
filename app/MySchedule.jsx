import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const MySchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      setAppointments([
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
          doctorName: "Dr. Fathal",
          location: "Beirut, Hamra",
        },
        {
          id: "3",
          date: "2024-05-07",
          time: "05:00",
          doctorName: "Dr. Azzam",
          location: "London, England",
        },
      ]);
      setRefreshing(false);
    }, 1000);
  };

  const handleLongPress = (appointment) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete this appointment with ${appointment.doctorName}?`,
      [
        {
          text: "Delete",
          onPress: () => deleteAppointment(appointment.id),
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const deleteAppointment = (appointmentId) => {
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
        <Icon name="person-circle-outline" size={30} color="#007AFF" />
        <Text style={styles.doctorName}>{item.doctorName}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="calendar-outline" size={30} color="#007AFF" />
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="time-outline" size={30} color="#007AFF" />
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-outline" size={30} color="#007AFF" />
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchAppointments}
          />
        }
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#007AFF",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  date: {
    fontSize: 16,
    marginLeft: 10,
    color: "#666",
  },
  time: {
    fontSize: 16,
    marginLeft: 10,
    color: "#666",
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
  },
});

export default MySchedule;
