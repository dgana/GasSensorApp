/* eslint-disable eslint-comments/no-unlimited-disable */
import 'react-native-gesture-handler';

import React from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import {WEB_CLIENT_ID} from 'react-native-dotenv';

import DetailsScreen from '~/screen/Detail';
import HomeScreen from '~/screen/Home';
import SignInScreen from '~/screen/SignIn';
import SignUpScreen from '~/screen/SignUp';
import AddDeviceScreen from '~/screen/AddDevice';
import AddBluetoothScreen from '~/screen/AddBluetooth';
import AddDeviceIdScreen from '~/screen/AddDeviceId';
import AddSSIDScreen from '~/screen/AddSSID';

import ForgotPasswordScreen from '~/screen/ForgotPassword';
import PhoneAuthScreen from '~/screen/PhoneAuth';
import WelcomeScreen from '~/screen/Welcome';
import PhoneVerificationScreen from '~/screen/PhoneVerification';

import {useAsyncStorage, clearStorage} from '~/utils';
import reducer, {initialState} from '~reducers/auth';

import {
  BUTTON_LOADING,
  USER_INFO,
  RESTORE_TOKEN,
  CONFIRM_PHONE,
  SIGN_IN,
  SIGN_OUT,
} from '~/reducers/auth/constants';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {getItem: getAsyncToken, setItem: setAsyncToken} = useAsyncStorage(
    'userToken',
  );
  const {getItem: getAsyncFCM} = useAsyncStorage('fcmToken');

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (state.isLoading) {
      const {displayName: name, email, phoneNumber, photoURL} = user || {};
      const userInfo = {name, email, phoneNumber, photoURL};
      dispatch({type: USER_INFO, userInfo});
      SplashScreen.hide();
    }
  }

  React.useEffect(() => {
    // add any google signin auth configuration settings here:
    GoogleSignin.configure({webClientId: WEB_CLIENT_ID});
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await getAsyncToken();
      } catch (e) {
        console.warn(e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: RESTORE_TOKEN, token});
    };

    bootstrapAsync();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (state.userToken) {
      const getQuery = async () => {
        const querySnapshot = await firestore()
          .collection('users')
          .doc(state.userToken)
          .get();
        if (!querySnapshot.exists) {
          firestore()
            .collection('users')
            .doc(state.userToken)
            .set({name: state.userInfo.name, email: state.userInfo.email});
        }
      };
      getQuery();
    }
    // eslint-disable-next-line
  }, [state.userToken]);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({email: e, password: p, setErrorMessage}) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        dispatch({type: BUTTON_LOADING, loading: true});

        try {
          const {user} = await auth().signInWithEmailAndPassword(e, p);
          const {
            uid,
            displayName: name,
            email,
            phoneNumber,
            emailVerified,
            photoURL,
          } = user;

          if (!emailVerified) {
            const desc = 'Please check your registered email to be verified';
            const message = `[auth/email-verification] ${desc}`;
            throw {message};
          }

          const userInfo = {name, email, phoneNumber, photoURL};
          await setAsyncToken(uid);
          dispatch({type: SIGN_IN, token: uid, userInfo});
        } catch (err) {
          dispatch({type: BUTTON_LOADING, loading: false});
          setErrorMessage(err.message);
        }
      },
      signOut: () => {
        Alert.alert(
          'Log out',
          'Are you sure you want to log out?',
          [
            {
              text: 'Yes',
              onPress: async () => {
                const idUser = await getAsyncToken();
                const fcmToken = await getAsyncFCM();

                const getUserDoc = await firestore()
                  .collection('users')
                  .doc(idUser);
                const getFields = await getUserDoc.get();
                const getPrevToken = await getFields.get('fcm_token');
                const fcm_token = getPrevToken.filter(x => x !== fcmToken);
                await getUserDoc.set({fcm_token}, {merge: true});

                await clearStorage();
                const isGoogleSignIn = await GoogleSignin.isSignedIn();
                if (isGoogleSignIn) {
                  await GoogleSignin.revokeAccess();
                  await GoogleSignin.signOut();
                }
                dispatch({type: SIGN_OUT});
              },
            },
            {
              text: 'No',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      },
      signUp: async ({
        name,
        email: e,
        password: p,
        setErrorMessage,
        navigation,
      }) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        dispatch({type: BUTTON_LOADING, loading: true});

        try {
          const {user} = await auth().createUserWithEmailAndPassword(e, p);
          dispatch({type: BUTTON_LOADING, loading: false});
          user.sendEmailVerification();
          user.updateProfile({displayName: name});

          Alert.alert('Please check your email to be verified');
          navigation.navigate('SignIn');
        } catch (err) {
          dispatch({type: BUTTON_LOADING, loading: false});
          setErrorMessage(err.message);
        }
      },
      resetPassword: async ({email, setErrorMessage, navigation}) => {
        dispatch({type: BUTTON_LOADING, loading: true});

        try {
          await auth().sendPasswordResetEmail(email);
          dispatch({type: BUTTON_LOADING, loading: false});

          Alert.alert('Please check your email to reset password');
          navigation.navigate('SignIn');
        } catch (err) {
          dispatch({type: BUTTON_LOADING, loading: false});
          setErrorMessage(err.message);
        }
      },
      phoneLogin: async ({phoneNumber, setErrorMessage, navigation}) => {
        dispatch({type: BUTTON_LOADING, loading: true});

        try {
          const phone = await auth().signInWithPhoneNumber(phoneNumber, true);
          dispatch({type: BUTTON_LOADING, loading: false});
          dispatch({type: CONFIRM_PHONE, phone});

          Alert.alert('Please check your sms to get verification code');
          navigation.navigate('PhoneVerification');
        } catch (err) {
          dispatch({type: BUTTON_LOADING, loading: false});
          setErrorMessage(err.message);
        }
      },
      phoneVerification: async ({code, setErrorMessage, phone}) => {
        dispatch({type: BUTTON_LOADING, loading: true});
        try {
          const user = await phone.confirm(Object.values(code).join(''));
          const {uid, displayName: name, email, phoneNumber, photoURL} = user;
          const userInfo = {name, email, phoneNumber, photoURL};
          await setAsyncToken(uid);
          dispatch({type: SIGN_IN, token: uid, userInfo});
        } catch (err) {
          dispatch({type: BUTTON_LOADING, loading: false});
          setErrorMessage(err.message);
        }
      },
      googleLogin: async ({navigation}) => {
        try {
          await GoogleSignin.hasPlayServices();
          const data = await GoogleSignin.signIn();
          dispatch({type: BUTTON_LOADING, loading: true});

          // create a new firebase credential with the token
          const credential = auth.GoogleAuthProvider.credential(
            data.idToken,
            data.accessToken,
          );
          // login with credential
          const firebaseUserCredential = await auth().signInWithCredential(
            credential,
          );
          const user = firebaseUserCredential.user.toJSON();
          const {uid, displayName: name, email, phoneNumber, photoURL} = user;
          const userInfo = {name, email, phoneNumber, photoURL};
          await setAsyncToken(uid);
          dispatch({type: SIGN_IN, token: uid, userInfo});
        } catch (err) {
          if (err.code === statusCodes.SIGN_IN_CANCELLED) {
            navigation.navigate('Welcome');
          } else if (err.code === statusCodes.IN_PROGRESS) {
            navigation.navigate('Welcome');
          } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            navigation.navigate('Welcome');
          } else {
            console.warn(err);
          }
        }
      },
    }),
    // eslint-disable-next-line
    [],
  );

  return (
    <AuthContext.Provider value={{...authContext, ...state}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {!state.userToken ? (
            <>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                  title: 'Welcome',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign In',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: 'Sign Up',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{
                  title: 'Forgot Password',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PhoneAuth"
                component={PhoneAuthScreen}
                options={{
                  title: 'Phone Auth',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="PhoneVerification"
                component={PhoneVerificationScreen}
                options={{
                  title: 'Phone Verification',
                  headerShown: false,
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'Dashboard'}}
              />
              <Stack.Screen
                name="AddDevice"
                component={AddDeviceScreen}
                options={{title: 'Add Device'}}
              />
              <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={({route}) => ({
                  title: route.params.deviceName || 'Detail',
                })}
              />
              <Stack.Screen
                name="AddDeviceId"
                component={AddDeviceIdScreen}
                options={{title: 'Add Device ID'}}
              />
              <Stack.Screen
                name="AddSSID"
                component={AddSSIDScreen}
                options={({route}) => ({
                  title:
                    `Connect ${route.params.deviceName}` || 'Connect Device',
                })}
              />
              <Stack.Screen
                name="AddBluetooth"
                component={AddBluetoothScreen}
                options={{title: 'Add Bluetooth Device'}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
