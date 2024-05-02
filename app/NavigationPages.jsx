import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import Appointments from './Appointments';
import Home from './Home';
import Consult from './WellCheck';
import Medicine from './Medicine';
import More from './More';

const NavigationPages = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'Schedule', title: 'Schedule', focusedIcon: 'calendar',unfocusedIcon:'calendar-blank-outline'},
    { key: 'Consult', title: 'Well Check', focusedIcon: 'account-check' ,unfocusedIcon:'account-check-outline' },
    { key: 'Store', title: 'Medicine', focusedIcon: 'store', unfocusedIcon: 'medical-bag' },
    { key: 'More', title: 'More', focusedIcon: 'rhombus-split',unfocusedIcon:'rhombus-split-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: Home,
    Schedule: Appointments,
    Consult: Consult,
    Store: Medicine,
    More: More,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavigationPages;
