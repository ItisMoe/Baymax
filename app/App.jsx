import React, { useState, useEffect } from "react";
import NavigationPages from "./NavigationPages";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import StarterPage from "./StarterPage";
import { retrieveAccountType, retrieveIsLogged } from "./storage";
import { StripeProvider } from '@stripe/stripe-react-native';
import { store } from './store';  // Correct the path as necessary
import { Provider } from 'react-redux'; // Make sure this line is added
import { useDispatch, useSelector } from 'react-redux';





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
    //isLoggedIn="false";
    //if (isLoggedIn === "true" && accountType === "Patient")
    if (isLoggedIn === "true" && accountType === "Patient")

      return <NavigationPages />;
    else if (isLoggedIn === "true" && accountType === "Doctor")
      return <DocNavigationPages />;
    else if (isLoggedIn === "true" && accountType === "Admin")
      return <AdminNavigationPages />;
    else return <StarterPage />;
  };

  return (

<Provider store={store}>
    
    <StripeProvider publishableKey="pk_test_51PFdGTP2aNXri3F2WRCuliDBlB0PuZ1HyCnAEWWPpCgX2Zu7dlFs2N91d49zMguhBusmZ92h1omXK0eXlTLiXalI007yjhamqv">

    <ApplicationProvider {...eva} theme={eva.light}>
      {componentToRender()}
    </ApplicationProvider>
    </StripeProvider>
    </Provider>
  
  );
};

export default App;