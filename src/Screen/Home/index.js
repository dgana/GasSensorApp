/* eslint-disable eslint-comments/no-unlimited-disable */
import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

import Dashboard from '~/screen/Dashboard';
import Profile from '~/screen/Profile';

import {notificationManager} from '~/NotificationManager';
import {SENDER_ID} from 'react-native-dotenv';
import {useAsyncStorage} from '~/utils';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  const {getItem: getAsyncToken} = useAsyncStorage('userToken');
  const {setItem: setAsyncFCM} = useAsyncStorage('fcmToken');

  const writeFirestore = React.useCallback(
    async fcmToken => {
      await setAsyncFCM(fcmToken);
      const userId = await getAsyncToken();
      const getUserDoc = await firestore()
        .collection('users')
        .doc(userId);
      const getFields = await getUserDoc.get();
      const getPrevToken = await getFields.get('fcm_token');
      if (!getPrevToken.includes(fcmToken)) {
        const fcm_token = [...getPrevToken, fcmToken];
        await getUserDoc.set({fcm_token}, {merge: true});
      }
    },
    [setAsyncFCM, getAsyncToken],
  );

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('onMessage ', remoteMessage);
      const {
        messageId,
        data,
        notification: {title, body, sound},
      } = remoteMessage;
      const options = {
        playSound: true,
        soundName: sound,
        vibrate: true,
      };
      notificationManager.showNotification(
        messageId,
        title,
        body,
        data,
        options,
      );
    });
    return unsubscribe;
  }, []);

  /**
   * Trigger iOS only device to register for remote
   * notification and save it to Firestore
   * @see https://rnfb-docs.netlify.com/messaging/notifications#handling-interaction
   * @see https://github.com/invertase/react-native-firebase/pull/3339
   */
  React.useEffect(() => {
    const registerNotificationIOS = async () => {
      try {
        const granted = await messaging().registerDeviceForRemoteMessages();
        if (granted) {
          const fcmToken = await messaging().getToken();
          console.log('FCM TOKEN ', fcmToken);
          writeFirestore(fcmToken);

          messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log('onNotificationOpenedApp ', remoteMessage);
            const {
              data: {deviceName, deviceId},
            } = remoteMessage;
            navigation.navigate('Details', {deviceName, deviceId});
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (Platform.OS === 'ios') {
      registerNotificationIOS();
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    notificationManager.configure(
      onRegister,
      onNotification,
      onOpenNotification,
      SENDER_ID,
    );
    // eslint-disable-next-line
  }, [onRegister]);

  const onRegister = React.useCallback(
    token => {
      if (Platform.OS === 'android') {
        writeFirestore(token);
      }
    },
    [writeFirestore],
  );

  const onNotification = notify => {
    console.log('[Notification] onNotification ', notify);
  };

  const onOpenNotification = notify => {
    console.log('[Notification] onOpenNotification ', notify);
    const {
      data: {deviceName, deviceId},
    } = notify;
    navigation.navigate('Details', {deviceName, deviceId});
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
