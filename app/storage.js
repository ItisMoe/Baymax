// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (code,email) => {
    let isLogged;
    let accountType;
    switch(code){
        case 0:
            isLogged="true";
            accountType='Patient'
            break;
        case 1:
            isLogged="true";
            accountType='Doctor'
            break;
    }
  try {
    await AsyncStorage.setItem('isLogged', isLogged);
    await AsyncStorage.setItem('accountType', accountType);
    await AsyncStorage.setItem("email", email);
  } catch (e) {
    console.error("Failed to save the data to the storage", e);
  }
}

export const retrieveIsLogged = async () => {
  try {
    const result = await AsyncStorage.getItem('isLogged');
    console.log(result);
    return result;
  } catch (e) {
    console.error("Failed to retrieve the data from the storage", e);
  }
}
export const retrieveAccountType = async () => {
  try {
    const result = await AsyncStorage.getItem('accountType');
    console.log(result);
    return result;
  } catch (e) {
    console.error("Failed to retrieve the data from the storage", e);
  }
}
export const retrieveUsername = async () => {
  try {
    const result = await AsyncStorage.getItem("email");
    console.log(result);
    const username = result.split("@")[0];
    console.log(username)
    return username;
  } catch (e) {
    console.error("Failed to retrieve the data from the storage", e);
  }
};
export const retrieveEmail = async () => {
  try {
    const result = await AsyncStorage.getItem("email");
    console.log(result);
    return result;
  } catch (e) {
    console.error("Failed to retrieve the data from the storage", e);
  }
};

export const resetDb = async () => {
  try {
    await AsyncStorage.setItem("isLogged", "false");
    await AsyncStorage.setItem("accountType", "");
    await AsyncStorage.setItem("email", "");
  } catch (e) {
    console.error("Failed to reset the data of the storage", e);
  }
}
