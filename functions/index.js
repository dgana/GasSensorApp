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

    const userPayload = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    const userData = await userPayload.data();
    const {fcm_token, name, devices} = userData;

    const device = devices.find(x => x.id === deviceId);
    const {name: deviceName, config} = device;

    console.log('Firestore Device ', device);

    if (ppmValue < config.limit) {
      return console.log('User', userId, 'Device', deviceId, 'PPM', ppmValue);
    }

    const body = `${name}, device ${deviceName} detected methane gas ${ppmValue} ppm`;

    // Notification details.
    const payload = {
      data: {
        deviceName,
        deviceId,
      },
      notification: {
        title: 'Methane Gas Detected',
        sound: 'alarm_frenzy.mp3',
        body,
      },
    };

    console.log('FCM Tokens ', fcm_token);

    // Send notification
    const response = await admin.messaging().sendToDevice(fcm_token, payload);

    console.log('Messaging send to device response ', response);

    return response;
  });
