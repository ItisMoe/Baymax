// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (code) => {
    let isLogged;
    let accountType;
    switch(code){
        case -1:
            isLogged="false";
            accountType='Patient';
            break;
        case 0:
            isLogged="true";
            accountType='Patient'
            break;
        case 1:
            isLogged="true";
            accountType='Doctor'
            break;
        case 2:
            isLogged="true";
            accountType='Admin';
            break;
    }
  try {
    await AsyncStorage.setItem('isLogged', isLogged);
    await AsyncStorage.setItem('accountType', accountType);
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
export const storePostData = async (title,body,creatorName,date,image) => {
  try {
    await AsyncStorage.setItem('postTitle', title);
    await AsyncStorage.setItem('postBody', body);
    await AsyncStorage.setItem('postCreatorName', creatorName);
    await AsyncStorage.setItem('postDate', date);
    await AsyncStorage.setItem('postImage', image);

  } catch (e) {
    console.error("Failed to save the data to the storage", e);
  }
}
export const retrievePostTitle = async () => {
  try {
    const result = await AsyncStorage.getItem('postTitle');
    console.log(result);
    return result;
  } catch (e) {
    console.error("Failed to retrieve the data from the storage", e);
  }
}
export const retrievePostBody = async () => {
  try {
    const result = await AsyncStorage.getItem('postBody');
    console.log(result);
    return result;
  } catch (e) {
    console.error("Failed to retrieve the data from the storage", e);
  }
}
export const retrievePostDate = async () => {
  try {
    const result = await AsyncStorage.getItem('postDate');
    console.log(result);
    return result;
  } catch (e) {
    console.error("Failed to retrieve the data from the storage", e);
  }
}
export const retrievePostCreatorName = async () => {
  try {
    const result = await AsyncStorage.getItem('postCreatorName');
    console.log(result);
    return result;
  } catch (e) {
    console.error("Failed to retrieve the data from the storage", e);
  }
}
export const retrievePostImage = async () => {
  try {
    const result = await AsyncStorage.getItem('postImage');
    console.log(result);
    return result;
  } catch (e) {
    console.error("Failed to retrieve the data from the storage", e);
  }
}
