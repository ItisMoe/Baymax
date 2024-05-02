import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
import MySchedule from './MySchedule';
import BookNew from './BookNew';

const { Navigator, Screen } = createMaterialTopTabNavigator();


const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='MY SCHEDULE'/>
    <Tab title='BOOK NEW'/>
  </TabBar>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name='My Schedule' component={MySchedule}/>
    <Screen name='Book New' component={BookNew}/>
  </Navigator>
);

const Appointments = () => {
  return (
  <NavigationContainer independent>
    <TabNavigator/>
  </NavigationContainer>
  );
};
export default Appointments;