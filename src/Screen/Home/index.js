import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';

import Dashboard from '~/screen/Dashboard';
import Profile from '~/screen/Profile';

import {notificationManager} from '~/NotificationManager';
import {SENDER_ID} from 'react-native-dotenv';
import {useAsyncStorage} from '~/utils';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const {getItem} = useAsyncStorage('userToken');

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
      console.log('[Notification] Registered ', token);

      const callDatabase = async () => {
        const idUser = await getItem();
        await database()
          .ref(`${idUser}/notificationToken`)
          .set(token);
      };
      callDatabase();
    },
    [getItem],
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
