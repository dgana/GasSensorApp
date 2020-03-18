import React from 'react';
// import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import database from '@react-native-firebase/database';
import {useAsyncStorage} from '~/utils';
import Button from '~/component/Button';
import {notificationManager} from '~/NotificationManager';

const MAX_POINTS = 5000;

const GaugeMeterScreen = () => {
  const [points, setPoints] = React.useState(0);
  const {getItem} = useAsyncStorage('userToken');
  const fill = (points / MAX_POINTS) * 100;

  React.useEffect(() => {
    notificationManager.configure(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  }, []);

  const onRegister = token => {
    console.log('[Notification] Registered ', token);
  };

  const onNotification = notify => {
    console.log('[Notification] onNotification ', notify);
  };

  const onOpenNotification = notify => {
    console.log('[Notification] onOpenNotification ', notify);
    // eslint-disable-next-line no-alert
    alert('Open Notification');
  };

  React.useEffect(() => {
    const callDatabase = async () => {
      const idUser = await getItem();
      await database()
        .ref(`${idUser}/Methane01`)
        .on('value', function(snapshot) {
          const value = snapshot.val();
          if (value) {
            setPoints(value.PPM);
            // if (value.PPM >= 405) {
            //   sendNotification();
            // }
          }
        });
    };
    callDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendNotification = () => {
    const options = {
      soundName: 'alarm_frenzy.mp3', // 'default',
      playSound: true,
      vibrate: true,
    };
    notificationManager.showNotification(
      1,
      'App Notification',
      'LocalNotification',
      {},
      options,
    );
  };

  const cancelNotification = () => {
    notificationManager.cancelAllLocalNotification();
  };

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={240}
        width={30}
        backgroundWidth={24}
        fill={fill}
        tintColor="#00e0ff"
        backgroundColor="#3d5875">
        {x => (
          <>
            <Text style={styles.points}>
              {Math.round((MAX_POINTS * x) / 100)}
            </Text>
            <Text style={styles.unit}>ppm</Text>
          </>
        )}
      </AnimatedCircularProgress>
      <Button onPress={sendNotification} text="Send Notification" />
      <Button onPress={cancelNotification} text="Cancel Notification" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 50,
  },
  points: {
    color: '#7591af',
    fontSize: 50,
    fontWeight: '100',
  },
  unit: {
    fontFamily: 'Avenir-Black',
    textAlign: 'center',
    color: '#7591af',
    fontSize: 16,
  },
});

GaugeMeterScreen.propTypes = {};

export default GaugeMeterScreen;
