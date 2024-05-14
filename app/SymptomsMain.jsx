import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SymptomChecker from "./SymptomChecker";
import SymptomCheckerOutput from "./SymptomCheckerOutput";

const Stack = createStackNavigator();

function SymptomsMain() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="SymptomsList"
          component={SymptomChecker}
          options={{ title: "Symptoms List" }}
        />
        <Stack.Screen
          name="PredictedDisease"
          component={SymptomCheckerOutput}
          options={{ title: "Predicted Disease" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SymptomsMain;
