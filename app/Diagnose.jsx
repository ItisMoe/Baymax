// Add imports for DoctorDetailsScreen and BookingScreen at the top
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from "./BookingScreen";
import DoctorDetailsScreen from "./DoctorDetailsScreen";
import DoctorListScreen from "./DoctorListScreen";
import SpecialityScreen from "./SpecialityScreen";
import SymptomChecker from "./SymptomChecker";
import SymptomCheckerOutput from "./SymptomCheckerOutput";

const Stack = createNativeStackNavigator();

const Diagnose = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen name="SymtomChecker" component={SymptomChecker} />
        <Stack.Screen
          name="SymptomCheckerOutput"
          component={SymptomCheckerOutput}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Diagnose;
