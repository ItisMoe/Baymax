import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import email from "react-native-email";

const SupportPage = ({ navigation }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleEmail = () => {
    const to = ["admin@lau.edu"]; // email address to send
    email(to, {
      subject: subject,
      body: description,
    }).catch(console.error);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
        placeholder="Enter the subject"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textarea}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe your issue"
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity onPress={handleEmail} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Light background color for a clean look
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5, // Rounded corners for the input
    backgroundColor: "#f8f8f8", // Subtle background color for input
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    height: 150, // Increased height for better text area
    textAlignVertical: "top",
    marginBottom: 20,
    borderRadius: 5, // Rounded corners for the textarea
    backgroundColor: "#f8f8f8", // Subtle background color for textarea
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
    borderRadius: 5, // Rounded corners for the button
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 16, // Larger font size
    fontWeight: "bold", // Bold font weight
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16, // Increased font size for labels
  },
});

export default SupportPage;
