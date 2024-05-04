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

const ForgotPassowrd = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const [email, setEmail] = useState("");

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const handleReset = () => {
    //handleSendEmail(email);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
    setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => {
        router.push("/Login");
      }, 1500);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView>
        <View style={styles.stepContainer}>
          <Toast visible={toastVisible} message="Email was sent!" />

          <Text style={{ fontSize: 40, fontWeight: 900, marginBottom: 100 }}>
            Forgot Passowrd
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
                  >Email                            </FormControlLabelText>
                </FormControlLabel>
                <TextInput
                  style={{ marginTop: 10, width: "50em" }}
                  placeholder="Type Your Email"
                  value={email}
                  onChangeText={handleEmailChange}
                />
              </FormControl>
            </Box>
          </View>
          <Button
            label="Send Reset Email"
            disabled={email.trim().length === 0}
            title="Send Reset Email"
            onPress={handleReset}
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

export default ForgotPassowrd;
