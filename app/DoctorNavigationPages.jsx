import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import Appointments from "./Appointments";
import Home from "./Home";
import Consult from "./Consult";
import Medicine from "./Medicine";
import More from "./More";
import Signup from "./Signup";
import Login from "./Login";
import StarterPage from "./StarterPage";
import Diagnose from "./Diagnose";
import WellCheck from "./WellCheck";
import Chat from "./Chat";
import DoctorAppointments from "./DoctorAppointments";

const DoctorNavigationPages = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "Home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "Schedule",
      title: "Schedule",
      focusedIcon: "calendar",
      unfocusedIcon: "calendar-blank-outline",
    },
    {
      key: "Assist",
      title: "Assist",
      focusedIcon: "account-check",
      unfocusedIcon: "account-check-outline",
    },
    {
      key: "More",
      title: "More",
      focusedIcon: "rhombus-split",
      unfocusedIcon: "rhombus-split-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: Home,
    Schedule: DoctorAppointments,
    Assist: Consult,
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

export default DoctorNavigationPages;
