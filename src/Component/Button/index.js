import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '~/utils/theme';

const Button = ({
  onPress,
  isLoading,
  text,
  icon,
  style,
  children,
  containerStyle,
  ...restProps
}) => {
  return (
    <View style={containerStyle} {...restProps}>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <View style={styles.buttonView}>
          {icon && !isLoading && (
            <IconMaterial
              name={icon.name}
              color={icon.color}
              size={icon.size}
              style={[styles.icon, icon.style]}
            />
          )}
          {text ? <ButtonText isLoading={isLoading} text={text} /> : children}
        </View>
      </TouchableOpacity>
      {isLoading && (
        <View style={styles.loadingButton}>
          <ActivityIndicator animating={isLoading} size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const ButtonText = ({isLoading, text}) => (
  <Text style={styles.text}>{isLoading ? '' : text}</Text>
);

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 30,
    borderRadius: 6,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
  },
  loadingButton: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  text: {
    color: theme.white,
    fontWeight: '800',
    fontFamily: 'Avenir-Black',
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 8,
  },
});

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  icon: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};

Button.defaultProps = {
  isLoading: false,
  text: '',
  icon: {},
  containerStyle: {},
  style: {},
};

export default Button;
