import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BackIcon = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.arrow} onPress={onPress}>
      <Icon name="arrow-left" color="#a0a0a0" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrow: {
    marginHorizontal: 26,
    marginTop: 60,
  },
});

BackIcon.propTypes = {
  onPress: PropTypes.func,
};

export default BackIcon;
