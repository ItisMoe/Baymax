import React,{useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "./Toast"; // Import Toast

const BookingScreen = ({ route, navigation }) => {
  const { doctorId, time, date } = route.params;
    const [toastVisible, setToastVisible] = useState(false);


  // Function to handle confirmation
  const handleConfirm = () => {
   setToastVisible(true);
   setTimeout(() => setToastVisible(false), 3500);
   setTimeout(() => {
     setToastVisible(false);
     setTimeout(() => {
       navigation.popToTop();
     }, 1500);
   }, 1500);
   
   //implement backend method
  };

  // Function to handle cancellation
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Toast
        visible={toastVisible}
        message="Booked Successfully"
      />
      <Text style={styles.header}>
        Confirm your appointment at {time} on {date}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    alignItems:'center',
    padding: 10,
    borderRadius: 15,
    marginTop: 30,
    width:200
  },
  cancelButton: {
    backgroundColor: "#F44336", // Red color for the cancel button
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default BookingScreen;
