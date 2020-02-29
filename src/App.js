/* eslint-disable eslint-comments/no-unlimited-disable */
import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DetailsScreen from '~/Screen/Detail';
import HomeScreen from '~/Screen/Home';
import SignInScreen from '~/Screen/SignIn';
import SignUpScreen from '~/Screen/SignUp';

import {useAsyncStorage} from '~/utils';
import reducer, {initialState} from '~reducers/auth';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {getItem, setItem} = useAsyncStorage('userToken');

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (state.isLoading) {
      dispatch({
        type: 'USER_INFO',
        userInfo: {name: user.displayName, email: user.email},
      });
      SplashScreen.hide();
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
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
      dispatch({type: 'RESTORE_TOKEN', token});
    };

    bootstrapAsync();
    // eslint-disable-next-line
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: ({email, password, setErrorMessage}) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        auth()
          .signInWithEmailAndPassword(email, password)
          .then(async res => {
            const user = res.user._user;
            const token = user.uid;
            const userInfo = {
              name: user.displayName,
              email: user.email,
            };
            await setItem(token);
            dispatch({type: 'SIGN_IN', token, userInfo});
          })
          .catch(e => setErrorMessage(e.message));
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async ({name, email, password, setErrorMessage}) => {
        let token;
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(userCredentials => {
            token = userCredentials.user._user.uid;
            // WIP: userInfo must be from userCredentials
            const userInfo = {name, email};
            dispatch({
              type: 'SIGN_IN',
              token,
              userInfo,
            });
            return userCredentials.user.updateProfile({
              displayName: name,
            });
          })
          .catch(e => setErrorMessage(e.message));
      },
    }),
    // eslint-disable-next-line
    [],
  );

  return (
    <AuthContext.Provider value={{...authContext, userInfo: state.userInfo}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {state.userToken === null ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{title: 'Sign In'}}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{title: 'Sign Up'}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: 'Dashboard',
                  headerRight: () => (
                    <Icon name="plus" color={'#000'} size={30} />
                  ),
                }}
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
