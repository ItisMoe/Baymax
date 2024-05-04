import React, { useState, useEffect } from "react";
import NavigationPages from "./NavigationPages";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import StarterPage from "./StarterPage";
import { retrieveAccountType, retrieveIsLogged } from "./storage";

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
      return <DocNavigationPages />;
    else if (isLoggedIn === "true" && accountType === "Admin")
      return <AdminNavigationPages />;
    else return <StarterPage />;
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {componentToRender()}
    </ApplicationProvider>
  );
};

export default App;
