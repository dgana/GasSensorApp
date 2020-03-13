import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import theme from '~/utils/theme';

const Button = ({onPress, loading, style, text, children, ...restProps}) => {
  return (
    <View {...restProps}>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        {text ? <ButtonText loading={loading} text={text} /> : children}
      </TouchableOpacity>
      {loading && (
        <View style={styles.loadingButton}>
          <ActivityIndicator animating={loading} size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const ButtonText = ({loading, text}) => (
  <Text style={styles.buttonText}>{loading ? '' : text}</Text>
);

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 30,
    borderRadius: 6,
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
  style: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  loading: false,
  style: {backgroundColor: theme.primary},
};

export default Button;
