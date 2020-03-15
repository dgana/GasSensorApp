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
  loading,
  text,
  icon,
  style,
  children,
  ...restProps
}) => {
  return (
    <View {...restProps}>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <View style={styles.buttonView}>
          {icon && (
            <IconMaterial
              name={icon.name}
              color={icon.color}
              size={icon.size}
              style={[styles.icon, icon.style]}
            />
          )}
          {text ? <ButtonText loading={loading} text={text} /> : children}
        </View>
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
  <Text style={styles.text}>{loading ? '' : text}</Text>
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
  text: {
    color: theme.white,
    fontWeight: '800',
    fontFamily: 'Avenir',
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
  loading: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};

Button.defaultProps = {
  loading: false,
  style: {backgroundColor: theme.primary},
};

export default Button;