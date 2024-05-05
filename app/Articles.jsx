import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MedicineListScreen from "./MedicineListScreen";
import CheckoutScreen from "./CheckoutScreen";
import PostsScreen from "./PostsScreen";
import Post from "./Post";

const Stack = createStackNavigator();

function Articles() {
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name="PostsScreen"
          component={PostsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          screenOptions={{ headerStyle: { height: 10 } }}
          name="Post"
          component={Post}
          options={{ title: "Post" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Articles;
