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
    const getUserData = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    const getToken = getUserData.get('fcm_token');

    if (!getToken) {
      return console.log('user has no fcm token!');
    }

    console.log('FCM Token ', getToken);

    // Get the user profile.
    const user = await admin.auth().getUser(userId);
    const {displayName = '', photoURL = ''} = user;

    console.log('User profile, ', user);

    const body = `${displayName}, device ${deviceId} detected methane gas ${ppmValue} ppm`;
    const icon = photoURL;

    // Notification details.
    const payload = {
      data: {
        name: 'Sensor A', // WIP: should be the name of device from firestore
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
