const functions = require('firebase-functions');

// Create and Deploy Your Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Send FCM notification to certain user based on ppm level
exports.sendNotification = functions.database
  .ref('{userId}/{deviceId}/PPM')
  .onUpdate((change, context) => {
    const userId = context.params.userId;
    const deviceId = context.params.deviceId;

    // const getDeviceTokensPromise = admin.database().ref('')
  });
