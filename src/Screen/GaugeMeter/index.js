import React from 'react';
// import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const MAX_POINTS = 1500;

const GaugeMeterScreen = () => {
  const [points] = React.useState(512);
  const fill = (points / MAX_POINTS) * 100;
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={240}
        width={30}
        backgroundWidth={24}
        fill={fill}
        tintColor="#00e0ff"
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
    textAlign: 'center',
    color: '#7591af',
    fontSize: 50,
    fontWeight: '100',
  },
  unit: {
    fontFamily: 'Avenir',
    textAlign: 'center',
    color: '#7591af',
    fontSize: 16,
  },
});

GaugeMeterScreen.propTypes = {};

export default GaugeMeterScreen;
