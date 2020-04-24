import React from 'react';
// import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useRealtimeDatabase} from '~/hooks';

const ADDED_MAX_POINTS_PERCENTAGE = 0.5;

const GaugeMeterScreen = ({route}) => {
  const {
    params: {deviceId},
  } = route;
  const {PPM, limit, color} = useRealtimeDatabase(deviceId);
  const MAX_POINTS = limit * ADDED_MAX_POINTS_PERCENTAGE + limit;
  const fill = (PPM / MAX_POINTS) * 100;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={260}
        width={32}
        backgroundWidth={24}
        fill={fill}
        tintColor={color}
        backgroundColor="#3d5875">
        {x => (
          <>
            <View style={styles.wrapText}>
              <Text style={styles.points}>
                {Math.round((MAX_POINTS * x) / 100)}
              </Text>
              <Text style={styles.unit}> ppm</Text>
            </View>
            <Text style={styles.subpoints}>limit : {limit} ppm</Text>
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
    fontSize: 46,
    fontWeight: '100',
  },
  unit: {
    fontFamily: 'Avenir-Black',
    textAlign: 'center',
    color: '#7591af',
    fontSize: 16,
    lineHeight: 56,
    marginLeft: 2,
  },
  subpoints: {
    color: '#7591af',
    fontSize: 12,
    fontWeight: '300',
    marginTop: 8,
  },
  wrapText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

GaugeMeterScreen.propTypes = {};

export default GaugeMeterScreen;
