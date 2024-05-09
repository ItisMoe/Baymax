import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Stack,
  useRouter,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";


const DoctorNavigator = () => {
  const navigation = useNavigation();
  const doctorId = useLocalSearchParams(); // Assuming this hook correctly fetches your parameters

  useEffect(() => {
    // Assuming doctorId is directly usable; if it's an object, you might need doctorId.id
    if (doctorId) {
      navigation.navigate("DoctorDetailsScreen", { doctorId });
    }
  }, [doctorId, navigation]);

  return null; // This component does not render anything
};

export default DoctorNavigator;
