import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import More from "./More"; // Make sure the path is correct
import AboutPage from "./AboutPage";
import SupportPage from "./SupportPage";

const Stack = createNativeStackNavigator();

function MoreNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="More">
        <Stack.Screen
          name="More"
          component={More}
          options={{ title: "More" }}
        />
        <Stack.Screen
          name="AboutPage"
          component={AboutPage}
          options={{ title: "About Baymax" }}
        />
        <Stack.Screen
          name="SupportPage"
          component={SupportPage}
          options={{ title: "Support" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MoreNav;