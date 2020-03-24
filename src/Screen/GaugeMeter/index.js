import React from 'react';
// import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useRealtimeDatabase} from '~/hooks';

const MAX_POINTS = 5000;

const GaugeMeterScreen = ({route}) => {
  const {
    params: {deviceId},
  } = route;
  const {PPM, color} = useRealtimeDatabase(deviceId);
  const fill = (PPM / MAX_POINTS) * 100;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={240}
        width={30}
        backgroundWidth={24}
        fill={fill}
        tintColor={color}
        backgroundColor="#3d5875">
        {x => (
          <>
            <Text style={styles.points}>
              {Math.round((MAX_POINTS * x) / 100)}
            </Text>
            <Text style={styles.unit}>ppm</Text>
          </>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 50,
  },
  points: {
    color: '#7591af',
    fontSize: 50,
    fontWeight: '100',
  },
  unit: {
    fontFamily: 'Avenir-Black',
    textAlign: 'center',
    color: '#7591af',
    fontSize: 16,
  },
});

GaugeMeterScreen.propTypes = {};

export default GaugeMeterScreen;
