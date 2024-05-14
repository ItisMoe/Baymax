import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
import DoctorSchedule from "./DoctorSchedule";
import OpenSlots from "./OpenSlots";
import More from './More';

const { Navigator, Screen } = createMaterialTopTabNavigator();


const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='UPCOMMING APPOINTMENTS'/>
    <Tab title='OPEN TIME SLOTS'/>
  </TabBar>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name='DoctorSchedule' component={DoctorSchedule}/>
    <Screen name='OpenSlots' component={OpenSlots}/>
  </Navigator>
);

const DoctorAppointments = () => {
  return (
  <NavigationContainer independent>
    <TabNavigator/>
  </NavigationContainer>
  );
};
export default DoctorAppointments;