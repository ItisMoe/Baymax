import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { StyleSheet, ScrollView } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);

   // Getting the dispatch function

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const handlePassChange = (newPass) => {
    setPass(newPass);
  };

  const handleLogin = () => {
    const hashedPassword = CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
    console.log(hashedPassword);
    // const result = verifyCredentials(email,hashedPassword); TODO
    const result = 0;
    storeData(result);
    switch (result) {
      case -1:
        setPassError(true);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3500);
        break;
      case 0:
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3500);
        setTimeout(() => {
          setToastVisible(false);
          setTimeout(() => {
            router.push("/"); //patient
          }, 1500);
        }, 1500);
        break;
      case 1:

        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3500);
        setTimeout(() => {
          setToastVisible(false);
          setTimeout(() => {
            router.push("/"); //doctor
          }, 1500);
        }, 1500);
        break;
      case 2:

        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3500);
        setTimeout(() => {
          setToastVisible(false);
          setTimeout(() => {
            router.push("/"); //admin
          }, 1500);
        }, 1500);
        break;
      default:
        console.error("code result was not expected like this");
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
          <Text style={{ fontSize: 40, fontWeight: 900, marginBottom: 100 }}>
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
                  >Email                        </FormControlLabelText>
                </FormControlLabel>
                <TextInput
                  style={{ marginTop: 10, width: "50em" }}
                  placeholder="Type Your Email"
                  value={email}
                  onChangeText={handleEmailChange}
                />
              </FormControl>
              <FormControl
                style={{ marginBottom: 100 }}
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
            </Box>
          </View>
          <Button
            label="Login"
            disabled={email.trim().length === 0 || pass.trim().length === 0}
            title="Login"
            onPress={handleLogin}
          />
          <Pressable
            style={{ marginTop: 10, marginLeft: 10 }}
            onPress={() => router.push("/ForgotPassowrd")}
          >
            <Text color="grey">Reset Password?</Text>
          </Pressable>
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
    marginTop: 10,
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

export default Login;
