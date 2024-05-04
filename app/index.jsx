import React, { useEffect } from "react";
import NavigationPages from "./NavigationPages";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { Provider } from "react-redux";
import App from "./App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeData } from "./storage";


const Main = () => {
    // useEffect(() => {
    //     storeData(-1);
    // },[]);
  return (
      <App/>
  );
};

export default Main;

