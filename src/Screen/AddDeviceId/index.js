import React from 'react';
// import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';

import ErrorMessage from '~/component/ErrorMessage';
import TextInput from '~/component/TextInput';
import Button from '~/component/Button';

const AddDeviceIdScreen = props => {
  const [deviceName, setDeviceName] = React.useState('');
  const [deviceId, setDeviceId] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const onPressButton = () => {
    console.log(deviceName, deviceId);
  };

  return (
    <View style={styles.container}>
      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <View style={styles.form}>
        <TextInput
          label="Device Name"
          value={deviceName}
          onChangeText={setDeviceName}
        />
        <TextInput
          label="Device ID *"
          value={deviceId}
          onChangeText={setDeviceId}
        />
        <Button
          style={styles.button}
          onPress={onPressButton}
          loading={false}
          text="Add Device"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  form: {
    marginTop: 12,
  },
  button: {
    marginHorizontal: 0,
  },
});

AddDeviceIdScreen.propTypes = {};

export default AddDeviceIdScreen;
