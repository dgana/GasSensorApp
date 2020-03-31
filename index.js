/**
 * @format
 */
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './src/App';
import {name as appName} from './app.json';

/**
 * Register background handler
 * @see https://rnfb-docs.netlify.com/messaging/usage#background--quit-state-messages
 */
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
