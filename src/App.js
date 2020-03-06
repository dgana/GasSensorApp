/* eslint-disable eslint-comments/no-unlimited-disable */
import 'react-native-gesture-handler';

import React from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import DetailsScreen from '~/Screen/Detail';
import HomeScreen from '~/Screen/Home';
import SignInScreen from '~/Screen/SignIn';
import SignUpScreen from '~/Screen/SignUp';
import AddDeviceScreen from '~/Screen/AddDevice';
import ForgotPasswordScreen from '~/Screen/ForgotPassword';
import PhoneAuthScreen from '~/Screen/PhoneAuth';
import WelcomeScreen from '~/Screen/Welcome';
import PhoneVerificationScreen from '~/Screen/PhoneVerification';

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
  const {getItem, setItem} = useAsyncStorage('userToken');

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (state.isLoading) {
      const {displayName: name, email, phoneNumber} = user || {};
      const userInfo = {name, email, phoneNumber};
      dispatch({type: USER_INFO, userInfo});
      SplashScreen.hide();
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // unsubscribe on unmount
    return subscriber;
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await getItem();
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
          } = user;

          if (!emailVerified) {
            const desc = 'Please check your registered email to be verified';
            const message = `[auth/email-verification] ${desc}`;
            throw {message};
          }

          const userInfo = {name, email, phoneNumber};
          await setItem(uid);
          dispatch({type: SIGN_IN, token: uid, userInfo});
        } catch (err) {
          dispatch({type: BUTTON_LOADING, loading: false});
          setErrorMessage(err.message);
        }
      },
      signOut: () => {
        clearStorage();
        dispatch({type: SIGN_OUT});
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
          const {uid, displayName: name, email, phoneNumber} = user;
          const userInfo = {name, email, phoneNumber};
          await setItem(uid);
          dispatch({type: SIGN_IN, token: uid, userInfo});
        } catch (err) {
          dispatch({type: BUTTON_LOADING, loading: false});
          setErrorMessage(err.message);
        }
      },
      googleLogin: async ({navigation}) => {
        try {
          await GoogleSignin.hasPlayServices();

          // add any configuration settings here:
          await GoogleSignin.configure();

          const data = await GoogleSignin.signIn();

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
          const {uid, displayName: name, email, phoneNumber} = user;
          const userInfo = {name, email, phoneNumber};
          await setItem(uid);
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
                options={{title: 'Home'}}
              />
              <Stack.Screen
                name="AddDevice"
                component={AddDeviceScreen}
                options={{title: 'Add Device'}}
              />
              <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={({route}) => ({title: `${route.params.name} Detail`})}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
