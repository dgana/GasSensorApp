import React from 'react';
// import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import database from '@react-native-firebase/database';
import {useAsyncStorage} from '~/utils';

const MAX_POINTS = 1500;

const GaugeMeterScreen = () => {
  const [points, setPoints] = React.useState(0);
  const {getItem} = useAsyncStorage('userToken');
  const fill = (points / MAX_POINTS) * 100;

  React.useEffect(() => {
    const callDatabase = async () => {
      const idUser = await getItem();
      const snapshot = await database()
        .ref(`${idUser}/Methane01`)
        .once('value');
      setPoints(snapshot.val().PPM);
    };
    callDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
