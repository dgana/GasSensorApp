import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class NotificationManager {
  configure = (onRegister, onNotification, onOpenNotification, senderId) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(response) {
        onRegister(response.token);
        console.log('[NotificationManager] onRegister Token:', response.token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('[NotificationManager] onNotification:', notification);

        if (Platform.OS === 'ios') {
          if (notification.data.openedInForeground) {
            notification.userInteraction = true;
          }
        }

        if (notification.userInteraction) {
          onOpenNotification(notification);
        } else {
          onNotification(notification);
        }

        if (Platform.OS === 'android') {
          notification.userInteraction = true;
        }

        // Only call callback if not from foreground
        if (Platform.OS === 'ios') {
          if (!notification.data.openedInForeground) {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
          }
        } else {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
      senderID: senderId,
    });
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_launcher',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || false,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data,
    };
  };

  buildIOSNotification = (id, title, message, data = {}, options = {}) => {
    return {
      alertAction: options.alertAction || 'view',
      category: options.category || '',
      userInfo: {
        id,
        item: data,
      },
    };
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      ...this.buildAndroidNotification(id, title, message, data, options),
      /* IOS Only Properties */
      ...this.buildIOSNotification(id, title, message, data, options),
      /* IOS and Android Properties */
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false, // If the notification was opened by the user from the notification area or not
    });
  };

  cancelAllLocalNotification = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  unregister = () => {
    PushNotification.unregister();
  };
}

export const notificationManager = new NotificationManager();
