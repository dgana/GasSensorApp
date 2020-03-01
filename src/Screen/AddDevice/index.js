import React from 'react';
import {FlatList, StyleSheet, Text, View, Button, Switch} from 'react-native';

function AddDevice() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle}>Bluetooth Device List</Text>
        <View style={styles.toolbarButton}>
          <Switch value={isEnabled} onValueChange={setIsEnabled} />
        </View>
      </View>
      <Button
        // onPress={this.discoverAvailableDevices.bind(this)}
        title="Scan for Devices"
        color="#841584"
      />
      <FlatList
        style={{flex: 1}}
        // data={this.state.devices}
        keyExtractor={item => item.id}
        // renderItem={(item) => this.renderItem(item)}
      />
      <Button
        // onPress={this.toggleSwitch.bind(this)}
        title="Switch(On/Off)"
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbarButton: {
    width: 80,
    marginTop: 8,
  },
  toolbarTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    marginTop: 6,
  },
  deviceName: {
    fontSize: 17,
    color: 'black',
  },
  deviceNameWrap: {
    margin: 10,
    borderBottomWidth: 1,
  },
});

export default AddDevice;
