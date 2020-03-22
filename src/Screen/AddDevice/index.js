import React from 'react';
import PropTypes from 'prop-types';

import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';

const DUMMY_DATA = [
  {
    name: 'Input Device ID',
    path: 'AddDeviceId',
  },
  {
    name: 'Scan Bluetooth Devices',
    path: 'AddBluetooth',
  },
];

const AddDeviceScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <RenderItem
            navigation={navigation}
            name={item.name}
            path={item.path}
          />
        )}
      />
    </View>
  );
};

const RenderItem = ({name, path, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(path)}
      style={styles.item}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgb(230,230,230)',
  },
  text: {
    fontSize: 18,
    marginBottom: 6,
  },
  subtext: {
    fontSize: 16,
    color: 'rgb(150,150,150)',
  },
});

AddDeviceScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddDeviceScreen;
