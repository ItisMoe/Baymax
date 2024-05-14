import React, { useState, useEffect } from "react";
import NavigationPages from "./NavigationPages";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import StarterPage from "./StarterPage";
import { resetDb, retrieveAccountType, retrieveIsLogged } from "./storage";
import { auth, database } from "./firebase";
import { signOut } from "firebase/auth";
import DoctorNavigationPages from './DoctorNavigationPages';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [accountType, setAccountType] = useState(null);


  useEffect(() => {
    const fetchAuthDetails = async () => {
      const loggedStatus = await retrieveIsLogged();
      const type = await retrieveAccountType();
      setIsLoggedIn(loggedStatus);
      setAccountType(type);
      console.log(loggedStatus, type);
    };

    fetchAuthDetails();
  }, []);

  const componentToRender = () => {
    if (isLoggedIn === "true" && accountType === "Patient")
      return <NavigationPages />;
    else if (isLoggedIn === "true" && accountType === "Doctor")
      return <DoctorNavigationPages />;
    else return <StarterPage />;
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {componentToRender()}
    </ApplicationProvider>
  );
};

export default App;
