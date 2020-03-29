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

const AddSSIDScreen = ({navigation, route}) => {
  const {deviceName, deviceId} = route.params;
  const [ssid, setssid] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = React.useState(true);

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const {getItem: getAsyncToken} = useAsyncStorage('userToken');

  const setPasswordVisibility = () => {
    setHidePassword(state => !state);
  };

  const writeFirestore = async () => {
    try {
      const userId = await getAsyncToken();
      const device = await firestore()
        .collection('users')
        .doc(userId);
      const getFields = await device.get();
      const currentDevices = getFields.get('devices');

      const devices = currentDevices.map(x => {
        if (x.id === deviceId) {
          return {
            ...x,
            config: {
              ...x.config,
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
      Alert.alert(`Device ${deviceName} connected`);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const writeDatabase = async () => {
    const userId = await getAsyncToken();
    await database()
      .ref(`${userId}/${deviceId}`)
      .update({ssid, password});
  };

  const onPressButton = () => {
    if (ssid && password) {
      setIsLoading(true);
      writeDatabase();
      writeFirestore();
    } else {
      setErrorMessage('SSID and password is required');
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
          label="WiFi SSID *"
          description="WiFi name for the device network"
          value={ssid}
          onChangeText={setssid}
        />
        <TextInput
          label="WiFi Password *"
          value={password}
          onChangeText={setPassword}
          isPassword
          isHidden={hidePassword}
          onPressHide={setPasswordVisibility}
        />
        <Button
          style={styles.marginHorizontal}
          onPress={onPressButton}
          text="Connect Device"
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

AddSSIDScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default AddSSIDScreen;
