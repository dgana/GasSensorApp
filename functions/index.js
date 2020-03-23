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

    // If no PPM or under 500 we exit the function.
    if (!ppmValue || ppmValue < 500) {
      return console.log('User', userId, 'Device', deviceId, 'PPM', ppmValue);
    }

    // Get FCM Token
    const userPayload = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    const getToken = await userPayload.get('fcm_token');
    const getDevice = await userPayload.get('devices');

    const device = getDevice.find(x => x.id === deviceId);
    const {name: deviceName} = device;

    if (!getToken) {
      return console.log('User has no fcm token!');
    }

    // Get the user profile.
    const user = await admin.auth().getUser(userId);
    const {displayName = '', photoURL = ''} = user;

    const body = `${displayName}, device ${deviceId} detected methane gas ${ppmValue} ppm`;
    const icon = photoURL;

    // Notification details.
    const payload = {
      data: {
        deviceName,
        deviceId,
      },
      notification: {
        title: 'Methane Gas Detected',
        body,
        icon,
        sound: 'alarm_frenzy.mp3',
      },
    };

    // Send notification
    const response = await admin.messaging().sendToDevice(getToken, payload);

    return response;
  });
