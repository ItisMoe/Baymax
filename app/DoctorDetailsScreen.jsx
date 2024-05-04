import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

// Example data for appointments
const appointmentsData = [
  { time: "09:00 AM", date: "24/5/2003", available: true },
  { time: "10:00 AM", date: "25/5/2003", available: false }, // Not available
  { time: "11:00 AM", date: "27/5/2003", available: true },
  // Add more slots as needed
];
//TO DO getDoctorAppointments(doctorId);

const DoctorDetailsScreen = ({ route, navigation }) => {
  //const appointmentsData = //getDoctorAppointments(doctorId); //TO DO
  const { doctorId } = route.params;
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch doctor details from mock data or an API
    // const doctorDetails = getDoctor(doctorIDd);//TODO get by id
    const doctorDetails = {
      id: 3,
      name: "Dr. Jane Smith",
      specialty: "Cardiologist",
      location: "456 Tooth Fairy Road, San Diego, CA",
      image:
        "https://media.istockphoto.com/id/1342708859/photo/portrait-of-a-male-doctor.jpg?s=612x612&w=0&k=20&c=7ojvfSnLNx73sR1xXTReBrIXJOZPpSNFZ3E9CodsfQU=",
    };
    setDoctor(doctorDetails);
    setAppointments(appointmentsData);
  }, [doctorId]);

  return (
    <ScrollView style={styles.container}>
      {doctor && (
        <>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={{color:'grey',fontSize:15}}>{doctor.location}</Text>
          <Text style={styles.detail}>{doctor.specialty}</Text>
          <View style={styles.separator} />
          <Text style={styles.header}>Available Appointments:</Text>
          {appointments.map((appointment, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.appointment,
                appointment.available ? styles.available : styles.unavailable,
              ]}
              onPress={() =>
                appointment.available &&
                navigation.navigate("Booking", {
                  doctorId,
                  time: appointment.time,
                  date: appointment.date,
                })
              }
              disabled={!appointment.available}
            >
              <Text style={styles.time}>{appointment.time} on {appointment.date}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight:'bold',
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  appointment: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  available: {
    backgroundColor: "#c8e6c9",
  },
  unavailable: {
    backgroundColor: "#ffcdd2",
  },
  time: {
    fontSize: 16,
  },
});

export default DoctorDetailsScreen;
