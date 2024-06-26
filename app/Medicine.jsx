import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MedicineListScreen from "./MedicineListScreen";
import CheckoutScreen from "./CheckoutScreen";

const Stack = createStackNavigator();

function Medicine() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="MedicineList"
          component={MedicineListScreen}
          options={{ title: "Medicine List" }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ title: "Checkout" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Medicine;
