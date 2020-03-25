import React from 'react';
import PropTypes from 'prop-types';

import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import theme from '~/utils/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DUMMY_DATA = [
  {
    name: 'Input Device ID',
    path: 'AddDeviceId',
    icon: 'format-list-bulleted-square',
    disabled: false,
  },
  {
    name: 'Scan Bluetooth Devices (WIP)',
    path: 'AddBluetooth',
    icon: 'bluetooth-settings',
    disabled: true,
  },
];

const AddDeviceScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <RenderItem navigation={navigation} {...item} />
        )}
      />
    </View>
  );
};

const RenderItem = ({name, path, icon, disabled, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(path)}
      style={styles.item}
      disabled={disabled}>
      <View style={styles.flexRow}>
        <Icon style={styles.icon} name={icon} size={24} color={theme.black} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.box}>
        <Icon name="arrow-right" size={24} color="#5588EE" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightGray,
    paddingTop: 12,
  },
  icon: {
    marginRight: 12,
  },
  item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
    paddingLeft: 0,
    borderBottomColor: theme.lightWhite,
    borderBottomWidth: 1.5,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
  subtext: {
    fontSize: 16,
    color: 'rgb(150,150,150)',
  },
  flexRow: {
    flexDirection: 'row',
  },
  box: {
    alignItems: 'center',
  },
});

AddDeviceScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddDeviceScreen;
