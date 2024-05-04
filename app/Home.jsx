import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBar, Tab, Layout, Text } from "@ui-kitten/components";
import QAScreen from "./QAScreen";
import PostsScreen from "./PostsScreen";
import FeedScreen from "./FeedScreen";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="POSTS" />
    <Tab title="QA" />
  </TabBar>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <TopTabBar {...props} />}>
    <Screen name="Posts" component={PostsScreen} />
    <Screen name="QA" component={QAScreen} />
  </Navigator>
);

const Home = () => {
  return (
    <NavigationContainer independent>
      <TabNavigator />
    </NavigationContainer>
  );
};
export default Home;
