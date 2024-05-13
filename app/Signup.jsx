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
import * as FileSystem from 'expo-file-system';



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
      height: "170",
      weight: "60",
      diseaseList: [],
      newDiseaseName: "",
      newDiseaseDate: "",
      vaccineList: [],
      newVaccineName: "",
      newVaccineDate: "",
      surgeryList: [],
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
      emailExists: false,
      errorMessage: '',
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
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      //console.log("Image Picker Result:", JSON.stringify(result, null, 2));
  
      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const { uri } = result.assets[0];
        if (!uri) {
          console.error('No URI found on the image result.');
          return;
        }
  
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          console.error('No file exists at the URI provided.');
          return;
        }
  
        if (fileInfo.size > 4194304) {
          alert('Image is too large. Must be less than 4 MB.');
          return;
        }
  
        const base64Image = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        //---temporarly 
        this.setState({ image: `data:image/jpeg;base64,${base64Image}` });
        //this.setState({ image: `` });

      } else {
        console.log('Image picking was cancelled.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
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

  //set ur own ip address
   constructUrl = (ipAddress, endpoint) => {
    return `http://${ipAddress}:3000${endpoint}`;
  };
  getAllPatients = async () => {
    try {
      //pass in ur ip address 
      const url = this.constructUrl("10.21.128.63","/api/patients");

      const response = await axios.get(url);
      console.log("Patients before adding this object:")
      console.log('Patients existing already:', response.data);
    } catch (error) {
      if (error.response) {
        // Update UI accordinglys
         console.log(error.response.data);

        console.log(error.response.status);
        console.log("---------------------------------------")

        console.log(error.response.headers);
        console.log("---------------------------------------")

      } else if (error.request) {
        console.log("rqquest erro---------------------------------------")

        console.log(error.request);
      } else {
        console.log(" error message---------------------------------------")

        console.log(`Error message: ${error.message}`);
      }
    }
  };
  
  createPatientObject = () => {
    const {
      fullName,
      email,
      password,
      nationality,
      sex,
      //add age
      address,
      phoneNumber,
      bloodType,
      activityLevel,
      isSmoking,
      height,
      weight,
      //addBloodPressure
      //add allergies
      diseases,
      vaccines,
      surgeries,
      image,
      familyChronicDiseases,
      //see appointments
    } = this.state;
  
    // Construct the JSON object based on the schema
    const patientObject = {
      fullName,
      email,
      password,
      nationality,
      sex,
      address,
      //age: '', 
      // Age is not available add it
      phoneNumber,
      bloodType,
      activityLevel,
      isSmoking,
      height: parseInt(height), // Convert height to a number
      weight: parseInt(weight), // Convert weight to a number
      //bloodPressure: null, 
      //allergies: [],
      //add allergies and blood pressure


      diseases: diseases.map(disease => ({
        disease_Name: disease.name, 
        infection_start_Date: disease.date })),
      vaccines: vaccines.map(vaccine => ({
        name: vaccine.name,
        date: vaccine.date 
      })),
      surgeries: surgeries.map(surgery => ({
        name: surgery.name, 
        date: surgery.date, 
        recovered: surgery.success 
      })),
      image,
      familyChronicDiseases,
      medications: [], 
      //medications not available
      bookedAppointments: [],
    };
    return patientObject;
  };

  
  renderSubmitButton = () => {
    const nextLabel = "Finish Registration";
//so router.push are inside registerPatient(on success)
    return (
      <Button
        size={Button.sizes.large}
        marginT-10
        label={nextLabel}
        onPress={

          this.renderFinishRegistration}

        backgroundColor="black"
      />
    );
  };
  handleBlur = () => {
    const { email } = this.state;
    this.checkEmailExists(email);
  };
  
  checkEmailExists = (email) => {
    // Perform your API request here to check if the email exists
    const url = this.constructUrl("10.21.128.63", "/api/patients/checkEmail");
    axios.post(url, { email })
      .then(response => {
      if (response.status === 201) {
          this.setState({ emailExists: false, errorMessage: '' });
        } 
      })
      .catch(error => {
        if (error.response.status === 500) {
          alert("Email exists");
          this.setState({ emailExists: true, errorMessage: 'Email already exists' });
        }
        else{alert("Error chec king email: " + error.message);
        this.setState({ emailExists: false, errorMessage: 'Error checking email' });}
        
      });
  };
  
  
  registerPatient = async (patientObject) => {
    console.log("finish clickeddd")
    try {
      // Make POST request to backend signup endpoint
      const url = this.constructUrl("10.21.128.63", "/api/patients");

      const response = await axios.post(url, patientObject);

      
      if (response.status === 201) {

        alert("Patient created successfully!");
        storeData(0,this.state.email)
        router.push("/");
      } else {
        alert("Error creating account.Please try again later");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Email already exists. Please use a different email.");
      }
      else if(error.response.status === 500) {
        alert("Error Creating patient");
      }
      else {
        console.log("Error:", error.message);
        alert("An error occurred while creating the patient.");
      }
    }
  };

  renderFinishRegistration = async () => {
    try {

      const patientObject = {
        fullName: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
        nationality: this.state.nationality,
        sex: this.state.sex,
        address: this.state.address,
        age: this.state.age,
        phoneNumber: this.state.phoneNumber,
        activityLevel: this.state.activityLevel,
        isSmoking: this.state.isSmoking,
        height: parseInt(this.state.height), 
        weight: parseInt(this.state.weight), 
        diseases: this.state.diseaseList.map(disease => ({
          disease_Name: disease.name,
          infection_start_Date: new Date(disease.date)
        })),
        vaccines: this.state.vaccineList.map(vaccine => ({
          name: vaccine.name,
          date: new Date(vaccine.date)
        })),
        surgeries: this.state.surgeryList.map(surgery => ({
          name: surgery.name,
          date: new Date(surgery.date),
          recovered: surgery.success
        })),
        familyChronicDiseases: this.state.familyDiseaseList.map(disease => ({
          name: disease.name,
          relation: disease.relation
        })),
      };
 
      // Call registerPatient function
      console.log("finish registration clicked");
       this.registerPatient(patientObject);

    
    } catch (error) {
      console.log("Error:", error.message);
    }
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
            placeholder="Type Your Emaail"
            value={this.state.email}
            onChangeText={(email) => this.setEmail(email)}
          onBlur={this.handleBlur} // Call handleBlur on blur event
        
            
        />
          {this.state.emailExists && (
            <Text style={{ color: 'red', marginTop: 5 }}>{this.state.errorMessage}</Text>
          )} 
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
              _.isNil(this.state.height) ||
                this.state.height.trim().length === 0 ||
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
            {/* {console.log(this.state.fullName)}
         
            {console.log("email:", this.state.email)}
{console.log("password:", this.state.password)}
{console.log("nationality:", this.state.nationality)}
{console.log("sex:", this.state.sex)}
{console.log("address:", this.state.address)}
{console.log("age:", this.state.age)}
{console.log("phoneNumber:", this.state.phoneNumber)}
{console.log("activityLevel:", this.state.activityLevel)}
{console.log("Smoking:", this.state.isSmoking)}
{console.log("height:", this.state.height)}
{console.log("weight:", this.state.weight)}
{console.log("diseaseList:", this.state.diseaseList)}
{console.log("vaccineList:", this.state.vaccineList)}
{console.log("surgeryList:", this.state.surgeryList)}
{console.log("familyDiseaseList:", this.state.familyDiseaseList)}

            {console.log(this.state.diseaseList)}
            {console.log(this.state.surgeryList)}

            {console.log(this.state.familyDiseaseList)}
            {console.log(this.state.vaccineList)}


            {console.log("-----------------------------")} */}



            
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