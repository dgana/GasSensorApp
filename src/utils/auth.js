import {useAsyncStorage} from '@react-native-community/async-storage';

/**
 * @see https://github.com/react-native-community/async-storage/blob/LEGACY/docs/API.md#useasyncstorage
 */
export default key => {
  const {getItem, setItem, removeItem} = useAsyncStorage(key);
  return {getItem, setItem, removeItem};
};
