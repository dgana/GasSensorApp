import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DetailsScreen from '~/Screen/Detail';
import HomeScreen from '~/Screen/Home';

const Stack = createStackNavigator();
export const AppContext = React.createContext();

const App = () => {
  const [title, setTitle] = React.useState('Sensor');
  return (
    <AppContext.Provider value={{setTitle}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Discovered Sensors'}}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{title: `${title} Detail`}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
