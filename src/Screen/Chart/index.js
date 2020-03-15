import React from 'react';
// import PropTypes from 'prop-types'
import {View, Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {data} from './data';

const Chart = () => {
  const chartConfig = {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const width = Dimensions.get('window').width - 24;
  const height = 220;
  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={width}
        height={height}
        chartConfig={chartConfig}
        bezier
      />
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
});

Chart.propTypes = {};

export default Chart;
