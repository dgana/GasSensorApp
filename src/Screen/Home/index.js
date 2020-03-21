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

const HomeScreen = () => {
  const {getItem: getAsyncToken} = useAsyncStorage('userToken');
  const {setItem: setAsyncFCM} = useAsyncStorage('fcmToken');

  const writeFirestore = React.useCallback(
    async fcmToken => {
      await setAsyncFCM(fcmToken);
      const idUser = await getAsyncToken();
      const getUserDoc = await firestore()
        .collection('users')
        .doc(idUser);
      const getFields = await getUserDoc.get();
      const getPrevToken = await getFields.get('fcm_token');
      if (!getPrevToken.includes(fcmToken)) {
        const fcm_token = [...getPrevToken, fcmToken];
        await getUserDoc.set({fcm_token}, {merge: true});
      }
    },
    [setAsyncFCM, getAsyncToken],
  );

  /**
   * Trigger iOS only device to register for remote
   * notification and save it to Firestore
   */
  React.useEffect(() => {
    const registerNotificationIOS = async () => {
      try {
        const granted = await messaging().registerForRemoteNotifications();
        if (granted) {
          const fcmToken = await messaging().getToken();
          console.log('FCM TOKEN ', fcmToken);
          writeFirestore(fcmToken);
        }
      } catch (error) {
        console.warn(error);
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
