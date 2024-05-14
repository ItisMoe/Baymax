import { router } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Signup from "./Signup";
import Login from "./Login";


const StarterPage = () => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/Login")}
      >
        <Icon name="sign-in" size={20} color="#fff" />
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/Signup")}
      >
        <Icon name="user" size={20} color="#fff" />
        <Text style={styles.buttonText}>Sign Up as Patient</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/DoctorSignup")}
      >
        <Icon name="user-md" size={20} color="#fff" />
        <Text style={styles.buttonText}>Sign Up as Doctor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: 250,
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
  },
});

export default StarterPage;
