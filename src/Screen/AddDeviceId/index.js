import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert} from 'react-native';

import ErrorMessage from '~/component/ErrorMessage';
import TextInput from '~/component/TextInput';
import Button from '~/component/Button';
import theme from '~/utils/theme';
import {useAsyncStorage} from '~/utils';
import firestore from '@react-native-firebase/firestore';

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

      const config = {timeout: 5, limit: 1000};
      const devices = [...currentDevices, {name, id, config}];

      await device.update({devices});
      setIsLoading(false);
      Alert.alert(`Device ${name} added`);
      navigation.navigate('AddSSID', {deviceName: name, deviceId: id});
    } catch (error) {
      console.log(error);
    }
  };

  const onPressButton = () => {
    if (deviceName && deviceId) {
      setIsLoading(true);
      writeFirestore(deviceName, deviceId);
    } else {
      setErrorMessage('Device name and Device ID is required');
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
          value={deviceName}
          onChangeText={setDeviceName}
        />
        <TextInput
          label="Device ID *"
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
