import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token && token.length > 0 ? token : null;
};

export const deleteToken = async () => {
  await AsyncStorage.removeItem('token');
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
  } catch (error) {
    return null;
  }
};

export const deleteUser = async () => {
  await AsyncStorage.removeItem('user');
};
