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

const DEFAULT_CONFIG = {timeout: 5, limit: 1000};

const AddDeviceIdScreen = ({navigation}) => {
  const [deviceName, setDeviceName] = React.useState('');
  const [deviceId, setDeviceId] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const {getItem: getAsyncToken} = useAsyncStorage('userToken');

  const writeFirestore = async (name, id) => {
    try {
      const userId = await getAsyncToken();
      const device = await firestore()
        .collection('users')
        .doc(userId);
      const getFields = await device.get();
      const currentDevices = getFields.get('devices');

      const devices = [...currentDevices, {name, id, config: DEFAULT_CONFIG}];

      await device.update({devices});
      Alert.alert(`Device id ${deviceId} added!`);
      navigation.navigate('AddSSID', {deviceName: name, deviceId: id});
    } catch (error) {
      console.log(error);
    }
  };

  const checkCurrentIdFromCurrentDevices = async () => {
    try {
      const userId = await getAsyncToken();
      const getDevice = await database()
        .ref(`${userId}/${deviceId}`)
        .once('value');
      if (getDevice.exists()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const checkUnregisteredDevice = async () => {
    try {
      const deviceRef = await database().ref(`unregisteredDevices/${deviceId}`);
      const getValue = await deviceRef.once('value');
      if (getValue.exists()) {
        await writeDatabase();
        await deviceRef.remove();
        return true;
      } else {
        Alert.alert(`Device id ${deviceId} not found!`);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const writeDatabase = async () => {
    const userId = await getAsyncToken();
    await database()
      .ref(`${userId}/${deviceId}`)
      .set({PPM: 0, ...DEFAULT_CONFIG});
  };

  const onPressButton = async () => {
    if (deviceName && deviceId) {
      setIsLoading(true);
      const isAdded = await checkCurrentIdFromCurrentDevices();
      if (isAdded) {
        Alert.alert(`Device id ${deviceId} already added!`);
        navigation.navigate('AddSSID', {deviceName, deviceId});
      } else {
        const checkId = await checkUnregisteredDevice();
        if (checkId) {
          writeFirestore(deviceName, deviceId);
        }
      }
      setIsLoading(false);
    } else {
      setErrorMessage('Device name and Device ID is required');
      setIsLoading(false);
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
          label="Device Name *"
          placeholder="Sensor Lobby"
          value={deviceName}
          onChangeText={setDeviceName}
        />
        <TextInput
          label="Device ID *"
          description="Device ID is printed on the device hardware"
          placeholder="B7891-JU8KS-911LA-ADN11-1O9OP"
          value={deviceId}
          onChangeText={setDeviceId}
        />
        <Button
          style={styles.marginHorizontal}
          onPress={onPressButton}
          text="Add Device"
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
  form: {
    marginTop: 12,
  },
  marginHorizontal: {
    marginHorizontal: 0,
  },
});

AddDeviceIdScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddDeviceIdScreen;
