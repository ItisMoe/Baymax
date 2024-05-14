import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { resetDb } from "./storage";

const More = () => {
  const navigation = useNavigation();

const handleLogout = async () => {
  signOut(auth).catch((error) => console.log("Error logging out: ", error));
  console.log("signedout");
  resetDb();
  console.log("Logging out...");
  router.push("./");
};

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://i.pravatar.cc/300",
        }}
        style={styles.profilePic}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("AboutPage")}
        style={styles.button}
      >
        <MaterialIcons name="info" size={24} color="white" />
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SupportPage")}
        style={styles.button}
      >
        <MaterialIcons name="support-agent" size={24} color="white" />
        <Text style={styles.buttonText}>Support</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  profilePic: {
    width: 250,
    height: 250,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#5061FC",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default More;
