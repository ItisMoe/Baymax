// Add imports for DoctorDetailsScreen and BookingScreen at the top
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingScreen from "./BookingScreen";
import DoctorDetailsScreen from "./DoctorDetailsScreen";
import DoctorListScreen from "./DoctorListScreen";
import SpecialityScreen from "./SpecialityScreen";

const Stack = createNativeStackNavigator();

const BookNew = () => {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen name="Speciality" component={SpecialityScreen} />
        <Stack.Screen name="DoctorList" component={DoctorListScreen} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default BookNew;
