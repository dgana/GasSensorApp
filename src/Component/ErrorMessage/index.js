import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import theme from '~/utils/theme';

const ErrorMessage = ({errorMessage, setErrorMessage}) => {
  React.useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(''), 6000);
    }
  }, [errorMessage, setErrorMessage]);

  return (
    <View style={styles.errorMessage}>
      {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: theme.secondary,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func,
};

export default ErrorMessage;
