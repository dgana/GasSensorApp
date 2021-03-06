const functions = require('firebase-functions');

/**
 * Create and Deploy Your Cloud Functions
 * @see https://firebase.google.com/docs/functions/write-firebase-functions
 * @see https://firebase.google.com/docs/reference/admin/node/admin.messaging.Messaging
 */

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Send FCM notification to certain user based on ppm level
exports.sendNotification = functions.database
  .ref('{userId}/{deviceId}/PPM')
  .onUpdate(async (change, context) => {
    const userId = context.params.userId;
    const deviceId = context.params.deviceId;
    const ppmValue = change.after.val();
    const prevPPM = change.before.val();

    const userPayload = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    console.log('PPM Value ', ppmValue);

    const userData = await userPayload.data();
    const {fcm_token, name, devices} = userData;

    console.log('FCM Tokens ', fcm_token);

    const device = devices.find(x => x.id === deviceId);
    const {name: deviceName, config} = device;

    console.log('Firestore Device ', device);

    if (prevPPM > config.limit && ppmValue > config.limit) {
      return console.log('Hold notification ', prevPPM, ppmValue, config.limit);
    }

    if (ppmValue < config.limit) {
      return console.log('User', userId, 'Device', deviceId, 'PPM', ppmValue);
    }

    const title = 'Methane Gas Detected';
    const body = `${name}, device ${deviceName} detected methane gas ${ppmValue} ppm`;
    const priority = 'high';
    const sound = 'alarm_frenzy.mp3';

    /**
     * @see https://firebase.google.com/docs/reference/admin/node/admin.messaging.Messaging#send-multicast
     * @see https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns/
     */
    const message = {
      data: {
        deviceName,
        deviceId,
      },
      notification: {
        title,
        body,
      },
      android: {
        priority,
        data: {
          deviceName,
          deviceId,
        },
        notification: {
          title,
          body,
          sound,
          priority,
        },
      },
      apns: {
        headers: {
          method: 'POST',
          'apns-push-type': 'alert',
          'apns-priority': '10',
          'apns-topic': 'GasSensorApp',
        },
        payload: {
          aps: {
            alert: {
              title,
              body,
            },
            sound,
          },
        },
      },
      tokens: fcm_token,
    };

    const response = await admin.messaging().sendMulticast(message);

    console.log('Messaging send multicast response ', JSON.stringify(response));

    return response;
  });
