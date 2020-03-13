import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import theme from '~/utils/theme';

const LinkText = ({onPress, description, linkText, linkColor}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        {description}{' '}
        <Text style={[styles.link, {color: linkColor}]}>{linkText}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginTop: 32,
  },
  text: {
    color: '#414959',
    fontSize: 13,
  },
  link: {
    fontWeight: '500',
  },
});

LinkText.propTypes = {
  onPress: PropTypes.func.isRequired,
  description: PropTypes.string,
  linkText: PropTypes.string,
  linkColor: PropTypes.string,
};

LinkText.defaultProps = {
  linkColor: theme.primary,
};

export default LinkText;
