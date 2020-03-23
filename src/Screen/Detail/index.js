import React from 'react';
// import PropTypes from 'prop-types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GaugeMeter from '~/screen/GaugeMeter';
import Chart from '~/screen/Chart';

const Tab = createBottomTabNavigator();

const DetailScreen = ({route}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="GaugeMeter"
        component={GaugeMeter}
        initialParams={route.params}
        options={{
          tabBarLabel: 'Gauge Meter',
          tabBarIcon: ({color, size}) => (
            <Icon name="chart-donut" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chart"
        component={Chart}
        initialParams={route.params}
        options={{
          tabBarLabel: 'Chart',
          tabBarIcon: ({color, size}) => (
            <Icon name="chart-line" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

DetailScreen.propTypes = {};

export default DetailScreen;
