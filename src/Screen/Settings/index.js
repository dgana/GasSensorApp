/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert} from 'react-native';
import ErrorMessage from '~/component/ErrorMessage';
import TextInput from '~/component/TextInput';
import Button from '~/component/Button';
import theme from '~/utils/theme';
import {useAsyncStorage} from '~/utils';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const Settings = ({route}) => {
  const {deviceId} = route.params;
  const {getItem: getAsyncToken} = useAsyncStorage('userToken');

  const [errorMessage, setErrorMessage] = React.useState('');
  const [name, setName] = React.useState('');
  const [limit, setLimit] = React.useState('');
  const [time, setTime] = React.useState('');
  const [ssid, setSsid] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);

  React.useEffect(() => {
    readFirestore();
  }, [readFirestore]);

  const readFirestore = React.useCallback(async () => {
    try {
      const userId = await getAsyncToken();
      const device = await firestore()
        .collection('users')
        .doc(userId)
        .get();
      const getDevices = await device.get('devices');
      const currentDevice = getDevices.find(x => x.id === deviceId);
      const {config, name: deviceName} = currentDevice;
      setName(deviceName);
      setLimit(String(config.limit));
      setTime(String(config.timeout));
      setSsid(config.ssid);
      setPassword(config.password);
    } catch (error) {
      console.log(error);
    }
  }, [deviceId, getAsyncToken]);

  const writeFirestore = async () => {
    try {
      const userId = await getAsyncToken();
      const device = await firestore()
        .collection('users')
        .doc(userId);
      const getFields = await device.get();
      const getDevices = getFields.get('devices');
      const currentDevice = getDevices.find(x => x.id === deviceId);

      const devices = getDevices.map(x => {
        if (x.id === deviceId) {
          return {
            ...x,
            name,
            config: {
              ...x.config,
              timeout: Number(time),
              limit: Number(limit),
              ssid,
              password,
            },
          };
        } else {
          return x;
        }
      });

      await device.update({devices});
      setIsLoading(false);
      Alert.alert(`Device ${currentDevice.name} settings has been updated!`);
    } catch (error) {
      console.log(error);
    }
  };

  const writeDatabase = async () => {
    try {
      const userId = await getAsyncToken();
      database()
        .ref(`${userId}/${deviceId}`)
        .update({limit: Number(limit), timeout: Number(time), ssid, password});
    } catch (error) {
      console.log(error);
    }
  };

  const setPasswordVisibility = () => {
    setHidePassword(state => !state);
  };

  const onPressButton = () => {
    if (limit && time && name && ssid && password) {
      setIsLoading(true);
      writeFirestore();
      writeDatabase();
    } else {
      const message =
        'Device name, limit, interval, and WiFi settings is required';
      setErrorMessage(message);
    }
  };

  return (
    <View style={styles.container}>
      <ErrorMessage
        style={styles.marginHorizontal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <View style={styles.form}>
        <TextInput
          label="Device Name  *"
          value={name}
          placeholder="Set device name"
          onChangeText={setName}
        />
        <TextInput
          label="Device PPM Limit  *"
          description="Device will send notification if ppm level rise above limit"
          value={limit}
          placeholder="Set device ppm limit level"
          onChangeText={setLimit}
          keyboardType={'numeric'}
        />
        <TextInput
          label="Device interval *"
          description="Data refreshes in how many seconds?"
          value={time}
          placeholder="Get new ppm level in how many seconds"
          onChangeText={setTime}
          keyboardType={'numeric'}
        />
        <TextInput
          label="Device WiFi SSID  *"
          value={ssid}
          description="Set WiFi SSID of your device to connect"
          placeholder="Device SSID"
          onChangeText={setSsid}
        />
        <TextInput
          label="Device WiFi Password  *"
          value={password}
          description="Set WiFi Password of your device to connect"
          placeholder="Device password"
          onChangeText={setPassword}
          isPassword
          isHidden={hidePassword}
          onPressHide={setPasswordVisibility}
        />
        <Button
          style={styles.marginHorizontal}
          onPress={onPressButton}
          text="Update Device"
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: theme.lightGray,
  },
  marginHorizontal: {
    marginHorizontal: 0,
  },
  form: {
    marginTop: 12,
  },
});

Settings.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Settings;
