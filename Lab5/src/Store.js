import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Failed to save data', error);
  }
};

export const getToken = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Failed to get data', error);
  }
};
