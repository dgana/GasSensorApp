import React from 'react';
import database from '@react-native-firebase/database';
import {useAsyncStorage} from '~/utils';
import theme from '~/utils/theme';

const useRealtimeDatabase = deviceId => {
  const [data, setData] = React.useState({PPM: 0, limit: 1, timeout: 1});
  const {PPM, limit, timeout} = data;
  const {getItem} = useAsyncStorage('userToken');

  React.useEffect(() => {
    let isCancelled = false;

    const callDatabase = async () => {
      try {
        const userId = await getItem();
        await database()
          .ref(`${userId}/${deviceId}`)
          .on('value', function(snapshot) {
            const value = snapshot.val();
            if (value) {
              const {PPM: ppm, limit: lim, timeout: tim} = value;
              setData({PPM: ppm, limit: lim, timeout: tim});
            }
          });
      } catch (e) {
        if (!isCancelled) {
          throw e;
        }
      }
    };
    callDatabase();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const color = PPM > limit ? theme.danger : theme.success;
  return {PPM, limit, timeout, color};
};

export default useRealtimeDatabase;
