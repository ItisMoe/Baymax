import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
} from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

import {
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@gluestack-ui/themed";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import CryptoJS from "crypto-js";
import { router } from "expo-router";
import Toast from "./Toast";
import { storeData } from "./storage";
import * as ImagePicker from "expo-image-picker";

const DoctorSignup = () => {
  const [email, setEmail] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);
  const [image, setImage] = useState(null);


   const requestCameraPermission = async () => {
     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
     if (status !== "granted") {
       alert("Sorry, we need camera roll permissions to make this work!");
     }
   };

   const pickImage = async () => {
     // No permissions request is necessary for launching the image library
     let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });

     console.log(result);

     if (!result.canceled) {
       setImage(result.assets[0].uri);
     }
   };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const handlePassChange = (newPass) => {
    setPass(newPass);
  };

  const handleSignup = () => {
    if (email && pass && image) {
      const hashedPassword = CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
      console.log(hashedPassword);
      // const result = verifyCredentials(email,hashedPassword); TODO add user
      storeData(1, email);
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => console.log("Sign up Successful"))
        .catch((err) => console.log("Sign up error:", err.message));
      router.push("/");
    } else {
      setToastVisible(true);
      setPassError(true);
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView>
        <View style={styles.stepContainer}>
          <Toast
            visible={toastVisible}
            message={passError ? "Incorrect Credentials" : "Login Successful"}
          />
          <Text style={{ fontSize: 40, fontWeight: 900, marginBottom: 70 }}>
            Login
          </Text>
          <View row marginT-10>
            <Box h="$32" w="$72">
              <FormControl
                style={{ marginBottom: 30 }}
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={false}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText
                    style={{ fontSize: 30, fontWeight: 600 }}
                  >
                    Email{" "}
                  </FormControlLabelText>
                </FormControlLabel>
                <TextInput
                  style={{ marginTop: 10, width: "50em" }}
                  placeholder="Type Your Email"
                  value={email}
                  onChangeText={handleEmailChange}
                />
              </FormControl>
              <FormControl
                style={{ marginBottom: 30 }}
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={false}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText
                    style={{ fontSize: 30, fontWeight: 600 }}
                  >
                    Password{" "}
                  </FormControlLabelText>
                </FormControlLabel>
                <TextInput
                  style={{ marginTop: 10, width: "50em" }}
                  placeholder="Type Your Password"
                  value={pass}
                  secureTextEntry={true}
                  onChangeText={handlePassChange}
                />
              </FormControl>
              <FormControl style={{ marginBottom: 70 }}>
                <FormControlLabelText
                  style={{ fontSize: 25, fontWeight: 600, marginBottom: 20 }}
                >
                  Upload Certificate
                </FormControlLabelText>
                <View style={styles.container}>
                  <Button
                  label="Upload"
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                  />
                  {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                  )}
                </View>
              </FormControl>
            </Box>
          </View>
          <Button
            label="Register"
            disabled={
              email.trim().length === 0 ||
              pass.trim().length === 0 ||
              image === null
            }
            title="Login"
            onPress={handleSignup}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginLeft:30,
    marginTop: 10,
    borderRadius:20,
  },
  allTypes: {
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    margin: "auto",
    marginBottom: 30,
    justifyContent: "center",
  },
  stepContainer: {
    flex: 1,
    justifyContent: "space-between",
    margin: 20,
  },
});

export default DoctorSignup;
