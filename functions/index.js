const functions = require('firebase-functions');

// Create and Deploy Your Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

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
    const getToken = await admin
      .database()
      .ref(`${userId}/fcm_token`)
      .once('value');

    console.log('FCM Token ', getToken.val());

    // Get the user profile.
    const user = await admin.auth().getUser(userId);
    const {displayName = '', photoURL = ''} = user;

    console.log('User profile, ', user);

    const body = `${displayName}, device ${deviceId} detected methane gas ${ppmValue} ppm`;
    const icon = photoURL;

    // Notification details.
    const payload = {
      notification: {
        title: 'Methane Gas Detected',
        body,
        icon,
        sound: 'alarm_frenzy.mp3',
      },
    };

    // Send notification
    const response = await admin
      .messaging()
      .sendToDevice(getToken.val(), payload);

    return response;
  });
