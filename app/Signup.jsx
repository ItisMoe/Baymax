import _ from "lodash";
import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  View,
  Button,
  Wizard,
  Text,
  TextField,
  Toast,
} from "react-native-ui-lib";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  AlertCircleIcon,
  FormControlErrorText,
} from "@gluestack-ui/themed";
import { TextInput } from "react-native-paper";
import { KeyboardAvoidingView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import CryptoJS from "crypto-js";
import { storeData } from "./storage";
import axios from 'axios';



const stepTypes = _.map(Wizard.States, (state) => {
  return <Text key={state}>{state}</Text>;
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      passError: false,
      email: "",
      password: "",
      nationality: "",
      sex: "Male",
      address: "",
      phoneNumber: "",
      bloodType: "A+",
      activityLevel: "medium",
      isSmoking: false,
      hight: "170",
      weight: "60",
      diseaseList: [],
      newDiseaseName: "",
      newDiseaseDate: "",
      vaccineList: [],
      newVaccineName: "",
      newVaccineDate: "",
      surgeryList: "",
      newSurgeryName: "",
      newSurgeryDate: "",
      newSurgeryIsSuccess: true,
      image: null,
      familyDiseaseList: [],
      newFamilyDiseaseName: "",
      newFamilyDiseaseRelation: "Father",
      //////////////////////////////////////////////////
      activeIndex: 0,
      completedStepIndex: undefined,
      allTypesIndex: 0,
    };

    this.pickImage = this.pickImage.bind(this);
  }

  async requestCameraPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      this.setState({ image: result.assets[0].uri });
    }
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  addDisease = () => {
    const newDisease = {
      name: this.state.newDiseaseName,
      date: this.state.newDiseaseDate,
    };
    this.setState((prevState) => ({
      diseaseList: [...prevState.diseaseList, newDisease],
      newDiseaseName: "",
      newDiseaseDate: "",
    }));
  };
  addVaccine = () => {
    const newVaccine = {
      name: this.state.newVaccineName,
      date: this.state.newVaccineDate,
    };
    this.setState((prevState) => ({
      vaccineList: [...prevState.vaccineList, newVaccine],
      newVaccineName: "",
      newVaccineDate: "",
    }));
  };
  addSurgury = () => {
    const newSurgery = {
      name: this.state.newSurgeryName,
      date: this.state.newSurgeryDate,
      success: this.state.newSurgeryIsSuccess,
    };
    this.setState((prevState) => ({
      surgeryList: [...prevState.surgeryList, newSurgery],
      newSurgeryName: "",
      newSurgeryDate: "",
      newSurgeryIsSuccess: true,
    }));
  };
  addFamilyDisease = () => {
    const newFamilyDisease = {
      name: this.state.newFamilyDiseaseName,
      relation: this.state.newFamilyDiseaseRelation,
    };
    this.setState((prevState) => ({
      familyDiseaseList: [...prevState.familyDiseaseList, newFamilyDisease],
      newFamilyDiseaseName: "",
      newFamilyDiseaseRelation: "Father",
    }));
  };

  setEmail = (email) => {
    this.setState({ email: email });
  };
  setPassword = (password) => {
    this.setState({ password: password });
  };
  setName = (Name) => {
    this.setState({ fullName: Name });
  };

  /////////////////////////////////////////////////////////////////////////
  onActiveIndexChanged = (activeIndex) => {
    this.setState({ activeIndex });
  };

  onAllTypesIndexChanged = (allTypesIndex) => {
    this.setState({ allTypesIndex });
  };

  closeToast = () => {
    setTimeout(() => {
      this.setState({ toastMessage });
    }, 2000);
  };

  goToPrevStep = () => {
    const { activeIndex: prevActiveIndex } = this.state;
    const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

    this.setState({ activeIndex });
  };

  renderPrevButton = () => {
    return (
      <Button
        testID={"uilib.prevButton"}
        size={Button.sizes.large}
        label={"Back"}
        marginT-10
        onPress={this.goToPrevStep}
      />
    );
  };

  goToNextStep = () => {
    const {
      activeIndex: prevActiveIndex,
      completedStepIndex: prevCompletedStepIndex,
    } = this.state;

    const activeIndex = prevActiveIndex + 1;
    let completedStepIndex = prevCompletedStepIndex;
    if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
      completedStepIndex = prevActiveIndex;
    }

    if (
      activeIndex !== prevActiveIndex ||
      completedStepIndex !== prevCompletedStepIndex
    ) {
      this.setState({ activeIndex, completedStepIndex });
    }
  };

  renderNextButton = (disabled) => {
    const nextLabel = "Next";

    return (
      <Button
        size={Button.sizes.large}
        marginT-10
        label={nextLabel}
        onPress={() => {
          if (this.state.password.length < 6)
            this.setState({ passError: true });
          else {
            this.setState({ passError: false });
            this.goToNextStep();
          }
        }}
        disabled={disabled}
        backgroundColor={disabled ? "grey" : "black"}
      />
    );
  };

   getAllPatients = async () => {
    try {
      const response = await axios.get('http://your-backend-domain/api/patients');
  
      if (response.status === 200) {
        console.log('Patients:', response.data);
        // Handle the list of patients returned by the server
      } else {
        throw new Error('Failed to fetch patients');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error
    }
  };
  
  renderSubmitButton = () => {
    const nextLabel = "Finish Registration";

    return (
      <Button
        size={Button.sizes.large}
        marginT-10
        label={nextLabel}
        onPress={() => {

          //TODO handlePatientRegistrationForm(this.state.fullName,this.state.email,CryptoJS.SHA256(this.state.password).toString(CryptoJS.enc.Hex),this.state.image,this.state.sex,this.state.age,this.state.nationality,this.state.address,this.state.phoneNumber,this.state.height,this.state.weight,this.state.bloodType,this.state.activityLevel,this.state.isSmoking,this.state.diseaseList,this.state.vaccineList,this.state.surgeryList,this.state.familyDiseaseList);

          this.getAllPatients();
          storeData(0);
          router.push("/")
        }
      }
        backgroundColor="black"
      />
    );
  };

  //////////////////////////////////////////////////////////////////////////
  SignUpInfo = () => {
    return (
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
            <FormControlLabelText style={{ fontSize: 30, fontWeight: 600 }}>
              Full Name{" "}
            </FormControlLabelText>
          </FormControlLabel>
          <TextInput
            style={{ marginTop: 10, width: "50em" }}
            placeholder="Type Your Name"
            value={this.state.fullName}
            onChangeText={(name) => this.setName(name)}
          />
        </FormControl>
        <FormControl
          size="md"
          style={{ marginBottom: 30 }}
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}
        >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={{ fontSize: 30, fontWeight: 600 }}>
              Email{" "}
            </FormControlLabelText>
          </FormControlLabel>
          <TextInput
            style={{ marginTop: 10, width: "50em" }}
            placeholder="Type Your Email"
            value={this.state.email}
            onChangeText={(email) => this.setEmail(email)}
          />
        </FormControl>
        <FormControl
          size="md"
          style={{ marginBottom: 30 }}
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}
        >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={{ fontSize: 30, fontWeight: 600 }}>
              Password{" "}
            </FormControlLabelText>
          </FormControlLabel>
          <TextInput
            style={{ marginTop: 10, width: "50em" }}
            placeholder="Type Your Password"
            value={this.state.password}
            error={this.state.passError}
            onChangeText={(password) => this.setPassword(password)}
            secureTextEntry={true}
          />
          <FormControlHelper>
            <FormControlHelperText>
              Must be at least 6 characters.
            </FormControlHelperText>
          </FormControlHelper>
        </FormControl>
      </Box>
    );
  };

  registrationInfoPage = () => {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView>
          <View style={styles.stepContainer}>
            <Text style={{ fontSize: 35, fontWeight: 900, marginBottom: 15 }}>
              Fill Registration Info
            </Text>
            <View row marginT-10>
              {this.SignUpInfo()}
            </View>
            {this.renderNextButton(
              _.isNil(this.state.fullName) ||
                this.state.fullName.trim().length === 0 ||
                _.isNil(this.state.email) ||
                this.state.email.trim().length === 0 ||
                _.isNil(this.state.password) ||
                this.state.password.trim().length === 0
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  renderPersonalDetails = () => {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView>
          <View style={styles.stepContainer}>
            <Text style={{ fontSize: 25, fontWeight: 900, marginBottom: 15 }}>
              Fill Personal Info
            </Text>
            <View row marginT-10>
              <Box h="$32" w="$72">
                <View style={styles.imageContainer}>
                  <Button
                    label="Choose Avatar Image"
                    title="Pick an image from camera roll"
                    onPress={this.pickImage}
                    style={{ backgroundColor: "black" }}
                  />
                  {this.state.image && (
                    <Avatar.Image
                      size={120}
                      source={{ uri: this.state.image }}
                      style={{ marginTop: 10 }}
                    />
                  )}
                </View>
                <FormControl
                  style={{ marginBottom: 20 }}
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          marginRight: 20,
                        }}
                      >
                        Sex:
                      </FormControlLabelText>
                    </FormControlLabel>
                    <RadioButton.Group
                      onValueChange={(sex) => this.setState({ sex: sex })}
                      value={this.state.sex}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <RadioButton value="Male" />
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              marginRight: 10,
                            }}
                          >
                            Male
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <RadioButton value="Female" />
                          <Text style={{ fontSize: 15, fontWeight: 600 }}>
                            Female
                          </Text>
                        </View>
                      </View>
                    </RadioButton.Group>
                  </View>
                </FormControl>
                <FormControl
                  size="md"
                  style={{ marginBottom: 20 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          marginRight: 20,
                        }}
                      >
                        Age:
                      </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput
                      mode="outlined"
                      style={{ marginTop: 10 }}
                      keyboardType="numeric"
                      value={this.state.age}
                      onChangeText={(age) => this.setState({ age: age })}
                    />
                  </View>
                </FormControl>
                <FormControl
                  size="md"
                  style={{ marginBottom: 20 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText
                      style={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Nationality{" "}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <TextInput
                    style={{ marginTop: 10, width: "50em" }}
                    placeholder="Type Your Nationality"
                    value={this.state.nationality}
                    onChangeText={(nationality) =>
                      this.setState({ nationality: nationality })
                    }
                  />
                </FormControl>
                <FormControl
                  size="md"
                  style={{ marginBottom: 20 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText
                      style={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Address{" "}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <TextInput
                    style={{ marginTop: 10, width: "50em" }}
                    placeholder="Type Your Address"
                    value={this.state.address}
                    onChangeText={(address) =>
                      this.setState({ address: address })
                    }
                  />
                </FormControl>
                <FormControl
                  size="md"
                  style={{ marginBottom: 20 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText
                      style={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Phone Number{" "}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <TextInput
                    style={{ marginTop: 10, width: "50em" }}
                    placeholder="Type Your Phone Number"
                    keyboardType="numeric"
                    value={this.state.phoneNumber}
                    onChangeText={(phoneNumber) =>
                      this.setState({ phoneNumber: phoneNumber })
                    }
                  />
                </FormControl>
              </Box>
            </View>
            {this.renderNextButton(
              _.isNil(this.state.image) ||
                this.state.image.trim().length === 0 ||
                _.isNil(this.state.age) ||
                this.state.age.trim().length === 0 ||
                _.isNil(this.state.nationality) ||
                this.state.nationality.trim().length === 0 ||
                _.isNil(this.state.address) ||
                this.state.address.trim().length === 0 ||
                _.isNil(this.state.phoneNumber) ||
                this.state.phoneNumber.trim().length === 0
            )}
            {this.renderPrevButton()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  renderMedicalInfo = () => {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView>
          <View style={styles.stepContainer}>
            <Text style={{ fontSize: 25, fontWeight: 900, marginBottom: 15 }}>
              Fill Medical Info
            </Text>
            <View row marginT-10>
              <Box h="$32" w="$72">
                <FormControl
                  style={{ marginBottom: 20 }}
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          marginRight: 10,
                        }}
                      >
                        Do you Smoke:
                      </FormControlLabelText>
                    </FormControlLabel>
                    <RadioButton.Group
                      onValueChange={(isSmoking) =>
                        this.setState({ isSmoking: isSmoking })
                      }
                      value={this.state.isSmoking}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <RadioButton value={true} />
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              marginRight: 10,
                            }}
                          >
                            YES
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <RadioButton value={false} />
                          <Text style={{ fontSize: 15, fontWeight: 600 }}>
                            NO
                          </Text>
                        </View>
                      </View>
                    </RadioButton.Group>
                  </View>
                </FormControl>
                <FormControl
                  size="md"
                  style={{ marginBottom: 20 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          marginRight: 20,
                        }}
                      >
                        Height:
                      </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput
                      mode="outlined"
                      style={{ marginTop: 10 }}
                      keyboardType="numeric"
                      value={this.state.hight}
                      onChangeText={(height) =>
                        this.setState({ height: height })
                      }
                    />
                    <Text
                      style={{ fontSize: 20, marginLeft: 10, fontWeight: 600 }}
                    >
                      cm
                    </Text>
                  </View>
                </FormControl>
                <FormControl
                  size="md"
                  style={{ marginBottom: 20 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FormControlLabel mb="$1">
                      <FormControlLabelText
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          marginRight: 20,
                        }}
                      >
                        Weight:
                      </FormControlLabelText>
                    </FormControlLabel>
                    <TextInput
                      mode="outlined"
                      style={{ marginTop: 10 }}
                      keyboardType="numeric"
                      value={this.state.weight}
                      onChangeText={(weight) =>
                        this.setState({ weight: weight })
                      }
                    />
                    <Text
                      style={{ fontSize: 20, marginLeft: 10, fontWeight: 600 }}
                    >
                      Kg
                    </Text>
                  </View>
                </FormControl>
                <FormControl
                  size="md"
                  style={{ marginBottom: 20 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText
                      style={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Blood Type:
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Picker
                    selectedValue={this.state.bloodType}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(bloodType) =>
                      this.setState({ bloodType: bloodType })
                    }
                  >
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="AO+" value="AO+" />
                    <Picker.Item label="AO-" value="AO-" />
                    <Picker.Item label="BO+" value="BO+" />
                    <Picker.Item label="BO-" value="BO-" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="AB-" value="AB-" />
                  </Picker>
                </FormControl>
                <FormControl
                  size="md"
                  style={{ marginBottom: 20 }}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText
                      style={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Activity Level:
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Picker
                    style={{ height: 50, width: 150 }}
                    selectedValue={this.state.activityLevel}
                    onValueChange={(activityLevel) =>
                      this.setState({ activityLevel: activityLevel })
                    }
                  >
                    <Picker.Item label="Low" value="low" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="High" value="high" />
                  </Picker>
                </FormControl>
              </Box>
            </View>
            {this.renderNextButton(
              _.isNil(this.state.hight) ||
                this.state.hight.trim().length === 0 ||
                _.isNil(this.state.weight) ||
                this.state.weight.trim().length === 0
            )}
            {this.renderPrevButton()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  renderMedicalHistory = () => {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView>
          <View style={styles.stepContainer}>
            <Text style={{ fontSize: 25, fontWeight: 900, marginBottom: 15 }}>
              Fill Your Medical History
            </Text>
            <View row marginT-10>
              <Box h="$32" w="$72">
                <FormControl
                  style={{ marginBottom: 20 }}
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText
                      style={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Disease:{" "}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <TextInput
                    style={{ marginTop: 10, width: "50em" }}
                    label="Disease Name"
                    value={this.state.newDiseaseName}
                    onChangeText={(newDiseaseName) =>
                      this.setState({ newDiseaseName: newDiseaseName })
                    }
                  />
                  <TextInput
                    style={{ marginTop: 10, marginBottom: 20 }}
                    keyboardType="numeric"
                    label="Disease Year"
                    value={this.state.newDiseaseDate}
                    onChangeText={(newDiseaseDate) =>
                      this.setState({ newDiseaseDate: newDiseaseDate })
                    }
                  />
                  <Button
                    label="Add Disease"
                    disabled={
                      _.isNil(this.state.newDiseaseName) ||
                      this.state.newDiseaseName.trim().length === 0 ||
                      _.isNil(this.state.newDiseaseDate) ||
                      this.state.newDiseaseDate.trim().length === 0
                    }
                    title="Add Disease"
                    onPress={this.addDisease}
                  />
                </FormControl>
                <FormControl
                  style={{ marginBottom: 20 }}
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText
                      style={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Vaccine:{" "}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <TextInput
                    style={{ marginTop: 10, width: "50em" }}
                    label="Vaccine Name"
                    value={this.state.newVaccineName}
                    onChangeText={(newVaccineName) =>
                      this.setState({ newVaccineName: newVaccineName })
                    }
                  />
                  <TextInput
                    style={{ marginTop: 10, marginBottom: 20 }}
                    keyboardType="numeric"
                    label="Vaccine Year"
                    value={this.state.newVaccineDate}
                    onChangeText={(newVaccineDate) =>
                      this.setState({ newVaccineDate: newVaccineDate })
                    }
                  />
                  <Button
                    label="Add Vaccine"
                    disabled={
                      _.isNil(this.state.newVaccineName) ||
                      this.state.newVaccineName.trim().length === 0 ||
                      _.isNil(this.state.newVaccineDate) ||
                      this.state.newVaccineDate.trim().length === 0
                    }
                    title="Add Vaccine"
                    onPress={this.addVaccine}
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
                      style={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Surgery:{" "}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <TextInput
                    style={{ marginTop: 10, width: "50em" }}
                    label="Surgery Name"
                    value={this.state.newSurgeryName}
                    onChangeText={(newSurgeryName) =>
                      this.setState({ newSurgeryName: newSurgeryName })
                    }
                  />
                  <TextInput
                    style={{ marginTop: 10, marginBottom: 10 }}
                    keyboardType="numeric"
                    label="Surgery Year"
                    value={this.state.newSurgeryDate}
                    onChangeText={(newSurgeryDate) =>
                      this.setState({ newSurgeryDate: newSurgeryDate })
                    }
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <FormControlLabel mb="$1">
                      <FormControlLabelText
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          marginRight: 20,
                        }}
                      >
                        Successful:
                      </FormControlLabelText>
                    </FormControlLabel>
                    <RadioButton.Group
                      onValueChange={(newSurgeryIsSuccess) =>
                        this.setState({
                          newSurgeryIsSuccess: newSurgeryIsSuccess,
                        })
                      }
                      value={this.state.newSurgeryIsSuccess}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <RadioButton value={true} />
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              marginRight: 10,
                            }}
                          >
                            YES
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <RadioButton value={false} />
                          <Text style={{ fontSize: 13, fontWeight: 600 }}>
                            NO
                          </Text>
                        </View>
                      </View>
                    </RadioButton.Group>
                  </View>
                  <Button
                    label="Add Surgery"
                    disabled={
                      _.isNil(this.state.newSurgeryName) ||
                      this.state.newSurgeryName.trim().length === 0 ||
                      _.isNil(this.state.newSurgeryDate) ||
                      this.state.newSurgeryDate.trim().length === 0
                    }
                    title="Add Surgery"
                    onPress={this.addSurgury}
                  />
                </FormControl>
                <FormControl
                  style={{ marginBottom: 40 }}
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={false}
                >
                  <FormControlLabel mb="$1">
                    <FormControlLabelText
                      style={{ fontSize: 20, fontWeight: 600 }}
                    >
                      Family Chronic Diseases:{" "}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <TextInput
                    style={{ marginTop: 10, width: "50em" }}
                    label="Disease Name"
                    value={this.state.newFamilyDiseaseName}
                    onChangeText={(newFamilyDiseaseName) =>
                      this.setState({
                        newFamilyDiseaseName: newFamilyDiseaseName,
                      })
                    }
                  />
                  <FormControlLabel mb="$1">
                    <FormControlLabelText
                      style={{ fontSize: 15, fontWeight: 600, marginTop: 10 }}
                    >
                      Patient Relation:
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Picker
                    selectedValue={this.state.newFamilyDiseaseRelation}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(newFamilyDiseaseRelation) =>
                      this.setState({
                        newFamilyDiseaseRelation: newFamilyDiseaseRelation,
                      })
                    }
                  >
                    <Picker.Item label="Father" value="Father" />
                    <Picker.Item label="Mother" value="Mother" />
                    <Picker.Item label="Sister" value="Sister" />
                    <Picker.Item label="Brother" value="Brother" />
                    <Picker.Item label="Aunt" value="Aunt" />
                    <Picker.Item label="Cousin" value="Cousin" />
                    <Picker.Item label="Grandparent" value="Grandparent" />
                  </Picker>
                  <Button
                    label="Add Family Disease"
                    disabled={
                      _.isNil(this.state.newFamilyDiseaseName) ||
                      this.state.newFamilyDiseaseName.trim().length === 0
                    }
                    title="Add Family Disease"
                    onPress={this.addFamilyDisease}
                  />
                </FormControl>
              </Box>
            </View>
            {this.renderSubmitButton()}
            {this.renderPrevButton()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  renderCurrentStep = () => {
    const { activeIndex } = this.state;

    switch (activeIndex) {
      case 0:
      default:
        return this.registrationInfoPage();
      case 1:
        return this.renderPersonalDetails();
      case 2:
        return this.renderMedicalInfo();
      case 3:
        return this.renderMedicalHistory();
    }
  };

  getStepState(index) {
    const { activeIndex, completedStepIndex } = this.state;
    let state = Wizard.States.DISABLED;
    if (completedStepIndex && completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED;
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED;
    }

    return state;
  }

  render() {
    const { activeIndex, allTypesIndex, toastMessage } = this.state;

    return (
      <View useSafeArea flex>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <Wizard
              testID={"uilib.wizard"}
              activeIndex={activeIndex}
              onActiveIndexChanged={this.onActiveIndexChanged}
            >
              <Wizard.Step
                state={this.getStepState(0)}
                label={"Registration Info"}
              />
              <Wizard.Step
                state={this.getStepState(1)}
                label={"Personal Details"}
              />
              <Wizard.Step
                state={this.getStepState(2)}
                label={"Medical Info"}
              />
              <Wizard.Step
                state={this.getStepState(3)}
                label={"Medical History"}
              />
            </Wizard>
            {this.renderCurrentStep()}
            {console.log(this.state)}
          </View>
        </ScrollView>
        {!_.isNil(toastMessage) && (
          <Toast
            testID={"uilib.toast"}
            visible
            position="bottom"
            message={toastMessage}
          />
        )}
      </View>
    );
  }
}
export default Signup;

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
