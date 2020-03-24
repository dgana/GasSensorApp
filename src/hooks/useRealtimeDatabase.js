import React from 'react';
import database from '@react-native-firebase/database';
import {useAsyncStorage} from '~/utils';
import theme from '~/utils/theme';

const useRealtimeDatabase = deviceId => {
  const [data, setData] = React.useState({PPM: 0, limit: 0});
  const {PPM, limit} = data;
  const {getItem} = useAsyncStorage('userToken');

  React.useEffect(() => {
    const callDatabase = async () => {
      const userId = await getItem();
      await database()
        .ref(`${userId}/${deviceId}`)
        .on('value', function(snapshot) {
          const value = snapshot.val();
          if (value) {
            setData({PPM: value.PPM, limit: value.limit});
          }
        });
    };
    callDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const color = PPM > limit ? theme.danger : theme.success;
  return {PPM, color};
};

export default useRealtimeDatabase;
