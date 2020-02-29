import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DetailsScreen from '~/Screen/Detail';
import HomeScreen from '~/Screen/Home';

const Stack = createStackNavigator();
export const AppContext = React.createContext();

export default class App extends React.Component {
  state = {
    title: 'Sensor',
  };

  setTitle = title => {
    this.setState({title});
  };

  render() {
    const {title} = this.state;
    return (
      <AppContext.Provider value={{setTitle: this.setTitle}}>
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
  }
}
