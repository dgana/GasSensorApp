import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

import ErrorMessage from '~/component/ErrorMessage';
import TextInput from '~/component/TextInput';
import Button from '~/component/Button';
import theme from '~/utils/theme';

const AddAccessPointScreen = ({navigation}) => {
  const [ssid, setSsid] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    console.log(WifiManager);
    const getCurrentWifi = async () => {
      try {
        const currentWifi = await WifiManager.getCurrentWifiSSID();
        console.log(currentWifi);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentWifi();
  }, []);

  const onPressButton = async () => {
    console.log(ssid);
    if (ssid) {
      setIsLoading(true);
      const isConnected = await WifiManager.connectToSSID(ssid);
      console.log('isConnected ', isConnected);
      setIsLoading(false);
    } else {
      setErrorMessage('Please input your device SSID');
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
          label="SSID *"
          description="Device SSID is printed on the device hardware"
          placeholder="Set your device ssid to connect WiFi"
          value={ssid}
          onChangeText={setSsid}
        />
        <Button
          style={styles.marginHorizontal}
          onPress={onPressButton}
          text="Connect Device SSID"
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

AddAccessPointScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddAccessPointScreen;
