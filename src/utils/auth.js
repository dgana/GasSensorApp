import AsyncStorage, {
  useAsyncStorage as UAS,
} from '@react-native-community/async-storage';

/**
 * @see https://github.com/react-native-community/async-storage/blob/LEGACY/docs/API.md#useasyncstorage
 */
export const useAsyncStorage = key => {
  const {getItem, setItem} = UAS(key);
  return {getItem, setItem};
};

export const clearStorage = async () => {
  try {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      AsyncStorage.clear();
    }
  } catch (e) {
    console.warn(e);
  }
};

export const getMultiple = async keys => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (e) {
    console.warn(e);
  }
};
