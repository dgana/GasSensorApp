import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import theme from '~/utils/theme';

const Button = ({onPress, loading, color}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: color}]}
        onPress={onPress}>
        <Text style={styles.buttonText}>{loading ? '' : 'Sign Up'}</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.loadingButton}>
          <ActivityIndicator animating={loading} size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 30,
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingButton: {
    position: 'absolute',
    top: 8,
    right: 0,
    left: 0,
  },
  buttonText: {
    color: theme.white,
    fontWeight: '500',
  },
});

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  color: PropTypes.string,
};

Button.defaultProps = {
  loading: false,
  color: theme.primary,
};

export default Button;
