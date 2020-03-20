import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';

import Dashboard from '~/screen/Dashboard';
import Profile from '~/screen/Profile';

import {notificationManager} from '~/NotificationManager';
import {SENDER_ID} from 'react-native-dotenv';
import {useAsyncStorage} from '~/utils';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {getItem} = useAsyncStorage('userToken');

  const writeDatabase = React.useCallback(
    async fcmToken => {
      const idUser = await getItem();
      await database()
        .ref(`${idUser}/fcm_token`)
        .set(fcmToken);
    },
    [getItem],
  );

  React.useEffect(() => {
    const registerNotificationIOS = async () => {
      try {
        await messaging().registerForRemoteNotifications();
        const fcmToken = await messaging().getToken();
        console.log('FCM TOKEN ', fcmToken);
      } catch (error) {
        console.log(error);
      }
    };
    if (Platform.OS === 'ios') {
      registerNotificationIOS();
    }
  }, []);

  React.useEffect(() => {
    notificationManager.configure(
      onRegister,
      onNotification,
      onOpenNotification,
      SENDER_ID,
    );
  }, [onRegister]);

  const onRegister = React.useCallback(token => writeDatabase(token), [
    writeDatabase,
  ]);

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
