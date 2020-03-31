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

/**
 * After user successfully log in goes to HomeScreen below
 * Docs for firebase :
 * @see https://github.com/invertase/react-native-firebase/pull/3339
 */
const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);
  const {getItem: getAsyncToken} = useAsyncStorage('userToken');
  const {setItem: setAsyncFCM} = useAsyncStorage('fcmToken');

  /**
   * @see https://rnfb-docs.netlify.com/messaging/server-integration#saving-tokens
   */
  const saveTokenToFirestore = React.useCallback(
    async fcmToken => {
      await setAsyncFCM(fcmToken);
      const userId = await getAsyncToken();
      await firestore()
        .collection('users')
        .doc(userId)
        .update({fcm_token: firestore.FieldValue.arrayUnion(fcmToken)});
    },
    [setAsyncFCM, getAsyncToken],
  );

  /**
   * @see https://rnfb-docs.netlify.com/messaging/usage#message-handlers
   * @see https://rnfb-docs.netlify.com/messaging/usage#foreground-state-messages
   */
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('On receiving remote message in foreground ', remoteMessage);
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
   * @see https://rnfb-docs.netlify.com/messaging/notifications#handling-interaction
   */
  React.useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      const {
        data: {deviceName, deviceId},
      } = remoteMessage;
      navigation.navigate('Details', {deviceName, deviceId});
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          const {
            data: {deviceName, deviceId},
          } = remoteMessage;
          navigation.navigate('Details', {deviceName, deviceId});
        }
        setLoading(false);
      });
  }, [navigation]);

  /**
   * Trigger iOS only device to register for remote
   * notification and save it to Firestore
   * @see https://rnfb-docs.netlify.com/messaging/usage#registering-devices-with-fcm
   */
  React.useEffect(() => {
    const registerNotificationIOS = async () => {
      try {
        const granted = await messaging().registerDeviceForRemoteMessages();
        if (granted) {
          const fcmToken = await messaging().getToken();
          console.log('FCM TOKEN ', fcmToken);
          saveTokenToFirestore(fcmToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (Platform.OS === 'ios') {
      registerNotificationIOS();
    }
    /**
     * @see https://rnfb-docs.netlify.com/messaging/server-integration#saving-tokens
     */
    return () =>
      messaging().onTokenRefresh(fcmToken => {
        saveTokenToFirestore(fcmToken);
      });
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
        saveTokenToFirestore(token);
      }
    },
    [saveTokenToFirestore],
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

  if (loading) {
    return null;
  }

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
