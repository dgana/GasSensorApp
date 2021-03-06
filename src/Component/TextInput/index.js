import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '~/utils/theme';

const TextInputForm = ({
  label,
  value,
  onChangeText,
  isPassword,
  isHidden,
  onPressHide,
  description,
  ...restProps
}) => {
  return (
    <View style={styles.marginBottom}>
      <Text style={styles.inputTitle}>{label}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        secureTextEntry={isPassword && isHidden}
        {...restProps}
      />
      {isPassword && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.touchableButton}
          onPress={onPressHide}>
          {isHidden ? (
            <Icon
              name="eye-off"
              color="#a0a0a0"
              size={24}
              style={styles.hidePasswordIcon}
            />
          ) : (
            <Icon
              name="eye"
              color="#a0a0a0"
              size={24}
              style={styles.hidePasswordIcon}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 26,
  },
  inputTitle: {
    color: theme.black,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  description: {
    marginTop: 6,
    color: theme.gray,
    fontSize: 9,
  },
  input: {
    borderBottomColor: theme.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  touchableButton: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 2,
  },
  hidePasswordIcon: {
    marginTop: 12,
  },
});

TextInputForm.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChangeText: PropTypes.func,
  isPassword: PropTypes.bool,
  isHidden: PropTypes.bool,
  onPressHide: PropTypes.func,
};

TextInputForm.defaultProps = {
  isPassword: false,
  isHidden: false,
};

export default TextInputForm;
